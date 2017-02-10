import React from 'react'

class EntityListItem extends React.Component {
	constructor(props) {
		super(props)
	}

	handleClick() {
		this.props.onClick(this.props.entity)
	}

	getClassName() {
		return this.props.selected ? 'entity-list-item entity-list-item-selected' : 'entity-list-item'
	}

	render() {
		return (
			<li ref={(li) => this.entityListItem = li} onClick={this.handleClick} className={this.getClassName()}>
			<span className="entity-list-right badge badge-pill badge-default">
				{this.props.entity.name}
			</span>
			</li>
		)
	}
}

export default EntityListItem