module.exports = function (app, db, mongoose, passport, LocalStrategy, userModel) {
    //var userModel = require("./models/user.model.server.js")(db, mongoose);
    var projectModel = require("./models/project.model.server.js")(db, mongoose);

    require("./services/user.service.server.js")(app, userModel, passport, LocalStrategy);
    require("./services/project.service.server.js")(app, projectModel);
};