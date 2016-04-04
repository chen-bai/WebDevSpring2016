var uuid = require('node-uuid');

module.exports = function (app, formModel) {
    app.get('/api/assignment/form/:formId/field', function (req, res) {
        var formId = req.params.formId;
        res.json(formModel.findFields(formId));
    });

    app.get('/api/assignment/form/:formId/field/:fieldId', function(req,res){
        var formId = req.params.formId;
        var fieldId = req.params.fieldId;
        res.json(formModel.findFieldById(formId, fieldId));
    });

    app.delete('/api/assignment/form/:formId/field/:fieldId', function(req,res){
        var formId = req.params.formId;
        var fieldId = req.params.fieldId;
        res.json(formModel.removeField(formId, fieldId));
    });

    app.post('/api/assignment/form/:formId/field', function(req,res){
        var field = req.body;
        var formId = req.params.formId;
        field._id = uuid.v1();
        res.json(formModel.createField(formId, field));
    });

    app.put('/api/assignment/form/:formId/field/:fieldId', function(req, res){
        var formId = req.params.formId;
        var fieldId = req.params.fieldId;
        var field = req.body;
        res.json(formModel.updateField(formId, fieldId, field));
    });
};