import { useRef } from 'react'
import { Location, useLocation, useNavigate } from 'react-router-dom'
import { PartialLocation, QueryParamAdapterComponent } from 'use-query-params'

const ReactRouter7Adapter: QueryParamAdapterComponent = ({ children }) => {
  const navigate = useNavigate()
  const location = useLocation()

  const locationRef = useRef<Location>(location)
  locationRef.current = location

  return children({
    get location() {
      return locationRef.current
    },
    push: ({ search, state }: PartialLocation) => {
      locationRef.current = { ...locationRef.current, search, state }
      navigate({ search }, { state })
    },
    replace: ({ search, state }: PartialLocation) => {
      locationRef.current = { ...locationRef.current, search, state }
      navigate({ search }, { replace: true, state })
    },
  })
}

export default ReactRouter7Adapter
