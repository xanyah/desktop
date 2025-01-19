import { useState } from 'react'

import './styles.scss'
import { useCurrentStore } from '../../hooks'
import { useOrders, useSearchedOrders } from '../../hooks/orders'
import { useNavigate } from 'react-router-dom'
import PageContainer from '../../containers/page-container'
import DataTable from '../../components/data-table'

const Orders = () => {
  const currentStore = useCurrentStore()
  const [searchedQuery, setSearchedQuery] = useState('')
  const { data: ordersData, isLoading } = useOrders({storeId: currentStore?.id})
  const { data: searchedOrdersData, isLoading: isSearchLoading } = useSearchedOrders({
    query: searchedQuery,
    storeId: currentStore?.id,
  })
  const navigate = useNavigate()

  return (
    <PageContainer>
      <DataTable
        creation={false}
        columns={['status', 'id']}
        data={searchedQuery ? searchedOrdersData?.data : ordersData?.data}
        loading={isLoading || isSearchLoading}
        onItemView={item => navigate(`/orders/${item.id}`)}
        type="orders"
        searchEntity={setSearchedQuery}
      />
    </PageContainer>
  )
}

export default Orders
