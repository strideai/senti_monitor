import React from 'react'
import { Router, Route, hashHistory, IndexRoute } from 'react-router'
import Home from './Home'
import Nav from './Nav'
import Article from './article/Article'
import Rules from './rules/Rules'
import Compare2 from './compare/Compare2'
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
		fetch(Constant.API_ROOT_URL + '/feed?offset=0&limit=' + this.props.count)
			.then(function(response) {
				return response.json()
			}).then(this.loadFeed)
	}


	
	loadFeed(json) {
		this.setState({feedLoaded: true})
		this.setState({articles: json})
		var entities = []
		this.state.articles.forEach((a) => (
			a.entities.forEach((e) => {
				var flag = false
				for (var i = 0; i < entities.length; i++) {
					if (entities[i].text.toLowerCase() == e.text.toLowerCase()) {
						flag = true
						entities[i].count += e.count
						break
					}
				}
				if (!flag)
					entities.push({text: e.text, count: e.count})
			})
		))
		entities = Array.from(new Set(entities))
		entities = entities.sort(function(a, b) {
			if (a.count < b.count)
				return 1
			if (b.count < a.count)
				return -1
			return 0
		})
		entities.forEach((e) => {
			console.log(e.text + ': ' + e.count)
		})
		entities = entities.map((e) => e.text)
		this.setState({entities: entities})
	}

	render() {
		return (
			<Router history={hashHistory}>
				<Route path="/" component={Nav}>
					<IndexRoute component={() => <Home entities={this.state.entities} articles={this.state.articles}/>}/>
					<Route path="/compare" component={() => <Compare2 entities={this.state.entities} />} />
					{/*<Route path="/rules" component={Rules} />*/}
				</Route>
			</Router>
		)
	}
}

export default App