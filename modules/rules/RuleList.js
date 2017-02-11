import React from 'react'
import RuleListItem from './RuleListItem'

class RuleList extends React.Component {
	constructor(props) {
		super(props)
	}

	render() {
		const getRuleList = (rules) => rules.map(
			(r) => <RuleListItem key={r.id} rule={r} onClick={this.props.onClick} />
		)

		return (
			<div classNmae='rule-list'>
				{ getRuleList(this.props.rules) }
			</div>
		)
	}
}

export default RuleList