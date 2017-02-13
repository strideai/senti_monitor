import React from 'react'
import App from './App'

class SuperApp extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			count: -1
		}
		this.numberOfArticles = this.numberOfArticles.bind(this)
		this.handleClick = this.handleClick.bind(this)
	}

	handleClick() {
		this.setState({count: this.answer.value})
	}

	numberOfArticles() {
		return (
			<div className='container-fluid question-container'>
			<form className='question-children'>
				<h2 className='question'>How many articles do you want to load?</h2>
				<input ref={(input) => this.answer = input} name='question' type='text' className='question-article-count' placeholder='100' />
				<button onClick={this.handleClick} className='btn btn-primary question-submit' type='submit' required={true}>Load articles</button>
			</form>
			</div>
		)
	}

	render() {
		console.log(this.state.count)
		return (
			this.state.count != -1 ? <App count={this.state.count} /> : this.numberOfArticles()
		)
	}
}

export default SuperApp
	