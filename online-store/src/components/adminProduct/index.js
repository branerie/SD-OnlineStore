import React ,{useEffect , useState , useCallback } from 'react'
import ProductCard from '../productCard'
import getProductFromDb  from '../../utils/product'
import style from './index.module.css'

const GetProductDb = () => {
    const [productDb , setProductDb] = useState({})

    const currnetProductDb = useCallback(async () => {
        const productInfo = await getProductFromDb()
        setProductDb(productInfo)
    }, [setProductDb])

    useEffect(() => {
        currnetProductDb()
    },[])

 function renderProduct() {
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