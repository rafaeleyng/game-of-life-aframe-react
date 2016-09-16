import React from 'react'

export default class Scene extends React.Component {
  render() {
    return (
      <a-scene>
        <a-box color="#6173F4" opacity="0.8" depth="2" position="0 2 -5"></a-box>
        <a-sky color="#ECECEC"></a-sky>
      </a-scene>
    )
  }
}
