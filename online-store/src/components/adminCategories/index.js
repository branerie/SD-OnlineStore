import React, { useState } from 'react'
import styles from './index.module.css'
import Input from '../input'
import getCookie from '../../utils/cookie'

const AdminCategories = (props) => {
    const [categories, setCategories] = useState(getCategories())
    const [category, setCategory] = useState('')
    const id = props.id
    
    function getCategories() {
       return props.categories.map(eachCategory => `${eachCategory}`).join(', ')
   }

   const addCategories = (event) => {
        event.preventDefault()

    fetch(`http://localhost:3001/api/admin/product/${id}/categories`, {
        method: "PATCH",
        body: JSON.stringify({
            'operations': [{
                'action': 'add',
                'value': category
            }]
        }),
        headers: {
            'Content-Type': 'application/json',
            'Authorization': getCookie('x-auth-cookie')
        }
    })
    }

    const removeCategories = async (event) => {
        event.preventDefault()

    await fetch(`http://localhost:3001/api/admin/product/${id}/categories`, {
        method: 'PATCH',
        body: JSON.stringify({
            'operations':{
                'action': 'delete',
                'value': category
            }
        }),
        headers: {
            'Content-Type': 'application/json',
            'Authorization': getCookie('x-auth-cookie')
        }
    })
    }


    return (
       <form className={styles.container} onSubmit={addCategories}>
           <div>Product is set in categories: <span>{categories}</span></div>
           <Input 
                type='text'
                label='Edit categories field'
                id='categories'
                placeholder='Shoes, Bags, T-shirts, Bathing suits, Dresses'
                onChange={e => setCategory(e.target.value)}
                maxLength='20'
                size='35'
            />
           <button className={styles.button} type='submit'>Add categories</button>
           <button className={styles.button} onClick={removeCategories}>Remove categories</button>
       </form>
    )
}

export default AdminCategories