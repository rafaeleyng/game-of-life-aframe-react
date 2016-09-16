import React from 'react'

export default class Controls extends React.Component {
  render () {
    const {isPlaying, togglePlay, clear, random} = this.props
    return (
      <a-entity>
        <a-entity
          look-at="#camera"
          onClick={togglePlay}
          material={`color: ${isPlaying ? 'red' : 'green'}`}
          geometry="primitive: box; depth: 0.1"
          position="4 3.5 1"
        ></a-entity>

        <a-entity
          look-at="#camera"
          onClick={clear}
          material="color: #aaa"
          geometry="primitive: box; depth: 0.1"
          position="4 2 1"
        ></a-entity>

        <a-entity
          look-at="#camera"
          onClick={random}
          material="color: #333"
          geometry="primitive: box; depth: 0.1"
          position="4 0.5 1"
        ></a-entity>
      </a-entity>
    )
  }
}
