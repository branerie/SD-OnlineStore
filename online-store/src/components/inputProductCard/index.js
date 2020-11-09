import React, { useState } from 'react'
import styles from './index.module.css'
import image from '../../images/1111.jpg'
import Input from '../input'

const InputProductCard = (props) => {
    const [brand, setBrand] = useState(props.brand)
    const [price, setPrice] = useState(props.price)
    const [size, setSize] = useState(props.sizes.sizeName)
    const [count, setCount] = useState(props.sizes.count)
    const [discountPercent, setDiscountPercent] = useState(props.discount.percent)
    const [discountEndDate, setDiscountEndDate] = useState(props.discount.endDate)
    const [description, setDescription] = useState(props.description)
    const [gender, setGender] = useState(props.gender)
    const [categories , setCategories] = useState(props.categories)

const handleSubmit = async (event) => {


}
    return (

        <form className={styles.container} onSubmit={handleSubmit}>
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
                type='text'
                label='Size'
                id='size'
                value={size}
                onChange={e => setSize(e.target.value)}                 
            />
              <Input
                type='number'
                label='Count'
                id='count'
                value={count}
                onChange={e => setCount(e.target.value)}                 
            />
            <Input
                type='number'
                label='Price'
                id='price'
                value={price}
                onChange={e => setPrice(e.target.value)}
            /><span>Negative price is not allowed.</span>
            <Input 
                type='number'
                label='Discount in %'
                id='discount'
                value={discountPercent}
                onChange={e => setDiscountPercent(e.target.value)}
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
            <div onChange={setGender}>
                <label>
                <input type="radio" value="M" name="gender"/> Male
                </label>
                <label>
                <input type="radio" value="F" name="gender"/> Female
                </label>
                <label>
                <input type="radio" value="unspecified" name="gender" checked/> Unspecified
                </label>
            </div>
            <Input 
                type='text'
                label='Product Categories'
                id='categories'
                value={categories}
                onChange={e => setCategories(e.target.value)}
            />
            <button type='submit'>SAVE</button>

        </form>
    )
}

export default InputProductCard