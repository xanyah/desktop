import { useState } from 'react'
import { useClients, useSearchedClients } from '../../hooks'
import { useNavigate } from 'react-router-dom'
import PageContainer from '../../containers/page-container'
import DataTable from '../../components/data-table'
import './styles.scss'
import { useCurrentStore } from '../../hooks/stores'

const Clients = () => {
  const currentStore = useCurrentStore()
  const [searchedQuery, setSearchedQuery] = useState('')
  const { data: clientsData, isLoading } = useClients()
  const { data: searchedClientsData, isLoading: isSearchLoading } = useSearchedClients({
    query: searchedQuery,
    storeId: currentStore?.id,
  })
  const navigate = useNavigate()

  return (
    <PageContainer>
      <DataTable
        columns={['firstname', 'lastname']}
        data={searchedQuery ? searchedClientsData?.data : clientsData?.data}
        loading={isLoading || isSearchLoading}
        onItemView={item => navigate(`/clients/${item.id}`)}
        type="clients"
        searchEntity={setSearchedQuery}
      />
    </PageContainer>
  )
}

export default Clients
