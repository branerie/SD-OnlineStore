import React, { useContext } from 'react'
import ProductsContext from '../../ProductsContext'
import styles from './index.module.css'

const PaginationElement = ({ pageNumber }) => {
    const { filtersDispatch, filters: { page } } = useContext(ProductsContext)

    const isNumber = !isNaN(pageNumber)
    const displayedPageNumber = isNumber ? pageNumber + 1 : pageNumber

    const isSamePage = pageNumber === page
    if (isSamePage) {
        return (
            <span key={pageNumber}
                data-testid={`paginationElement-${pageNumber}`}
                className={[styles['page-link'], styles.current].join(' ')}>
                {displayedPageNumber}
            </span>
        )
    }

    return (
        <span key={pageNumber}
            data-testid={`paginationElement-${pageNumber}`}
            onClick={isNaN(pageNumber)
                        ? null
                        : () => filtersDispatch({ type: 'page', newPage: pageNumber })
            }
            className={styles['page-link']} >
            {displayedPageNumber}
        </span>
    )
}

export default PaginationElement