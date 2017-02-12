import React from 'react'
import RuleListItem from './RuleListItem'

class RuleList extends React.Component {
	constructor(props) {
		super(props)
	}

	render() {
		const getRuleList = (rules) => rules.map(
			(r) => <RuleListItem key={r.created} rule={r} onClick={this.props.onClick} />
		)

		return (
			<div>
			<button className='btn btn-primary add-new-rule'>New rule</button>
			<div className='rule-list'>
				{ getRuleList(this.props.rules) }
			</div>
			</div>
		)
	}
}

export default RuleList