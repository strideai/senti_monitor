import React from 'react'

class Article extends React.Component {
	constructor(props) {
		super(props)
	}

	render() {
		const getArticleById = id => this.props.articles.filter((a) => a.id == id)
		var article = getArticleById(this.props.params.articleId)
		return (
			<article className="article">
				<h2>{article.title}</h2>
			</article>
		)
	}
}

export default Article