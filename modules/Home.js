import React from 'react'
import Feed from './Feed'
import Entities from './entity/Entities'
import Article from './article/Article'
import { Router, Route, hashHistory } from 'react-router'
import update from 'immutability-helper'
import Nav from './Nav'

class Home extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			selectedEntities: []
		}
		this.handleChangeSelectedEntities = this.handleChangeSelectedEntities.bind(this)
	}

	handleChangeSelectedEntities(entity) {
		var index = this.state.selectedEntities.indexOf(entity)
		if (index != -1) {
			this.setState({selectedEntities: update(this.state.selectedEntities, {$splice: [[index, 1]]})})
		} else {
			this.setState({selectedEntities: update(this.state.selectedEntities, {$push: [entity]})})
		}
	}

	render() {
		var articles = this.props.routes[0].articles
		return (
			<div>
			<Nav />
			<div className='container'>
			<div className='row'>
			<div className='col-sm-9'>
				<Feed selectedEntities={this.state.selectedEntities} articles={articles} />
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

export default Home
