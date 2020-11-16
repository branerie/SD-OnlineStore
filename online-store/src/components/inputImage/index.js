import React, { useReducer } from 'react'
import DragAndDrop from '../dragAndDrop'

const InputImages = () => {
    const dropState = {
        inDropZone: false,
        fileList: []
    }

    const [data, dispatch] = useReducer(reducer, dropState)

    function reducer (state, action) {
        switch (action.type) {
            case 'addToDropZone':
                return { ...state, inDropZone: action.inDropZone }
            case 'addToList':
                return {
                    ...state,
                    fileList: state.fileList.concat(action.files),
                }
            case 'removeFromList':
                return {
                    ...state,
                    fileList: state.fileList.filter(f => f.preview !== action.fileToRemove)
                }
            case 'reset':
                return {
                    inDropZone: false,
                    fileList: []
                }
            default:
                return state
        }
    }

    return (
        <div>
            <h1>React drag-and-drop component</h1>
            <DragAndDrop data={data} dispatch={dispatch} />
        </div>
    )
}

export default InputImages
