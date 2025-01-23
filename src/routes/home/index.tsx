import { Link } from 'react-router-dom'
import { Translate } from 'react-redux-i18n'
import { routes } from '../../constants'
import { getGreetingTime } from '../../utils/date-helper'
import './styles.scss'
import { useCurrentToken } from '../../hooks'
import HomeLink from '../../components/home-link'

const Home = () => {
  const token = useCurrentToken()
  return (
  <div key="home" className="home-page">
    <div className="header">
      <h1>
        <Translate value={`home.welcome.${getGreetingTime()}`} firstname={token.data?.data.data.firstname} />
      </h1>
      <div className="settings">
        <Link to="/account"><i className="im im-user-settings"></i></Link>
        <Link to="/settings"><i className="im im-gear"></i></Link>
      </div>
    </div>
    <div className="links-container">
      {routes.filter(route => route.displayHome).map(link => (
        <HomeLink
          key={link.key}
          image={link.image}
          string={link.key}
          url={link.path}
        />
      ))}
    </div>
  </div>
)
}

export default Home
