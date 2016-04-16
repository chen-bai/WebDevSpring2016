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
                    field = {label: "New Text Field", type: "TEXT", placeholder: "New Field", options:[]};
                    break;
                case 'multi':
                    field = {label: "New Text Field", type: "TEXTAREA", placeholder: "New Field", options:[]};
                    break;
                case 'date':
                    field = {label: "New Date Field", type: "DATE", placeholder: "", options:[]};
                    break;
                case 'dropdown':
                    field = {
                        label: "New Dropdown",
                        type: "OPTIONS",
                        placeholder: "",
                        options: [{label: "Option 1", value: "OPTION_1"},
                            {label: "Option 2", value: "OPTION_2"},
                            {label: "Option 3", value: "OPTION_3"}]
                    };
                    break;
                case 'checkbox':
                    field = {
                        label: "New Checkboxes",
                        type: "CHECKBOXES",
                        placeholder: "",
                        options: [
                            {label: "Option A", value: "OPTION_A"},
                            {label: "Option B", value: "OPTION_B"},
                            {label: "Option C", value: "OPTION_C"}
                        ]
                    };
                    break;
                case 'radio' :
                    field = {
                        label: "New Radio Buttons",
                        type: "RADIOS",
                        placeholder: "",
                        options: [
                            {label: "Option X", value: "OPTION_X"},
                            {label: "Option Y", value: "OPTION_Y"},
                            {label: "Option Z", value: "OPTION_Z"}
                        ]
                    };
                    break;
                default:
                    field = {label: "New Text Field", placeholder: "New Field", options: []};
                    break;
            }
            return $http.post("/api/assignment/form/" + formId + "/field/", field);
        }
    }
}());