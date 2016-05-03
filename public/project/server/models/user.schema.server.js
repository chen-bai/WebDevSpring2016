module.exports = function(mongoose){
    var UserSchema = new mongoose.Schema({
        username: String,
        password: String,
        email: String,
        firstName: String,
        lastName: String,
        phone: String,
        type: String,
        photo: String,
        displayName: String,
        headline: String,
        charge: Number,
        gender: String,
        country: String,
        marital: String,
        position: String,
        about: String,
        description: String,
        website: String,
        facebook: String,
        twitter: String,
        status: {type: String, default: 'active'},
        started: {type:Date, default: Date.now}
    }, {collection: 'chance.user'});

    return UserSchema;
};