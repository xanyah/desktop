export const orderCategories = (categories) => {
  if(!categories)
    return []

  return categories
    .map(category => ({
      ...category,
      children: categories.filter(cat => cat.categoryId === category.id),
    }))
    .filter(category => !category.categoryId)
}
