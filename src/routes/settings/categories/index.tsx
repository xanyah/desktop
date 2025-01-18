import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { Translate } from 'react-redux-i18n'
import { PulseLoader } from 'react-spinners'

import FormAttribute from '../../../containers/form-attribute'
import { CategoryType } from '../../../types'
import { secondaryTextColor } from '../../../constants'

import './styles.scss'
import { useCategories, useCurrentStore } from '../../../hooks'
import { useMutation } from '@tanstack/react-query'
import { createCategory } from '../../../api'

const Categories = () => {
  const store = useCurrentStore()
  const {data: categoriesData, isLoading} = useCategories({storeId: store.id})
  const [newCategory, setNewCategory] = useState({})

  const {mutate} = useMutation({
    mutationFn: () => createCategory({...newCategory, storeId: store.id}),
    onSuccess: () => setNewCategory({})
  })

  const handleUpdateCategory = (attribute, value) => {
    setNewCategory(oldVersion => ({
        ...oldVersion,
        [attribute]: value,
      }))
  }

  const renderCategoriesForm = () => {
    return (
      <form
        className="category-form"
        key="form"
        onSubmit={e=> {
          e.preventDefault()
          mutate()
        }}>

        <FormAttribute
          attribute="name"
          inline
          key="name"
          value={newCategory['name']}
          model="categories"
          type="string"
          onUpdate={(attribute, value) =>
            handleUpdateCategory(attribute, value)}
        />

        <FormAttribute
          attribute="tva"
          inline
          key="tva"
          value={newCategory['tva']}
          model="categories"
          type="vat-rates"
          onUpdate={(attribute, value) =>
            handleUpdateCategory(attribute, value)}
        />

        <FormAttribute
          attribute="category_id"
          inline
          key="category_id"
          value={
            (newCategory['category_id'])
              ? newCategory['category_id']
              : null
          }
          model="categories"
          type="parent-category"
          onUpdate={(attribute, value) =>
            handleUpdateCategory(attribute, value)}
        />

        <button className="btn-solid" type="submit">
          <Translate value="models.categories.create"/>
        </button>
      </form>
    )
  }

  const renderCategoriesList = () => {

    if(isLoading)
      return (
        <div className='sweet-loading'>
          <PulseLoader
            color={secondaryTextColor}
            loading={isLoading}
          />
        </div>
      )

    if(!categoriesData?.data.length)
      return <h3><Translate value="models.categories.noData"/></h3>
    return (
      <div className='categories'>
        {
          categoriesData?.data.map((category) => {
            if(!category.children)
              return (
                <h1 key={category.id}>Error To Correct !</h1>
              )
            else
              return (!category.children.length)
                ? (
                  <div className='parent-category' key={category.id}>
                    {category.name}
                  </div>
                )
                : (
                  <div className='parent-category' key={category.id}>
                    {category.name}
                    <div className='children-categories-container'>
                      {category.children.map((child) => (
                        <div className='children-category' key={child.id}>
                          {child.name}
                        </div>
                      ))}
                    </div>
                  </div>
                )
          })
        }
      </div>
    )
  }

    return (
      <div className="categories-content">
        {renderCategoriesForm()}
        {renderCategoriesList()}
      </div>
    )
}

export default Categories
