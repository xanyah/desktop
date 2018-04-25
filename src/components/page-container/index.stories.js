import React from 'react'
import { storiesOf } from '@storybook/react'
import PageContainer from './'

storiesOf('PageContainer', module)
  .add('Default', () => (
    <PageContainer>
      <div>
        <h1>Some children enclosed in PageContainer tag</h1>

        <div>Lorem Ipsum...</div>
      </div>
    </PageContainer>
  ))
