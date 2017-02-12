import React from 'react'
import CompareColumn from './CompareColumn'
const Constant = require('../constants')
import Entities from '../entity/Entities'
import update from 'immutability-helper'
import Nav from '../Nav'

class CompareView extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			selectedEntities: []
		}
		this.handleChangeSelectedEntities = this.handleChangeSelectedEntities.bind(this)
		this.getColumns = this.getColumns.bind(this)
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
	}

	getColWidth() {
		var len = this.state.selectedEntities.slice(0, 2).length
		return 'col-sm-' + (8 / len)
	}

	getColumns() {
		return this.state.selectedEntities.slice(0, 2).map((e) => (
			<div className={this.getColWidth()}>
				<CompareColumn key={e.name} entity={e} />
			</div>
		))
	}

	selectedIndexOf(entity) {
		var selected = this.state.selectedEntities
		for (var i = 0; i < selected.length; i++) {
			if (selected[i].name == entity.name)
				return i
		}
		return -1
	}

	render() {
		return (
			<div>
				<Nav active={Constant.pages.COMPARE} />
				<div className='container-fluid' style={{'marginTop': '14px'}}>
				<div className='row'>
					<div className='col-sm-1'></div>
					<div className='col-sm-3 entity-list-col'>
						<Entities selectedIndexOf={this.selectedIndexOf} handleChangeSelectedEntities={this.handleChangeSelectedEntities} selectedEntities={this.state.selectedEntities}/>
					</div>
					{ this.getColumns() }
				</div>
				</div>
			</div>
		)
	}
}

export default CompareView