import React from 'react'
import { storiesOf } from '@storybook/react'
import Checkbox from './'

storiesOf('Checkbox', module)
  .add('Checked Checkbox', () => (
    <Checkbox checked >
      Checked Checkbox
    </Checkbox>
  ))
  .add('Unchecked Checkbox', () => (
    <Checkbox>
      Unchecked Checkbox
    </Checkbox>
  ))
