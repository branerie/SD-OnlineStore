import React, { useContext } from 'react'
import ProductsContext from '../../ProductsContext'
import styles from './index.module.css'

const Pagination = (props) => {
    const productsContext = useContext(ProductsContext)

    const totalPages = Math.ceil(productsContext.totalCount / props.pageLength)

    if (totalPages < 2) {
        return null
    }

    const displayedPageNumbers = Array(totalPages).fill(1).map((x, y) => x + y)

    return (
        <div>
            {displayedPageNumbers.map(displayedPageNumber => {
                const actualPageNumber = displayedPageNumber - 1
                
                const isSamePage = actualPageNumber === productsContext.page

                if (isSamePage) {
                    return <button key={actualPageNumber}
                                   className={styles['current-page-link']}>
                                   {displayedPageNumber}
                            </button>
                }
                
                return <button key={actualPageNumber}
                               onClick={() => productsContext.handlePageChange(actualPageNumber)}
                               className={styles['page-link']} >
                            {displayedPageNumber}
                       </button>
            })}
        </div>
    )
}

export default Pagination