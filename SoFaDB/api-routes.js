// api-routes.js
// Initialize express router
let router = require('express').Router();
let user;
// Set default API response
router.get('/', function (req, res) {
    res.json({
        status: 'API Its Working',
        message: 'Welcome to RESTHub ',
    });
});

// Import permission controller
var permissionController = require('./PermissionsController');
// measurement routes
router.route('/permissions')
    .get(permissionController.index)
    .post(permissionController.new);
router.route('/permissions/:permission_id')
    .get(permissionController.view)
    .patch(permissionController.update)
    .put(permissionController.update)
    .delete(permissionController.delete);
// Export API routes
module.exports = router;