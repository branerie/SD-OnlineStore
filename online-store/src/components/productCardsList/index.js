import React, { useEffect , useState , useCallback } from 'react'
import styles from './index.module.css'
import AdminProductCard from '../adminProductCard'
import { getProductFromDb }  from '../../utils/product'

const ProductCardsList = () => {
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
                <AdminProductCard {...product} />
            )
        }) 
    }


    return (
        <div className={styles.container}>
            {renderProduct()}
        </div>
    )
}

export default ProductCardsList