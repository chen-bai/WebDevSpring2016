(function () {
    angular
        .module("FormBuilderApp")
        .factory("FieldService", FieldService);

    function FieldService($http) {
        var api = {
            updateAllFieldsForForm: updateAllFieldsForForm,
            deleteFieldById: deleteFieldById,
            updateFieldById: updateFieldById,
            findFields: findFields,
            addField: addField
        };

        return api;

        function updateAllFieldsForForm(formId, fields){
            return $http.put("/api/assignment/form/"+formId+"/field", fields);
        }

        function findFields(formId) {
            return $http.get("/api/assignment/form/" + formId + "/field");
        }

        function deleteFieldById(formId, fieldId) {
            return $http.delete("/api/assignment/form/" + formId + "/field/" + fieldId);
        }

        function updateFieldById(fieldId, formId, field) {
            return $http.put("/api/assignment/form/" + formId + "/field/" + fieldId, field);
        }

        function addField(formId, fieldType) {
            var field;
            switch (fieldType) {
                case 'single':
                    field = {_id: null, label: "New Text Field", type: "TEXT", placeholder: "New Field"};
                    break;
                case 'multi':
                    field = {_id: null, label: "New Text Field", type: "TEXTAREA", placeholder: "New Field"};
                    break;
                case 'date':
                    field = {_id: null, label: "New Date Field", type: "DATE"};
                    break;
                case 'dropdown':
                    field = {
                        _id: null,
                        label: "New Dropdown",
                        type: "OPTIONS",
                        options: [{label: "Option 1", value: "OPTION_1"},
                            {label: "Option 2", value: "OPTION_2"},
                            {label: "Option 3", value: "OPTION_3"}]
                    };
                    break;
                case 'checkbox':
                    field = {
                        _id: null, label: "New Checkboxes", type: "CHECKBOXES", options: [
                            {label: "Option A", value: "OPTION_A"},
                            {label: "Option B", value: "OPTION_B"},
                            {label: "Option C", value: "OPTION_C"}
                        ]
                    };
                    break;
                case 'radio' :
                    field = {
                        _id: null, label: "New Radio Buttons", type: "RADIOS", options: [
                            {label: "Option X", value: "OPTION_X"},
                            {label: "Option Y", value: "OPTION_Y"},
                            {label: "Option Z", value: "OPTION_Z"}
                        ]
                    };
                    break;
                default:
                    field = {_id: null, label: "New Text Field", type: "EMAIL", placeholder: "New Field"};
                    break;
            }
            return $http.post("/api/assignment/form/" + formId + "/field/", field);
        }
    }
}());