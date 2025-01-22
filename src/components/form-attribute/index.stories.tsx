import React from 'react'
import { storiesOf } from '@storybook/react'
import FormAttribute from './'

storiesOf('FormAttribute', module)
  .add('Textarea', () => (
    <FormAttribute
      attribute="Attribute"
      type="textarea"
      value="Value"
    />
  ))
  .add('String', () => (
    <FormAttribute
      attribute="Attribute"
      type="string"
      value="Value"
    />
  ))
  .add('Number', () => (
    <FormAttribute
      attribute="Attribute"
      type="number"
      value={42}
    />
  ))
  .add('Entity', () => (
    <FormAttribute
      attribute="provider"
      type="entity"
      value="Value"
    />
  ))
  .add('Type', () => (
    <FormAttribute
      attribute="Attribute"
      type="type"
      value="Value"
    />
  ))
