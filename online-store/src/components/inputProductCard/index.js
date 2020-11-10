import React, { useState } from 'react'
import styles from './index.module.css'
import image from '../../images/1111.jpg'
import Input from '../input'
import getCookie from '../../utils/cookie'

const InputProductCard = (props) => {
    const [brand, setBrand] = useState(props.brand)
    const [price, setPrice] = useState(props.price)
    const [sizes, setSize] = useState(getSizeAmounts())
    const [count, setCount] = useState(props.sizes.map((e) =>e.count + ' , '))
    const [discountPercent, setDiscountPercent] = useState(props.discount.percent)
    const [discountEndDate, setDiscountEndDate] = useState(props.discount.endDate)
    const [description, setDescription] = useState(props.description)
    const [gender, setGender] = useState(props.gender)
    const [categories , setCategories] = useState(props.categories.map((e) => e + ' , '))
    const id = props.id
   

    function getSizeAmounts(){
       return props.sizes.map(ps => `${ps.sizeName} - ${ps.count}`).join(' ,')
        }

const handleSubmit = async (event) => {
    event.preventDefault()

    await fetch(`http://localhost:3001/api/product/${id}`, {
    method: "PUT",
    body: JSON.stringify({ 
        'price': price,
        'discount':{'percent': discountPercent, 'endDate': discountEndDate},
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
console.log(count);
console.log(categories);
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
                type='number'
                label='Price'
                id='price'
                value={price}
                onChange={e => setPrice(e.target.value)}
            />
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
            <div onChange={(e) => setGender(e.target.value) }>
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
            <p>Amount : {sizes}</p>
            <p>Categories: {categories}</p>     
            <button type='submit'>SAVE</button>

        </form>
    )
}



export default InputProductCard