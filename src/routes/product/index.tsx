import {
  ProductForm,
} from '@/components'
import { useNavigate } from 'react-router-dom'

const Product = () => {
  const navigate = useNavigate()

  return <ProductForm onSuccess={({ data }) => navigate(`/products/${data.id}/edit`)} />
}

export default Product
