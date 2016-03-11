(function () {
    angular
        .module("FormBuilderApp")
        .controller("FormController", FormController);

    function FormController($rootScope, FormService) {
        var currentForms;
        console.log($rootScope.user._id);
        var userId = $rootScope.user._id;
        FormService.findAllFormsForUser(
            userId,
            function (response) {
                currentForms = response;
            });

        $rootScope.addForm = addForm;
        $rootScope.updateForm = updateForm;
        $rootScope.deleteForm = deleteForm;
        $rootScope.selectForm = selectForm;

        var selectedFormIndex = -1;

        function selectForm(form) {
            selectedFormIndex = $rootScope.forms.indexOf(form);
            $rootScope.form = {
                _id: form._id,
                title: form.title,
                userId: form.userId
            }
        }

        function addForm(form) {
            var newForm = {
                _id: (new Date).getTime(),
                title: form.title,
                userId: userId
            };

            FormService.createFormForUser(
                userId,
                form,
                function (response) {
                    currentForms.push(response);
                });
        }

        function updateForm(form) {
            if (selectedFormIndex >= 0) {
                FormService.updateFormById(
                    currentForms[selectedFormIndex]._id,
                    form,
                    function (response) {
                        currentForms[selectedFormIndex] = response;
                    })
            }
        }

        function deleteForm(formId) {
            if (selectedFormIndex >= 0) {
                FormService.deleteFormById(
                    formId,
                    function (response) {
                        currentForms.splice(selectedFormIndex, 1);
                    })
            }
        }
    }
})();