//var forms = require("./form.mock.json");

module.exports = function (db, mongoose) {
    var ProjectSchema = require("./project.schema.server.js")(mongoose);
    var ProjectModel = mongoose.model('Project', ProjectSchema);

    var api = {
        create: create,
        findAllProjectsForUser: findAllProjectsForUser,
        findProcessingProjectsForUser: findProcessingProjectsForUser,
        findAll: findAll,
        findById: findById,
        findByTitle: findByTitle,
        processById : processById,
        remove: remove,
        update: update,
        findJobs: findJobs
    };

    return api;

    function findJobs(userId){
        return ProjectModel.find({$and: [{status: "published"},{userId: {'$ne':userId}}]});
    }

    function create(project) {
        return ProjectModel.create(project);
    }

    function findAllProjectsForUser(userId) {
        return ProjectModel.find({userId: userId});
    }

    function findProcessingProjectsForUser(userId, status) {
        return ProjectModel.find({$and: [{userId: userId}, {status: status}]});
    }

    function processById(projectId, status){
        return ProjectModel.findOneAndUpdate({_id: projectId}, {status: status})
    }

    function findAll() {
        return ProjectModel.find();
    }

    function findById(projectId) {
        return ProjectModel.findById(projectId);
    }

    function findByTitle(title) {
        return ProjectModel.find({title: title});
    }

    function remove(projectId) {
        return ProjectModel.remove({_id: projectId});
    }

    function update(projectId, project) {
        return ProjectModel.findOneAndUpdate({_id: projectId}, {
            userId: project.userId,
            freelancerId: project.freelancerId,
            title: project.title,
            type: project.type,
            description: project.description,
            skills: project.skills,
            min: project.min,
            max: project.max,
            status: project.status,
            started: project.started,
            deadline: project.deadline,
            applications: project.applications
        })
    }
};