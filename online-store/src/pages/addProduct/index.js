import React, { useState } from 'react'
import { useHistory } from 'react-router-dom'
import getCookie from '../../utils/cookie'
import styles from './index.module.css'
import Input from '../../components/input'

const BRAND_MAX_LENGTH = 30
const DESCRIPTION_MAX_LENGTH = 1000

const AddProductCard = () => {
    const history = useHistory()
    const [brand, setBrand] = useState('')
    const [categories, setCategories] = useState([])
    const [sizeName, setSizeName] = useState(null)
    const [sizeCount, setSizeCount] = useState(null)
    const [price, setPrice] = useState(0)
    const [discountInPercent, setDiscountInPercent] = useState(null)
    const [discountEndDate, setDiscountEndDate] = useState(null)
    const [description , setDescrioption] = useState('')
    const [gender, setGender] = useState(null)
    const sizes = []
    const newCategories = []
     
    const handleSumit = async (event) => {
        event.preventDefault()

        const sizeValue = {'sizeName': sizeName , 'count': sizeCount}
        sizes.push(sizeValue)
        newCategories.push(categories)

        const newProduct = {
            'brand': brand,
            'categories': newCategories,
            'sizes': sizes,
            'price': price,
            'description': description,
            'gender': gender
        }

        if(discountInPercent !== null && discountEndDate !== null){
            newProduct.discount = {'percent': discountInPercent, 'endDate': discountEndDate}
        }        

        await fetch('http://localhost:3001/api/admin/product/',{
            method: 'POST',
            body: JSON.stringify(
                newProduct
            ),
            headers: {
                'Content-Type': 'application/json',
                'Authorization': getCookie('x-auth-cookie')
            }
        })

        history.push('/admin/products')
    }
    return (
        <form className={styles.container} onSubmit={handleSumit}>
            <main className={styles.main}>
                <div>
                    <h3>tuk shte vkarvame snimki</h3>
                </div>
                <div className={styles.inputFields}>
                    <Input
                        type='text'
                        label='Brand'
                        id='brand'
                        onChange={e => setBrand(e.target.value)}
                        maxLength={BRAND_MAX_LENGTH}
                    />
                    <Input
                        type='text'
                        label='Categories'
                        id='categories'
                        placeholder='Shoes, Bags, T-shirts ...'
                        onChange={e => setCategories(e.target.value)}                        
                    />
                    <Input
                        type='text'
                        label='Add size name'
                        id='sizeName'
                        placeholder='XS, S, M, L, XL, XXL'
                        onChange={e => setSizeName(e.target.value)}
                    />
                    <Input
                        type='number'
                        label='Add amount'
                        id='amount'
                        placeholder='100, 200, 250 ...'
                        onChange={e => setSizeCount(e.target.value)}
                        step= '1'
                    />
                    <Input
                        type='number'
                        label='Price'
                        id='price'
                        onChange={e => setPrice(Number(e.target.value).toFixed(2))}
                    />
                    <Input
                        type='number'
                        label='Discount in %'
                        id='discount'
                        placeholder='10, 15, 20, 50 ...'
                        onChange={e => setDiscountInPercent(Number(e.target.value))}
                    />
                    <Input
                        type='date'
                        label='End date of discount'
                        id='discountEndDate'
                        onChange={e => setDiscountEndDate(e.target.value)}
                    />
                    <label for="description">Product description :</label><br></br>
                    <textarea
                        id="description"
                        rows="4"
                        cols="20"
                        onChange={e => setDescrioption(e.target.value)}
                        maxLength={DESCRIPTION_MAX_LENGTH}>
                    </textarea>
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
                </div>
            </main>
            <button className={styles.button} type='submit'>SAVE</button> 
        </form>
    )
}

export default AddProductCard