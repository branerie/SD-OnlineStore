import React, { useContext, useMemo, useReducer, useState } from 'react'
import styles from './index.module.css'

import Input from '../input'
import getCookie from '../../utils/cookie'
import AdminCategories from '../adminCategories'
import AdminSizes from '../adminSizes'
import ProductsContext from '../../ProductsContext'

const ModifyProductCard = (props) => {
    const [brand, setBrand] = useState(props.brand)
    const [price, setPrice] = useState(props.price)
    const [discountPercent, setDiscountPercent] = useState(props.discount
        ? props.discount.percent
        : null)
    const [discountEndDate, setDiscountEndDate] = useState(props.discount
        ? props.discount.endDate
        : null)
    const [description, setDescription] = useState(props.description)
    const [gender, setGender] = useState(props.gender)

    const productsContext = useContext(ProductsContext)

    const productId = props.id

    const handleSubmit = async (event) => {
        event.preventDefault()

        await fetch(`http://localhost:3001/api/admin/product/${productId}`, {
            method: "PUT",
            body: JSON.stringify({
                'price': price,
                'discount': { 'percent': discountPercent, 'endDate': discountEndDate },
                'brand': brand,
                'description': description,
                'gender': gender
            }),
            headers: {
                'Content-Type': 'application/json',
                'Authorization': getCookie('x-auth-cookie')
            }
        })

        productsContext.updateFilters()
    }

    const renderGender = useMemo(() => {
        const genderInputs = [ 
            { value: 'M', label: 'Male', checked: false },
            { value: 'F', label: 'Female', checked: false },
            { value: 'Unspecified', label: 'Unspecified', checked: false } 
        ]
    
        genderInputs.forEach(g => {
            if (g.value === gender) {
                g.checked = true
            }
        })

        return genderInputs.map(gender => {
            return (
                <label>
                    <input type="radio"
                        value={gender.value}
                        name="gender"
                        checked={gender.checked} />
                    {gender.label}
                </label>
            )
        })
    })

    return (
        <div className={styles.container}>
            <form className={styles.form} onSubmit={handleSubmit}>
                <Input
                    type='text'
                    label='Brand'
                    id='brand'
                    value={brand}
                    onChange={e => setBrand(e.target.value)}
                    maxLength='30'
                />
                <Input
                    type='number'
                    label='Price'
                    id='price'
                    value={price}
                    onChange={e => setPrice(e.target.value)}
                    onBlur={() => {
                        const formattedPrice = parseFloat(price).toFixed(2)
                        setPrice(formattedPrice)
                    }}
                />
                <Input
                    type='number'
                    label='Discount in %'
                    id='discount'
                    value={discountPercent}
                    onChange={e => setDiscountPercent(Number(e.target.value))}
                />
                <Input
                    type='date'
                    label='End date of discount'
                    id='discountEndDate'
                    value={discountEndDate}
                    onChange={e => setDiscountEndDate(e.target.value)}
                />
                <Input
                    type='text'
                    label='Product description'
                    id='description'
                    value={description}
                    onChange={e => setDescription(e.target.value)}
                />
                <div onChange={(e) => setGender(e.target.value)}>
                    {renderGender}
                </div>
                <button type='submit'>SAVE</button>
            </form>
            <AdminSizes sizes={props.sizes} id={productId} />
            <AdminCategories categories={props.categories} id={productId} />
        </div>
    )
}

export default ModifyProductCard