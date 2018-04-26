import React from 'react'
import { storiesOf } from '@storybook/react'
import DataTable from './'

storiesOf('DataTable', module)
  .add('DataTable', () => (
    <DataTable
      data={[{
        'name' : 'Lorem',
        'value' : 42,
      },
      {
        'name': 'Ipsum',
        'value': 'Wow',
      },
      ]}
      columns={['name', 'value']}
      create={false}
    />
  ))

  .add('Empty DataTable', () => (
    <DataTable
      data={[]}
      columns={['name', 'value']}
      create={false}
    />
  ))
