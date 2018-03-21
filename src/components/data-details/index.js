import React from 'react'
import PropTypes from 'prop-types'
import ItemAttribute from '../item-attribute'
import FormAttribute from '../form-attribute'

import { Translate } from 'react-redux-i18n'

import { isEditableEntity } from '../../utils/entity-helper'

import './styles.scss'

export default class DataDetails extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      selectedEntity: props.currentEntity,
    }
  }

  handleUpdate(attribute, value) {
    this.setState({
      selectedEntity: {
        ...this.state.selectedEntity,
        [attribute]: value,
      },
    })
  }

  handleCancelUpdate(toggleEdit) {
    this.setState({selectedEntity: this.props.currentEntity})
    toggleEdit()
  }

  renderCreate() {
    const {
      children,
      createEntity,
      formattedData,
      toggleEdit,
      type,
    } = this.props
    const { selectedEntity } = this.state

    return (
      <div className="data-details">
        <div className="info">
          <form
            onSubmit={e => {
              e.preventDefault()
              toggleEdit()
              createEntity(selectedEntity)
            }}>

            {formattedData.map((row, idx) => (
              <div className="row" key={idx}>
                { row.map(item => (
                  (item.editable)
                    &&
                    <FormAttribute
                      attribute={item.attribute}
                      key={item.attribute}
                      value={selectedEntity[item.attribute]}
                      model={type}
                      type={item.type}
                      onUpdate={(attribute, value) => this.handleUpdate(attribute, value)}
                    />
                ))}
              </div>
            ))}
            {
              (
                <button
                  className="btn-link"
                  key="btn-submit"
                >
                  <Translate value={'data-details.form.buttons.create'}/>
                </button>
              )
            }
          </form>
          {children}
        </div>
      </div>
    )
  }

  renderUpdate() {
    const {
      children,
      editing,
      formattedData,
      toggleEdit,
      type,
      updateEntity,
    } = this.props
    const { selectedEntity } = this.state
    const editableEntity = isEditableEntity(formattedData)

    return (
      <div className="data-details">
        <div className="info">
          <form
            onSubmit={e => {
              e.preventDefault()
              toggleEdit()
              updateEntity(selectedEntity)
            }}>

            {formattedData.map((row, idx) => (
              <div className="row" key={idx}>
                { row.map(item => (
                  (item.editable && editing && editableEntity)
                    ? <FormAttribute
                      attribute={item.attribute}
                      key={item.attribute}
                      value={selectedEntity[item.attribute]}
                      model={type}
                      type={item.type}
                      onUpdate={(attribute, value) => this.handleUpdate(attribute, value)}
                    />
                    : <ItemAttribute
                      attribute={item.attribute}
                      key={item.attribute}
                      value={selectedEntity[item.attribute]}
                      type={type}
                    />
                ))}
              </div>
            ))}
            {
              (editableEntity) &&
              ((editing)
                ? (
                  [
                    <button
                      className="btn-link"
                      key="btn-submit"
                      type="submit"
                    >
                      <Translate value={'data-details.form.buttons.submit'}/>
                    </button>,
                    <button
                      className="btn-link"
                      key="btn-cancel"
                      onClick={() => this.handleCancelUpdate(toggleEdit)}
                    >
                      <Translate value={'data-details.form.buttons.cancel'}/>
                    </button>,
                  ]
                )
                : (
                  <button
                    className="btn-link"
                    onClick={() => toggleEdit()}
                  >
                    <Translate value={'data-details.form.buttons.edit'}/>
                  </button>
                ))
            }
          </form>
          {children}
        </div>
      </div>
    )
  }

  render() {
    return this.state.selectedEntity.id
      ? this.renderUpdate()
      : this.renderCreate()
  }
}

DataDetails.propTypes = {
  children: PropTypes.element,
  createEntity: PropTypes.func,
  currentEntity: PropTypes.object,
  editing: PropTypes.bool,
  formattedData: PropTypes.arrayOf(
    PropTypes.arrayOf(
      PropTypes.objectOf({
        attribute: PropTypes.string,
        editable: PropTypes.bool,
        type: PropTypes.string,
      })
    )
  ),
  toggleEdit: PropTypes.func,
  type: PropTypes.string,
  updateEntity: PropTypes.func,
}

DataDetails.defaultProps = {
  children: null,
  createEntity: () => null,
  currentEntity: {},
  editing: false,
  formattedData: [],
  toggleEdit: () => null,
  type: '',
  updateEntity: () => null,
}
