import React from 'react'
import PropTypes from 'prop-types'
import { CategoryType } from '../../../types'
import FormAttribute from '../../../containers/form-attribute'
import Select from 'react-select'

import './styles.scss'

export default class Categories extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      newCategory: {},
    }
  }

  componentWillMount() {
    const { getCategories } = this.props
    getCategories()
  }

  handleUpdateCategory(attribute, value) {
    this.setState({
      newCategory: {
        ...this.state.newCategory,
        [attribute]: value,
      },
    })
  }

  //TODO category creation
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
        }}>

        <div>
          <div className="row">
            <FormAttribute
              attribute="name"
              key="name"
              value={newCategory['name']}
              model="categories"
              type="string"
              onUpdate={(attribute, value) => this.handleUpdateCategory(attribute, value)}
            />

            <Select
              name="form-field-name"
              value={newCategory['tva']}
              onChange={e => {this.handleUpdateCategory('tva', e.value)}}
              options={[
                { label: 'Standard Rate', value: 'standard_rate' },
                { label: 'Reduced Rate', value: 'reduced_rate' },
                { label: 'Reduced Rate Alt', value: 'reduced_rate_alt' },
                { label: 'Super Reduced Rate', value: 'super_reduced_rate' },
                { label: 'Parking', value: 'parking_rate' },
              ]}
            />
          </div>
        </div>

        <button className="btn-link btn-stand-alone" type="submit">Envoyer</button>
      </form>
    )
  }

  renderCategoriesList() {
    const { categories } = this.props
    //Errored

    if(!categories.length)
      return <h3>Il n'y a aucune catégorie pour le moment !</h3>
    return (
      <div className='categories'>
        {
          categories.map((category) => {
            if(!category.children)
              return <h1>ERRORRRRRRRRRRRR !</h1>
            else return (!category.children.length)
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
    return [this.renderCategoriesList(), this.renderCategoriesForm()]
  }
}

Categories.propTypes = {
  categories: PropTypes.arrayOf(CategoryType),
  createApiCategory: PropTypes.func,
  getCategories: PropTypes.func,
}

Categories.defaultProps = {
  categories: [],
  createApiCategory: () => null,
  getCategories: () => null,
}
