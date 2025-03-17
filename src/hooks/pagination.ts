import { useCallback, useState } from 'react'

export const usePaginatedSearch = () => {
  const [searchQuery, setSearchQuery] = useState('')
  const [page, setPage] = useState(1)

  const onSearchQueryChange = useCallback((query: string) => {
    setSearchQuery(query)
    setPage(1)
  }, [setPage, setSearchQuery])

  return {
    searchQuery,
    onSearchQueryChange,
    page,
    setPage,
  }
}
