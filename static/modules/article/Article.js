import React from 'react'

class Article extends React.Component {
	constructor(props) {
		super(props)
		this.getArticle = this.getArticle.bind(this)
	}

	getArticle() {
		console.log(this.props)
		//console.log(this.props.articles)		
		
		return ''
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
					{ a.article }
				</div>
			</div>
			</div>
		)
	}
}

export default Article