import React, { useState } from 'react'
import styles from './index.module.css'
import getCookie from '../../utils/cookie'
import Input from '../input'

const AdminSizes = (props) => {
    const [sizes, setSizes] = useState(props.sizes)
    const [currentProductSize, setCurrentProductSize] = useState(sizes)
    const [count, setCount] = useState(0)
    const modifiedSizes = []
    const productId = props.id

    

    function renderSizes(){
        return (
            currentProductSize.map(productSize => {
                return <div>
                 <div>{productSize.sizeName} - {productSize.count}</div>
                <button onClick={e => editField(e, this.productSize )}>< i class="far fa-edit" /></button>
                {/* <button onClick={}>< i class="fas fa-eraser" /></button> */}
                </div>
            })
        )
    }

    const editField = (event , productSize) => {
        event.preventDefault()
        return (
                    <div className={styles.inputField}>
                        <p>{productSize.sizeName}</p>
                        <Input
                            type='number'
                            label='Count'
                            id='count'
                            value={productSize.count}
                            onChange={e => setCount(e.target.value)}
                            onBlur={() =>{
                                const formattedCount = parseFloat(count).toFixed(0)
                                setCount(formattedCount)
                            }}
                        />
                        <button onClick={editSize(productSize , 'edit')} >Submit</button>
                    </div>
        )
    }

    const editSize = (productSize, action) => {

        //have to change currentProductSize
        //have to put current editProduct in modifiedSize
        //...

    }


    const handleSumnit = async (event, action) => {
        event.preventDefault()

        const response = await fetch(`http://localhost:3001/api/admin/product/${productId}/categories`, {
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
        setSizes(updatedSizes.sizes)
    }

    return (
        
            <form className={styles.container} onSubmit={handleSumnit}>
                <div className={styles.field}>
                    <div className={styles.table}>                    
                        <h3>Available sizes</h3>
                            {renderSizes}                              
                    </div>
                    {editField}                
                </div>                
                <button type='submit'>SAVE</button>
            </form>
    )
}

export default AdminSizes