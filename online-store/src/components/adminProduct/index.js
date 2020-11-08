import React, { useEffect , useState , useCallback } from 'react'
import ProductCard from '../productCard'
import { getProductFromDb }  from '../../utils/product'
import style from './index.module.css'

const GetProductDb = () => {
    const [productDb , setProductDb] = useState(null)

    const currentProductDb = useCallback(async () => {
        const productInfo = await getProductFromDb()

        setProductDb(productInfo)
    }, [setProductDb])

    useEffect(() => {
        currentProductDb()
    },[currentProductDb])

 function renderProduct() {
        if (!productDb) {
            return <div>Loading...</div>
        }

        productDb.map(product => {
            return (
                <ProductCard key={product.id} {...product} />
            )
        }) 
    }


    return (
        <div className={style['product-wrapper']}>
            {renderProduct()}
        </div>
    )
}

export default GetProductDb