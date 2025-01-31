import Cookies from 'js-cookie'
import {Redirect, Route} from 'react-router-dom'

const ProtectedRoute = props => {
  if (Cookies.get('jwt_token') === undefined) {
    console.log(Cookies.get('jwt_token'))
    return <Redirect to="/login" />
  }
  return <Route {...props} />
}

export default ProtectedRoute
