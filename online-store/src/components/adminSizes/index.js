import React, { useCallback, useContext, useEffect, useMemo, useState } from 'react'
import styles from './index.module.css'
import getCookie from '../../utils/cookie'
import Input from '../input'
import ProductsContext from '../../ProductsContext'

const DEFAULT_INPUT_FIELD = { 'sizeName': '---', 'count': 0 }

const AdminSizes = (props) => {
    const [sizes, setSizes] = useState(props.sizes)
    const [currentProductSize, setCurrentProductSize] = useState(sizes)
    const [inputField, setInputField] = useState(DEFAULT_INPUT_FIELD)
    const [modifiedSizes, setModifiedSizes] = useState([])
    const [addSizeName, setAddSizeName] = useState('')
    const [addSizeCount, setAddSizeCount] = useState(0)
    const productId = props.id

    const productsContext = useContext(ProductsContext)

    const editSize = useCallback((modifiedSize, action) => {
        const editedSizeObjectValue = {
            sizeName: modifiedSize.sizeName,
            count: modifiedSize.count
        }

        const sendedObjectToDB = {
            value: editedSizeObjectValue,
            action: action
        }

        setModifiedSizes([...modifiedSizes, sendedObjectToDB])

        setInputField(DEFAULT_INPUT_FIELD)
        modifiedSize.action = action

        const changedIndex = currentProductSize.findIndex(size =>
            size.sizeName === modifiedSize.sizeName)

        const newProductSize = [...currentProductSize]
        newProductSize[changedIndex] = modifiedSize
        setCurrentProductSize(newProductSize)

    }, [currentProductSize, modifiedSizes])

    const renderedSizes = useMemo(function () {
        return (
            currentProductSize.map(productSize => {
                return (
                    <div className={styles.eachSize}>
                        { productSize.action
                            ? <div className={styles.editFirsLineName}>
                                {productSize.sizeName} - {productSize.count}
                            </div>
                            : <div >
                                {productSize.sizeName} - {productSize.count}
                            </div>
                        }
                        <div className={styles.buttons}>
                            <button type='button' onClick={() => setInputField(productSize)}>EDIT</button>
                            <button type='button' onClick={() => editSize(productSize, 'delete')}>Remove</button>
                        </div>
                    </div>
                )
            })
        )
    }, [currentProductSize, editSize])


    useEffect(() => {
        setCurrentProductSize(sizes)
    }, [sizes])

    const editField = () => {
        return (
            <div className={styles.linefield}>
                <div className={styles.editLinefield}>
                    <div className={styles.nameField}>Name of Size : {inputField.sizeName}</div>
                    <Input
                        type='number'
                        label='Count'
                        id='count'
                        value={inputField.count}
                        onChange={e => handleInputChange(e.target.value)}
                        step='1'
                    />
                    <button 
                        onClick={() => editSize(inputField, 'edit')}
                        className={styles['submit-btn']} >Submit</button>
                </div>
                <div className={styles['add-field']} >
                    <div className={styles.nameField} >Add sizes:</div>
                    <Input
                        type='text'
                        label='Add size name'
                        id='sizeName'
                        placeholder='XS, S, M, L, XL, XXL'
                        onChange={e => setAddSizeName(e.target.value)}
                    />
                    <Input
                        type='number'
                        label='Add amount'
                        id='amount'
                        placeholder='100, 200, 250 ...'
                        onChange={e => setAddSizeCount(e.target.value)}
                        step='1'
                    />
                    <button 
                        onClick={() => addSize('add')}
                        className={styles['submit-btn']} >Submit</button>
                </div>
            </div>
        )
    }

    const addSize = (action) => {
        const addNewSize = { sizeName: addSizeName, count: addSizeCount }
        const sendNewSize = { value: addNewSize, action: action }

        modifiedSizes.push(sendNewSize)
    }

    const handleInputChange = (value) => {
        const newInputField = { ...inputField }
        newInputField.count = value
        setInputField(newInputField)
    }



    const handleSubmit = async (event) => {
        event.preventDefault()

        const response = await fetch(`http://localhost:3001/api/admin/product/${productId}/sizes`, {
            method: 'PATCH',
            body: JSON.stringify({
                'operations': modifiedSizes
            }),
            headers: {
                'Content-Type': 'application/json',
                'Authorization': getCookie('x-auth-cookie')
            }
        })

        const updatedSizes = await response.json()

        if (updatedSizes.error) {
            //TODO: Display error to client
            return
        }

        setModifiedSizes([])
        setSizes(updatedSizes.sizes)
        productsContext.updateFilters()
    }

    return (
        <div className={styles.container}>
            <form className={styles.form} onSubmit={handleSubmit}>
                <div className={styles.title}>
                    <span className={styles.h3}>Available sizes</span>
                </div>
                <div className={styles.table}>
                    {renderedSizes}
                </div>
                <button type='submit'>SAVE</button>
            </form>
            {editField()}
        </div>
    )
}

export default AdminSizes