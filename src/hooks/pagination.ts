import {
  StringParam,
  NumberParam,
  useQueryParam,
} from 'use-query-params'

export const usePaginatedSearch = () => {
  const [page, setPage] = useQueryParam('page', NumberParam)
  const [searchQuery, onSearchQueryChange] = useQueryParam('q', StringParam)

  return {
    searchQuery: searchQuery || '',
    onSearchQueryChange: (q: string) => {
      onSearchQueryChange(q)
      setPage(1)
    },
    page: page || undefined,
    setPage,
  }
}
