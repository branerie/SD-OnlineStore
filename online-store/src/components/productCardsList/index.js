import React, { useEffect , useState , useCallback } from 'react'
import styles from './index.module.css'

import ProductCard from '../productCard'
import { getProductFromDb }  from '../../utils/product'

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

        return productDb.map(product => {
            return (
                <ProductCard key={product.id} {...product} />
            )
        }) 
    }


    return (
        <div className={styles.container}>
            {renderProduct()}
        </div>
    )
}

export default GetProductDb