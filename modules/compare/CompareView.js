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
		this.getColWidth = this.getColWidth.bind(this)
	}

	handleChangeSelectedEntities(entity) {
		this.props.onClick(entity)
	}

	getColWidth() {
		var len = this.props.selectedEntities.slice(0, 3).length
		return 'col-sm-' + (6 / len) + '  compare-entity-col'
	}

	getRows() {
		var result = []
		comparisonAttrs.forEach((attr) => (
			result.push(
				<div>
				<tr className='meta-row'>
					<td colSpan={Math.min(this.props.selectedEntities.length, 3)}>{attr.name}</td>
				</tr>	
				<tr className=''>
					{ this.getRow(attr.attr) }
				</tr>
				</div>
			)
		))
		console.log(result)
		return result
	}

	getRow(attr) {
		return this.props.comparison.map((e) => (
			<td>{e[attr]}</td>
		))
	}

	getTable() {
		const getHeading = comparisonAttrs.map((attr) => (
			<th> { attr.name } </th>
		))
		const getEntities = this.props.selectedEntities.slice(0, 3).map((entity) => (
			<th className={this.getColWidth() + ' compare-entity-name'}>
				{entity[0].toUpperCase() + entity.slice(1)}
			</th>
		))
		return (
			<table className='table table-bordered table-striped' style={{display: this.props.selectedEntities ? 'table' : 'none'}}>
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