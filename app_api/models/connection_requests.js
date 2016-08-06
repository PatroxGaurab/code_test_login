var mongoose = require( 'mongoose' );

var connection_requestSchema = new mongoose.Schema({
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    unique: true,
    required: true
  },
  connection_requests: [
    mongoose.Schema.Types.ObjectId
  ]
});


mongoose.model('Connection_request', connection_requestSchema);
