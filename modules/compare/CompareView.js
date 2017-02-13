import React from 'react'
const Constant = require('../constants')
import Entities from '../entity/Entities'
import update from 'immutability-helper'
import Nav from '../Nav'
import 'whatwg-fetch'

const comparisonAttrs = [
	{attr: 'mentionsCount', name: 'Total mentions'}, 
	{attr: 'positiveRefs', name: 'Positive mentions'},
	{attr: 'negativeRefs', name: 'Negative mentions'}, 
	{attr: 'overallAvgScore', name: 'Average sentiment score'}
	//{attr: 'recentAvgScore', name: 'Recent sentiment score'}
]

class CompareView extends React.Component {
	constructor(props) {
		super(props)
		this.getRow = this.getRow.bind(this)
		this.handleChangeSelectedEntities = this.handleChangeSelectedEntities.bind(this)
		this.getRows = this.getRows.bind(this)
		this.getTable = this.getTable.bind(this)
		//this.getColWidth = this.getColWidth.bind(this)
	}

	handleChangeSelectedEntities(entity) {
		this.props.onClick(entity)
	}

	getRows() {
		var result = []
		comparisonAttrs.forEach((attr) => (
			result.push(
				<tr>
					<td>{attr.name}</td>
					{ this.getRow(attr) }
				</tr>
			)
		))		
		return result
	}

	getRow(attr) {
		const result = this.props.comparison.map((e) => (
			<td>{e[attr.attr]}</td>
		))
		return result
	}

	getTable() {
		//const getEntities = [<th className='compare-entity-name'>g</th>]
		const getEntities = this.props.selectedEntities.slice(0, 3).map((entity) => (
			<th className='compare-entity-name'>
				{entity[0].toUpperCase() + entity.slice(1)}
			</th>
		))
		getEntities.unshift((<th className='compare-entity-name'></th>))
		return (
			<div>
				<table className='table table-bordered' style={{display: this.props.selectedEntities.length > 0 ? 'table' : 'none'}}>
				<thead>
					<tr>
						{getEntities}
					</tr>
				</thead>
				<tbody>
					{this.getRows()}
				</tbody>
				</table>
			</div>
		)

	}

	render() {
		return (
			<div>
				<div className='container-fluid' style={{'marginTop': '14px'}}>
				<div className='row'>
					
					<div className='col-sm-3'>
						<Entities topEntities={this.props.topEntities} entities={this.props.entities} selectedIndexOf={this.props.selectedIndexOf} handleChangeSelectedEntities={this.handleChangeSelectedEntities} selectedEntities={this.props.selectedEntities}/>
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