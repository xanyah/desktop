import './styles.scss'
import { useCurrentStore, useSales } from '../../hooks'
import { useNavigate } from 'react-router-dom'
import PageContainer from '../../containers/page-container'
import DataTable from '../../components/data-table'

const Sales = () => {
  const navigate = useNavigate()
  const currentStore = useCurrentStore()
  const { data: salesData, isLoading } = useSales({ storeId: currentStore?.id })

  return (
    <PageContainer>
      <DataTable
        columns={['createdAt']}
        creationFunction={false}
        data={salesData?.data}
        loading={isLoading}
        onItemView={item => navigate(`/sales/${item.id}`)}
        type="Sales"
      />
    </PageContainer>
  )
}

export default Sales
