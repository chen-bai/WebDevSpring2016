//var forms = require("./form.mock.json");

module.exports = function (db, mongoose) {
    var FormSchema = require("./form.schema.server.js")(mongoose);
    var FormModel = mongoose.model('Form', FormSchema);

    var FieldSchema = require("./field.schema.server.js")(mongoose);
    var FieldModel = mongoose.model('Field', FieldSchema);

    var api = {
        create: create,
        findAllFormsForUser: findAllFormsForUser,
        findAll: findAll,
        findById: findById,
        findByTitle: findByTitle,
        remove: remove,
        update: update,
        updateFormField: updateFormField,
        removeFieldFormForm: removeFieldFormForm,
        findFields: findFields,
        findFieldById: findFieldById,
        removeField: removeField,
        createField: createField,
        updateField: updateField,
        addFieldToForm: addFieldToForm,
        updateAllFieldsForForm: updateAllFieldsForForm
    };

    return api;

    function create(form, callback) {
        FormModel.create(form, callback);
    }

    function findAllFormsForUser(userId, callback) {
        FormModel.find({userId: userId}, callback);
    }

    function findAll(callback) {
        FormModel.find(callback);
    }

    function findById(formId, callback) {
        FormModel.findById(formId, callback);
    }

    function findByTitle(title, callback) {
        FormModel.find({title: title}, callback);
    }

    function remove(formId, callback) {
        FormModel.remove({_id: formId}, callback);
    }

    function update(formId, form, callback) {
        FormModel.findOneAndUpdate({_id: formId}, {
            userId: form.userId,
            title: form.title,
            fields: form.fields,
            created: form.created,
            updated: Date.now()
        }, callback)
    }

    function updateFormField(formId, fieldId, field, callback) {
        FormModel.update({$and: [{_id: formId}, {'fields._id': fieldId}]},
            {
                $set: {
                    'updated': Date.now(),
                    'fields.$.label': field.label,
                    'fields.$.type': field.type,
                    'fields.$.placeholder': field.placeholder,
                    'fields.$.options': field.options
                }
            }, callback)
    }

    function findFields(formId, callback) {
        FormModel.findById(formId, callback);
    }

    function findFieldById(fieldId, callback) {
        FieldModel.findById(fieldId, callback);
    }

    function removeField(fieldId, callback) {
        FieldModel.remove({_id: fieldId}, callback);
    }

    function removeFieldFormForm(formId, fieldId, callback) {
        FormModel.update({_id: formId},
            {$pull: {fields: {_id: fieldId}}, $set: {updated: Date.now()}}, callback);
    }

    function createField(field, callback) {
        FieldModel.create(field, callback);
    }

    function updateField(fieldId, field, callback) {
        FieldModel.update({_id: fieldId},
            {
                $set: {
                    label: field.label,
                    type: field.type,
                    placeholder: field.placeholder,
                    options: field.options
                }
            }, callback)
    }

    function addFieldToForm(formId, field, callback) {
        FormModel.update({_id: formId}, {$push: {fields: field}, $set: {updated: Date.now()}}, callback);
    }

    function updateAllFieldsForForm(formId, fields, callback) {
        FormModel.update({_id: formId}, {$set: {fields: fields, updated: Date.now()}}, callback);
    }
};