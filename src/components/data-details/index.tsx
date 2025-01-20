import React, { useEffect } from 'react'
import { useForm, Controller } from 'react-hook-form'
import ItemAttribute from '../item-attribute'
import { FormAttribute } from '../../components'
import { Translate } from 'react-redux-i18n'
import { isEditableEntity } from '../../utils/entity-helper'
import './styles.scss'

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
  const {
    control,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm({
    defaultValues: currentEntity || {},
  })

  useEffect(() => {
    reset(currentEntity || {})
  }, [currentEntity, reset])

  const onSubmit = (data) => {
    if (currentEntity?.id) {
      updateEntity(data)
    } else {
      createEntity(data)
    }
    toggleEdit()
  }

  const onCancel = () => {
    reset(currentEntity || {})
    toggleEdit()
  }

  const renderCreate = () => {
    return (
      <div className={`data-details data-details-${type}`}>
        <div className="info">
          <form onSubmit={handleSubmit(onSubmit)}>
            {formattedData
              .filter((row) => row.filter((item) => item.editable).length > 0)
              .map((row, idx) => (
                <div className="row" key={idx}>
                  {row.map((item) => (
                    item.editable && (
                      <Controller
                        key={item.attribute}
                        name={item.attribute}
                        control={control}
                        defaultValue={currentEntity ? currentEntity[item.attribute] : undefined}
                        rules={item.validation || {}}
                        render={({ field }) => (
                          <FormAttribute
                            attribute={item.attribute}
                            value={field.value}
                            model={type}
                            type={item.type}
                            onUpdate={(attribute, value) => setValue(attribute, value)}
                            error={errors[item.attribute]?.message}
                          />
                        )}
                      />
                    )
                  ))}
                </div>
              ))}

            {formChildren}

            <div className="action-buttons">
              <button className="btn-primary" type="submit">
                <Translate value={'data-details.form.buttons.create'} />
              </button>
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
          <form onSubmit={handleSubmit(onSubmit)}>
            {formattedData.map((row, idx) => (
              <div className="row" key={idx}>
                {row.map((item) => (
                  item.editable && editing && editableEntity ? (
                    <Controller
                      key={item.attribute}
                      name={item.attribute}
                      control={control}
                      defaultValue={currentEntity ? currentEntity[item.attribute] : undefined}
                      rules={item.validation || {}}
                      render={({ field }) => (
                        <FormAttribute
                          attribute={item.attribute}
                          value={field.value}
                          model={type}
                          type={item.type}
                          onUpdate={(attribute, value) => setValue(attribute, value)}
                          error={errors[item.attribute]?.message}
                        />
                      )}
                    />
                  ) : (
                    <ItemAttribute
                      attribute={item.attribute}
                      key={item.attribute}
                      value={currentEntity ? currentEntity[item.attribute] : undefined}
                      model={type}
                      type={item.type}
                    />
                  )
                ))}
              </div>
            ))}
            <div className="action-buttons">
              {editableEntity && (
                editing ? (
                  <div className="btn-group">
                    <button
                      className="btn-cancel"
                      type="button"
                      onClick={onCancel}
                    >
                      <Translate value={'data-details.form.buttons.cancel'} />
                    </button>
                    <button
                      className="btn-primary"
                      type="submit"
                    >
                      <Translate value={'data-details.form.buttons.submit'} />
                    </button>
                  </div>
                ) : (
                  <button
                    className="btn-primary"
                    type="button"
                    onClick={() => toggleEdit()}
                  >
                    <Translate value={'data-details.form.buttons.edit'} />
                  </button>
                )
              )}
            </div>
          </form>
        </div>
        <div className="children">
          {children}
        </div>
      </div>
    )
  }

  return currentEntity?.id ? renderUpdate() : renderCreate()
}

export default DataDetails