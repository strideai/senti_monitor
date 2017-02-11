import React from 'react'
import { Link } from 'react-router'
const Constant = require('./constants')

class Nav extends React.Component {
	constructor(props) {
		super(props)
		this.getNavClass = this.getNavClass.bind(this)
	}

	getNavClass(page) {
		return page == this.props.active ? "nav-link active" : "nav-link"
	}

	render() {
		return (
			<nav className="navbar navbar-toggleable-md navbar-light bg-faded collapse.navbar-collapse">
				<Link to="/" className="navbar-brand" href="#">Panini</Link>
				<Link to="/" className={this.getNavClass(Constant.pages.HOME)} href="#">Home</Link>
				<Link to="/rules" className={this.getNavClass(Constant.pages.RULES)} href="#">Rules</Link>
			</nav>
		)
	}
}

export default Nav;