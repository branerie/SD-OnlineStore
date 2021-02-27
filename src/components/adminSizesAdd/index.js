import React, { useState } from 'react'
import styles from './index.module.css'

import TextInput from '../inputFields/textInput'

const AdminSizesAdd = ({ handleAdd, hideInput }) => {
    const [sizeName, setSizeName] = useState('')

    const handleCreate = () => {
        if (sizeName) {
            handleAdd(sizeName)
        }

        hideInput()
    }

    const handleKeyDown = (event) => {
        if (event.keyCode === 13) {
            // Enter was pressed
            return handleCreate()
        }
    }

    return (
        <div className={styles.container}>
            <TextInput
                placeholder='Enter new size name'
                value={sizeName}
                onChange={e => setSizeName(e.target.value)}
                onBlur={handleCreate}
                onKeyDown={handleKeyDown}
                autoFocus={true}
            />
        </div>
    )
}

export default AdminSizesAdd