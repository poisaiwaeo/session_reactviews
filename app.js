const express = require('express')
const session = require('express-session')
const bodyParser = require('body-parser')

//EKSTRA FOR AT VIRKE PÅ HEROKU
//npm i session-file-store
var FileStore = require('session-file-store')(session);
var fileStoreOptions = {};

const TWO_HOURS = 1000 * 60 * 60 * 2

const {
    PORT = 4008,
    NODE_ENV = 'development',

    SESS_NAME = 'sid',                            //sid = sessionid
    SESS_SECRET = 'ssh!quit,it\'asecret!',       //så vi kan sign the cookie
    SESS_LIFETIME = TWO_HOURS
} = process.env

const IN_PROD = NODE_ENV === 'production'      //bliver til true når opp i productionmiljø  

// TODO: DB
const users = [
    {id: 1, name: 'Alex', email: 'alex@gmail.com', password: 'secret1' },
    {id: 2, name: 'Max', email: 'max@gmail.com', password: 'secret2' },
    {id: 3, name: 'Hagard', email: 'hagard@gmail.com', password: 'secret3' }
]

const app = express()

app.use(express.json())
app.use(bodyParser.urlencoded({
    extended: true
}))

//stylesheet
app.use('/public', express.static('public'));
// app.use(express.static('public'));

// REACT VIEWS - //https://github.com/reactjs/express-react-views
app.set('views', __dirname + '/views');   //mappe skal hedder views fordi der står at vi skal leder efter en mappe som hedder views
app.set('view engine', 'jsx');
app.engine('jsx', require('express-react-views').createEngine());

//ANT HEROKU:
app.set('trust proxy', 1);

//SESSION CONFIG (session-middewaree til express-server)
//se doc at man også kan gemme cookie i redis, mongodb
app.use(session({
    name: SESS_NAME,
    store: new FileStore(fileStoreOptions),
    resave: false,
    saveUninitialized: false,
    secret: SESS_SECRET,
    cookie: {
        maxAge:  SESS_LIFETIME,
        sameSite: true,
        secure: IN_PROD
    }
}))

const redirectLogin = (req, res, next) => {
    if (!req.session.userId) {
        res.redirect('/login')
    } else {
        next()
    }
}

const redirectHome = (req, res, next) => {
    if (req.session.userId) {
        res.redirect('/home')
    } else {
        next()
    }
}

app.use((req, res, next) => {
    const { userId } = req.session
    if (userId) {
        res.locals.user = users.find(
            user => user.id === userId)
    }
    next()
})

app.get('/', (req, res) => {
    const { userId } = req.session           //den sprøger om der er en cookie med, hvis der er så gemt den del
    console.log("/... userid: ", userId)

//     res.send(`
//     <h1> Welcome! </h1>
//     ${userId ? `
//     <a href='/home'> Home </a>
//     <form method='post' action='/logout'>
//       <button> Logout </button>
//     </form>
//     ` : `
//       <a href='/login'> Login </a>
//       <a href='/register'> Register </a>
//     `}   
//    `)

    res.render('index', {userId:userId, velkomsthilsen: "Velkommen til siden"})
})


app.get('/home', redirectLogin, (req, res) => {
    const { user } = res.locals
    //console.log(req.sessionID) 

    // res.send(`
    // <h1> Home </h1>
    // <a href='/'> Main </a>
    // <ul>
    //   <li> Name: ${user.name} </li>
    //   <li> Email: ${user.email} </li>
    // </ul>
    // `)

    res.render('pages/home', {user:user, velkomsthilsen: "Velkommen til siden"})
})


app.get('/login', redirectHome, (req, res) => {

    // res.send(`
    // <h1> Login </h1>
    // <form method='post' action='/login'>
    //    <input type='email' name='email' placeholder='Email' required />
    //    <input type='password' name='password' placeholder='Password' required />
    //    <input type='submit' />
    // </form>
    // <a href='/register'> Register </a>
    // `)

    res.render('pages/login',{ velkomsthilsen: "Velkommen til siden"} )
    
})

app.get('/register', redirectHome, (req, res) => {

    // res.send(`
    // <h1> Register </h1>
    // <form method='post' action='/register'>
    //    <input name='name' placeholder='Name ' required />
    //    <input type='email' name='email' placeholder='Email' required />
    //    <input type='password' name='password' placeholder='Password' required />
    //    <input type='submit' />
    // </form>
    // <a href='/login'> Login </a>
    // `)

    res.render('pages/register', { velkomsthilsen: "Velkommen til siden"})
    
})

app.post('/login', redirectHome, (req, res) => {
    const { email, password } = req.body

    if (email && password) { //TODO: validation
        const user = users.find(
            user => user.email === email && user.password === password)

       if (user) {
           req.session.userId = user.id
           return res.redirect('/home')
       }
    }

    res.redirect('/login')
})

app.post('/register', redirectHome, (req, res) => {
    const { name, email, password } = req.body

    if (name && email && password) { //TODO: validation
        const exists = users.some(
           user => user.email === email 
        )

        if (!exists) {
            const user = {
                id: users.length + 1,
                name,
                email,
                password 
            }

            users.push(user)

            req.session.userId = user.id

            return res.redirect('/home')
        }
    }

    res.redirect('/register')
})

app.post('/logout', redirectLogin, (req, res) => {
    req.session.destroy(err => {
        if (err) {
            return res.redirect('/home')
        }

        res.clearCookie(SESS_NAME)
        res.redirect('/login')
    })
})

app.listen(PORT, () => console.log(
    `http://localhost:${PORT}`
))