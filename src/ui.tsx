/* global document, parent*/

import * as React from 'react'
import * as ReactDOM from 'react-dom'
import { Text, Input, Title, Button } from 'react-figma-plugin-ds'
import 'react-figma-plugin-ds/figma-plugin-ds.css'
import './ui.css'

declare function require(path: string): string

class App extends React.Component<{}, { value: string }> {
  constructor(props) {
    super(props)
    this.state = { value: '5' }
    this.onInputChange = this.onInputChange.bind(this)
    this.onCreate = this.onCreate.bind(this)
  }

  onInputChange(value, event) {
    this.setState({ value: event.target.value })
  }

  onCreate(event) {
    const count = parseInt(this.state.value, 10)
    event.preventDefault()
    parent.postMessage(
      { pluginMessage: { type: 'create-rectangles', count } },
      '*'
    )
  }

  onCancel() {
    parent.postMessage({ pluginMessage: { type: 'cancel' } }, '*')
  }

  render() {
    return (
      <div>
        <img src={require('./logo.svg')} />
        <Title level="h1" size="xlarge" weight="bold">
          Icon Maker
        </Title>
        <Text size="small">Count:</Text>
        <Input
          type="text"
          defaultValue="5"
          icon="frame"
          iconColor="blue"
          onChange={this.onInputChange}
        />
        <Button onClick={this.onCreate}>Create</Button>
        <Button isSecondary onClick={this.onCancel}>
          Cancel
        </Button>
      </div>
    )
  }
}

ReactDOM.render(<App />, document.getElementById('react-page'))
