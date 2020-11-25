import React, { useContext, useState } from 'react'
import ProductsContext from '../../ProductsContext'
import styles from './index.module.css'

const SortCriteria = () => {
    const productsContext = useContext(ProductsContext)
    const [open, setOpen] = useState(false)
    const toggle = () => setOpen(!open)
   
    const setSortCriteria = (criteria , direction) => {

        productsContext.filtersDispatch({ type: 'sort', property: criteria, direction: direction })
    }




    return (
        <div className={styles.dropDownMenu}>
            <button className={styles.title} onClick={toggle}>Sort by:</button>
            {open ? 
                ( 
                    <div className={styles.list}>                    
                        <a className={styles.criteria} onClick={() => setSortCriteria('date', 'desc')}>Newest Arrivals</a>      
                        <a className={styles.criteria} onClick={() => setSortCriteria('price', 'asc')}>Price: Low to High</a>
                        <a className={styles.criteria} onClick={() => setSortCriteria('price', 'desc')}>Price: High to Low</a>
                        <a className={styles.criteria} onClick={() => setSortCriteria('discount', 'desc')}>Bigger Discount</a>
                    </div>
                )
                : null}
        </div>
    )
}

export default SortCriteria