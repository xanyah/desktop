import { useEffect, useState } from 'react'
import ItemAttribute from '../item-attribute'
import FormAttribute from '../../containers/form-attribute'

import { Translate } from 'react-redux-i18n'

import { isEditableEntity } from '../../utils/entity-helper'

import './styles.scss'

// TODO: ItemAttribute type entity => add link to the entity !!!
const DataDetails = ({
  children,
  createEntity,
  currentEntity,
  editing,
  formattedData,
  formChildren = null,
  toggleEdit,
  type,
  updateEntity,
}) => {
  const [selectedEntity, setSelectedEntity] = useState(currentEntity)

  useEffect(() => {
    setSelectedEntity(currentEntity)
  }, [currentEntity])

  const handleUpdate = (attribute, value) => {
    setSelectedEntity({
      ...selectedEntity,
      [attribute]: value,
    })
  }

  const handleCancelUpdate = (toggleEdit) => {
    setSelectedEntity(currentEntity)
    toggleEdit()
  }

  const renderCreate = () => {
    return (
      <div className={`data-details data-details-${type}`}>
        <div className="info">
          <form
            onSubmit={e => {
              e.preventDefault()
              toggleEdit()
              createEntity(selectedEntity)
            }}>

            {formattedData
              .filter(row => row.filter(item => item.editable).length > 0)
              .map((row, idx) => (
                <div className="row" key={idx}>
                  {row.map(item => (
                    (item.editable)
                    &&
                    <FormAttribute
                      attribute={item.attribute}
                      key={item.attribute}
                      value={selectedEntity ? selectedEntity[item.attribute] : undefined}
                      model={type}
                      type={item.type}
                      onUpdate={(attribute, value) =>
                        handleUpdate(attribute, value)}
                    />
                  ))}
                </div>))}

            {formChildren}

            <div className="action-buttons">
              {(<button
                className="btn-primary"
                key="btn-submit"
              >
                <Translate value={'data-details.form.buttons.create'} />
              </button>)}
            </div>
          </form>
        </div>
        <div className="children">
          {children}
        </div>
      </div>
    )
  }

  const renderUpdate = () => {
    const editableEntity = isEditableEntity(formattedData)

    return (
      <div className={`data-details data-details-${type}`}>
        <div className="info">
          <form
            onSubmit={e => {
              e.preventDefault()
              toggleEdit()
              updateEntity(selectedEntity)
            }}>

            {formattedData
              .map((row, idx) => (
                <div className="row" key={idx}>
                  {row.map(item => (
                    (item.editable && editing && editableEntity)
                      ? <FormAttribute
                        attribute={item.attribute}
                        key={item.attribute}
                        value={selectedEntity ? selectedEntity[item.attribute] : undefined}
                        model={type}
                        type={item.type}
                        onUpdate={(attribute, value) =>
                          handleUpdate(attribute, value)}
                      />
                      : <ItemAttribute
                        attribute={item.attribute}
                        key={item.attribute}
                        value={selectedEntity ? selectedEntity[item.attribute] : undefined}
                        model={type}
                        type={item.type}
                      />
                  ))}
                </div>
              ))}
            <div className="action-buttons">
              {(editableEntity) &&
                ((editing)
                  ? (
                    <div className="btn-group">
                      <button
                        className="btn-cancel"
                        key="btn-cancel"
                        onClick={() => handleCancelUpdate(toggleEdit)}
                      >
                        <Translate value={'data-details.form.buttons.cancel'} />
                      </button>
                      <button
                        className="btn-primary"
                        key="btn-submit"
                        type="submit"
                      >
                        <Translate value={'data-details.form.buttons.submit'} />
                      </button>
                    </div>
                  )
                  : (
                    <button
                      className="btn-primary"
                      onClick={() => toggleEdit()}
                    >
                      <Translate value={'data-details.form.buttons.edit'} />
                    </button>
                  ))
              }
            </div>
          </form>
        </div>
        <div className="children">
          {children}
        </div>
      </div>
    )
  }

  return selectedEntity?.id
    ? renderUpdate()
    : renderCreate()
}

export default DataDetails
