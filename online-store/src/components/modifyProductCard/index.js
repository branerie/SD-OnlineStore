import React, { useContext,  useState } from 'react'
import styles from './index.module.css'

import Input from '../input'
import AdminCategories from '../adminCategories'
import AdminSizes from '../adminSizes'
import ProductsContext from '../../ProductsContext'
import GenderInput from '../genderInput'

import { updateProduct } from '../../services/adminProduct'

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

        const newProductProps = {
            price,
            brand,
            description,
            gender,
            discount: { 
                percent: discountPercent,
                endDate: discountEndDate
            }
        }

        const updateResult = await updateProduct(productId, newProductProps)
        if (updateResult.error) {
            //TODO: handle errors
        }

        productsContext.updateFilters()
    }

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
                <GenderInput currentGender={gender} onChange={setGender} />
                <button type='submit'>SAVE</button>
            </form>
            <AdminSizes sizes={props.sizes} id={productId} />
            <AdminCategories categories={props.categories} id={productId} />
        </div>
    )
}

export default ModifyProductCard