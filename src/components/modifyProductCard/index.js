import React, { useContext,  useReducer } from 'react'
import styles from './index.module.css'

import Input from '../input'
import AdminCategories from '../adminCategories'
import AdminSizes from '../adminSizes'
import ProductsContext from '../../ProductsContext'
import GenderInput from '../inputFields/genderInput'

import { updateProduct } from '../../services/adminProduct'
import NumberInput from '../inputFields/numberInput'

const ModifyProductCard = (props) => {
    const productsContext = useContext(ProductsContext)
    
    const initialProduct = {
        brand: props.brand,
        price: props.price,
        discount: {
            percent: props.discount ? props.discount.percent : null,
            endDate: props.discount ? props.discount.endDate : null
        },
        description: props.description,
        gender: props.gender
    }
    
    const [state, stateDispatch] = useReducer(productReducer , initialProduct)

    function productReducer(state, action) {
        const { value, type} = action
        
        switch(type) {
            case 'brand':
                return { ...state, brand: value }
            case 'price':
                //TODO const formattedPrice = parseFloat(value).toFixed(2)
                return { ...state, price: value }
            case 'discountPercent':
                return { ...state, discount: { ...state.discount, percent: value } }
            case 'discountEndDate':
                return { ...state, discount: { ...state.discount, endDate: value } }
            case 'description':
                return { ...state, description: value }
            case 'gender':
                return { ...state, gender: value }
            default:
                return state
        }
    }

    const productId = props.id

    const handleSubmit = async (event) => {
        event.preventDefault()

        if((state.discount.percent && !state.discount.endDate) ||
           (!state.discount.percent && state.discount.endDate)) {
            //TODO: handle errors
        }

        const updateResult = await updateProduct(productId, state)
        if (updateResult.error) {
            //TODO: handle errors
        }

        productsContext.updateFilters()
        productsContext.updateProductsPage()
    }

    return (
        <div className={styles.container}>
            <form className={styles.form} onSubmit={handleSubmit}>
                <Input
                    type='text'
                    label='Brand'
                    id='brand'
                    value={state.brand}
                    onChange={e => stateDispatch({ type: 'brand', value: e.target.value })}
                    maxLength='30'
                />
                <NumberInput
                    value={state.price}
                    placeholder='Price'
                    min='0'
                    onChange={e => stateDispatch({ type: 'price' , value: e.target.value })}
                />
                <Input
                    type='number'
                    label='Discount in %'
                    id='discount'
                    value={state.discount.percent}
                    onChange={e => stateDispatch({ 
                                        type: 'discountPercent',
                                        value: Number(e.target.value) })}
                />
                <Input
                    type='date'
                    label='End date of discount'
                    id='discountEndDate'
                    value={state.discount.endDate}
                    onChange={e => stateDispatch({ 
                                        type: 'discountEndDate',
                                        value: e.target.value })}
                />
                <Input
                    type='text'
                    label='Product description'
                    id='description'
                    value={state.description}
                    onChange={e => stateDispatch({ 
                                        type: 'description',
                                        value: e.target.value })}
                />
                <GenderInput
                    currentGender={state.gender}
                    onChange={ e => stateDispatch({ 
                                        type: 'gender',
                                        value: e.target.value })}
                />
                <button type='submit'>SAVE</button>
            </form>
            <AdminSizes sizes={props.sizes} productId={productId} />
            <AdminCategories categories={props.categories} id={productId} />
        </div>
    )
}

export default ModifyProductCard