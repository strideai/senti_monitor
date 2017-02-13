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
		this.handleChangeSelectedEntities = this.handleChangeSelectedEntities.bind(this)
		this.getRows = this.getRows.bind(this)
		this.getTable = this.getTable.bind(this)
		//this.getColWidth = this.getColWidth.bind(this)
	}
	
	toTitleCase(str) {
	    return str.replace(/\w\S*/g, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();});
	}


	handleChangeSelectedEntities(entity) {
		this.props.onClick(entity)
	}

	getRows() {
		var result = []
		const row = (attr) => this.props.comparison.map((e) => (
			<td>{e[attr.attr]}</td>
		))
		comparisonAttrs.forEach((attr) => (
			result.push(
				<tr>
					<td style={{fontWeight: 'bold'}}>{attr.name}</td>
					{ row(attr) }
				</tr>
			)
		))		
		return result
	}

	getTable() {
		//const getEntities = [<th className='compare-entity-name'>g</th>]
		const getEntities = this.props.selectedEntities.slice(0, 3).map((entity) => (
			<th className='compare-entity-name'>
				{this.toTitleCase(entity)}
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
						<Entities entities={this.props.entities} selectedIndexOf={this.props.selectedIndexOf} handleChangeSelectedEntities={this.handleChangeSelectedEntities} selectedEntities={this.props.selectedEntities}/>
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