import React from 'react'
import ArticleListItem from './article/ArticleListItem'
const Constant = require('./constants')

class Feed extends React.Component {
	constructor(props) {
		super(props)
	}

	render() {
		var articles = this.props.articles
		var selected = this.props.selectedEntities
		const selectedIndexOf = this.props.selectedIndexOf

		console.log(selectedIndexOf(articles[0]))

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
					
		var sortBy = this.props.sortBy

		const getRelevantEntitySentiment = function(article) {
			var total = 0
			article.entities.forEach(function(e) {
				if (selectedIndexOf(e) != -1)
					total += e.sentiment
			})
			return total
		}

		var sorted = result.sort(function(a, b) {
			return sortBy == Constant.DATE
					? (a.date.getTime() - b.date.getTime())
					: (getRelevantEntitySentiment(b) - getRelevantEntitySentiment(a))
		}).map((a) => <ArticleListItem key={a.id} article={a} />)

		return (<div className='articleList feed'> {sorted} </div>)
	}
}

export default Feed