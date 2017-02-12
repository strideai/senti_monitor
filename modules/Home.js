import React from 'react'
import Feed from './Feed'
import Entities from './entity/Entities'
import Article from './article/Article'
import { Router, Route, hashHistory } from 'react-router'
import update from 'immutability-helper'
import Nav from './Nav'
import FilterBar from './feedFilter/FilterBar'
const Constant = require('./constants')
import Fetch from 'react-fetch'

const articles = [
			{
				id: 'be0d4e0b-65de-decd-5a82-62aff150c2f7',
				title: '10 Reasons Why Bank of Baroda Sucks',
				body: 'He came in promising to be an unconventional president, and on that score',
				date: new Date(2017, 1, 1),
				entities: [{name: 'Bank of Baroda', sentiment: -1}, {name: 'Paytm', sentiment: 2}],
				articleSentiment: {score: 3, sentiment: 'P'}
			},
			{
				id: '388e452a-eb83-7227-02f1-4ae48a304a36',
				title: 'SocGen and Bank of India Lower Interest Rates',
				body: 'Even before software as a service became a thing, it was pretty common to sell business applications on per-seat pricing. ',
				date: new Date(2016, 9, 11),
				entities: [{name: 'SocGen', sentiment: 3}, {name: 'Bank of India', sentiment: 5}],
				articleSentiment: {score: 1, sentiment: 'N'}
			},
			{
				id: '6d7af7dc-02f0-0bae-3ff8-4bee8a5de53d',
				title: 'You Will Never Use Paytm After Reading This Article',
				body: 'He came in promising to be an unconventional president, and on that score',
				date: new Date(),
				entities: [{name: 'Paytm', sentiment: -5}, {name: 'Freecharge', sentiment: 2}, {name: 'MobiKwik', sentiment: 2}],
				articleSentiment: {score: -9, sentiment: 'VNE'}
			},
			{
				id: '6d7af7dc-02f0-0bae-3ff8-4bff8a5de53d',
				title: 'BoI predicts a bumpy year ahead',
				body: 'He came in promising to be an unconventional president, and on that score',
				date: new Date(),
				entities: [{name: 'Bank of India', sentiment: -4}],
				articleSentiment: {score: -3, sentiment: 'NE'}
			},
			{
				id: '6d7af7dc-02f0-0b4e-3ff8-4bff8a5de53d',
				title: 'Alibaba acquires Paytm for $1.2 billion',
				body: 'He came in promising to be an unconventional president, and on that score',
				date: new Date(),
				entities: [{name: 'Paytm', sentiment: 6}, {name: 'Alibaba', sentiment: 4}],
				articleSentiment: {score: 4, sentiment: 'P'}
			}
		]


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


	/* Returns index of entity in the list of selected entities */
	selectedIndexOf(entity) {
		var selected = this.state.selectedEntities
		for (var i = 0; i < selected.length; i++) {
			if (selected[i].name == entity.name)
				return i
		}
		return -1
	}

	/* Toggles selection of an entity from the list of entities */
	handleChangeSelectedEntities(entity) {
		var index = this.selectedIndexOf(entity)
		if (index != -1) {
			this.setState({selectedEntities: update(this.state.selectedEntities, {$splice: [[index, 1]]})})
		} else {
			this.setState({selectedEntities: update(this.state.selectedEntities, {$push: [entity]})})
		}
	}

	/* Handles the "sort by" option change */
	handleChoice(sortBy) {
		this.setState({sortBy: sortBy})
	}

	render() {
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
				<Feed feedLoaded={this.state.feedLoaded} handleChangeSelectedEntities={this.handleChangeSelectedEntities} selectedIndexOf={this.selectedIndexOf} sortBy={this.state.sortBy} selectedEntities={this.state.selectedEntities} articles={articles} />
			</div>
			</div>
			</div>
			</div>
		)
	}
}

export default Home
