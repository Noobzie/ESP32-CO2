// measurementModel.js
var mongoose = require('mongoose');
// Setup schema
var permissionSchema = mongoose.Schema({
    api_key_id: {
        type: String,
        required: true
    },
    route: {
        type: String,
        required: true
    },
    postCall: Boolean,
    getCall: Boolean,
    putCall: Boolean,
    deleteCall: Boolean,
});
// Export Permission model
var Permission = module.exports = mongoose.model('Permission', permissionSchema);
module.exports.get = function (callback, limit) {
    Permission.find(callback).limit(limit);
}
