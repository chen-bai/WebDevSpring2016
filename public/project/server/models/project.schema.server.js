module.exports = function(mongoose){
    var AppSchema = require("./user.schema.server.js")(mongoose);

    var ProjectSchema = new mongoose.Schema({
        userId: String,
        freelancerId: String,
        title: String,
        type: String,
        description: String,
        skills: [String],
        min: Number,
        max: Number,
        status: {type: String, default: 'published'},
        started: {type: Date, default: Date.now},
        deadline: {type: Date, default: Date.now},
        applications: [AppSchema]
    }, {collection: 'chance.project'});

    return ProjectSchema;
};