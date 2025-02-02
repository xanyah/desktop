import './i18n'
import './index.css'
import { QueryClientProvider } from '@tanstack/react-query'
import { queryClient } from './constants'
import Router from './routes'

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <Router />
    </QueryClientProvider>
  )
}

export default App
