import React from 'react'
import CompareColumn from './CompareColumn'
const Constant = require('../constants')
import Entities from '../entity/Entities'
import update from 'immutability-helper'
import Nav from '../Nav'
import 'whatwg-fetch'

const comparisonAttrs = [
	{attr: 'mentionsCount', name: 'Total mentions'}, 
	{attr: 'positiveRefs', name: 'Positive mentions'},
	{attr: 'negativeRefs', name: 'Negative mentions'}, 
	{attr: 'overallAvgScore', name: 'Average sentiment score'}, 
	{attr: 'recentAvgScore', name: 'Recent sentiment score'}
]

class CompareView extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			selectedEntities: [],
			comparison: []
		}
		this.getRow = this.getRow.bind(this)
		this.handleChangeSelectedEntities = this.handleChangeSelectedEntities.bind(this)
		this.getRows = this.getRows.bind(this)
		this.getTable = this.getTable.bind(this)
		this.getColWidth = this.getColWidth.bind(this)
		this.selectedIndexOf = this.selectedIndexOf.bind(this)
	}

	handleChangeSelectedEntities(entity) {
		var index = this.selectedIndexOf(entity)
		if (index != -1) {
			this.setState({selectedEntities: update(this.state.selectedEntities, {$splice: [[index, 1]]})})
		} else {
			this.setState({selectedEntities: update(this.state.selectedEntities, {$push: [entity]})})
		}
		var params = this.state.selectedEntities
		
		console.log(params)
		const updateState = (json) => this.setState({comparison: json})
		fetch(Constant.API_ROOT_URL + '/compare?entities=' + params)
			.then(function(response) {
				return response.json()
			}).then(function(json) {
				updateState(json)
				console.log('aaa')
				console.log(this.state.comparison)
			})
	}

	getColWidth() {
		var len = this.state.selectedEntities.slice(0, 3).length
		return 'col-sm-' + (6 / len) + '  compare-entity-col'
	}

	getRows() {
		var result = []
		comparisonAttrs.forEach((attr) => (
			result.push(
				<div>
				<tr>
					<td colSpan={Math.min(this.state.selectedEntities.length, 3)} style={{textAlign: 'center'}}>{attr.name}</td>
				</tr>	
				<tr>
					{ this.getRow(attr.attr) }
				</tr>
				</div>
			)
		))
		console.log(result)
		return result
	}

	getRow(attr) {
		console.log(this.state)
		const getTd = this.state.comparison.map((e) => (
			<td>{e[attr]}</td>
		))
		return (
			<tr>
				{ getTd }
			</tr>
		)
	}

	getTable() {
		const getHeading = comparisonAttrs.map((attr) => (
			<th> { attr.name } </th>
		))
		const getEntities = this.state.selectedEntities.slice(0, 3).map((entity) => (
			<th className={this.getColWidth() + ' compare-entity-name'}>
				{entity.text[0].toUpperCase() + entity.text.slice(1)}
			</th>
		))
		return (
			<table className='table table-bordered table-striped' style={{display: this.state.selectedEntities ? 'table' : 'none'}}>
			<thead>
				<tr>
					{getEntities}
				</tr>
			</thead>
			<tbody>
				{this.getRows()}
			</tbody>
			</table>
		)

	}

	selectedIndexOf(entity) {
		var selected = this.state.selectedEntities
		for (var i = 0; i < selected.length; i++) {
			if (selected[i].text == entity.text)
				return i
		}
		return -1
	}

	render() {
		return (
			<div>
				<div className='container-fluid' style={{'marginTop': '14px'}}>
				<div className='row'>
					
					<div className='col-sm-3'>
						<Entities topEntities={this.props.topEntities} entities={this.props.entities} selectedIndexOf={this.selectedIndexOf} handleChangeSelectedEntities={this.handleChangeSelectedEntities} selectedEntities={this.state.selectedEntities}/>
					</div>
					
					<div className='col-sm-9'>
						{ this.getTable() }
					</div>

				</div>
				</div>
			</div>
		)
	}
}

export default CompareView