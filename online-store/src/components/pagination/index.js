import React, { useContext, useMemo } from 'react'
import ProductsContext from '../../ProductsContext'
import styles from './index.module.css'

import previousArrow from '../../images/previousArrow.png'
import nextArrow from '../../images/nextArrow.png'

const PAGE_LINK_LIMIT = 6

const Pagination = ({ pageLength, children }) => {
    const { totalCount, page, handlePageChange } = useContext(ProductsContext)

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
            <div className={styles.pagination}>
                    page <span className={styles.current}>{page + 1}</span>
            </div>
            <div>
                {children}
            </div>
            <div className={[styles['pagination-container'], styles.pagination].join(' ')}>
                <span
                    className={hasPrevious ? styles['page-nav'] : styles.hidden}
                    onClick={() => handlePageChange(page - 1)}>
                    previous
                <img src={previousArrow} className={styles.arrow} />
                </span>
                {pagesToDisplay && pagesToDisplay.map(pageNumber => {
                    const isNumber = !isNaN(pageNumber)
                    const displayedPageNumber = isNumber ? pageNumber + 1 : pageNumber

                    const isSamePage = pageNumber === page
                    if (isSamePage) {
                        return <span key={pageNumber}
                            className={[styles['page-link'], styles.current].join(' ')}>
                            {displayedPageNumber}
                        </span>
                    }

                    return (
                        <span key={pageNumber}
                            onClick={!isNaN(pageNumber) ? () => handlePageChange(pageNumber) : null}
                            className={styles['page-link']} >
                            {displayedPageNumber}
                        </span>
                    )
                })}
                <span
                    className={hasNext ? styles['page-nav'] : styles.hidden}
                    onClick={() => handlePageChange(page + 1)}>
                    <img src={nextArrow} className={styles.arrow} />
                next
            </span>
            </div>
        </div>
    )
}

export default Pagination