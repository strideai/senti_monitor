import React from 'react'
import ArticleListItem from './article/ArticleListItem'
const Constant = require('./constants')
import 'whatwg-fetch'

class Feed extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			feedLoaded: false,
			articles: []
		}
		this.loadFeed = this.loadFeed.bind(this)
		/*fetch(Constant.API_ROOT_URL + '/feed?offset=0&limit=5')
			.then(function(response) {
				return response.json()
			}).then(this.loadFeed)*/
	}

	loadFeed(json) {
		console.log(json)
		this.setState({feedLoaded: true})
		this.setState({articles: json})
	}

	render() {
		if (this.props.feedLoaded)
			console.log(this.props)
		var articles = this.props.articles
		var selected = this.props.selectedEntities
		var selectedIndexOf = this.props.selectedIndexOf
		var sortBy = this.props.sortBy

		const isArticleSelected = function(a) {
			for (var i = 0; i < selected.length; i++) {
				for (var j = 0; j < a.entities.length; j++) {
					if (a.entities[j].name == selected[i].name)
						return true
				}
			}
			return false
		}

		var result = articles
					.filter((a) => selected.length == 0 || isArticleSelected(a))
					
		var sorted = result.sort(function(a, b) {
			if (sortBy == Constant.sortOptions.DATE) {
				return b.id - a.id
			} else {
				return a.articleSentiment.score - b.articleSentiment.score
			}
		}).map((a) => <ArticleListItem onClick={this.props.handleChangeSelectedEntities} key={a.id} article={a} />)

		return (<div className='articleList feed'> {sorted} </div>)
	}
}

export default Feed