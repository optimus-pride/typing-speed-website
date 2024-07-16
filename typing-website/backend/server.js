import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import bodyParser from 'body-parser';
import session from 'express-session';
import passport from 'passport';
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
import userRoutes from './routes/userRoutes.js';


const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(session({ secret: 'your-session-secret', resave: false, saveUninitialized: true
}));
app.use(passport.initialize());
app.use(passport.session());


const MONGO_URI="mongodb+srv://aarya20225001:Fvb6TpKKfzAWVyNJ@cluster0.jr9dr2g.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";
mongoose.connect(MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(() => console.log('MongoDB connected'))
.catch(err => console.log(err));

// Passport Config
passport.use(new GoogleStrategy({
    clientID: '1099440537864-mr3o7l3kqktps6gtkodl19s52tg2pt7b.apps.googleusercontent.com',
    clientSecret: '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',
    callbackURL: '/auth/google/callback'
   }, async (token, tokenSecret, profile, done) => {
    try {
    let user = await user.findOne({ googleId: profile.id });
    if (!user) {
    user = new user({ googleId: profile.id, email: profile.emails[0].value });
    await user.save();
    }
    return done(null, user);
    } catch (err) {
    return done(err, false);
    }
}));

passport.serializeUser((user, done) => {
    done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
    try {
    const user = await user.findById(id);
    done(null, user);
    } catch (err) {
    done(err, null);
    }
});
   
//app.use('/api', userRoutes);
app.use('/users', userRoutes);


app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
