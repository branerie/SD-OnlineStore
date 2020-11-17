import React from 'react'
import styles from './index.module.css'

const Pagination = (props) => {
    const totalPages = Math.ceil(props.totalCount / props.pageLength)

    if (totalPages < 2) {
        return null
    }

    const displayedPageNumbers = Array(totalPages).fill(1).map((x, y) => x + y)

    return (
        <div>
            {displayedPageNumbers.map(displayedPageNumber => {
                const actualPageNumber = displayedPageNumber - 1
                const isSamePage = actualPageNumber === props.page

                if (isSamePage) {
                    return <button key={actualPageNumber}
                                   className={styles['current-page-link']}>
                                   {displayedPageNumber}
                            </button>
                }
                
                return <button key={actualPageNumber}
                               onClick={() => props.onChange(actualPageNumber)}
                               className={styles['page-link']} >
                            {displayedPageNumber}
                       </button>
            })}
        </div>
    )
}

export default Pagination