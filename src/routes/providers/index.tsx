import { useState } from 'react'
import './styles.scss'
import DataTable from '../../components/data-table'
import PageContainer from '../../containers/page-container'
import { useProviders, useSearchedProviders, useCurrentStore } from '../../hooks'
import { useNavigate } from 'react-router-dom'

const Providers = () => {
  const currentStore = useCurrentStore()
  const [searchedQuery, setSearchedQuery] = useState('')
  const { data: providersData, isLoading } = useProviders()
  const { data: searchedProvidersData, isLoading: isSearchLoading } = useSearchedProviders({
    query: searchedQuery,
    storeId: currentStore?.id,
  })
  const navigate = useNavigate()

    return (
      <PageContainer>
        <DataTable
          columns={['name', 'notes', 'shippingsCount']}
          data={searchedQuery ? searchedProvidersData?.data : providersData?.data}
          loading={isLoading || isSearchLoading}
          onItemView={item => navigate(`/providers/${item.id}`)}
          type="providers"
          searchEntity={setSearchedQuery}
        />
      </PageContainer>
    )
}

export default Providers
