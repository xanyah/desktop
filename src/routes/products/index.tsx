import './styles.scss'
import { useNavigate } from 'react-router-dom'
import { useCurrentStore, useProducts } from '../../hooks'
import DataTable from '../../components/data-table'
import PageContainer from '../../containers/page-container'

const Products = () => {
  const navigate = useNavigate()
  const currentStore = useCurrentStore()
  const { data: productsData, isLoading } = useProducts({ storeId: currentStore?.id })

  return (
    <PageContainer>
      <DataTable
        columns={['name', 'category', 'manufacturer']}
        creationFunction={() => navigate('/products/new')}
        data={productsData?.data}
        loading={isLoading}
        onItemView={item => navigate(`/products/${item.id}`)}
        type="products"
      />
    </PageContainer>
  )
}

export default Products
