import React from 'react'

class CompareColumn extends React.Component {
	constructor(props) {
		super(props)
	}

	render() {
		return (
			<div>
				{ this.props.entity.text }
			</div>
		)
	}
}

export default CompareColumn
