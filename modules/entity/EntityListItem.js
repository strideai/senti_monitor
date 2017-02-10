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
		return this.props.selected ? 'entity-list-right badge badge-pill badge-default entity-list-item entity-list-item-selected' : 'entity-list-right badge badge-pill badge-default'
	}

	render() {
		return (
			<li ref={(li) => this.entityListItem = li} onClick={this.handleClick} className='entity-list-item'>
			<span className={this.getClassName()}>
				{this.props.entity.name}
			</span>
			</li>
		)
	}
}

export default EntityListItem