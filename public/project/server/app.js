module.exports = function (app, db, mongoose) {
    var chancerModel = require("./models/user.model.server.js")(db, mongoose);
    var projectModel = require("./models/project.model.server.js")(db, mongoose);

    require("./services/user.service.server.js")(app, chancerModel);
    require("./services/project.service.server.js")(app, projectModel);
};