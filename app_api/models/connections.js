var mongoose = require( 'mongoose' );

var connectionSchema = new mongoose.Schema({
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    unique: true,
    required: true
  },
  connections: [
    mongoose.Schema.Types.ObjectId
  ]
});


mongoose.model('Connection', connectionSchema);
