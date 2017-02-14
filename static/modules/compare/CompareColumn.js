import React from 'react'

class CompareColumn extends React.Component {
	constructor(props) {
		super(props)
	}

	render() {
		return (
			<div>
				<div className='compare-entity-name'>
					{ this.props.entity.text[0].toUpperCase() + this.props.entity.text.slice(1) }
				</div>
			</div>
		)
	}
}

export default CompareColumn
