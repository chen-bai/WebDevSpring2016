(function () {
    angular
        .module("ChanceApp")
        .factory("ProjectService", ProjectService);

    function ProjectService($http) {
        var api = {
            createProjectForUser: createProjectForUser,
            findAllProjectsForUser: findAllProjectsForUser,
            findAllProcessingProjectsForUser: findAllProcessingProjectsForUser,
            deleteProjectById: deleteProjectById,
            updateProjectById: updateProjectById,
            findAllJobs: findAllJobs,
            findAllJobsForUser: findAllJobsForUser,
            completeJobById: completeJobById
        };

        return api;

        function completeJobById(jobId){
            return $http.put("/api/chance/job/"+jobId+"/complete");
        }

        function findAllJobsForUser(userId){
            return $http.get("/api/chance/myjobs/"+userId);
        }

        function findAllJobs(userId){
            return $http.get("/api/chance/jobs/"+userId);
        }

        function findAllProjectsForUser(userId) {
            return $http.get("/api/chance/user/" + userId + "/project");
        }

        function findAllProcessingProjectsForUser(userId) {
            return $http.get("/api/chance/user/" + userId + "/processing");
        }

        function createProjectForUser(userId, project) {
            return $http.post("/api/chance/user/" + userId + "/project", project);
        }

        function deleteProjectById(userId, projectId) {
            return $http.delete("/api/chance/user/"+ userId+ "/project/" + projectId);
        }

        function updateProjectById(userId, projectId, project) {
            return $http.put("/api/chance/user/"+ userId+ "/project/"+projectId, project);
        }
    }
})();