const {Router} = require('express')
const {pool} = require('../dbConfig')
const{check,validationResult} = require('express-validator')
const router = Router()
const config = require('config')
const jwt = require('jsonwebtoken')
const bcrypt = require("bcrypt");
const authMid = require('../middleware/AuthMid')
var fs = require('fs');

//router.use('/prefs',require('./UserPrefsRoutes'))

router.post('/auth/register', 
    [
        check('login','Отсутсвует логин').notEmpty(),
        check('email','некорректный Email').exists({ checkFalsy: true }).optional({ checkFalsy: true }).isEmail(),
        check('password','Некорретный пароль').isLength({min:6}),
        check('confirm','Отсутствует подтверждение пароля').notEmpty(),
        check(
            'confirm','пароль должен совпадать с подверждением пароля',
            ).custom((value, { req }) => value === req.body.password)
    ],
    async (req,res)=>{
    try{

        //console.log(req.body);
        const errors = validationResult(req);

        if(!errors.isEmpty()){
            return res.status(400).json({errors: errors.array(), message:'Некорректные данные'});
        }

        const {login,email,password} = req.body
        
        //console.log({ login,Pnumber,password,passwordConfirm});

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
                try{
                    if(err){
                        throw err;
                    }

                    if(results.rows.length> 0){
                        throw new Error("Такой пользователь уже существует")
                    }
                    
                    else{
                        pool.query(
                            'INSERT INTO app_user(login,password,email,registrationdate) VALUES($1,$2,$3,$4) RETURNING id,password,registrationdate',
                            [login,hashedPassword,email,new Date().toISOString().slice(0, 19).replace('T', ' ')],
                            (err,result)=>{
                                if(err)
                                    throw err;
                                    
                                //base profile configuration for new user 
                                pool.query(
                                    'INSERT INTO profile(name,surname,age,userid,imgpath) VALUES(\'sample name\',\'sample surname\',20,$1,\'0.jpg\')',
                                    [result.rows[0].id],
                                    (err,result)=>{
                                        if(err)
                                            throw err;
                                        
                                        return res.status(201).json({message:'Пользователь зарегистрирован'})
                                    }
                                ) 
                                    
                            }
                        )
                    }
                }
                catch(e){
                    res.status(500).json({message: e.message})
                }
            }
        );
    }
    catch(e){
        res.status(500).json({message:e.message})
    }
})


router.post('/auth/login',
    [
        check('email','некорректный Email').exists(),
        check('password','Введите пароль').exists()
    ],
    async (req,res)=>{
    try{
        
        const errors = validationResult(req);

        if(!errors.isEmpty()){
            return res.status(400).json({errors: errors.array(), message:'Некорректные данные при вводе пароля'});
        }

        const {email:login,password} = req.body


        pool.query(`SELECT * FROM app_user WHERE login = $1`,[login],(err,results)=>{
            if(err){
                console.log(err.message)
                throw err;
            }
            

            if(results.rows.length > 0 ){

                const user = results.rows[0];

                console.log("user",user)
                console.log("user password",password)

                bcrypt.compare(password,user.password,(err,isMatch)=>{
                    if(err){
                        console.log(err.message)
                        throw err;
                    }
    
                    if(!isMatch)
                        return res.status(400).json({message:'Некорректный пароль'});
                    
                    const token = jwt.sign(
                        {userID: user.id},
                        config.get('JWT_SECRET'),
                        {expiresIn:'5h'}
                    ) 
                    
                    console.log("token - ",token)



                    console.log({token ,userId:user.id})

                    res.json({token ,userId:user.id})    
                    
                });
            }
            else{
                return res.status(400).json({message:'Подобный юзер отсутствует '});
            }
        });
        
        }
        catch(e){
            console.log(e.message)
            res.status(500).json({message:'Something went Wrong'})
        }
})



router.get('/settings',authMid,(req,res)=>{
    try{
        pool.query(
            'SELECT app_user.registrationdate,app_user.login,app_user.phonenumber,app_user.email,profile.name,profile.surname,profile.age,profile.imgpath as image \
            FROM app_user  \
            JOIN profile ON app_user.Id = profile.userid WHERE app_user.id = $1 ;',
            [req.user.userID],
            (err,result1)=>{
                try{
                    if(err){
                        throw err;
                    }            
                    else{

                        result1.rows[0].image = fs.readFileSync('./resources/profileImage/'+result1.rows[0].image, 'base64');

                        res.status(201).json({message:result1.rows[0]});
                    }
                }
                catch(e){
                    res.status(500).json({message: e.message})
                }
            }
        );
        
    }
    catch(e){
        console.log(e.message)
        res.status(500).json({message:'Something went Wrong'})
    }
})
                        /**
                         * Valid telephone formats:
                         * (123) 456-7890
                         * (123)456-7890
                         * 123-456-7890
                         * 123.456.7890
                         * 1234567890
                         * +31636363634
                         * 075-63546725
                         *  */  
router.post('/settings',authMid,
            [
                check('phonenumber','некорректный номер телефона').matches(/^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im).optional({nullable: true}),
                check('name','некорректное имя').not().isNumeric().isLength({ min: 2,max:150}).optional({nullable: true}),
                check('surname','некорректная фамилия ').not().isNumeric().isLength({ min: 2,max:150}).optional({nullable: true}),
                check('age','некорректный возраст').isNumeric().isInt({gt:1,lt:122}).optional({nullable: true}),                            
                check('image','размер файла превышает 10MB').custom((value) =>  10485760 > Buffer.byteLength(value,'base64')).optional({nullable: true}),
                //check('image','файл не является изображением').custom((value) => {} )
            ],
            async (req,res)=>{
    try{
        

        const errors = validationResult(req);

        if(!errors.isEmpty()){
            return res.status(400).json({errors: errors.array(), message:'Некорректные данные при вводе '});
        }

        fs.writeFile('./resources/profileImage/'+req.user.userID+".png", req.body.image.split(/,\s*/)[1], {encoding: 'base64'}, function(err) {
            if(err)
                throw err;
        });
        
        // for (const [key, value] of Object.entries(req.body)) {
        // }

        if(req.body.phonenumber){
            pool.query(
                'UPDATE app_user SET phonenumber = $2 WHERE id = $1',
                [req.user.userID,req.body.phonenumber],
                (err)=>{
                    if(err)
                        throw err;   
                }
            )
        }

        var sqlString = 'UPDATE profile SET '
        var sqlValue = []
        
        for ( value in req.body) {
            //console.log(`${value}: ${req.body[value]}`);
            switch (value) {
                case 'name':
                    sqlString += ' name = $' + (sqlValue.length + 1) + ', '
                    sqlValue.push(req.body[value])
                    break;
                case 'surname':
                    sqlString += ' surname = $' + (sqlValue.length + 1) + ', '
                    sqlValue.push(req.body[value])
                    break;    
                case 'age':
                    sqlString += ' age = $' + (sqlValue.length + 1) + ', '
                    sqlValue.push(req.body[value])
                    break;
                case 'image':
                    sqlString += ' imgpath = $' + (sqlValue.length + 1) + ', '
                    sqlValue.push(req.user.userID+".png")
                    break;

            
            }
        }
        sqlString = sqlString.substring(0, sqlString.length - 2)

        sqlString += ' WHERE userid = $' + (sqlValue.length + 1)
        sqlValue.push(req.user.userID)

        pool.query(sqlString,sqlValue,
            (err)=>{
                if(err)
                    throw err;
                
            }
        ) 

        return res.status(201).json({message:'Профиль обновлен'})

        
    }
    catch(e){
        console.log(e.message)
        res.status(500).json({message:'Something went Wrong'})
    }
})





/*
    TODO: доделать (по хорошему) нормальное изменение пароля и почты 
*/


module.exports = router

