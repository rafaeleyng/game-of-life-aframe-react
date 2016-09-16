import React from 'react'
import Board from './Board'
import lif from 'lif'

export default class Scene extends React.Component {
  constructor() {
    super()

    const width = 10
    const height = 10

    const initEmptyBoard = (width, height) => {
      const board = []
      for (var i = 0; i < width * height; ++i) { board[i] = false }
      return board
    }

    const board = initEmptyBoard(width, height)

    this.state = {
      interval: 100,
      width,
      height,
      board,
      gameState: 'stoped',
    }

    // bind
    this.applyRules = this.applyRules.bind(this)
    this.togglePlay = this.togglePlay.bind(this)
    this.play = this.play.bind(this)
    this.stop = this.stop.bind(this)
    this.handleCellClick = this.handleCellClick.bind(this)

    document.addEventListener('keydown', e => {
      if (e.key === 'p') {
        this.togglePlay()
      }
    })
  }

  applyRules() {
    this.setState({ board: lif(this.state.board) })
  }

  togglePlay() {
    if (this.state.gameState === 'playing') {
      this.stop()
    } else {
      this.play()
    }
  }

  play() {
    const intervalId = setInterval(this.applyRules, this.state.interval)

    this.setState({
      intervalId,
      gameState: 'playing',
    })
  }

  stop() {
    clearInterval(this.state.intervalId)
    this.setState({
      intervalId: undefined,
      gameState: 'stoped',
    })
  }

  handleCellClick(index) {
    console.log('handleCellClick', index)
    if (this.state.gameState === 'stoped') {
      const board = this.state.board
      board[index] = !board[index]
      this.setState({board})
    }
  }

  render() {
    const camera = (
      <a-entity position="0 1.8 4">
        <a-entity camera id="camera" look-controls>
          <a-cursor fuse="true" color="black"></a-cursor>
        </a-entity>
      </a-entity>
    )

    return (
      <a-scene>
        <Board width={this.state.width} height={this.state.height} board={this.state.board} click={this.handleCellClick}></Board>
        {camera}
      </a-scene>
    )
  }
}
