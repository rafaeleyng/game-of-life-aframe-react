import React from 'react'

const transformCol = (width, col) => {
  return (col * 2) - (width)
}

const transformRow = (height, row) => {
  return (row / height) * (height * 2) - (height / 2)
}

export default class Cell extends React.Component {
  render () {
    const {width, height, row, col, click, index, alive} = this.props
    const position = `${transformCol(width, col)} ${transformRow(height, row)} -5`
    return (
      <a-entity
        onClick={() => { click(index) }}
        geometry="primitive: box; depth: 0.1"
        material={`color: ${alive ? '#333' : '#aaa'}`}
        position={position}
      ></a-entity>
    )
  }
}
