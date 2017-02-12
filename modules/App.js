import React from 'react'
import { Router, Route, hashHistory } from 'react-router'
import Home from './Home'
import Nav from './Nav'
import Article from './article/Article'
import Rules from './rules/Rules'
import CompareView from './compare/CompareView'

class App extends React.Component {
	render() {
		return (
			<Router history={hashHistory}>
				<Route path="/" component={Home}/>
				<Route path="/compare" component={CompareView} />
				<Route path="/rules" component={Rules} />
				<Route path="/article/:articleId" component={Article} />
			</Router>
		)
	}
}

export default App