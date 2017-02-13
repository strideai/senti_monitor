import React from 'react'
import CompareView2 from './CompareView2'

class Compare2 extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			selectedEntities: []
		}
	}

	render() {
		return (
			<div className='container-fluid' style={{marginTop: '14px'}}>
				<table className='table table-bordered compare-table'>
					<thead>
					</thead>
				</table>
			</div>
		)
	}
}

export default Compare2
