// permissionController.js
// Import Permission model
Permission = require('./PermissionsModel');
// Handle index actions
exports.index = function (req, res) {
    Permission.get(function (err, permissions) {
        if (err) {
            res.json({
                status: "error",
                message: err,
            });
        }
        res.json({
            status: "success",
            message: "Permission retrieved successfully",
            data: permissions
        });
    });
};
// Handle create permission actions
exports.new = function (req, res) {
    var permission = new Permission();
    permission.api_key_id = req.body.api_key_id ? req.body.api_key_id : permission.api_key_id;
    permission.route = req.body.route;
    permission.postCall = req.body.postCall;
    permission.getCall = req.body.getCall;
    permission.putCall = req.body.putCall;
    permission.deleteCall = req.body.deleteCall();
// save the permission and check for errors
    permission.save(function (err) {
        // if (err)
        //     res.json(err);
        res.json({
            message: 'New Permission created!',
            data: permission
        });
    });
};
// Handle view permission info
exports.view = function (req, res) {
    Permission.findById(req.params.permission, function (err, permission) {
        if (err)
            res.send(err);
        res.json({
            message: 'Permission details loading..',
            data: permission
        });
    });
};
// Handle update Permission info
exports.update = function (req, res) {
    Permission.findById(req.params.permission, function (err, permission) {
        if (err)
            res.send(err);
        permission.api_key_id = req.body.api_key_id ? req.body.api_key_id : permission.api_key_id;
        permission.route = req.body.route;
        permission.postCall = req.body.postCall;
        permission.getCall = req.body.getCall;
        permission.putCall = req.body.putCall;
        permission.deleteCall = req.body.deleteCall();
// save the permission and check for errors
        permission.save(function (err) {
            if (err)
                res.json(err);
            res.json({
                message: 'Permission Info updated',
                data: permission
            });
        });
    });
};
// Handle delete Permission
exports.delete = function (req, res) {
    Permission.remove({
        _id: req.params.permission
    }, function (err, permission) {
        if (err)
            res.send(err);
        res.json({
            status: "success",
            message: 'Permission deleted'
        });
    });
};