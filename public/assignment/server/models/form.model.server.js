var forms = require("./form.mock.json");

module.exports = function () {
    var api = {
        create: create,
        findAllFormsForUser: findAllFormsForUser,
        findAll: findAll,
        findById: findById,
        findByTitle: findByTitle,
        remove: remove,
        update: update,
        findFields: findFields,
        findFieldById: findFieldById,
        removeField: removeField,
        createField: createField,
        updateField: updateField,
        updateAllFields: updateAllFields
    };

    return api;

    function create(form) {
        forms.push(form);
        return form;
    }

    function findAllFormsForUser(userId) {
        var allForms = [];
        for (var i in forms) {
            if (forms[i].userId == userId) {
                allForms.push(forms[i]);
            }
        }
        return allForms;
    }

    function findAll() {
        return forms;
    }

    function findById(formId) {
        var form;
        for (var i in forms) {
            if (forms[i]._id == formId) {
                form = forms[i];
                break;
            }
        }
        return form;
    }

    function findByTitle(title) {
        var form;
        for (var i in forms) {
            if (forms[i].title == title) {
                form = forms[i];
                break;
            }
        }
        return form;
    }

    function remove(formId) {
        var index;
        for (var i in forms) {
            if (forms[i]._id == formId) {
                index = i;
                break;
            }
        }
        forms.splice(index, 1);
        return forms;
    }

    function update(formId, form) {
        for (var i in forms) {
            if (forms[i]._id == formId) {
                forms[i] = form;
                break;
            }
        }
        return form;
    }

    function findFields(formId) {
        for (var i in forms) {
            if (forms[i]._id == formId) {
                return forms[i].fields;
            }
        }
    }

    function findFieldById(formId, fieldId) {
        var fields = [];
        var index;
        for (var i in forms) {
            if (forms[i]._id == formId) {
                fields = forms[i].fields;
                break;
            }
        }
        for (var i in fields) {
            if (fields[i]._id == fieldId) {
                index = i;
            }
        }
        return fields[index];
    }

    function removeField(formId, fieldId) {
        var formIndex;
        var fieldIndex;
        for (var i in forms) {
            if (forms[i]._id == formId) {
                formIndex = i;
                for(var j in forms[i].fields){
                    if(forms[i].fields[j]._id==fieldId){
                        fieldIndex = j;
                        break;
                    }
                }
                break;
            }
        }
        forms[formIndex].fields.splice(fieldIndex, 1);
        return forms[formIndex].fields;
    }

    function createField(formId, field){
        var index;
        for (var i in forms) {
            if (forms[i]._id == formId) {
                index = i;
                break;
            }
        }
        forms[index].fields.push(field);
        return forms[index].fields;
    }

    function updateField(formId, fieldId, field){
        var fieldIndex;
        var formIndex;
        for (var i in forms) {
            if (forms[i]._id == formId) {
                formIndex = i;
                for(var j in forms[i].fields){
                    if(forms[i].fields[j]._id == fieldId){
                        fieldIndex = j;
                        break;
                    }
                }
                break;
            }
        }
        forms[formIndex].fields[fieldIndex] = field;
        return forms[formIndex].fields;
    }

    function updateAllFields(formId, fields){
        for (var i in forms) {
            if (forms[i]._id == formId) {
                forms[i].fields = fields;
                return fields;
            }
        }
    }
};