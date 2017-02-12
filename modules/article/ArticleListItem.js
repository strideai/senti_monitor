import React from 'react'
import { Link } from 'react-router'
const Constant = require('../constants')

class ArticleListItem extends React.Component {
	constructor(props) {
		super(props)
		this.handleTagClick = this.handleTagClick.bind(this)
	}

	formatDate(date) {
		var monthNames = [
		"January", "February", "March",
		"April", "May", "June", "July",
		"August", "September", "October",
		"November", "December"
		];

		var day = date.getDate();
		var monthIndex = date.getMonth();
		var year = date.getFullYear();

		return day + ' ' + monthNames[monthIndex] + ' ' + year;
	}
	
	prettyDate(time){
		var date = new Date((time || "").replace(/-/g,"/").replace(/[TZ]/g," ")),
			diff = (((new Date()).getTime() - date.getTime()) / 1000),
			day_diff = Math.floor(diff / 86400);
				
		if ( isNaN(day_diff) || day_diff < 0 || day_diff >= 31 )
			return this.formatDate(date)
				
		return day_diff == 0 && (
				diff < 60 && "just now" ||
				diff < 120 && "1 minute ago" ||
				diff < 3600 && Math.floor( diff / 60 ) + " minutes ago" ||
				diff < 7200 && "1 hour ago" ||
				diff < 86400 && Math.floor( diff / 3600 ) + " hours ago") ||
			day_diff == 1 && "Yesterday" ||
			day_diff < 7 && day_diff + " days ago" ||
			day_diff < 31 && Math.ceil( day_diff / 7 ) + " weeks ago";
	}

	handleTagClick(entity) {
		this.props.onClick(entity)
	}

	getSentimentTag(entity) {
		return (
			entity.score >= 0 
				? (<span key={entity.text} onClick={() => this.handleTagClick(entity)} className="badge badge-pill badge-success">{entity.text}</span>)
				: (<span key={entity.text} onClick={() => this.handleTagClick(entity)} className="badge badge-pill badge-danger">{entity.text}</span>)
		)
	}

	render() {
		var tags = []
		this.props.article.entities.forEach((e) => tags.push(this.getSentimentTag(e)))
		return (
			<div className='card article-list-item'>
				<div className='article-title'>
					<div className="article-date">
						{this.props.article.id ? this.prettyDate(new Date(this.props.article.id).toDateString()) : ''} &bull; {Constant.sentiments[this.props.article.articleSentiment.sentiment]}
					</div>
						<h4><Link className="article-title" to={"/article/" + this.props.article.id}>{this.props.article.title}</Link></h4>
				</div>
				<div className='article-tags'>
					{tags}
				</div>
			</div>
		)
	}
}

export default ArticleListItem