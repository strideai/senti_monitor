import React from 'react'
const Constant = require('../constants')
import Entities from '../entity/Entities'
import update from 'immutability-helper'
import Nav from '../Nav'
import 'whatwg-fetch'
import Autosuggest from 'react-autosuggest'

const comparisonAttrs = [
	{attr: 'mentionsCount', name: 'Total mentions'}, 
	{attr: 'positiveRefs', name: 'Positive mentions'},
	{attr: 'negativeRefs', name: 'Negative mentions'}, 
	{attr: 'overallAvgScore', name: 'Average sentiment score'}
	//{attr: 'recentAvgScore', name: 'Recent sentiment score'}
]

class CompareView extends React.Component {
	constructor(props) {
		super(props)
		this.handleChangeSelectedEntities = this.handleChangeSelectedEntities.bind(this)
		this.getRows = this.getRows.bind(this)
		this.getTable = this.getTable.bind(this)
		this.onChange = this.onChange.bind(this)
		this.getSuggestions = this.getSuggestions.bind(this)
		this.onSuggestionsFetchRequested = this.onSuggestionsFetchRequested.bind(this)
		this.onSuggestionsClearRequested = this.onSuggestionsClearRequested.bind(this)
		this.state = {
			suggestions: [],
			value: '',
			selectedEntities: [undefined, undefined, undefined, undefined]
		}
		//this.getColWidth = this.getColWidth.bind(this)
	}

	toTitleCase(str) {
		try {
	    	return str.replace(/\w\S*/g, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();});
	    } catch(e) {
	    	return ''
	    }
	}

	handleChangeSelectedEntities(entity) {
		this.props.onClick(entity)
	}

	getRows() {
		var result = []
		const row = (attr) => this.state.selectedEntities.map((e) => (
			<td>{!(e == undefined) && attr.attr in e ? e[attr.attr] : ''}</td>
		))
		comparisonAttrs.forEach((attr) => (
			result.push(
				<tr>
					<td style={{fontWeight: 'bold'}}>{attr.name}</td>
					{ row(attr) }
				</tr>
			)
		))		
		return result
	}

	onChange (event, { newValue }) {
		this.setState({
			value: newValue
		})
	}

	onSuggestionsFetchRequested({ value }) {
	    this.setState({
	      suggestions: this.getSuggestions(value)
	    })
	}

	onSuggestionsClearRequested() {
	   this.setState({
	     suggestions: []
	   })
	}

	getSuggestions(value) {
		  const inputValue = value.trim().toLowerCase()
		  const inputLength = inputValue.length

		  return inputLength === 0 ? [] : this.props.entities.filter(e =>
		    e.toLowerCase().slice(0, inputLength) === inputValue
		  ).map((e) => this.toTitleCase(e))
	}

	getTable() {
		//const getEntities = [<th className='compare-entity-name'>g</th>]
		const getSuggestionValue = suggestion => suggestion
		const renderSuggestion = suggestion => (
		  <div style={{textAlign: 'left'}}>
		    {suggestion}
		  </div>
		)

		const getEntities = [0, 1, 2, 3].map((i) => {
			const inputProps = {
				placeholder: 'Search entities',
				value: this.state.currentAutoComplete == i ? this.state.value : '',
				onChange: this.onChange,
				className: 'compare-head-input',
				autoFocus: true,
				onFocus: () => { this.setState({currentAutoComplete: i}); alert(i); }
			}

			const onSuggestionSelected = (s, event) => {
				var entity = s.target.innerHTML
				console.log(entity.innerHTML)
				this.onSuggestionsClearRequested()
				fetch(Constant.API_ROOT_URL + '/compare?entities=' + entity)
					.then(function(response) {
						return response.json()
					}).then(function(json) {
						var prev = this.state.selectedEntities
						if ('hello' in json[0])
							return
						prev[i] = json[0]
						console.log(json[0])
						this.setState({value: ''})
						this.setState({selectedEntities: prev})
					}.bind(this))
			}
			
			return (
				<th valign='center' className='compare-entity-name'>
				{ this.state.selectedEntities[i] 
					? (
						<div>
							<span onClick={() => this.setState({currentAutoComplete: i})} style={{color: 'white', textAlign: 'center'}}> 
								{this.toTitleCase(this.state.selectedEntities[i].name)} 
							</span>
							<span onClick={() => {var t = this.state.selectedEntities; t[i] = undefined; this.forceUpdate()}} style={{cursor: 'pointer', marginLeft: '3px', color: 'white', textDecoration: 'underline', fontSize: '12px'}}>
								(Change)
							</span>
						</div>)
					: 
						(this.state.currentAutoComplete == i
							? (<Autosuggest
								id={i + ''}
								suggestions={this.state.suggestions}
								onSuggestionsFetchRequested={this.onSuggestionsFetchRequested}
						        onSuggestionsClearRequested={this.onSuggestionsClearRequested}
						        getSuggestionValue={getSuggestionValue}
						        renderSuggestion={renderSuggestion}
						        onSuggestionSelected={onSuggestionSelected}
						        inputProps={inputProps}
							/>)
							: (<button className='btn btn-secondary compare-add-entity' onClick={() => this.setState({currentAutoComplete: i})} style={{textAlign: 'center'}}>
								Add Entity
							</button>)
						/*<input type='text' className='compare-head-input form-control' placeholder='Add entity' />*/
						)
				}
				</th>
			)
		})
		getEntities.unshift((<th className='compare-entity-name'></th>))
		return (
			<div>
				<table className='table table-bordered' style={{display: this.props.selectedEntities.length > 0 ? 'table' : 'table'}}>
				<thead>
					<tr>
						{getEntities}
					</tr>
				</thead>
				<tbody>
					{this.getRows()}
				</tbody>
				</table>
			</div>
		)

	}

	render() {
		return (
			<div>
				<div className='container-fluid' style={{'marginTop': '14px'}}>
				<div className='row'>
					<h5 style={{marginLeft: '25px', color: 'blue'}}>Add entities to get started</h5>
					<div className='col-sm-12'>
						{ this.getTable() }
					</div>

				</div>
				</div>
			</div>
		)
	}
}

export default CompareView