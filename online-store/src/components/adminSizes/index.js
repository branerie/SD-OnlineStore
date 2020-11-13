import React, { useCallback, useEffect, useState } from 'react'
import styles from './index.module.css'
import getCookie from '../../utils/cookie'
import Input from '../input'

const DEFAULT_INPUT_FIELD = {'sizeName': '---' , 'count': 0}

const AdminSizes = (props) => {    
    const [sizes, setSizes] = useState(props.sizes)
    const [currentProductSize, setCurrentProductSize] = useState(sizes)
    const [inputField , setInputField] = useState(DEFAULT_INPUT_FIELD)
    const [modifiedSizes, setModifiedSizes] = useState([])
    const productId = props.id

    const editSize = useCallback((modifiedSize ,action) => {
        const editedSizeObjectValue = {'sizeName' : modifiedSize.sizeName , 'count': modifiedSize.count}
        const sendedObjectToDB = {'value': editedSizeObjectValue, 'action': action}

        const newModifiedSizes = [...modifiedSizes]
        newModifiedSizes.push(sendedObjectToDB)
        setModifiedSizes(newModifiedSizes)

        setInputField(DEFAULT_INPUT_FIELD)
        modifiedSize.action = action       

        const changedIndex = currentProductSize.findIndex(size => size.sizeName === modifiedSize.sizeName )
        const newProductSize = [...currentProductSize]
        newProductSize[changedIndex] = modifiedSize
        setCurrentProductSize(newProductSize)

        console.log(modifiedSizes);

    },[currentProductSize,modifiedSizes])
   
  const renderSizes = useCallback(  function(){
        return (
            currentProductSize.map(productSize => {
                return <div>
                 <div>{productSize.sizeName} - {productSize.count}</div>
                 <div>
                <button type='button' onClick={() => setInputField(productSize)}>EDIT</button>
                </div>
                <button type='button' onClick={() => editSize(productSize, 'delete')}>Remove</button>
                </div>
            })
        )
    },[currentProductSize,editSize])

    useEffect(() => {
        renderSizes()
     },[renderSizes])
 

    
useEffect(() =>{
    setCurrentProductSize(sizes)
},[sizes])

    const editField = () => {
    
        return (
                    <div className={styles.inputField}>
                        <div>{inputField.sizeName}</div>
                        <Input
                            type='number'
                            label='Count'
                            id='count'
                            value={inputField.count}
                            onChange={e => handleInputChange(e.target.value)}
                            step= '1'
                        />
                        <button onClick={()=>editSize(inputField ,'edit')} >Submit</button>
                    </div>
        )
    }

    const handleInputChange = (value) => {
        const newInputField = {...inputField}
        newInputField.count = value
        setInputField(newInputField)
    }



    const handleSumnit = async (event, action) => {
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

        setModifiedSizes([])

        const updatedSizes = await response.json()

        if (updatedSizes.error) {
            //TODO: Display error to client
            return
        }

        setSizes(updatedSizes.sizes)
    }

    return (
        
            <form className={styles.container} onSubmit={handleSumnit}>
                <div className={styles.field}>
                    <div className={styles.table}>                    
                        <h3>Available sizes</h3>
                            {renderSizes()}                              
                    </div>
                    <div>
                        {editField()}                
                    </div>
                </div>                
                <button type='submit'>SAVE</button>
            </form>
    )
}

export default AdminSizes