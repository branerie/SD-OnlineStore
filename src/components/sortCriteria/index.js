import React, { useContext } from 'react'
import ProductsContext from '../../ProductsContext'
import useVisible from '../../hooks/setVisible'
import styles from './index.module.css'
import sortByArrow from '../../images/sortByArrow.svg'

const SortCriteria = () => {
    const productsContext = useContext(ProductsContext)
    const { ref, isVisible, setIsVisible } = useVisible(false)

    const setSortCriteria = (criteria, direction) => {

        productsContext.filtersDispatch({ type: 'sort', property: criteria, direction: direction })
        setIsVisible(!isVisible)
    }

    return (
        <div className={styles.dropDownMenu}>
            <button
                className={styles.title}
                onClick={e => setIsVisible(!isVisible)}
            >
                Sort by
                    <img src={sortByArrow} alt='Sort By' className={styles['sort-by-arrow']} />
            </button>
            {isVisible ?
                (
                    <div className={styles.list} ref={ref}>
                        <button className={styles.criteria}
                            onClick={() => setSortCriteria('date', 'desc')}>
                            Newest Arrivals
                        </button>
                        <button className={styles.criteria}
                            onClick={() => setSortCriteria('price', 'asc')}>
                            Price: Low to High
                        </button>
                        <button className={styles.criteria}
                            onClick={() => setSortCriteria('price', 'desc')}>
                            Price: High to Low
                        </button>
                        <button className={styles.criteria}
                            onClick={() => setSortCriteria('discount', 'desc')}>
                            Bigger Discount
                        </button>
                    </div>
                )
                : null}
        </div>
    )
}

export default SortCriteria