import React from 'react'
import Nav from './Nav'

class AppPage extends React.Component {
	constructor(props) {
		super(props)
	}

	render() {
		return (
			<div>
				<Nav />
				{ this.props.children }
			</div>
		)
	}
}

export default AppPage