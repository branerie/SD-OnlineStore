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

    const editCategories = async (event, action) => {
        event.preventDefault()

        const response = await fetch(`http://localhost:3001/api/admin/product/${id}/categories`, {
            method: 'PATCH',
            body: JSON.stringify({
                'operations': [{
                    'action': action,
                    'value': category
                }]
            }),
            headers: {
                'Content-Type': 'application/json',
                'Authorization': getCookie('x-auth-cookie')
            }
        })

        const updatedCategories = await response.json()
        if (updatedCategories.error) {
            //TODO: Display error to client
            return
        }

        setCategories(updatedCategories.categories.join(', '))
    }


    return (
        <form className={styles.container} onSubmit={e => editCategories(e, 'add')}>
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
            <button className={styles.button} onClick={(e) => editCategories(e, 'delete')}>Remove categories</button>
        </form>
    )
}

export default AdminCategories