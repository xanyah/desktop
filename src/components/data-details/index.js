import React from 'react'
import PropTypes from 'prop-types'
import ItemAttribute from '../item-attribute'
import FormAttribute from '../form-attribute'

import './styles.scss'

export default class DataDetails extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      selectedEntity: props.currentEntity,
    }
  }

  handleUpdate(attribute, value) {
    this.setState({selectedEntity: {
      ...this.state.selectedEntity,
      [attribute]: value,
    }})
  }

  handleCancelUpdate(toggleEdit) {
    this.setState({selectedEntity: this.props.currentEntity})
    toggleEdit()
  }

  render() {
    const {
      children,
      currentEntity,
      editing,
      formattedData,
      toggleEdit,
      type,
      updateEntity,
    } = this.props
    return (
      <div className="data-details">
        <div className="info">
          <form
            onSubmit={e => {
              e.preventDefault()
              if(!editing)
                return
              toggleEdit()
              updateEntity(currentEntity.id, this.state.selectedEntity)
            }}>

            {formattedData.map((row, idx) => (
              <div className="row" key={idx}>
                { row.map(item => (
                  (item.editable && editing)
                    ? <FormAttribute
                      attribute={item.attribute}
                      key={item.attribute}
                      value={this.state.selectedEntity[item.attribute]}
                      model={type}
                      type={item.type}
                      onUpdate={(attribute, value) => this.handleUpdate(attribute, value)}
                    />
                    : <ItemAttribute
                      attribute={item.attribute}
                      key={item.attribute}
                      value={this.state.selectedEntity[item.attribute]}
                      type={type}
                    />
                ))}
              </div>
            ))}
            {(editing)
              ? (
                [
                  <button className="btn-link" type="submit">Validate</button>,
                  <button className="btn-link" onClick={() => this.handleCancelUpdate(toggleEdit)}>Cancel</button>,
                ]
              )
              : <button className="btn-link" onClick={() => toggleEdit()}>Edit</button>
            }
          </form>
          {children}
        </div>
      </div>
    )
  }
}

DataDetails.propTypes = {
  children: PropTypes.element,
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
  currentEntity: {},
  editing: false,
  formattedData: [],
  toggleEdit: () => null,
  type: '',
  updateEntity: () => null,
}
