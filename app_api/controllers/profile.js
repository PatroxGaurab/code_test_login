var mongoose = require('mongoose');
var User = mongoose.model('User');
var Connection = mongoose.model('Connection');
var discourse_sso = require('discourse-sso');
var sso = new discourse_sso("MY_SECRET");

module.exports.isUsernameUnique = function(req, res) {
  if (!req.payload._id) {
    res.status(401).json({
      "message" : "UnauthorizedError: private profile"
    });
  } else {
	//res.status(200).json({is_unique: true});
	User.findOne({ 'username' : req.query.username }, function(err, user) {
		if(err){
			res.status(401).json({
		          "message" : "UnauthorizedError: private profile"
		        });
		}
		if(user){
			res.status(200).json({is_unique: false});
		}else{
			res.status(200).json({is_unique: true});
		}

        });
  }

};

module.exports.profileRead = function(req, res) {

  if (!req.payload._id) {
    res.status(401).json({
      "message" : "UnauthorizedError: private profile"
    });
  } else {
    User
      .findById(req.payload._id)
      .exec(function(err, user) {
	//res.redirect('http://www.google.com');
        //res.status(200).send({redirect_to: 'http://www.google.com'});
	//var sso_payload = req.query.sso; // fetch from incoming request 
	//var sig = req.query.sig; // fetch from incoming request 
	var redirect_to_url = 'http://54.169.85.240/session/sso_login?';
	//if(sso.validate(sso_payload, sig)) {
		//var nonce = sso.getNonce(sso_payload);
		//var userparams = {
			// Required, will throw exception otherwise 
			//"nonce": nonce,
			//"external_id": user._id,
			//"email": user.email,
			// Optional 
			//"username": "Pat",
			//"name": "Gaurab Patra"
		//};
		//var q = sso.buildLoginString(userparams);
		var q = "";
		res.status(200).json({redirect_to: redirect_to_url+q});
	//}
	//res.status(200).json({redirect_to: sig});
      });
  }
};

module.exports.saveUsername = function(req, res) {
  if (!req.payload._id) {
    res.status(401).json({
      "message" : "UnauthorizedError: private profile"
    });
  } else {
	//res.status(200).json({is_unique: true});

	User.findOneAndUpdate({ _id : req.payload._id }, { 'username' : req.body.params.username }, {upsert:true}, function(err, doc){
	    if (err) return res.send(500, { error: err });
	    return res.send("succesfully saved");
	});
  }

};

module.exports.profileEdit = function(req, res) {

  if (!req.payload._id) {
    res.status(401).json({
      "message" : "UnauthorizedError: private profile"
    });
  } else {

		res.status(200).json({headline:req.body.headline});

  }

};


module.exports.uploadImage = function(req, res) {

  if (!req.payload._id) {
    res.status(401).json({
      "message" : "UnauthorizedError: private profile"
    });
  } else {

		res.status(200).json({headline:"hi"});

  }

};

module.exports.connectToUser= function(req, res) {

  if (!req.payload._id) {
    res.status(401).json({
      "message" : "UnauthorizedError: private profile"
    });
  } else {
User.findOne({'username':req.body.params.username},function(err,data){
	if(data){
		var requested_id = data._id;

	Connection.findOneAndUpdate( {_id:req.payload._id,'connections':{'$ne':requested_id}} , {$push : { 'connections' : requested_id}}, {upsert:true}, function(err, doc){
	    if (err) return res.send(500, { error: err });
	    console.log(doc);
	    return res.send("succesfully saved");
	});

	}	
}
);

  }

};
