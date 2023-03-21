import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import App from '@components/App/App'
import reportWebVitals from './reportWebVitals'
import { setupStore } from '@app/store'
import { Provider } from 'react-redux'
import { ApolloProvider } from '@apollo/client'
import { client } from '@app/apollo'

const store = setupStore()

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement)
root.render(
  <React.StrictMode>
    <ApolloProvider client={client}>
      <Provider store={store}>
        <App />
      </Provider>
    </ApolloProvider>
  </React.StrictMode>,
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals())
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()
