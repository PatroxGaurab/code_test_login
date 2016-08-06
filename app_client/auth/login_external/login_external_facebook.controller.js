(function() {
  
  angular
    .module('meanApp')
    .controller('login_external_facebookCtrl', ['$location','$scope','authentication','$routeParams','meanData',login_external_facebookCtrl]);

    function login_external_facebookCtrl ($location,$scope,authentication,$routeParams, meanData) {


	var vm = this;

	var googleUser = {};

    authentication.facebookCallback($routeParams)
      .success(function(data) {
        //vm.user = data;
	//var json_res=data;
	//alert();
	//var redirect_to=data.redirect_to;
	//alert(JSON.stringify(data));
	if(!data.username){
		$location.path('username');	
	}else{
		$location.path('profile');	
	}
	//window.location = redirect_to;
      })
      .error(function (e) {
        console.log(e);
      });

		  //vm.attachSignin = function() {
			      /*authentication
				.login_external(googleUser)
				.error(function(err){
				  alert(err);
				})
				.then(function(){
				  //$location.path('profile');
				});*/
				//$location.path('/api/login_external');
		 // }
/*	    gapi.load('auth2', function(){
	      // Retrieve the singleton for the GoogleAuth library and set up the client.
	      auth2 = gapi.auth2.init({
		client_id: '351684979720-masb6r4fokcqk13eo4qlko24qr8sbvlu.apps.googleusercontent.com',
		cookiepolicy: 'single_host_origin',
		// Request scopes in addition to 'profile' and 'email'
		//scope: 'additional_scope'
	      });
		var GoogleAuth  = gapi.auth2.getAuthInstance();
		  vm.attachSignin = function() {
                        GoogleAuth.signIn().then(function(response){//request to sign in
			    var user_ggl_name=response.getBasicProfile().getName();
			    var user_ggl_email=response.getBasicProfile().getEmail();
                            console.log(user_ggl_name +" " + user_ggl_email);
			      authentication
				.login_external(googleUser)
				.error(function(err){
				  alert(err);
				})
				.then(function(){
				  //$location.path('profile');
				});
                        });
		  }

	    });
*/
      	console.log('External controller is running');

    }

})();
