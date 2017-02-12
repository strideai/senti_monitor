import React from 'react'

class RuleView extends React.Component {
	constructor(props) {
		super(props)
	}

	render() {
		return (
			<div className='rule-view'>
				<input type="text" className='rule-field rule-name' placeholder='Title' rows="1" />
				<input type='text' className='rule-field rule-entity' placeholder='Entity' />
			</div>
		)
	}
}

export default RuleView
