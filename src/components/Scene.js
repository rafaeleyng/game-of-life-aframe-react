import React from 'react'
import lif from 'lif'
import Board from './Board'
import Controls from './Controls'

const initEmptyBoard = (width, height) => {
  const board = []
  for (var i = 0; i < width * height; ++i) { board[i] = false }
  return board
}

const initRandomBoard = (width, height) => {
  const board = []
  for (var i = 0; i < width * height; ++i) { board[i] = Math.random() > 0.7 }
  return board
}

export default class Scene extends React.Component {
  constructor() {
    super()

    const width = 14
    const height = 14

    const board = initEmptyBoard(width, height)

    this.state = {
      interval: 200,
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
    this.clear = this.clear.bind(this)
    this.random = this.random.bind(this)
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

  clear() {
    this.setState({
      board: initEmptyBoard(this.state.width, this.state.height),
    })
  }

  random() {
    this.setState({
      board: initRandomBoard(this.state.width, this.state.height),
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
      <a-entity>
        <Board width={this.state.width} height={this.state.height} board={this.state.board} click={this.handleCellClick} />
        <Controls isPlaying={this.state.gameState === 'playing'} togglePlay={this.togglePlay} clear={this.clear} random={this.random}/>
        {camera}
        <a-sky color="#DDDDDD"></a-sky>
      </a-entity>
    )
  }
}
