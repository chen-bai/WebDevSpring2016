(function () {
    angular
        .module("FormBuilderApp")
        .controller("FormController", FormController);

    function FormController($rootScope, FormService) {
        var userId = $rootScope.user._id;
        FormService.findAllFormsForUser(
            userId,
            function (response) {
                $rootScope.foundForms = response;
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

        var selectedFormIndex = -1;

        function selectForm(form) {
            selectedFormIndex = $rootScope.foundForms.indexOf(form);
            $rootScope.form = {
                _id: form._id,
                title: form.title,
                userId: form.userId
            };
        }

        function addForm(form) {
            var newForm = {
                _id: (new Date).getTime(),
                title: form.title,
                userId: userId
            };
            FormService.createFormForUser(
                userId,
                newForm,
                function (response) {
                    $rootScope.foundForms.push(response);
                    $rootScope.form = {};
                });
        }

        function updateForm(form) {
            if (selectedFormIndex >= 0) {
                var newForm = {
                    _id: $rootScope.form._id,
                    title: form.title,
                    userId: userId
                }
                FormService.updateFormById(
                    newForm._id,
                    newForm,
                    function (response) {
                        $rootScope.foundForms[selectedFormIndex] = response;
                        $rootScope.form = {};
                    })
            }
        }

        function deleteForm(form) {
            var formId = form._id;
            FormService.deleteFormById(
                formId,
                function (response) {
                    $rootScope.foundForms = response;
                    $rootScope.form = {};
                })
        }
    }

})
();