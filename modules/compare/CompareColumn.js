import React from 'react'

class CompareColumn extends React.Component {
	constructor(props) {
		super(props)
	}

	render() {
		return (
			<div>
				{ this.props.entity.name }
			</div>
		)
	}
}

export default CompareColumn
