import React from 'react'
import EntityListItem from './EntityListItem'

class EntityList extends React.Component {
	constructor(props) {
		super(props)
	}

	render() {
		var handleClick = this.props.handleClick
		var selectedEntities = this.props.selectedEntities
		const getEntityList = entities => entities.sort().map(
			(e) => <EntityListItem ref={key={e.name} entity={e} selected={selectedEntities.indexOf(e) != -1} onClick={handleClick} />
		)
		
		var filtered = []

		this.props.entities.forEach((entity) => {
			if (entity.name.toLowerCase().trim().indexOf(this.props.filter.toLowerCase().trim()) != -1)
				filtered.push(entity)
		})

		return (
			<ul className='entity-list'>
				{ getEntityList(filtered) }
			</ul>
		)
	}
}

export default EntityList