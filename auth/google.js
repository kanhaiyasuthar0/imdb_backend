const passport =require("passport")
const GoogleStrategy = require('passport-google-oauth20').Strategy;

passport.serializeUser(function(user, done) {
    done(null, user);
});

passport.deserializeUser(function(user, done) {
        done(null, user);
});

passport.use(new GoogleStrategy({
        clientID:"509599533215-ujobissjhcglik8rcrjt809en4qbqrfp.apps.googleusercontent.com",
        clientSecret:"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",
        // callbackURL: "https://google.com",
        // callbackURL: "https://imdbbackend.herokuapp.com/google/callback",
        callbackURL: "http://localhost:9007/google/callback",
        passReqToCallback   : true
    },
    function(request, accessToken, refreshToken, profile, done) {
            return done(null, profile);
    }
));

module.exports = passport;