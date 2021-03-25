const LocalStrategy = require('passport-local').Strategy;

const {pool} = require('./dbConfig');

const bcrypt = require("bcrypt");


function initialize(passport){
    
    const authenticateUser = (login,password,done)=>{
        pool.query('select * from app_user where login = $1',[login],(err,results)=>{
            if(err)
                throw err;
            
            if(results.rows.length > 0 ){
                const user = result.rows[0];
    
                bcrypt.compare(password,user.password,(err,isMatch)=>{
                    if(err)
                        throw err;
    
                    if(isMatch)
                        return done(null,user);
                    else
                        return done(null,false,{message:"Password is not correct"});
                    
                });
            }
            else{
                return done(null,false,{message:"There is no such user"});
            }
        });
    };

    passport.use(new LocalStrategy({
        usernameField:'login',
        passwordField: "password"
    },authenticateUser));

    passport.serializeUser((user,done)=>{
        done(null,user.id);
    });
    
    passport.deserializeUser((id,done,)=>{
        pool.query(
            'SELECT * FROM app_user WHERE id = $1',
            [id],
            (err,result)=>{
                if(err)
                    throw err;
                return done(null,results.rows[0]);
            }
        )
    });

}



module.exports = initialize;