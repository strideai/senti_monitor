import React from 'react'
import CompareView from './CompareView'
import update from 'immutability-helper'
const Constant = require('../constants')
import 'whatwg-fetch'

class Compare extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			selectedEntities: [],
			comparison: []
		}
		this.handleClick = this.handleClick.bind(this)
		this.selectedIndexOf = this.selectedIndexOf.bind(this)
	}

	selectedIndexOf(entity) {
		var selected = this.state.selectedEntities
		for (var i = 0; i < selected.length; i++) {
			if (selected[i] == entity)
				return i
		}
		return -1
	}

	handleClick(entity) {
		var index = this.selectedIndexOf(entity)
		if (index != -1) {
			this.setState({selectedEntities: update(this.state.selectedEntities, {$splice: [[index, 1]]})})
		} else {
			this.setState({selectedEntities: update(this.state.selectedEntities, {$unshift: [entity]})})
		}

		var params = this.state.selectedEntities.join(',')
		
		fetch(Constant.API_ROOT_URL + '/compare?entities=' + params)
			.then(function(response) {
				return response.json()
			}).then(function(json) {
				this.setState({comparison: json})
				this.setState(this.state)
			}.bind(this))
	}



	render() {
		return (
			<div>
				<CompareView selectedIndexOf={this.selectedIndexOf} entities={this.props.entities} selectedEntities={this.state.selectedEntities} comparison={this.state.comparison.slice(0, 3)} onClick={this.handleClick} />
			</div>
		)
	}
}

export default Compare
