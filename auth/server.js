const express = require('express');
const app = express();
const {pool} = require("./dbConfig");
const bcrypt = require("bcrypt");
const session = require("express-session");
const flash = require("express-flash");
const passport = require("passport");
const config = require("config")
const authMid = require('./middleware/AuthMid')


const initializePassport = require("./passportConfig");

initializePassport(passport);

const PORT = config.get('PORT') || 5000//default;

//app.set('view engine',"ejs");
//app.use(express.urlencoded({extended:false}));
//app.use(flash());
//app.use(session({ secret: 'secret', /*encryption key */ resave: false,    saveUninitialized: false}));

app.use(passport.initialize());
app.use(passport.session());

app.use(express.json({extended: true}))
app.use(express.urlencoded({ extended: true }))

app.use('/user',require('./routes/UserRoutes'))
app.use('/tags',require('./routes/TagsRoutes'))
app.use('/education',authMid,require('./routes/EducationRoutes'))



//app.use('/user/prefs',require('./routes/UserPrefsRoutes'))


//app.use('/tags' )
//app.use('/prefs)
//app.use('/')

//TODO: get info request 

app.get("/",authMid,(req,res)=>{

    console.log("Пользователь ",req.user.userID," вошел в систему")

    res.status(200).send({status:"API фурычит и мурлычет нраица ",VisitDate:new Date().toISOString().slice(0, 19).replace('T', ' ')})

    //res.render("../client/src/styles/index-dark.html");
});






app.get("/users/reg",(req,res)=>{
    res.status(301).send({status:"deprecated"});
});

app.get("/users/log",(req,res)=>{
    res.status(301).send({status:"deprecated"});
});

app.get("/users/dash",(req,res)=>{
    res.status(301).send({status:"deprecated"});
    //res.render("dshboard",{user:"Conor"});
});


app.post('/users/reg', async (req,res)=>{
     
    res.status(301).send({status:"deprecated"});

    
    let {login,Pnumber,password,passwordConfirm} = req.body;

    console.log({ login,Pnumber,password,passwordConfirm});

    let errors = [];

    if (!login || !Pnumber || !passwordConfirm || !password)
        errors.push({message:"Please,enter all fields"});

    if(password.length < 7)
        errors.push({message:"Password length less than 7 characters"});
    
    if(password != passwordConfirm)
    errors.push({message:"password don't match"});

    if(errors.length > 0 ){
        res.render('reg',{errors});
    }
    
    else{
        let hashedPassword = await bcrypt.hash(password, 10);

        pool.query(
            `SELECT * FROM app_user WHERE login = $1`,
            [login],
            (err,results)=>{
                 if(err){
                     throw err;
                 }

                if(results.rows.length> 0){
                    errors.push({message:"This login has already registered"});
                    res.render("reg",{errors});
                }
                else{
                    pool.query(
                        'INSERT INTO app_user(login,password) VALUES($1,$2) RETURNING id,password',
                        [login,hashedPassword],
                        (err,result)=>{
                            if(err)
                                throw err;

                            req.flash('success_msg',"Registration complete");
                            res.redirect('/users/log');
                        }
                    )
                }
            }
        );

    }
    
});


app.post("users/login",passport.authenticate('local',{
    successRedirect: '/index', // if login successful
    failureRedirect: "/users/login",
    failureFlash: true
}), async (req,res)=>{
    res.status(301).send({status:"deprecated"});
})

app.listen(PORT,()=>{
    console.log(`server is runninng on port ${PORT}`);
});
