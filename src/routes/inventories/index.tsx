import './styles.scss'
import { useCurrentStore, useInventories } from '../../hooks'
import PageContainer from '../../containers/page-container'
import DataTable from '../../components/data-table'
import { useNavigate } from 'react-router-dom'

const Inventories = () => {
  const store = useCurrentStore()
  const { data: inventoriesData, isLoading } = useInventories({ storeId: store?.id })
  const navigate = useNavigate()

  return (
    <PageContainer>
      <DataTable
        creation={false}
        columns={['status', 'createdAt']}
        data={inventoriesData?.data}
        loading={isLoading}
        onItemView={item => navigate(`/inventories/${item.id}`)}
        type="inventories"
      />
    </PageContainer>
  )
}

export default Inventories
