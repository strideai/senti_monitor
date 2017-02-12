import React from 'react'

class RuleListItem extends React.Component {
	constructor(props) {
		super(props)
		this.handleClick = this.handleClick.bind(this)
	}

	handleClick() {
		this.props.onClick(this.ruleListItem)
	}

	render() {
		const rule = this.props.rule
		return (
			<div ref={(li) => this.ruleListItem = li} onClick={this.handleClick} className='rule-list-item'>
				<div className='rule-list-item-title'>{ rule.title }</div>
				
			</div>
		)
	}
}

export default RuleListItem
