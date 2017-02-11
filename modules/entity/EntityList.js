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
		var selectedIndexOf = this.props.selectedIndexOf
		const getEntityList = entities => entities.sort().map(
			(e) => <EntityListItem key={e.name} entity={e} selected={selectedEntities.indexOf(e) != -1} onClick={handleClick} />
		)

		var filtered = this.props.entities.filter(
			(e) => e.name.toLowerCase().trim().indexOf(this.props.filter.toLowerCase().trim()) != -1
		).sort(function(a, b) {
			if (selectedIndexOf(a) != -1 && selectedIndexOf(b) == -1)
				return -1
			else if (selectedIndexOf(b) != -1 && selectedIndexOf(a) == -1)
				return 1
			return 0
		})

		return (
			<div className='entity-list'>
				{ getEntityList(filtered) }
			</div>
		)
	}
}

export default EntityList