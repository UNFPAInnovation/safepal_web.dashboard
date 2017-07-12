import _ from 'lodash'
import React, { Component } from 'react'
import { Search, Container} from 'semantic-ui-react'

import { forwardTo } from '../utils'

export default class CaseSearch extends Component {
	constructor(props){
		super(props)
		this.handleSearchChange = this.handleSearchChange.bind(this)
		this.handleResultSelection = this.handleResultSelection.bind(this)
		this.resetSearch = this.resetSearch.bind(this)
		this.state = {searchResults: [], searchValue:'', searchLoading: false, demoVal: ''}
	}

	componentWillMount() {
		this.resetSearch()
	}

	resetSearch(){
		this.setState({
			searchLoading: false,
			searchValue: '',
			searchResults: null
		})
	}

	handleSearchChange(e, value){
		this.setState({
			searchLoading: true,
			searchValue: value
		})

		setTimeout(() => {
			if (this.state.searchValue.length < 1) return this.resetSearch()
			
			const searchString = new RegExp(_.escapeRegExp(this.state.searchValue), 'i') //escape search string, ignore case

			const isMatchPredicate = (result) => searchString.test(result.caseNumber)

			this.setState({
				searchLoading: false,
				searchResults: _.filter(this.props.dataSource, isMatchPredicate)
			}) 
		}, 500)
	}

	handleResultSelection(e, result){

		//open case here
		forwardTo('/dashboard/reports/' + result.caseNumber)
	}

	render(){
		const { searchLoading, searchResults, searchValue } = this.state

		return(
			<Container>
				<Search fluid
		  			placeholder='search cases'
		  			loading={searchLoading}
		  			onSearchChange={this.handleSearchChange}
		  			onResultSelect={this.handleResultSelection}
		  			results={searchResults}
		  			value={searchValue}
		  			resultRenderer={this.props.resultRenderer} 
		  			searchFullText={false} searchFields={['caseNumber', 'location']}/>
			</Container>
		)
	}
}