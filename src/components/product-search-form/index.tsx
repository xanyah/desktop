import { getProducts } from '@/api'
import { useCurrentStore } from '@/hooks'
import { head, size } from 'lodash'
import { FormEventHandler, useCallback } from 'react'
import { InputText } from '../input'
import { useTranslation } from 'react-i18next'
import Button from '../button'

type ProductSearchFormProps = {
  onProductSelect: (product: Product) => void
}

/** Product search form
 * Used to search and select a product by SKU, UPC, or Manufacturer SKU.
 * The component uses a form because scanners typically emulate keyboard input followed by an Enter key.
 */
const ProductSearchForm = ({ onProductSelect }: ProductSearchFormProps) => {
  const store = useCurrentStore()
  const { t } = useTranslation()

  const onSubmit = useCallback<FormEventHandler<HTMLFormElement>>(async (e) => {
    e.preventDefault()
    try {
      const formData = new FormData(e.currentTarget)
      const query = formData.get('query')
      const { data } = await getProducts({ 'q[storeIdEq]': store?.id, 'q[skuOrUpcOrManufacturerSkuEq]': query, 'q[archivedAtNull]': true })

      if (size(data) === 1) {
        onProductSelect(head(data) as Product);
        (e.target as HTMLFormElement).reset()
      }
    }
    catch (err) {
      console.error(err)
    }
  }, [onProductSelect, store])

  return (
    <form className="flex flex-1 flex-row gap-4" onSubmit={onSubmit}>
      <InputText name="query" placeholder={t('checkout.searchPlaceholder')} />
      <Button variant="outline" type="submit">{t('checkout.searchButton')}</Button>
    </form>
  )
}

export default ProductSearchForm
