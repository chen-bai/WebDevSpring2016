(function () {
    angular
        .module("FormBuilderApp")
        .controller("FormController", FormController);

    function FormController($rootScope, FormService) {
        var userId = $rootScope.user._id;
        var selectedFormIndex = -1;
        $rootScope.form = {};

        FormService.findAllFormsForUser(userId)
            .then(function (response) {
                $rootScope.foundForms = response.data;
            });

        $rootScope.addForm = addForm;
        $rootScope.updateForm = updateForm;
        $rootScope.deleteForm = deleteForm;
        $rootScope.selectForm = selectForm;

        if(selectedFormIndex==-1){
            $rootScope.linkStyle = "linkDisabled";
        }

        function selectForm(index) {
            selectedFormIndex = index;
            var form = $rootScope.foundForms[index];
            $rootScope.form = {
                _id: form._id,
                userId: form.userId,
                title: form.title,
                fields: form.fields,
                created: form.created,
                updated: form.updated
            };
            $rootScope.linkStyle = "";
        }

        function addForm(form) {
            var newForm = {
                userId: userId,
                title: form.title,
                fields: []
            };
            FormService.createFormForUser(userId, newForm)
                .then(function (response) {
                    $rootScope.foundForms = response.data;
                    $rootScope.form = {};
                });
        }

        function updateForm(form) {
            if (selectedFormIndex >= 0) {
                var newForm = {
                    _id: $rootScope.form._id,
                    userId: userId,
                    title: form.title,
                    fields: form.fields,
                    created: form.created,
                    updated: form.updated
                };
                FormService.updateFormById(userId, newForm._id, newForm)
                    .then(function (response) {
                        $rootScope.foundForms = response.data;
                        $rootScope.form = {};
                        $rootScope.linkStyle = "linkDisabled";
                    })
            }
        }

        function deleteForm(index) {
            var formId = $rootScope.foundForms[index]._id;
            FormService.deleteFormById(userId ,formId)
                .then(function (response) {
                    $rootScope.foundForms.splice(index, 1);
                    $rootScope.form = {};
                    $rootScope.linkStyle = "linkDisabled";
                })
        }
    }
})();