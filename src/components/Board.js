import React from 'react'
import _ from 'lodash'
import Cell from './Cell'

export default ({width, height, board, click}) => {
  const times = width * height
  return (
    <a-entity>
      {
        _.times(times, i => {
          const row = Math.floor(i / width)
          const col = i % width
          return <Cell width={width} height={height} row={row} col={col} click={click} key={i} index={i} alive={board[i]} />
        })
      }
    </a-entity>
  )
}
