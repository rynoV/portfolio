import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import * as serviceWorker from './serviceWorker'
import PageContainer from './Page/PageContainer'

const root = document.querySelector('#root')

ReactDOM.render(<PageContainer />, root)

serviceWorker.unregister()
