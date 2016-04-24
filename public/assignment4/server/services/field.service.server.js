//var uuid = require('node-uuid');

module.exports = function (app, formModel) {
    app.get('/api/assignment/form/:formId/field', function (req, res) {
        var formId = req.params.formId;
        formModel.findFields(formId, function (err, form) {
            res.json(form.fields);
        });
    });

    app.get('/api/assignment/form/:formId/field/:fieldId', function (req, res) {
        var fieldId = req.params.fieldId;
        formModel.findFieldById(fieldId, function (err, field) {
            res.json(field);
        });
    });

    app.delete('/api/assignment/form/:formId/field/:fieldId', function (req, res) {
        var formId = req.params.formId;
        var fieldId = req.params.fieldId;
        formModel.removeField(fieldId, function (err, result) {
            formModel.removeFieldFormForm(formId, fieldId, function (err, form) {
                formModel.findFields(formId, function (err, form) {
                    res.json(form.fields);
                })
            })
        });
    });

    app.post('/api/assignment/form/:formId/field', function (req, res) {
        var field = req.body;
        var formId = req.params.formId;
        formModel.createField(field, function (err, data) {
            formModel.addFieldToForm(formId, field, function (err, data) {
                formModel.findFields(formId, function (err, form) {
                    res.json(form.fields);
                })
            })
        });
    });

    app.put('/api/assignment/form/:formId/field/:fieldId', function (req, res) {
        var formId = req.params.formId;
        var fieldId = req.params.fieldId;
        var field = req.body;
        formModel.updateField(fieldId, field, function (err, result) {
            formModel.updateFormField(formId, fieldId, field, function (err, form) {
                formModel.findFields(formId, function (err, form) {
                    res.json(form.fields);
                })
            })
        });
    });

    app.put('/api/assignment/form/:formId/field', function (req, res) {
        var formId = req.params.formId;
        var fields = req.body;
        formModel.updateAllFieldsForForm(formId, fields, function (err, fields) {
            res.json(fields);
        });
    })
};