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
	API_ROOT_URL: 'http://33ba36a6.ngrok.io'
}