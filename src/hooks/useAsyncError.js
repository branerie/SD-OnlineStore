import { useCallback, useState } from 'react'
import { InternalError } from '../utils/info';

const useAsyncError = () => {
    const [_, setError] = useState();
    return useCallback(
        error => {
            setError(() => {
                throw error ? error : new InternalError(500)
            })
        }, [setError])
}

export default useAsyncError