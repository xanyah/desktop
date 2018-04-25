import React from 'react'
import { storiesOf } from '@storybook/react'
import HomeLink from './'
import { routes } from '../../constants'

storiesOf('HomeLink', module)
  .addDecorator(story => (
    <div style={{ background: 'darkblue', width: '750px' }}>{story()}</div>
  ))
  .add('HomeLink', () => {
    const link = routes.find(route => route.displayHome)
    return (<HomeLink
      image={link.image}
      string={link.key}
      url={link.path}
    />)
  })
