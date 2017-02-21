function randBinary() {
  return Math.round(Math.random())
}

function calcState(l, m, r) {
  if (l && m && r) return 0
  if (l && m && !r) return 1
  if (l && !m && r) return 1
  if (l && !m && !r) return 0
  if (!l && m && r) return 0
  if (!l && m && !r) return 0
  if (!l && !m && r) return 1
  return 1
}

function renderRow(prevRow) {
  const main = document.querySelector('main')
  const row = document.createElement('div')
  const noOfDivs = 400

  row.classList.add('row')
  main.appendChild(row)

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
    row.appendChild(div)
  }
}


function render () {
  const main = document.querySelector('main')
  const lastRow = document.querySelector('.row:last-child')

  if (main.childNodes.length < 400) {
    renderRow(lastRow)
    window.requestAnimationFrame(render)
  }
}

window.requestAnimationFrame(() => render())
