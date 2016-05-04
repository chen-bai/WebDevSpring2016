module.exports = function (app, db, mongoose, passport, LocalStrategy, userModel) {
    //var userModel = require("./models/user.model.server.js")(db, mongoose);
    var formModel = require("./models/form.model.server.js")(db, mongoose);

    require("./services/user.service.server.js")(app, userModel, passport, LocalStrategy);
    require("./services/form.service.server.js")(app, formModel);
    require("./services/field.service.server.js")(app, formModel);
};