import React from 'react'
import styles from './index.module.css'

const UploadButton = (props) => {
    const { dispatch } = props

    const handleButtonClick = () => {
        document.getElementById('fileUploadInput').click()
    }

    const handleAdd = (event) => {
        const inputElement = event.target
        let files = Array.from(inputElement.files)

        files.forEach((file) => {
            file.preview = URL.createObjectURL(file)
        })

        
        if (files) {
            dispatch({ type: "addToList", files })
        }
    }

    return (
        <>
            <button className={styles['btn-upload']} onClick={handleButtonClick}>
                {props.buttonText}
            </button>
            <input
                type='file'
                id="fileUploadInput"
                className={styles.input}
                onChange={handleAdd}></input>
        </>
    )
}

export default UploadButton