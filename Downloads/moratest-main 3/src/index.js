import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import App from './App'
import reportWebVitals from './reportWebVitals'
import { BrowserRouter as Router } from 'react-router-dom'
import { initialState } from './components/context/initialState'
import reducer from './components/context/reducer'
import { StateProvider } from './components/context/StateProvider'
import { ThemeProvider } from '@material-tailwind/react'

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
  <Router>
    <StateProvider initialState={initialState} reducer={reducer}>
    <ThemeProvider>

      <App />
      </ThemeProvider>
    </StateProvider>
  </Router>
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()
