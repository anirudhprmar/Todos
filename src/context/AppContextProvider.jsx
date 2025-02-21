import TodoContextProvider from './TodoContextProvider'
import PropTypes from 'prop-types'

function AppContextProvider({ children }) {
  return (

    <TodoContextProvider>
        {children}
    </TodoContextProvider>

  )
}

AppContextProvider.propTypes = {
    children: PropTypes.node.isRequired
}

export default AppContextProvider