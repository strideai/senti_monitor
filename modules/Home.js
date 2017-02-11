import React from 'react'
import Feed from './Feed'
import Entities from './entity/Entities'
import Article from './article/Article'
import { Router, Route, hashHistory } from 'react-router'
import update from 'immutability-helper'
import Nav from './Nav'
import FilterBar from './feedFilter/FilterBar'
const Constant = require('./constants')

class Home extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			selectedEntities: [],
			sortBy: Constant.sortOptions.DATE
		}
		this.handleChangeSelectedEntities = this.handleChangeSelectedEntities.bind(this)
		this.handleChoice = this.handleChoice.bind(this)
		this.selectedIndexOf = this.selectedIndexOf.bind(this)
	}

	selectedIndexOf(entity) {
		var selected = this.state.selectedEntities
		for (var i = 0; i < selected.length; i++) {
			if (selected[i].name == entity.name)
				return i
		}
		return -1
	}

	handleChangeSelectedEntities(entity) {
		var index = this.selectedIndexOf(entity)
		if (index != -1) {
			this.setState({selectedEntities: update(this.state.selectedEntities, {$splice: [[index, 1]]})})
		} else {
			this.setState({selectedEntities: update(this.state.selectedEntities, {$push: [entity]})})
		}
	}

	handleChoice(sortBy) {
		this.setState({sortBy: sortBy})
	}

	render() {
		var articles = this.props.routes[0].articles
		var handleChoice = this.handleChoice
		return (
			<div>
			<Nav active={Constant.pages.HOME} />
			<FilterBar handleChoice={handleChoice} />
			<div className='container-fluid' style={{'marginTop': '14px'}}>
			<div className='row'>
			<div className='col-sm-1'></div>
			<div className='col-sm-3 entity-list-col'>
				<Entities selectedIndexOf={this.selectedIndexOf} handleChangeSelectedEntities={this.handleChangeSelectedEntities} selectedEntities={this.state.selectedEntities}/>
			</div>
			<div className='col-sm-8'>
				<Feed selectedIndexOf={this.selectedIndexOf} sortBy={this.state.sortBy} selectedEntities={this.state.selectedEntities} articles={articles} />
			</div>
			</div>
			</div>
			</div>
		)
	}
}

export default Home