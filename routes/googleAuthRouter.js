const router = require("express").Router();
const passport = require('passport');
const { isLoggedIn } = require("../middleware/isLogged");

router.get('/', (req, res) => {
    res.send('<a href="/auth/google">Authenticate with Google</a>');
});

// href="/auth/google
router.get('/protected', isLoggedIn, (req, res) => {
    res.send(`Hello ${req.user.displayName}`);
});

router.get('/google', passport.authenticate('google', { scope: ['email', 'profile'] }));

router.get('/google/callback',
    passport.authenticate('google', {
        successRedirect: '/auth/protected',
        failureRedirect: '/auth/google/failure'
    })
);

router.get('/logout', (req, res) => {
    req.logout(function (err) {
        if (err) { return next(err); }
        res.redirect('/');
    });

    req.session.destroy();
    res.send('Goodbye!');
});

router.get('/google/failure', (req, res) => {
    res.send('Failed to authenticate..');
});

module.exports = router;