import React from 'react'
import SearchBar from './SearchBar'
import EntityList from './EntityList'

class Entities extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			filter: ''
		}
		this.handleUserInput = this.handleUserInput.bind(this)
	}

	handleUserInput(filter) {
		this.setState({filter: filter})
	}

	render() {
		return (
			<div className='entities'>
				<SearchBar filter={this.state.filter} onUserInput={this.handleUserInput} />
				<EntityList selectedIndexOf={this.props.selectedIndexOf} handleClick={this.props.handleChangeSelectedEntities} selectedEntities={this.props.selectedEntities} entities={this.props.entities.sort(function(a, b) {return a.text.trim().localeCompare(b.text.trim())})} filter={this.state.filter} />
			</div>
		)
	}
}

export default Entities