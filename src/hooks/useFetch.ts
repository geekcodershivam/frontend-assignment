import { useState, useEffect } from 'react'

export function useFetch(url: string) {
    const [data, setData] = useState<any[]>([])
    const [isLoading, setIsLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)

    const handleFetch = async () => {
        setIsLoading(true)
        setError(null)
        try {
            const response = await fetch(url)
            if (!response.ok) {
                throw new Error('Failed to fetch data')
            }
            const data = await response.json()
            setData(data)
        } catch (err) {
            setError('Please try again later.')
        } finally {
            setIsLoading(false)
        }
    }

    useEffect(() => {
        handleFetch()
    }, [])

    return { isLoading, data, error }
}