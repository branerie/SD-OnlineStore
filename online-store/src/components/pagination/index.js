import React, { useContext, useMemo } from 'react'
import ProductsContext from '../../ProductsContext'
import styles from './index.module.css'

import PaginationElement from '../paginationElement'

import previousArrow from '../../images/previousArrow.png'
import nextArrow from '../../images/nextArrow.png'

const PAGE_LINK_LIMIT = 6

const Pagination = ({ pageLength, children }) => {
    const { totalCount, filters: { page }, filtersDispatch } = useContext(ProductsContext)

    const totalPages = Math.ceil(totalCount / pageLength)

    const hasPrevious = page > 0
    const hasNext = page < totalPages - 1

    const pagesToDisplay = useMemo(() => {
        if (totalPages < 2) {
            return []
        }

        if (totalPages < PAGE_LINK_LIMIT) {
            return Array(totalPages).fill().map((_, i) => i)
        }

        const pagesToDisplay = [0]

        let pagesStart = Math.max(1, Math.min(page - 1, totalPages - 3))
        if (pagesStart > 2) {
            pagesToDisplay.push('...')
        } else if (pagesStart > 1) {
            pagesToDisplay.push(1)
        }

        let pagesEnd = Math.min(totalPages, Math.max(page + 2, 3))

        for (let pageIndex = pagesStart; pageIndex < pagesEnd; pageIndex++) {
            pagesToDisplay.push(pageIndex)
        }

        if (pagesEnd < totalPages - 2) {
            pagesToDisplay.push('...')
        } else if (pagesEnd < totalPages - 1) {
            pagesToDisplay.push(totalPages - 2)
        }

        if (pagesToDisplay[pagesToDisplay.length - 1] !== totalPages - 1) {
            pagesToDisplay.push(totalPages - 1)
        }

        return pagesToDisplay
    }, [page, totalPages])

    return (
        <div>
            <div className={styles.pagination} data-testid='pagination-pageNumber'>
                    page <span className={styles.current}>{page + 1}</span>
            </div>
                {children}            
            <div className={[styles['pagination-container'], styles.pagination].join(' ')}>
                <span
                    className={hasPrevious ? styles['page-nav'] : styles.hidden}
                    onClick={() => filtersDispatch({ type: 'page', newPage: page - 1 })}
                    data-testid='pagination-previous'
                >
                    previous
                    <img src={previousArrow} className={styles.arrow} />
                </span>
                {pagesToDisplay && pagesToDisplay.map(pageNumber => {
                    return <PaginationElement key={pageNumber} pageNumber={pageNumber} />
                })}
                <span
                    className={hasNext ? styles['page-nav'] : styles.hidden}
                    onClick={() => filtersDispatch({ type: 'page', newPage: page + 1 })}
                    data-testid='pagination-next'
                >
                    <img src={nextArrow} className={styles.arrow} />
                    next
                </span>
            </div>
        </div>
    )
}

export default Pagination