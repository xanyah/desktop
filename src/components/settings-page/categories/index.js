import React from 'react'
import PropTypes from 'prop-types'
import { Translate } from 'react-redux-i18n'
import { PulseLoader } from 'react-spinners'

import FormAttribute from '../../../containers/form-attribute'
import { CategoryType } from '../../../types'
import { secondaryTextColor } from '../../../constants'

import './styles.scss'

export default class Categories extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      newCategory: {},
    }
  }

  componentDidMount() {
    this.props.getCategories()
  }

  handleUpdateCategory(attribute, value) {
    this.setState({
      newCategory: {
        ...this.state.newCategory,
        [attribute]: value,
      },
    })
  }

  renderCategoriesForm() {
    const { createApiCategory } = this.props
    const { newCategory } = this.state
    return (
      <form
        className="category-form"
        key="form"
        onSubmit={e=> {
          e.preventDefault()
          createApiCategory(newCategory)
          this.setState({newCategory: {}})
        }}>

        <FormAttribute
          attribute="name"
          inline
          key="name"
          value={newCategory['name']}
          model="categories"
          type="string"
          onUpdate={(attribute, value) =>
            this.handleUpdateCategory(attribute, value)}
        />

        <FormAttribute
          attribute="tva"
          inline
          key="tva"
          value={newCategory['tva']}
          model="categories"
          type="vat-rates"
          onUpdate={(attribute, value) =>
            this.handleUpdateCategory(attribute, value)}
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
            this.handleUpdateCategory(attribute, value)}
        />

        <button className="btn-solid" type="submit">
          <Translate value="models.categories.create"/>
        </button>
      </form>
    )
  }

  renderCategoriesList() {
    const { categories, loading } = this.props

    if(loading)
      return (
        <div className='sweet-loading'>
          <PulseLoader
            color={secondaryTextColor}
            loading={loading}
          />
        </div>
      )

    if(!categories.length)
      return <h3>Il n'y a aucune catégorie pour le moment !</h3>
    return (
      <div className='categories'>
        {
          categories.map((category) => {
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

  render() {
    return (
      <div className="categories-content">
        {this.renderCategoriesForm()}
        {this.renderCategoriesList()}
      </div>
    )
  }
}

Categories.propTypes = {
  categories: PropTypes.arrayOf(CategoryType),
  createApiCategory: PropTypes.func,
  getCategories: PropTypes.func,
  loading: PropTypes.bool,
}

Categories.defaultProps = {
  categories: [],
  createApiCategory: () => null,
  getCategories: () => null,
  loading: false,
}
