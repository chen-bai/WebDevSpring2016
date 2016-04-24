//var uuid = require('node-uuid');

module.exports = function (app, formModel) {
    app.get('/api/assignment/user/:userId/form', function (req, res) {
        var userId = req.params.userId;
        formModel.findAllFormsForUser(userId, function(err, forms){
            res.json(forms);
        });
    });

    app.get('/api/assignment/form/:formId', function(req,res){
        var formId = req.params.formId;
        formModel.findById(formId, function(err, form){
            res.json(form);
        });
    });

    app.delete('/api/assignment/user/:userId/form/:formId', function(req,res){
        var formId = req.params.formId;
        var userId = req.params.userId;
        formModel.remove(formId,function(err, result){
            formModel.findAllFormsForUser(userId, function(err, forms){
                res.json(forms);
            });
        });
    });

    app.post('/api/assignment/user/:userId/form', function(req,res){
        var form =req.body;
        form.userId = req.params.userId;
        formModel.create(form, function(err, result){
            formModel.findAllFormsForUser(form.userId, function(err, forms){
                res.json(forms);
            });
        });
    });

    app.put('/api/assignment/user/:userId/form/:formId', function(req, res){
        var form = req.body;
        var formId = req.params.formId;
        var userId = req.params.userId;
        formModel.update(formId, form, function(err, forms){
            formModel.findAllFormsForUser(userId, function(err, forms){
                res.json(forms);
            });
        });
    });
};