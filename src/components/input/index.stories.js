import React from 'react'
import { storiesOf } from '@storybook/react'
import Input from './'

storiesOf('Input', module)
  .add('Input Text', () => (
    <Input
      placeholder="Placeholder"
      type="text"
    />
  ))
  .add('Input Number', () => (
    <Input
      placeholder="000123"
      type="number"
    />
  ))
