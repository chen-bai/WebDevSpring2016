(function () {
    angular
        .module("FormBuilderApp")
        .controller("FieldController", FieldController);

    function FieldController($rootScope, FieldService) {
        $rootScope.fields = $rootScope.form.fields;
        $rootScope.removeField = removeField;
        $rootScope.addField = addField;
        $rootScope.selectFieldInfo = selectFieldInfo;
        $rootScope.updateField = updateField;
        $rootScope.newField = {label: null, placeholder: null, options: []};

        FieldService.findFields($rootScope.form._id)
            .then(function (response) {
                $rootScope.fields = response.data;
            });

        function removeField(index) {
            var fieldId = $rootScope.fields[index]._id;
            var formId = $rootScope.form._id;
            FieldService.deleteFieldById(formId, fieldId)
                .then(function (response) {
                    $rootScope.fields = response.data;
                })
        }

        function addField(model) {
            var formId = $rootScope.form._id;
            var fieldType = model.fieldType;
            FieldService.addField(formId, fieldType)
                .then(function (response) {
                    $rootScope.fields = response.data;
                })
        }

        function selectFieldInfo(index) {
            var title = $rootScope.fields[index].type;
            switch (title) {
                case 'TEXT':
                    $rootScope.modalTitle = 'Single Line Text Field';
                    break;
                case 'TEXTAREA':
                    $rootScope.modalTitle = 'Multi Line Text Field';
                    break;
                case 'DATE':
                    $rootScope.modalTitle = 'Date Field';
                    break;
                case 'OPTIONS':
                    $rootScope.modalTitle = 'Dropdowm Field';
                    break;
                case 'CHECKBOXES':
                    $rootScope.modalTitle = 'Checkboxes Field';
                    break;
                case 'RADIOS':
                    $rootScope.modalTitle = 'Radio Buttons Field';
                    break;
                default:
                    $rootScope.modalTitle = 'Email Field';
                    break;
            }
            $rootScope.selectedFieldIndex = index;
        }

        function updateField(index, newField) {
            var title = $rootScope.modalTitle;
            var selectedField = $rootScope.fields[index];
            var formId = $rootScope.form._id;
            var field;
            var options = [];
            if (title == 'Multi Line Text Field' || title == 'Single Line Text Field') {
                field = {
                    _id: selectedField._id,
                    label: newField.label,
                    type: selectedField.type,
                    placeholder: newField.placeholder
                };
            } else {
                if (title == 'Date Field') {
                    field = {
                        _id: selectedField._id,
                        label: newField.label,
                        type: selectedField.type
                    };
                } else {
                    var values = newField.options.split("\n");
                    for (var i in values) {
                        var arr = values[i].split(":");
                        var option = {
                            label: arr[0],
                            value: arr[1]
                        };
                        options.push(option);
                    }
                    field = {
                        _id: selectedField._id,
                        label: newField.label,
                        type: selectedField.type,
                        options: options
                    }
                }
            }
            FieldService.updateFieldById(field._id, formId, field)
                .then(function (response) {
                    $rootScope.fields = response.data;
                    $rootScope.newField = {label: null, placeholder: null, options: []};
                })
        }
    }
})();