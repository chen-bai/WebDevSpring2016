(function () {
    angular
        .module("FormBuilderApp")
        .factory("FormService", FormService);

    function FormService($http) {
        var api = {
            createFormForUser: createFormForUser,
            findAllFormsForUser: findAllFormsForUser,
            deleteFormById: deleteFormById,
            updateFormById: updateFormById
        };

        return api;

        function findAllFormsForUser(userId) {
            return $http.get("/api/assignment/user/" + userId + "/form");
        }

        function createFormForUser(userId, form) {
            return $http.post("/api/assignment/user/" + userId + "/form", form);
        }

        function deleteFormById(formId) {
            return $http.delete("/api/assignment/form/" + formId);
        }

        function updateFormById(formId, newForm) {
            return $http.put("/api/assignment/form/"+formId, newForm);
        }
    }
})();