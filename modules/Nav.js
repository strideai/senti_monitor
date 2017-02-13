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
		
		//var onPageChange = this.props.onPageChange
		return (
			<div>
			<nav className="navbar navbar-toggleable-md navbar-light bg-faded navbar-fixed-top collapse navbar-collapse">
				<Link to="/" className="navbar-brand" href="#">Panini</Link>
				<Link to="/" className={this.getNavClass(Constant.pages.HOME)} href="#">Home</Link>
				<Link to="/compare" className={this.getNavClass(Constant.pages.COMPARE)} href="#">Compare</Link>
				{/*<Link to="/rules" className={this.getNavClass(Constant.pages.RULES)} href="#">Rules</Link>*/}
			</nav>
			{ this.props.children }
			</div>
		)
	}
}

export default Nav;