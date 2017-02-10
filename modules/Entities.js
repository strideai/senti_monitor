import React from 'react'
import SearchBar from './SearchBar'
import EntityList from './EntityList'

class Entities extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			filter: '',
			entities: [
				{name: 'SocGen'}, 
				{name: 'Bank of Baroda'}, 
				{name: 'Bank of India'}
			]
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
				<EntityList handleClick={this.props.handleChangeSelectedEntities} selectedEntities={this.props.selectedEntities} entities={this.state.entities} filter={this.state.filter} />
			</div>
		)
	}
}

export default Entities