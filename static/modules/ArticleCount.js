import React from 'react'

class ArticleCount extends React.Component {
	constructor(props) {
		super(props)
	}

	render() {
		return (
			<div>
				<button onClick={this.props.onSubmit}>Hello</button>
			</div>
		)
	}
}

export default ArticleCount
