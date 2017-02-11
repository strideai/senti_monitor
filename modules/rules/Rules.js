import React from 'react'
import Nav from '../Nav'
import RuleList from './RuleList'
import RuleView from './RuleView'
const Constant = require('../constants')

const rules = [
	
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
				<Nav active={Constant.pages.RULES} />
				<div className='container-fluid'>
				<div className='row'>
					<div className='col-sm-1'></div>
					<div className='rule-list-col col-sm-3'>
						<RuleList />
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