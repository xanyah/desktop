import React, { useEffect, ReactNode } from 'react'
import { useForm, Controller, RegisterOptions } from 'react-hook-form'
import ItemAttribute from '../item-attribute'
import { FormAttribute } from '../../components'
import { Trans } from 'react-i18next';
import { isEditableEntity } from '../../utils/entity-helper'

import { filter, forEach, get, reduce } from 'lodash'

interface FormattedDataItem {
  attribute: string
  editable: boolean
  type: string
  validation?: RegisterOptions
}

interface DataDetailsProps {
  children?: ReactNode
  createEntity: (data: any) => void
  currentEntity?: any
  editing: boolean
  formattedData: FormattedDataItem[][]
  formChildren?: ReactNode
  toggleEdit: () => void
  type: string
  updateEntity: (data: any) => void
}

const DataDetails: React.FC<DataDetailsProps> = ({
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
  const { control, handleSubmit, reset } = useForm()

  useEffect(() => {
    const defaultValues = reduce(
      formattedData,
      (acc, row) => {
        forEach(row, (item) => {
          if (item.editable) {
            acc[item.attribute] = get(currentEntity, item.attribute, '')
          }
        })
        return acc
      },
      {} as Record<string, any>
    )

    reset(defaultValues)
  }, [currentEntity, reset, formattedData])

  const onSubmit = (data: any) => {
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
            {filter(
              formattedData,
              (row) => row.filter((item) => item.editable).length > 0
            ).map((row, idx) => (
              <div className="row" key={idx}>
                {row.map(
                  (item) =>
                    item.editable && (
                      <Controller
                        key={item.attribute}
                        name={item.attribute}
                        control={control}
                        defaultValue={
                          currentEntity
                            ? currentEntity[item.attribute]
                            : undefined
                        }
                        rules={item.validation || {}}
                        render={({ field, fieldState }) => (
                          <FormAttribute
                            attribute={item.attribute}
                            value={field.value}
                            model={type}
                            type={item.type}
                            onUpdate={field.onChange}
                            error={fieldState.error?.message}
                          />
                        )}
                      />
                    )
                )}
              </div>
            ))}

            {formChildren}

            <div className="action-buttons">
              <button className="btn-primary" type="submit">
                <Trans i18nKey={'data-details.form.buttons.create'} />
              </button>
            </div>
          </form>
        </div>
        <div className="children">{children}</div>
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
                {row.map((item) =>
                  item.editable && editing && editableEntity ? (
                    <Controller
                      key={item.attribute}
                      name={item.attribute}
                      control={control}
                      defaultValue={
                        currentEntity
                          ? currentEntity[item.attribute]
                          : undefined
                      }
                      rules={item.validation || {}}
                      render={({ field, fieldState }) => (
                        <FormAttribute
                          attribute={item.attribute}
                          value={field.value}
                          model={type}
                          type={item.type}
                          onUpdate={field.onChange}
                          error={fieldState.error?.message}
                        />
                      )}
                    />
                  ) : (
                    <ItemAttribute
                      attribute={item.attribute}
                      key={item.attribute}
                      value={
                        currentEntity
                          ? currentEntity[item.attribute]
                          : undefined
                      }
                      model={type}
                      type={item.type}
                    />
                  )
                )}
              </div>
            ))}
            <div className="action-buttons">
              {editableEntity &&
                (editing ? (
                  <div className="btn-group">
                    <button
                      className="btn-cancel"
                      type="button"
                      onClick={onCancel}
                    >
                      <Trans i18nKey={'data-details.form.buttons.cancel'} />
                    </button>
                    <button className="btn-primary" type="submit">
                      <Trans i18nKey={'data-details.form.buttons.submit'} />
                    </button>
                  </div>
                ) : (
                  <button
                    className="btn-primary"
                    type="button"
                    onClick={() => toggleEdit()}
                  >
                    <Trans i18nKey={'data-details.form.buttons.edit'} />
                  </button>
                ))}
            </div>
          </form>
        </div>
        <div className="children">{children}</div>
      </div>
    )
  }

  return currentEntity?.id ? renderUpdate() : renderCreate()
}

export default DataDetails
