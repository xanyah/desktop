export const orderCategories = (categories) => {
  if(!categories)
    return []

  const parentCategories = []

  categories
    .filter(category => category.categoryId === null)
    .map((category, index) => { parentCategories[index] = category })

  categories
    .filter(category => category.categoryId !== null)
    .map((child) => {
      let parent = categories.find(e => e.id === child.categoryId)
      if(!parent.children) {
        parent.children = []
      }
      parent.children[parent.children.length] = child
    })

  return parentCategories
}
