var app = angular.module('Sentiment', []);

app.controller('sentiment_manager', ['$scope', '$http', function($scope, $http){
	
	$scope.expectedArticleList = [], $scope.order = 'null', $scope.topEntityList = [], $scope.result = true, $scope.entityFilter = '';

	$scope.textChange = () => {
		if ($('#articleCount').val() != "") {
			$('#articleCount').addClass('filled');
		} else {
			$('#articleCount').removeClass('filled');
		}
	}

	$scope.viewArticle = (i) => {
		var requiredArticle = $scope.expectedArticleList[i];
		angular.element('#articleTitle').text(requiredArticle.title);
		angular.element('#articleBody').text(requiredArticle.article);
		angular.element('#articleViewer').modal('show');
	}

	var topEntityFinder = (articles) => {
		var topEntityList = {};
		for (var i = 0; i < articles.length; i++) {
			for (var j = 0; j < articles[i].entities.length; j++) {
				if (topEntityList[articles[i].entities[j].text] == undefined) {
					topEntityList[articles[i].entities[j].text] = 1;
				} 
				else{
					topEntityList[articles[i].entities[j].text]++;
				};
			};
		};
		var temp = [];
		for(var key in topEntityList){
			temp.push({name: key, count: topEntityList[key]});
		}
		topEntityList = temp;
		return topEntityList;
	}

	angular.element('#articleCountCollector').on('submit', (e) => {
		e.preventDefault();
		$http({
			method: 'GET',
			url: '/feed?offset=0&limit='+ ($scope.articleCount-1),
		})
		.then((resp)=> {
			$scope.result = false;
			$scope.expectedArticleList = resp.data;
			$scope.topEntityList = topEntityFinder($scope.expectedArticleList);
		}, 
		(e)=> {
			console.error(e)
		})
	});

	$scope.getSentiment = (senti) => {
	    switch (senti) {
	        case 'N':
	        return 'Neutral';
	        case 'Ne':
	        return 'Negative';
	        case 'VNe':
	        return 'Very Negative';
	        case 'P':
	        return 'Positive';
	        case 'VP':
	        return 'Very Positive';
	        default:
	        return 'Neutral';
	    };
	};

	$scope.entityFilterChange = (entity) => {
		$scope.entityFilter += ' ' + entity;
		console.log($scope.entityFilter);
	};
}])