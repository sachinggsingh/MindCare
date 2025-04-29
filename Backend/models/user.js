const mongoose = require('mongoose');
// const Problem =  require('./problem')

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: function()
        {
            return !this.googleId; // Only require password if googleId is not present
        }
    },

    isAdmin: {
        type: Boolean,
        default: false
    },
    problemId :  {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'Problem',        
    },
    googleId: String,
    avatar: String,
    provider: {
        type: String,
        required: true,
        default: 'local',
        enum: ['local', 'google']
      }
},
timestamps = { createdAt: 'created_at', updatedAt: 'updated_at' }
);

userSchema.methods.generateToken = function() {
    return jwt.sign(
      { 
        _id: this._id,
        email: this.email,
        name: this.name
      },
      process.env.JWT_SECRET,
      { expiresIn: '7d' }
    );
  };
module.exports = mongoose.model('User', userSchema);