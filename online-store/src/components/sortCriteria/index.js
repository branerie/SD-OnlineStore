import React, { useContext, useState, useRef, useEffect} from 'react'
import ProductsContext from '../../ProductsContext'
import useVisible from '../../hooks/setVisible'
import styles from './index.module.css'

const SortCriteria = () => {
    const productsContext = useContext(ProductsContext)
    const { ref, isVisible, setIsVisible } = useVisible(false)    
   
    const setSortCriteria = (criteria , direction) => {

        productsContext.filtersDispatch({ type: 'sort', property: criteria, direction: direction })
    }




    return (
        <div className={styles.dropDownMenu}>
            <button className={styles.title} onClick={e => setIsVisible(!isVisible)}>Sort by:</button>
            {isVisible ? 
                ( 
                    <div className={styles.list} ref={ref}>                    
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