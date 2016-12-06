
import EditableLastNode from '..'
import React from 'react'
import ReactDOM from 'react-dom'
import initialState from './state.json'
import { Editor, Raw } from 'slate'

const schema = {
  nodes: {
    image: () => <img src="/example.png" />,
    line: props => <p {...props.attributes}>This block is editable! {props.children}</p>
  }
}

class Example extends React.Component {

  plugins = [
    EditableLastNode({
      type: 'line'
    })
  ];

  state = {
    state: Raw.deserialize(initialState, { terse: true })
  };

  onChange = (state) => {
    this.setState({ state })
  }

  render = () => {
    return (
      <Editor
        schema={schema}
        onChange={this.onChange}
        plugins={this.plugins}
        state={this.state.state}
      />
    )
  }
}

const example = <Example />
const root = document.body.querySelector('main')
ReactDOM.render(example, root)
