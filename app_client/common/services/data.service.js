(function() {

  angular
    .module('meanApp')
    .service('meanData', meanData);

  meanData.$inject = ['$http', 'authentication'];
  function meanData ($http, authentication) {

    var getProfile = function (routeParams) {
      return $http.get('/api/profile', {
        headers: {
          Authorization: 'Bearer '+ authentication.getToken()
        }
      });
    };
    var isUsernameUnique = function (username) {
      return $http.get('/api/username?username='+username, {
        headers: {
          Authorization: 'Bearer '+ authentication.getToken()
        }
      });
    };
    var saveUsername = function (username) {
	var config = {
	 params: {username : username},
	 headers : {'Accept' : 'application/json'}
	};
      return $http.post('/api/username/save', config, {
        headers: {
          Authorization: 'Bearer '+ authentication.getToken()
        }
      });
    };
    var googleCallback = function (routeParams) {
      return $http.get('/api/auth/google?code='+routeParams.code
      );
    };
    var updateProfile = function (profileParams) {
      return $http.post('/api/profile', profileParams, {
        headers: {
          Authorization: 'Bearer '+ authentication.getToken()
        }
      });
    };

    var getPublicProfile = function (username) {
	var config = {
	 params: {username : username},
	 headers : {'Accept' : 'application/json'}
	};
      return $http.get('/api/profile/public', config);
    };

    var connectToUser = function (username) {
	var config = {
	 params: {username : username},
	 headers : {'Accept' : 'application/json'}
	};
      return $http.post('/api/profile/public/connect', config,{
        headers: {
          Authorization: 'Bearer '+ authentication.getToken()
	}
        });
    };

    return {
      getProfile : getProfile,
      isUsernameUnique : isUsernameUnique,
      saveUsername : saveUsername,
      updateProfile : updateProfile,
      getPublicProfile : getPublicProfile,
      connectToUser : connectToUser
    };
  }

})();
