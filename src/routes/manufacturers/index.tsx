import { useState } from 'react'
import { useManufacturers, useSearchedManufacturers } from '../../hooks'
import { useNavigate } from 'react-router-dom'
import PageContainer from '../../containers/page-container'
import DataTable from '../../components/data-table'
import './styles.scss'

const Manufacturers = () => {
  const [searchedQuery, setSearchedQuery] = useState('')
  const { data: manufacturersData, isLoading } = useManufacturers()
  const { data: searchedManufacturersData, isLoading: isSearchLoading } = useSearchedManufacturers(searchedQuery)
  const navigate = useNavigate()

  return (
    <PageContainer>
      <DataTable
        columns={['name', 'notes', 'productsCount']}
        data={!!searchedQuery ? searchedManufacturersData?.data : manufacturersData?.data}
        loading={isLoading || isSearchLoading}
        onItemView={item => navigate(`/manufacturers/${item.id}`)}
        type="manufacturers"
        searchEntity={setSearchedQuery}
      />
    </PageContainer>
  )
}

export default Manufacturers
