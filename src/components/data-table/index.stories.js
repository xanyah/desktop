import React from 'react'
import { storiesOf } from '@storybook/react'
import DataTable from './'

//TODO add example of products
//TODO remove searchBar if searchEntity isn't defined

storiesOf('DataTable', module)
  .add('DataTable', () => (
    <DataTable
      data={[{
        'name' : 'Lorem Ipsum',
        'value' : 42,
      },
      {
        'name': 'This is a test',
        'value': 'Wow',
      },
      ]}
      columns={['name', 'value']}
      create={false}
      loading={false}
    />
  ))
