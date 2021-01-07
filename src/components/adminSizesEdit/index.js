import React, { useEffect, useState } from 'react'
import styles from './index.module.css'

import Input from '../input'
import TextInput from '../inputFields/textInput'
import QuantityInput from '../inputFields/quantityInput'

const DEFAULT_INPUT_FIELD = { sizeName: '---', count: 0 }

const AdminSizesEdit = ({
    productSizes,
    setProductSizes,
    modifiedSizes,
    setModifiedSizes,
    editedSizeName
}) => {
    const [addSizeName, setAddSizeName] = useState('')
    const [addSizeCount, setAddSizeCount] = useState(0)
    const [inputField, setInputField] = useState(DEFAULT_INPUT_FIELD)

    useEffect(() => {
        const sizeToEdit = productSizes.find(ps => ps.sizeName === editedSizeName)
        setInputField({...sizeToEdit})
    }, [editedSizeName])

    const handleInputChange = (value) => {
        const newInputField = { ...inputField }
        newInputField.count = value
        setInputField(newInputField)
    }

    const addSize = () => {
        const newSize = { sizeName: addSizeName, count: addSizeCount }
        const newSizeModification = { value: newSize, action: 'add' }

        setModifiedSizes([...modifiedSizes, newSizeModification])
        setProductSizes([...productSizes, newSize])
    }

    const editSize = (modifiedSize) => {
        modifiedSize.count = parseInt(modifiedSize.count)
        if (isNaN(modifiedSize.count)) {
            return
        }

        const newSizeModification = {
            value: modifiedSize,
            action: 'edit'
        }

        // we don't want to send multiple modifications for a single size
        // so we replace the old modification if there is one
        const oldModificationIndex = modifiedSizes.findIndex(s => 
                s.sizeName === modifiedSize.sizeName)

        if (oldModificationIndex >= 0) {
            const newModifiedSizes = [...modifiedSizes]
            newModifiedSizes[oldModificationIndex] = newSizeModification
        } else {
            setModifiedSizes([...modifiedSizes, newSizeModification])
        }

        setInputField(DEFAULT_INPUT_FIELD)
        // modifiedSize.action = action

        const changedIndex = productSizes.findIndex(size =>
            size.sizeName === modifiedSize.sizeName)

        const newProductSizes = [...productSizes]
        newProductSizes[changedIndex] = modifiedSize
        setProductSizes(newProductSizes)
    }

    const handleCountAdd = value => {
        const countToAdd = parseInt(value)
        if (isNaN(countToAdd)) {
            return
        }

        setAddSizeCount(countToAdd)
    } 

    return (
        <div className={styles.linefield}>
            <div className={styles['edit-field-container']}>
                <div>
                    Name of Size : {inputField.sizeName}
                </div>
                <Input
                    type='number'
                    placeholder='Amount available with this size'
                    id='count'
                    value={inputField.count}
                    onChange={e => handleInputChange(e.target.value)}
                    step='1'
                />
                <button
                    onClick={() => editSize(inputField)}
                    className={styles['submit-btn']}>
                        Submit
                </button>
            </div>
            <div className={styles['add-field']} >
                <span className={styles.title}>Add sizes:</span>
                <TextInput
                    type='text'
                    id='sizeName'
                    placeholder='Size name (42, 43, S, M, XL etc.)'
                    onChange={e => setAddSizeName(e.target.value)}
                />
                <QuantityInput
                    value={addSizeCount}
                    name='sizeQuantity'
                    max={99999}
                    setNewValue={handleCountAdd}
                />
                <button
                    onClick={addSize}
                    className={styles['submit-btn']} >
                        Submit
                </button>
            </div>
        </div>
    )
}

export default AdminSizesEdit