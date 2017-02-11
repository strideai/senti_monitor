import React from 'react'
import Nav from '../Nav'
const Constant = require('../constants')

class Rules extends React.Component {
	constructor(props) {
		super(props)
	}

	render() {
		return (
			<div>
				<Nav active={Constant.pages.RULES}/>
				<h1>rules</h1>
			</div>
		)
	}
}

export default Rules