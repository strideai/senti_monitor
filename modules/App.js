import React from 'react'
import Feed from './Feed'
import Nav from './Nav'
import Entities from './Entities'
import Article from './Article'
import { Router, Route, hashHistory } from 'react-router'
import update from 'immutability-helper'

class App extends React.Component {
	constructor(props) {
		super(props)
		this.articles = [
			{
				id: 'be0d4e0b-65de-decd-5a82-62aff150c2f7',
				title: '10 Reasons Why Bank of Baroda Sucks',
				body: 'He came in promising to be an unconventional president, and on that score',
				date: new Date(),
				entities: [{name: 'Bank of Baroda', sentiment: -1}]
			},
			{
				id: '388e452a-eb83-7227-02f1-4ae48a304a36',
				title: 'SocGen and Bank of India Lower Interest Rates',
				body: 'Even before software as a service became a thing, it was pretty common to sell business applications on per-seat pricing. ',
				date: new Date(),
				entities: [{name: 'SocGen', sentiment: 3}, {name: 'Bank of India', sentiment: 5}]
			},
			{
				id: '6d7af7dc-02f0-0bae-3ff8-4bee8a5de53d',
				title: 'You Will Never Use Paytm After Reading This Article',
				body: 'He came in promising to be an unconventional president, and on that score',
				date: new Date(),
				entities: [{name: 'Paytm', sentiment: -3}, {name: 'Freecharge', sentiment: 2}, {name: 'MobiKwik', sentiment: 2}]
			}
		]
		this.state = {
			selectedEntities: []
		}
	}

	handleChangeSelectedEntities(entity) {
		this.state.selectedEntities = entities
	}

	render() {
		return (
			<div>
			<Nav />
			<div className='container'>
			<div className='row'>
			<div className='col-sm-9'>
				<Router history={hashHistory}>
					<Route path="/" component={() => (<Feed selectedEntities={this.state.selectedEntities} articles={this.articles} />)} />
					<Route path="/:articleId" component={() => (<Article articles={this.articles} />)} />
				</Router>
			</div>
			<div className='col-sm-3 entity-list-col'>
				<Entities handleChangeSelectedEntities={this.handleChangeSelectedEntities} selectedEntities={this.state.selectedEntities}/>
			</div>
			</div>
			</div>
			</div>
		)
	}
}

export default App
