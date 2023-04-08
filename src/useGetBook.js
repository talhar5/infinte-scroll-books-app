import axios from "axios"
import { useEffect, useState } from "react"

export default function useGetBook(query, pageNumber) {
    const [books, setBooks] = useState([])
    const [isLoading, setIsLoading] = useState(false)
    const [hasMore, setHasMore] = useState(true)
    const [hasError, setHasError] = useState(false)

    useEffect(() => {
        setBooks([])
    }, [query])

    useEffect(() => {
        if (query.length === 0) return
        setIsLoading(true)
        const controller = new AbortController();
        axios({
            method: "GET",
            url: "https://openlibrary.org/search.json",
            params: {
                q: query,
                page: pageNumber,
            },
            signal: controller.signal
        }).then(res => {
            if (res.data.numFound <= res.data.start + 100) {
                setHasMore(false)
            } else {
                setHasMore(true)
            }
            setIsLoading(false)
            setBooks(prev => [...new Set([...prev, ...res.data.docs.map(item => item.title)])])
        }).catch(err => {
            if (axios.isCancel(err)) return
            setHasError(true)
        })

        return () => {
            controller.abort();
        }
    }, [query, pageNumber])
    return { books, isLoading, hasMore, hasError }
}
