import { useCallback, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useBreadCrumbContext } from '@/contexts/breadcrumb'
import { useCurrentStore, useProducts, useCategories } from '@/hooks'
import { CategorySelect, InputHtml, Button } from '@/components'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { updateProduct, getAiSuggestions } from '@/api'
import { filter, map } from 'lodash'
import { useForm, Controller } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import toast from 'react-hot-toast'

const productFormSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  parentCategoryId: z.string().optional(),
  subCategoryId: z.string().optional(),
  description: z.string().optional(),
})

type ProductFormData = z.infer<typeof productFormSchema>

interface ProductWithSuggestion extends Product {
  aiSuggestion?: {
    title?: string | null
    description?: string | null
  }
  loadingSuggestion?: boolean
}

interface ProductFormProps {
  product: Product
  onSave: (productId: string, data: ProductFormData) => void
  onGenerateSuggestion: (product: Product) => void
  onRejectSuggestion: (productId: string) => void
  productState?: ProductWithSuggestion
  isUpdating: boolean
}

const ProductForm = ({
  product,
  onSave,
  onGenerateSuggestion,
  onRejectSuggestion,
  productState,
  isUpdating,
}: ProductFormProps) => {
  const { t } = useTranslation()

  // Determine parent category
  const getParentCategory = (category?: Category) => {
    if (!category) return undefined
    if (category.category) return category.category
    return category
  }

  const parentCategory = getParentCategory(product.category)
  const initialParentCategoryId = parentCategory?.id || product.category?.id

  const { control, handleSubmit, watch, setValue } = useForm<ProductFormData>({
    resolver: zodResolver(productFormSchema),
    defaultValues: {
      name: product.name || '',
      parentCategoryId: initialParentCategoryId,
      subCategoryId: product.category?.category ? product.category.id : undefined,
      description: product.description || '',
    },
  })

  const watchedParentCategoryId = watch('parentCategoryId')

  // When AI suggestion is accepted, populate the form fields
  const handleAcceptAiSuggestion = () => {
    if (productState?.aiSuggestion?.description) {
      setValue('description', productState.aiSuggestion.description, { shouldDirty: true })
    }
    if (productState?.aiSuggestion?.title) {
      setValue('name', productState.aiSuggestion.title, { shouldDirty: true })
    }
    onRejectSuggestion(product.id) // Clear the suggestion state
  }

  const onSubmit = (data: ProductFormData) => {
    onSave(product.id, data)
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="border border-gray-200 rounded-lg p-4 bg-white shadow-sm">
      <div className="flex gap-4">
        {/* Product Image */}
        <div className="shrink-0">
          {product.images && product.images.length > 0 ? (
            <img
              src={product.images[0].thumbnail}
              alt={product.name}
              className="w-20 h-20 object-cover rounded"
            />
          ) : (
            <div className="w-20 h-20 bg-gray-200 rounded flex items-center justify-center">
              <span className="text-gray-400 text-xs">No image</span>
            </div>
          )}
        </div>

        {/* Product Info & Form */}
        <div className="grow space-y-3">
          <div className="flex items-center gap-2">
            <p className="text-xs text-gray-500 shrink-0">
              {`${product.manufacturerSku} - ${product.manufacturer?.name}`}
            </p>
          </div>

          {/* Product Name */}
          <Controller
            control={control}
            name="name"
            render={({ field: { onChange, value }, fieldState: { error } }) => (
              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">
                  {t('product.nameLabel')}
                </label>
                <input
                  type="text"
                  value={value}
                  onChange={onChange}
                  className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder={t('product.namePlaceholder')}
                />
                {error && <p className="text-xs text-red-600 mt-1">{error.message}</p>}
              </div>
            )}
          />

          {/* Category Selection */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <Controller
              control={control}
              name="parentCategoryId"
              render={({ field: { onChange, value } }) => (
                <CategorySelect
                  label={t('productsCategorizer.parentCategoryLabel')}
                  placeholder={t('productsCategorizer.subcategoryPlaceholder')}
                  value={value}
                  onChange={onChange}
                  noSubcategories
                />
              )}
            />
            {watchedParentCategoryId && (
              <Controller
                control={control}
                name="subCategoryId"
                render={({ field: { onChange, value } }) => (
                  <CategorySelect
                    key={watchedParentCategoryId}
                    label={t('productsCategorizer.subcategoryLabel')}
                    placeholder={t('productsCategorizer.subcategoryPlaceholder')}
                    value={value}
                    onChange={onChange}
                    categoryId={watchedParentCategoryId}
                  />
                )}
              />
            )}
          </div>

          {/* Description Editor */}
          <div>
            <Controller
              control={control}
              name="description"
              render={({ field: { onChange, value } }) => (
                <InputHtml
                  onChange={onChange}
                  value={value}
                  label={t('product.descriptionLabel')}
                />
              )}
            />
          </div>

          {/* AI Suggestion Section */}
          <div className="border-t pt-3">
            {productState?.aiSuggestion && (
              <div className="bg-purple-50 p-3 rounded mb-3 space-y-2">
                <div className="flex items-center justify-between">
                  <p className="text-xs font-semibold text-purple-900">
                    {t('productsCategorizer.aiSuggestion')}
                  </p>
                  <div className="flex gap-2">
                    <Button
                      type="button"
                      onClick={handleAcceptAiSuggestion}
                      size="sm"
                      variant="primary"
                    >
                      {t('productsCategorizer.acceptSuggestion')}
                    </Button>
                    <Button
                      type="button"
                      onClick={() => onRejectSuggestion(product.id)}
                      size="sm"
                      variant="outline"
                    >
                      {t('productsCategorizer.rejectSuggestion')}
                    </Button>
                  </div>
                </div>
                {productState.aiSuggestion.title && (
                  <div>
                    <p className="text-xs font-medium text-gray-700">{t('product.nameLabel')}:</p>
                    <p className="text-sm text-gray-900">{productState.aiSuggestion.title}</p>
                  </div>
                )}
                {productState.aiSuggestion.description && (
                  <div>
                    <p className="text-xs font-medium text-gray-700">{t('product.descriptionLabel')}:</p>
                    <p className="text-sm text-gray-900 line-clamp-3">{productState.aiSuggestion.description}</p>
                  </div>
                )}
              </div>
            )}

            <div className="flex justify-between items-center">
              <Button
                type="button"
                variant="outline"
                onClick={() => onGenerateSuggestion(product)}
                size="sm"
                disabled={productState?.loadingSuggestion}
              >
                {productState?.loadingSuggestion
                  ? t('productsCategorizer.loadingSuggestion')
                  : t('productsCategorizer.generateSuggestion')}
              </Button>

              <Button
                type="submit"
                disabled={isUpdating}
                size="sm"
              >
                {t('productsCategorizer.saveButton')}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </form>
  )
}

const ProductsCategorizer = () => {
  const { t } = useTranslation()
  useBreadCrumbContext([{ label: t('productsCategorizer.pageTitle') }])
  const currentStore = useCurrentStore()
  const queryClient = useQueryClient()

  // State for products with local changes
  const [productsState, setProductsState] = useState<Record<string, ProductWithSuggestion>>({})

  // Fetch all categories to determine which ones have no parent
  const { data: categoriesData } = useCategories({
    'q[storeIdEq]': currentStore?.id,
    'q[s]': 'name',
  })

  // Fetch products that need categorization
  const { data: productsData, isLoading } = useProducts({
    'q[archivedAtNull]': true,
    'q[quantityGt]': 0,
    'q[storeIdEq]': currentStore?.id,
    'q[s]': 'name',
  })

  // Filter products: no category OR category has no parent (is a top-level category)
  const uncategorizedProducts = filter(productsData?.data, product => {
    if (!product.category) return true
    // Check if the category has no parent
    return !product.category.category
  })

  // Update product mutation
  const updateProductMutation = useMutation({
    mutationFn: ({
      productId,
      name,
      categoryId,
      description
    }: {
      productId: string
      name?: string
      categoryId?: string
      description?: string
    }) => {
      const formData = new FormData()
      if (name) formData.append('product[name]', name)
      if (categoryId) formData.append('product[category_id]', categoryId)
      if (description !== undefined) formData.append('product[description]', description)
      return updateProduct(productId, formData)
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['products'] })
      toast.success(t('global.saved'))
    },
    onError: () => {
      toast.error(t('global.savingError'))
    },
  })

  // Handle save product
  const handleSaveProduct = useCallback(
    (productId: string, data: ProductFormData) => {
      const categoryId = data.subCategoryId || data.parentCategoryId
      updateProductMutation.mutate({
        productId,
        name: data.name,
        categoryId,
        description: data.description,
      })
    },
    [updateProductMutation],
  )

  // Handle generate AI suggestion
  const handleGenerateSuggestion = useCallback(
    async (product: Product) => {
      setProductsState(prev => ({
        ...prev,
        [product.id]: {
          ...(prev[product.id] || {}),
          loadingSuggestion: true,
        } as ProductWithSuggestion,
      }))

      try {
        const response = await getAiSuggestions(product.id, {
          title: product.name,
          description: product.description,
        })

        setProductsState(prev => ({
          ...prev,
          [product.id]: {
            ...(prev[product.id] || {}),
            aiSuggestion: response.data,
            loadingSuggestion: false,
          } as ProductWithSuggestion,
        }))
      } catch (error) {
        setProductsState(prev => ({
          ...prev,
          [product.id]: {
            ...(prev[product.id] || {}),
            loadingSuggestion: false,
          } as ProductWithSuggestion,
        }))
        toast.error(t('global.savingError'))
      }
    },
    [t],
  )

  // Handle reject AI suggestion
  const handleRejectSuggestion = useCallback((productId: string) => {
    setProductsState(prev => ({
      ...prev,
      [productId]: {
        ...(prev[productId] || {}),
        aiSuggestion: undefined,
      } as ProductWithSuggestion,
    }))
  }, [])

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="text-lg">{t('global.loading')}</div>
      </div>
    )
  }

  if (!uncategorizedProducts || uncategorizedProducts.length === 0) {
    return (
      <div className="p-6">
        <h1 className="text-xl font-bold mb-1">{t('productsCategorizer.pageTitle')}</h1>
        <p className="text-sm text-gray-600 mb-6">{t('productsCategorizer.pageSubtitle')}</p>
        <div className="text-center text-gray-500 py-12">
          {t('productsCategorizer.noArticles')}
        </div>
      </div>
    )
  }

  return (
    <div className="p-6">
      <h1 className="text-xl font-bold mb-1">{t('productsCategorizer.pageTitle')}</h1>
      <p className="text-sm text-gray-600 mb-6">{t('productsCategorizer.pageSubtitle')}</p>

      <div className="space-y-4">
        {map(uncategorizedProducts, product => (
          <ProductForm
            key={product.id}
            product={product}
            onSave={handleSaveProduct}
            onGenerateSuggestion={handleGenerateSuggestion}
            onRejectSuggestion={handleRejectSuggestion}
            productState={productsState[product.id]}
            isUpdating={updateProductMutation.isPending}
          />
        ))}
      </div>
    </div>
  )
}

export default ProductsCategorizer
