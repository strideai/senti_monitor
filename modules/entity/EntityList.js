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
		const getEntityList = entities => entities.sort().map(
			(e) => <EntityListItem key={e.name} entity={e} selected={selectedEntities.indexOf(e) != -1} onClick={handleClick} />
		)
		const selectedEntitiesIndex = function(article) {
			selectedEntities.forEach(e)
		}

		var filtered = this.props.entities.filter(
			(e) => e.name.toLowerCase().trim().indexOf(this.props.filter.toLowerCase().trim()) != -1
		)


		return (
			<ul className='entity-list'>
				{ getEntityList(filtered) }
			</ul>
		)
	}
}

export default EntityList