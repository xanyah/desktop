import { matchPath } from 'react-router-dom'
import { routes } from '../constants'

export const getCurrentRoute = pathname =>
  routes.find(route =>
    route.path && matchPath(route, pathname) && route.image)

export const getParentRoute = pathname => {
  const splitRoute = pathname.split('/')
  if (splitRoute.length > 2) {
    splitRoute.splice(splitRoute.length - 1, 1)
    return routes.find(route =>
      route.path && matchPath(splitRoute.join('/'), route) && route.image)
  }
  return null
}
