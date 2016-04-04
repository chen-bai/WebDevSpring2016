(function () {
    angular
        .module("FormBuilderApp")
        .controller("FormController", FormController);

    function FormController($rootScope, FormService) {
        var userId = $rootScope.user._id;
        var selectedFormIndex = -1;

        FormService.findAllFormsForUser(userId)
            .then(function (response) {
                $rootScope.foundForms = response.data;
            });

        $rootScope.addForm = addForm;
        $rootScope.updateForm = updateForm;
        $rootScope.deleteForm = deleteForm;
        $rootScope.selectForm = selectForm;
        $rootScope.form = {
            _id: null,
            title: null,
            userId: userId
        }

        if(selectedFormIndex==-1){
            $rootScope.linkStyle = "linkDisabled";
        }

        function selectForm(index) {
            selectedFormIndex = index;
            var form = $rootScope.foundForms[index];
            $rootScope.form = {
                _id: form._id,
                title: form.title,
                userId: form.userId,
                fields: form.fields
            };
            $rootScope.linkStyle = "";
        }

        function addForm(form) {
            var newForm = {
                _id: null,
                title: form.title,
                userId: null,
                fields: []
            }
            FormService.createFormForUser(userId, newForm)
                .then(function (response) {
                    $rootScope.foundForms.push(response.data);
                    $rootScope.form = {};
                });
        }

        function updateForm(form) {
            if (selectedFormIndex >= 0) {
                var newForm = {
                    _id: $rootScope.form._id,
                    title: form.title,
                    userId: userId,
                    fields: form.fields
                }
                FormService.updateFormById(newForm._id, newForm)
                    .then(function (response) {
                        $rootScope.foundForms[selectedFormIndex] = response.data;
                        $rootScope.form = {};
                        $rootScope.linkStyle = "linkDisabled";
                    })
            }
        }

        function deleteForm(index) {
            var formId = $rootScope.foundForms[index]._id;
            FormService.deleteFormById(formId)
                .then(function (response) {
                    $rootScope.foundForms.splice(index, 1);
                    $rootScope.form = {};
                    $rootScope.linkStyle = "linkDisabled";
                })
        }
    }

})();