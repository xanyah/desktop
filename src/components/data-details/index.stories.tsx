import React from 'react'
import { storiesOf } from '@storybook/react'
import DataDetails from './'
import { manufacturerFormat } from '../../types/manufacturer'

storiesOf('DataDetails', module)
  .add('DataDetails', () => (
    <DataDetails
      formattedData={manufacturerFormat}
      selectedEntity={
        {
          createdAt: '2018-04-13T06:59:02.116Z',
          id: '12f08927-7796-44e1-bc5b-8f418d44f638',
          name: 'Bathilda Bagshot',
          notes: null,
          productsCount: 24,
          storeId: '722170f5-3ca2-4373-a4b9-f5d6e38e6a3c',
          updatedAt: '2018-04-13T06:59:02.116Z',
        }
      }
    />
  ))
