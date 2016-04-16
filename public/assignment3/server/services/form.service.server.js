var uuid = require('node-uuid');

module.exports = function (app, formModel) {
    app.get('/api/assignment/user/:userId/form', function (req, res) {
        var userId = req.params.userId;
        res.json(formModel.findAllFormsForUser(userId));
    });

    app.get('/api/assignment/form/:formId', function(req,res){
        var formId = req.params.formId;
        res.json(formModel.findById(formId));
    });

    app.delete('/api/assignment/form/:formId', function(req,res){
        var formId = req.params.id;
        res.json(formModel.remove(formId));
    });

    app.post('/api/assignment/user/:userId/form', function(req,res){
        var form =req.body;
        form._id = uuid.v1();
        form.userId = req.params.userId;
        res.json(formModel.create(form));
    });

    app.put('/api/assignment/form/:formId', function(req, res){
        var form = req.body;
        var formId = req.params.formId;
        res.json(formModel.update(formId, form));
    });
};