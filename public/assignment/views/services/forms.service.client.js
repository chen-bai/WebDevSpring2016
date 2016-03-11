(function(){
    angular
        .module("FormBuilderApp")
        .factory("FormService", FormService);

    function FormService(){
        var forms = [
            {"_id": "000", "title": "Contacts", "userId": 123},
            {"_id": "010", "title": "ToDo",     "userId": 123},
            {"_id": "020", "title": "CDs",      "userId": 234}
        ];

        var api = {
            createFormForUser: createFormForUser,
            findAllFormsForUser: findAllFormsForUser,
            deleteFormById: deleteFormById,
            updateFormById: updateFormById
        };

        return api;

        function findAllFormsForUser(userId, callback) {
            var foundForms = [];
            for(var i in forms){
                if(userId == forms[i].userId){
                    foundForms.push(forms[i]);
                }
            }
            callback(foundForms);
        }

        function createFormForUser(userId, form, callback) {
            var newForm = {
                _id: (new Date).getTime(),
                title: form.title,
                userId: userId,
            };
            forms.push(newForm);
            callback(newForm);
        }

        function deleteFormById(formId, callback) {
            for (var i in forms) {
                if (forms[i]._id == formId) {
                    forms.splice(i, 1);
                    break;
                }
            }
            callback(forms);
        }

        function updateFormById(formId, newForm, callback) {
            for (var i in forms) {
                if (forms[i]._id == formId) {
                    forms[i] = newForm;
                    callback(newForm);
                    break;
                }
            }
        }
    }
})();