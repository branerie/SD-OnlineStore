import React, { useState } from 'react'
import styles from './index.module.css'
import image from '../../images/1111.jpg'
import Input from '../input'
import getCookie from '../../utils/cookie'
import AdminCategories from '../adminCategories'
import AdminSizes from '../adminSizes'

const InputProductCard = (props) => {
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
    const id = props.id

    const handleSubmit = async (event) => {
        event.preventDefault()

        await fetch(`http://localhost:3001/api/admin/product/${id}`, {
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
    }

    return (
        <div className={styles.container}>
            <form className={styles.form} onSubmit={handleSubmit}>
                <img alt='product' className={styles.img} src={image} />
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
                    <label>
                        <input type="radio" value="M" name="gender" />
                    Male
                </label>
                    <label>
                        <input type="radio" value="F" name="gender" />
                    Female
                </label>
                    <label>
                        <input type="radio" value="unspecified" name="gender" checked />
                    Unspecified
                </label>
                </div>
                <button type='submit'>SAVE</button>
            </form>
            <AdminSizes sizes={props.sizes} id={id} />
            <AdminCategories categories={props.categories} id={id} />
        </div>
    )
}

export default InputProductCard