const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: String,
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  university: String,
  year: String,
  major: String,
<<<<<<< HEAD
  role: { type: String, default: 'user' },
  applications: [{
    opportunityId: { type: mongoose.Schema.Types.ObjectId, ref: 'Opportunity' },
    appliedAt: { type: Date, default: Date.now },
    status: { type: String, default: 'Under Review' }
  }]
});

module.exports = mongoose.model("User", userSchema);

=======
});

module.exports = mongoose.model("User", userSchema);
>>>>>>> 389172b320a9acd15435ecf0d2199276abbb2dc4
