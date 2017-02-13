import React from 'react'

class Article extends React.Component {
	constructor(props) {
		super(props)
		this.getArticle = this.getArticle.bind(this)
	}

	getArticle() {
		var articles = this.props.routes[0].articles
		const getArticleById = id => articles.filter((a) => a.id == id)
		var article = getArticleById(this.props.params.articleId)
		return article[0]
	}

	render() {
		
		return (
			<div className="container">
			<div className='row'>
				<div className='col-sm-2'>
				</div>
				<article className="article col-sm-8">
					<h2 className="article-title article-title-center">{this.getArticle().title}</h2>
				</article>
				<div className='col-sm-2'>
				</div>
			</div>
			</div>
		)
	}
}

export default Article