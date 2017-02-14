import React from 'react'
import Autosuggest from 'react-autosuggest'

const comparisonAttrs = [
	{attr: 'mentionsCount', name: 'Total mentions'}, 
	{attr: 'positiveRefs', name: 'Positive mentions'},
	{attr: 'negativeRefs', name: 'Negative mentions'}, 
	{attr: 'overallAvgScore', name: 'Average sentiment score'}
]

const getSuggestions = value => {
  const inputValue = value.trim().toLowerCase()
  const inputLength = inputValue.length

  return inputLength === 0 ? [] : entities.filter(e =>
    e.toLowerCase().slice(0, inputLength) === inputValue
  )
}
const getSuggestionValue = suggestion => suggestion.name
const renderSuggestion = suggestion => (
  <div>
    {suggestion.name}
  </div>
)

class Compare2 extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			selectedEntities: [],
			suggestions: [],
			value: ''
		}
		this.getHead = this.getHead.bind(this)
		this.getBody = this.getBody.bind(this)
		this.onChange = this.onChange.bind(this)
		this.onSuggestionsFetchRequested = this.onSuggestionsFetchRequested.bind(this)
		this.onSuggestionsClearRequested = this.onSuggestionsClearRequested.bind(this)
	}

	onChange (event, { newValue }) {
		this.setState({
			value: newValue
		})
	}

	onSuggestionsFetchRequested({ value }) {
	    this.setState({
	      suggestions: getSuggestions(value)
	    })
	}

	onSuggestionsClearRequested() {
	   this.setState({
	     suggestions: []
	   })
	}

	getHead() {
		var selected = this.state.selectedEntities.slice(0, 4)
		var value = this.state.value
		const entities = this.props.entities

		const inputProps = {
			placeholder: 'Add entity',
			value,
			onChange: this.onChange
		}

		return (
			<tr>
				<th></th>
				
					<th>
						<Autosuggest
							suggestions={this.state.suggestions}
							onSuggestionsFetchRequested={this.onSuggestionsFetchRequested}
					        onSuggestionsClearRequested={this.onSuggestionsClearRequested}
					        getSuggestionValue={getSuggestionValue}
					        renderSuggestion={renderSuggestion}
					        inputProps={inputProps}
						/>
					</th>
				
			</tr>
		)
	}

	getBody() {
		return (
			<div></div>
		)
	}

	render() {
		return (
			<div className='container-fluid' style={{marginTop: '14px'}}>
				<table className='table table-bordered compare-table'>
					<thead>
						{ this.getHead() }
					</thead>
					<tbody>
						{ this.getBody() }
					</tbody>
				</table>
			</div>
		)
	}
}

export default Compare2
