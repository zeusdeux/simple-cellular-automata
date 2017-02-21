const cellularAutomataFragment = document.createDocumentFragment()

function randBinary() {
  return Math.round(Math.random())
}

function calcState(l, m, r) {
  if (l && m && r) return 1
  if (l && m && !r) return 0
  if (l && !m && r) return 1
  if (l && !m && !r) return 0
  if (!l && m && r) return 0
  if (!l && m && !r) return 1
  if (!l && !m && r) return 0
  return 1
}

function makeRowFragment(prevRow) {
  const noOfDivs = 600
  const rowContainerFragment = document.createDocumentFragment()
  const rowItemsFragment = document.createDocumentFragment()

  const row = document.createElement('div')

  row.classList.add('row')
  rowContainerFragment.appendChild(row)

  for (let i = 0; i < noOfDivs; i++) {
    const div = document.createElement('div')
    let state

    // initial state
    if (!prevRow) state = i === Math.floor(noOfDivs / 2) ? 1 : 0 // i % 2 === 0 && i % 3 === 0 ? 0 : 1
    else {
      const prevRowChildren = prevRow.childNodes
      const lastIndex = prevRowChildren.length - 1
      const top = Number.parseInt(prevRowChildren[i].dataset.state, 10)
      const topLeft = Number.parseInt((prevRowChildren[i - 1] || prevRowChildren[lastIndex]).dataset.state, 10)
      const topRight = Number.parseInt((prevRowChildren[i + 1] || prevRowChildren[0]).dataset.state, 10)

      state = calcState(topLeft, top, topRight)
    }
    div.classList.add(state ? 'active' : 'inactive')
    div.dataset.state = state
    rowItemsFragment.appendChild(div)
  }
  rowContainerFragment.querySelector('.row').appendChild(rowItemsFragment)
  return rowContainerFragment
}


function render () {
  const main = document.querySelector('main')
  const lastRow = cellularAutomataFragment.querySelector('.row:last-child')

  if (cellularAutomataFragment.childNodes.length < 209) {
    cellularAutomataFragment.appendChild(makeRowFragment(lastRow))
    window.requestAnimationFrame(render)
  } else {
    main.replaceChild(cellularAutomataFragment, document.querySelector('main > p'))
  }
}

window.requestAnimationFrame(() => render())
