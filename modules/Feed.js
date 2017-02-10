import React from 'react'
import ArticleListItem from './ArticleListItem'

class Feed extends React.Component {
	constructor(props) {
		super(props)
	}

	render() {
		var articles = this.props.articles
		var result = articles
						.filter((a) => this.props.selectedEntities.length == 0 || this.props.selectedEntities.indexOf(a) != -1)
						.map((a) => <ArticleListItem key={a.id} article={a} />)
		return (<div className='articleList feed'> {result} </div>)
	}
}

export default Feed;