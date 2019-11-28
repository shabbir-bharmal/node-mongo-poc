/**
 * Import node modules
 */
const mongoose = require('mongoose');
/**
 * User schema attributes
 */
const UserSchema = mongoose.Schema({
    'UserId': {
        'type': String
    },
    'ViewDate': {
        'type': Date
    },
    'ProductId': {
        'type': String
    }
});

/**
 * Export mongoose model
 */
//const UserView = mongoose.model('UserView', UserSchema);
mongoose.model('UserView', UserSchema)
const UserViewModal = mongoose.model('UserView')
module.exports = UserViewModal


/**
 * Add userView Data
 */
module.exports.adduserViewData = (newData, callback) => {
    console.log("newData", newData);
    UserViewModal.insertMany(newData, callback);
};

/**
 * Get Total number of userView count
 */
module.exports.getTotalUser = (callback) => {
    UserViewModal.count(callback);
};
/**
 * Get filtered data
 */
module.exports.getUniqueUser = (query, callback) => {
    UserViewModal.find(query,callback)
};