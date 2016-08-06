(function() {
  
  angular
    .module('meanApp')
    .controller('profileCtrl', profileCtrl);

  profileCtrl.$inject = ['$location','$routeParams', 'meanData', '$scope', '$http'];
  function profileCtrl($location, $routeParams, meanData, $scope, $http) {
    var vm = this;

    vm.user = {};

    meanData.getProfile($routeParams)
      .success(function(data) {
        vm.user = data;
	//var json_res=data;
	//alert();
	//var redirect_to=data.redirect_to;
	//alert(JSON.stringify(data));	
	//window.location = redirect_to;
      })
      .error(function (e) {
        console.log(e);
      });

	    $scope.getCommitData = function() {
		IN.API.Profile("me").fields(
		        [ "id", "firstName", "lastName", "pictureUrl",
		                "publicProfileUrl", "headline", "summary", "location", "positions" ]).result(function(result) {
		    //set the model
		    $scope.$apply(function() {
		        $scope.jsondata = result.values[0];
		  
		    });
		}).error(function(err) {
		    $scope.$apply(function() {
		        $scope.error = err;
		    });
		});
	    };

	    $scope.profileUpdate = function() {
		    meanData.updateProfile($scope.jsondata)
		      .success(function(data) {
			//vm.user = data;
			alert(JSON.stringify(data));
		      })
		      .error(function (e) {
			console.log(e);
		      });

	    };

        $scope.onFileSelect = function() {

        //$scope.upload($scope.file);
alert($scope.imgFile);


        };

  }

})();
