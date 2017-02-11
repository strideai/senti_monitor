import React from 'react'

class EntityListItem extends React.Component {
	constructor(props) {
		super(props)
		this.handleClick = this.handleClick.bind(this)
		this.getClassName = this.getClassName.bind(this)
	}

	handleClick() {
		this.props.onClick(this.props.entity)
	}

	getClassName() {
		return this.props.selected ? 'entity-list-right entity-list-item entity-list-item-selected' : 'entity-list-right entity-list-item'
	}

	render() {
		return (
			<div ref={(li) => this.entityListItem = li} onClick={this.handleClick} className={this.getClassName()}>
				{this.props.entity.name}
			</div>
		)
	}
}

export default EntityListItem