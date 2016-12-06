import lastNode from './last-node'
import isVoid from './is-void'

const DEFAULT_NODE_TYPE = 'paragraph'

function EditableLastNode({ type }) {
  function onBeforeChange(state) {
    const node = lastNode(state)

    return isVoid(node) ?
      insertEditableNode(node, state) :
      state
  }

  function insertEditableNode(endNode, state) {
    const node = { type: type ? type : DEFAULT_NODE_TYPE }

    const editableNodeData = Object
      .assign(node, {
        isVoid: false,
      })

    const splitBlockState = state
      .transform()
      .collapseToEndOf(endNode)
      .splitBlock()
      .apply()

    const newEndNode = lastNode(splitBlockState)

    const editableLastNodeState = splitBlockState
      .transform()
      .setNodeByKey(newEndNode.key, editableNodeData)
      .apply()

    return editableLastNodeState
  }

  return {
    onBeforeChange
  }
}

export default EditableLastNode
