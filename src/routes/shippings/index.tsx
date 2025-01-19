import { useShippings } from '../../hooks'
import { useNavigate } from 'react-router-dom'
import PageContainer from '../../containers/page-container'
import DataTable from '../../components/data-table'
import './styles.scss'
import { useCurrentStore } from '../../hooks/stores'

const Shippings = () => {
  const currentStore = useCurrentStore()
  const { data: shippingsData, isLoading } = useShippings({storeId: currentStore?.id})
  const navigate = useNavigate()

  return (
    <PageContainer>
      <DataTable
        creation={false}
        columns={['status', 'provider']}
        data={shippingsData?.data}
        loading={isLoading}
        onItemView={item => navigate(`/shippings/${item.id}`)}
        type="shippings"
      />
    </PageContainer>
  )
}

export default Shippings
