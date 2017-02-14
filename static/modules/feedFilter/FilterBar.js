import React from 'react'
import Home from '../Home'
const Constant = require('../constants')

class FilterBar extends React.Component {
	constructor(props) {
		super(props)
		this.onChange = this.onChange.bind(this)
	}

	onChange() {
		this.props.handleChoice(this.sortSelect.value)
	}

	render() {
		return (
			<div className='container-fluid filter-bar'>
				<div className="col-sm-12">
					<div className="filter-bar-filter">
					<div style={{float: 'right'}}>
						<span className="sort-by">Sort articles by </span>
						<select ref={(input) => this.sortSelect = input} onChange={this.onChange} className="filter-option">
							<option value={Constant.sortOptions.DATE}>Date (Most recent)</option>
							<option value={Constant.sortOptions.SENTIMENT}>Sentiment (Most negative)</option>
						</select>
					</div>
					</div>
				</div>
			</div>
		)
	}
}

export default FilterBar