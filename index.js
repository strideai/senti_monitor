import React from 'react'
import { render } from 'react-dom'
import { Router, Route, hashHistory } from 'react-router'
import SuperApp from './modules/SuperApp'

render(<SuperApp />, document.getElementById('app'))