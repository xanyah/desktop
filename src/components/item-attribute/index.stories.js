import React from 'react'
import { storiesOf } from '@storybook/react'
import ItemAttribute from './'

storiesOf('ItemAttribute', module)
  .add('String', () => (
    <ItemAttribute
      attribute="Attribute"
      model="providers"
      type="string"
      value="Value"
    />
  ))
  .add('Entity with name', () => (
    <ItemAttribute
      attribute="Attribute"
      model="models"
      type="entity"
      value={
        {
          'id': 'id-field',
          'name':'name field is displayed by default',
        }
      }
    />
  ))
  .add('Entity without name', () => (
    <ItemAttribute
      attribute="Attribute"
      model="models"
      type="entity"
      value={
        {
          'id': 'id field is displayed by default',
          'test':'test-field',
        }
      }
    />
  ))
