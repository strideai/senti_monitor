module.exports = {
	sortOptions: {
		DATE: 1,
		SENTIMENT: 2
	},
	sentiments: {
		'N': 'Neutral',
		'P': 'Positive',
		'VP': 'Very positive',
		'Ne': 'Negative',
		'VNe': 'Very Negative'
	},
	pageUrls: {
		'/': 1,
		'/rules': 2,
		'/compare': 3
	},
	pages: {
		HOME: 1,
		RULES: 2,
		COMPARE: 3
	},
	operator: {
		LT: 0,
		LTE: 1,
		E: 2,
		GT: 3,
		GTE: 4,
		NE: 5
	},
	API_ROOT_URL: 'http://54.175.46.132:8000'
}