const {Router} = require('express')
const {pool} = require('pg')
const{check,validationResult} = require('express-validator')
const router = Router()
const config = require('config')
const jwt = require('jsonwebtoken')
const bcrypt = require("bcrypt");


router.post('/register', 
    [
        check('email','некорректный Email').isEmail(),
        check('password','Некорретный пароль').isLength({min:6}),
        check(
            'passwordConfirm',
            'passwordConfirmation field must have the same value as the password field',
            ).exists().custom((value, { req }) => value === req.body.password)
    ],
    async (req,res)=>{
    try{
        console.log("HEADERS IN LOG REG ROUTSES NOW IS ", req.headers)
        console.log("BODY IN LOG REG ROUTSES NOW IS ", req)
        const errors = validationResult(req);

        if(!errors.isEmpty()){
            return res.status(400).json({errors: errors.array(), message:'Некорректные данные'});
        }

        const {login,email,password} = req.body
        
        
       // console.log({ login,Pnumber,password,passwordConfirm});

        // let errors = [];

        // if (!login || !Pnumber || !passwordConfirm || !password)
        //     errors.push({message:"Please,enter all fields"});

        // if(password.length < 7)
        //     errors.push({message:"Password length less than 7 characters"});
        
        // if(password != passwordConfirm)
        // errors.push({message:"password don't match"});

        // if(errors.length > 0 ){
        //     res.render('reg',{errors});
        // }

        let hashedPassword = await bcrypt.hash(password, 10);

        pool.query(
            `SELECT * FROM app_user WHERE login = $1 OR email = $2`,
            [login,email],
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
                            res.redirect('/user/login');
                        }
                    )
                }
            }
        );
        
        }
        catch(e){
            res.status(500).json({message:'Something went Wrong'})
        }
})


router.post('/login',
    [
        check('email','некорректный Email').isEmail(),
        check('password','Введите пароль').exists()
    ],
    async (req,res)=>{
    try{
        
        const errors = validationResult(req);

        if(!errors.isEmpty()){
            return res.status(400).json({errors: errors.array(), message:'Некорректные данные при вводе пароля'});
        }

        const {login,password,} = req.body
        
        let hashedPassword = await bcrypt.hash(password, 10);

        pool.query('select * from app_user where login = $1',[login],(err,results)=>{
            if(err)
                throw err;
            
            if(results.rows.length > 0 ){
                const user = result.rows[0];
                bcrypt.compare(password,user.password,(err,isMatch)=>{
                    if(err)
                        throw err;
    
                    if(!isMatch)
                        return res.status(400).json({message:'Некорректный пароль'});
                    
                    const toket = jwt.sign(
                        {userID: user.id},
                        config.get('JWT_SECRET'),
                        {expiresIn:'1h'}
                    ) 

                    res.json({token,userId:user.id})    
                    
                });
            }
            else{
                return res.status(400).json({message:'Подобный юзер отсутствует '});
            }
        });
        
        }
        catch(e){
            res.status(500).json({message:'Something went Wrong'})
        }
})


module.exports = router

