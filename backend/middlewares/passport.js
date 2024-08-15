import passport from 'passport'
import pkg from "passport-google-oauth20"
import dotenv from "dotenv"

dotenv.config()

const { Strategy: GoogleStrategy } = pkg;

passport.use(
    new GoogleStrategy(
        {
            clientID: process.env.CLIENT_ID,
            clientSecret: process.env.CLIENT_SECRET,
            callbackURL: "/auth/google/callback",
            scope: ["profile", "email"]
        },

        function (accessToken, refreshToken, profile, done) {
            console.log("Google Strategy Callback", profile);

            //access the information
            const userName = profile.displayName;
            const email = profile.emails ? profile.emails[0].value : null;
            const photoUrl = profile.photos ? profile.photos[0].value : null;

            console.log(userName, email, photoUrl);

            try {

                const user = {
                    id: profile.id,
                    userName: profile.displayName,
                    email: profile.emails[0].value,
                    photoUrl: profile.photos[0].value
                }
                return done(null, user)
            } catch (error) {
                return done(error, null)
            }
        }

    )
)

passport.deserializeUser((user, done) => {
    console.log("Deserializing user:", user);
    done(null, user);
});

passport.serializeUser((user, done) => {
    console.log("Serializing user:", user);
    done(null, user);
});



export default passport