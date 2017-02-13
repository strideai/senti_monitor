import React from 'react'
import { Router, Route, hashHistory, IndexRoute } from 'react-router'
import Home from './Home'
import Nav from './Nav'
import Article from './article/Article'
import Rules from './rules/Rules'
import Compare from './compare/Compare'
import 'whatwg-fetch'
const Constant = require('./constants')

class App extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			articles: [],
			entities: [],
			topEntities: [
				'The Bank of England',
				'PayPal',
				'eBay',
				'The Federal Reserve Bank',
				'Comcast',
				'Pandora One',
				'Walmart',
				'Google',
				'Toyota',
				'Jos . A. Bank Clothiers'
			],

			dataLoaded: false
		}
		this.loadFeed = this.loadFeed.bind(this)
		fetch(Constant.API_ROOT_URL + '/feed?offset=0&limit=100')
			.then(function(response) {
				return response.json()
			}).then(this.loadFeed)
	}
	
	loadFeed(json) {
		this.setState({feedLoaded: true})
		this.setState({articles: json})
		var entities = []
		this.state.articles.forEach((a) => (
			a.entities.forEach((e) => (
				entities.push(e.text)
			))
		))
		this.setState({entities: entities})
	}

	render() {
		return (
			<Router history={hashHistory}>
				<Route path="/" component={Nav}>
					<IndexRoute component={() => <Home topEntities={this.state.topEntities} entities={this.state.entities} articles={this.state.articles}/>}/>
					<Route path="/compare" component={() => <Compare topEntities={this.state.topEntities}  entities={this.state.entities} />} />
					<Route path="/rules" component={Rules} />
					<Route path="/article/:articleId" component={Article} />
				</Route>
			</Router>
		)
	}
}

export default App