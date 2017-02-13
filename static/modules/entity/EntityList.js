import React from 'react'
import EntityListItem from './EntityListItem'
const Constant = require('../constants')

class EntityList extends React.Component {
	constructor(props) {
		super(props)
	}

	render() {
		var handleClick = this.props.handleClick
		var selectedEntities = this.props.selectedEntities
		var topEntities = this.props.topEntities
		var selectedIndexOf = this.props.selectedIndexOf
		var allEntities = this.props.entities

		var entities = topEntities //this.props.filter == '' && selectedEntities.length == 0 ? topEntities : Array.from(new Set(topEntities.concat(allEntities)))

		const getEntityList = entities => entities.sort().map(
			(e) => <EntityListItem key={e} entity={e} selected={this.props.selectedIndexOf(e) != -1} onClick={handleClick} />
		)

		var filtered = entities.filter(
			(e) => e.toLowerCase().trim().indexOf(this.props.filter.toLowerCase().trim()) != -1
		).sort(function(a, b) {
			if (selectedIndexOf(a) != -1 && selectedIndexOf(b) == -1)
				return -1
			else if (selectedIndexOf(b) != -1 && selectedIndexOf(a) == -1)
				return 1
			return a.localeCompare(b)
		})

		return (
			<div className='entity-list'>
				{ getEntityList(filtered) }
			</div>
		)
	}
}

export default EntityList