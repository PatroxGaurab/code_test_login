(function() {
  
  angular
    .module('meanApp')
    .controller('usernameCtrl', ['$location','$scope','authentication','$routeParams','meanData',usernameCtrl]);

    function usernameCtrl ($location,$scope,authentication,$routeParams, meanData) {


	var vm = this;
  $scope.$watch("username", function(newValue, oldValue) {
	  if(newValue.length>0){	
		  $scope.checking = true;
	    meanData.isUsernameUnique($scope.username)
	      .success(function(data) {
		//alert(JSON.stringify($scope.username));

			$scope.usernameExists = !data.is_unique;

	      })
	      .error(function (e) {
		console.log(e);
	      })
	      .finally(function() {
		  $scope.checking = false;
	      });
	  }
    //return true;
  });

    vm.onSubmit = function () {
      meanData
        .saveUsername($scope.username)
        .error(function(err){
          alert(err);
        })
        .then(function(){
          $location.path('username');
        });
    };

      	console.log('Username controller is running');

    }

})();

