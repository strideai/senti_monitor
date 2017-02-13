import React from 'react'
import Nav from '../Nav'
import RuleList from './RuleList'
import RuleView from './RuleView'
const Constant = require('../constants')

const rules = [
	{
		created: new Date(),
		title: 'SocGen catastrophe',
		entity: 'SocGen',
		conditions: [Constant.sentiments['Ne'], Constant.sentiments['VNe']],
		notification: {
			message: 'Arrange for press report'
		}
	},
	{
		created: new Date(2012, 2, 2),
		title: 'Find new place to eat',
		entity: 'McDonald\'s',
		conditions: [Constant.sentiments['VP']],
		notification: {
			message: 'Arrange for press report'
		}
	}
]

class Rules extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			currentRule: null
		}
		this.handleRuleItemClick = this.handleRuleItemClick.bind(this)
	}

	handleRuleItemClick(rule) {
		//TODO Check for unsaved changes in the current form before changing view
		this.setState({currentRule: rule})
	}

	render() {
		return (
			<div>
				<div className='container-fluid' style={{'marginTop': '14px'}}>
				<div className='row'>
					<div className='col-sm-1'></div>
					<div className='rule-list-col col-sm-3'>
						<RuleList rules={rules} />
					</div>
					<div className='col-sm-8'>
						<RuleView rule={this.state.currentRule} />
					</div>
				</div>
				</div>
			</div>
		)
	}
}

export default Rules