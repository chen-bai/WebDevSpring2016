//var uuid = require('node-uuid');

module.exports = function (app, projectModel) {
    app.get("/api/chance/myjobs/:userId", function (req, res) {
        var userId = req.params.userId;
        projectModel.findMyJobs(userId)
            .then(function (jobs) {
                    res.json(jobs);
                },
                function (err) {
                    res.status(400).send(err);
                });
    });

    app.get("/api/chance/jobs/:userId", function (req, res) {
        var userId = req.params.userId;
        projectModel.findJobs(userId)
            .then(function (jobs) {
                    res.json(jobs);
                },
                function (err) {
                    res.status(400).send(err);
                });
    });

    app.get('/api/chance/user/:userId/project', function (req, res) {
        var userId = req.params.userId;
        projectModel.findAllProjectsForUser(userId)
            .then(function (projects) {
                    res.json(projects);
                },
                function (err) {
                    res.status(400).send(err);
                })
    });

    app.get('/api/chance/user/:userId/processing', function (req, res) {
        var userId = req.params.userId;
        projectModel.findProcessingProjectsForUser(userId, 'processing')
            .then(
                function (project) {
                    res.json(project);
                },
                function (err) {
                    res.status(400).send(err);
                });
    });

    app.get('/api/chance/project/:projectId', function (req, res) {
        var projectId = req.params.projectId;
        projectModel.findById(projectId)
            .then(function (project) {
                    res.json(project);
                },
                function (err) {
                    res.status(400).send(err);
                });
    });

    app.delete('/api/chance/user/:userId/project/:projectId', function (req, res) {
        var projectId = req.params.projectId;
        var userId = req.params.userId;
        projectModel.remove(projectId)
            .then(function (count) {
                    projectModel.findAllProjectsForUser(userId)
                        .then(function (projects) {
                                res.json(projects)
                            },
                            function (err) {
                                res.status(400).send(err);
                            })
                },
                function (err) {
                    res.status(400).send(err);
                });
    });

    app.post('/api/chance/user/:userId/project', function (req, res) {
        var project = req.body;
        project.userId = req.params.userId;
        projectModel.create(project)
            .then(
                function (project) {
                    projectModel.findAllProjectsForUser(project.userId)
                        .then(function (projects) {
                                res.json(projects);
                            },
                            function (err) {
                                res.status(400).send(err);
                            });
                },
                function (err) {
                    res.status(400).send(err);
                });
    });

    app.put('/api/chance/job/:jobId/complete', function (req, res){
        var jobId = req.params.jobId;
        projectModel.completeJob(jobId, 'completed')
            .then(function(job){
                res.json(job)
            },
            function(err){
                res.status(400).send(err);
            })
    });

    app.put('/api/chance/user/:userId/project/:projectId', function (req, res) {
        var project = req.body;
        var projectId = req.params.projectId;
        var userId = req.params.userId;
        projectModel.update(projectId, project)
            .then(function (response) {
                projectModel.findById(projectId)
                    .then(function (project) {
                            res.json(project);
                        },
                        function (err) {
                            res.status(400).send(err);
                        });
            }, function (err) {
                res.status(400).send(err);
            });
    });
};