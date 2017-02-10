import React from 'react'
import ArticleListItem from './article/ArticleListItem'

class Feed extends React.Component {
	constructor(props) {
		super(props)
	}

	render() {
		var articles = this.props.articles
		var selected = this.props.selectedEntities
		var selectedIndexOf = function(article) {
			for (var i = 0; i < selected.length; i++) {
				for (var j = 0; j < article.entities.length; j++) {
					if (selected[i].name == article.entities[j].name)
						return i
				}
			}
			return -1
		}
		console.log(selectedIndexOf(articles[0]))

		var result = articles
						.filter((a) => this.props.selectedEntities.length == 0 || selectedIndexOf(a) != -1)
						.map((a) => <ArticleListItem key={a.id} article={a} />)
		return (<div className='articleList feed'> {result} </div>)
	}
}

export default Feed