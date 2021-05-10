const {Router} = require('express')
const {pool} = require('../dbConfig')
const{check,validationResult, body,query} = require('express-validator')
const router = Router()
const config = require('config')
const jwt = require('jsonwebtoken')
const bcrypt = require("bcrypt");
const authMid = require('../middleware/AuthMid')


router.get("/",
    [
        query('pageNumber')
            .if(body("startFrom").exists() && body("startFrom").exists())
                .not().exists().withMessage('присутствуют  дополнительные ключи ограничения ')
            .notEmpty().isNumeric().isInt({gt:0}).withMessage('Номер страницы обязан быть больше нуля').optional({nullable: true}),

        // check.query('startFrom')
        //     .if(body("pageNumber").exists())
        //         .not().exists().withMessage('присутствуют дополнительные ключи ограничения ')
        //     .if(body("offset").not().exists())
        //         .exists().withMessage("Не указан номер конечного индекса ")
        //     .notEmpty().isNumeric().isInt({gt:0}).withMessage('Номер начального индекса обязан быть числом больше нуля').optional({nullable: true}),

        // check.query('offset')
        //     .if(body("pageNumber").exists())
        //         .not().exists().withMessage('присутствуют дополнительные ключи ограничения ')
        //     .if(body("startFrom").not().exists())
        //         .exists().withMessage("Не указан номер начального индекса ")
        //     .notEmpty().isNumeric().isInt({min:1}).withMessage('Номер конечного индекса обязан быть числом больше нуля').optional({nullable: true}),
    ]
    ,(req,res)=>{
    
        const errors = validationResult(req);

        if(!errors.isEmpty()){
            return res.status(400).json({errors: errors.array(), message:'Некорректные данные при вводе '});
        }

    //return res.status(200).send({status:"нрааааааица "+req.body.pageNumber,VisitDate:new Date().toISOString().slice(0, 19).replace('T', ' ')})

    try{

        //return res.status(200).send({status:"нрааааааица "+req.body.pageNumber,VisitDate:new Date().toISOString().slice(0, 19).replace('T', ' ')})

        //const {pageNumber,startFrom,offset} = req.body

        const {startPoint:startFrom,endPoint:offset,pageNumber,tagName} = req.query // дададада я просто лентяй, ацтань
        
        if(pageNumber){
            const rowQuantity = 10

            pool.query(`SELECT * FROM tags
                        ORDER BY id
                        LIMIT $2 OFFSET $1`
        ,[rowQuantity * (pageNumber - 1), rowQuantity],(err,results)=>{

            if(err){
                throw err;
            }
            
            if(results.rows.length > 0 ){
                //const user = results.rows[0];
                res.status(201).json({result:results.rows});

            }
            else{
                return res.status(400).json({message:'список тэгов пуст '});
            }

            });
        }
        else if(startFrom && offset){
            pool.query(`SELECT * FROM tags
                        ORDER BY id
                        LIMIT $2 OFFSET $1`
                ,[Number(startFrom) - 1, Number(offset - startFrom) + 1],(err,results)=>{

                    if(err){
                        throw err;
                    }
                    
                    if(results.rows.length > 0 ){
                        res.status(201).json({result:results.rows});

                    }
                    else{
                        return res.status(400).json({message:'список тэгов пуст '});
                    }

                    });
        }
        else{
            pool.query(`SELECT * FROM tags
                        where name = $1`
                ,[tagName],(err,results)=>{

                    if(err){
                        throw err;
                    }
                    
                    if(results.rows.length > 0 ){
                        res.status(201).json({result:results.rows});

                    }
                    else{
                        return res.status(400).json({message:'список тэгов пуст '});
                    }

                    });
        }
        
        }
        catch(e){
            console.log(e.message)
            res.status(500).json({message:'Something went Wrong'})
        }

    

});


router.post('/', (req,res)=>{

    //return res.status(500).json({message:'Something went Wrong'})

    const{name,authorsid,booksid,directionsid,complexity} = req.body

    try{  
        pool.query(
            `select id from tag where name = $1 `,
            [name],
            (err,result)=>{
                try{
                    if(err){
                        throw err;
                    }
                    let currentID = Number()

                    if(result.rows.length > 0)
                        currentID = result.rows[0].id
                     
                   
                    if(result.rows.length <= 0){

                        if(!req.body.complexity){
                            
                            return res.status(400).json({message:'Отсутствует уровень сложности в новом теге'});
                        }
                        
                        
                        pool.query('INSERT INTO tag(name,complexity) VALUES($1,$2) returning id',
                        [name,complexity]
                        ,(err,result1)=>{
                            if(err)
                                throw err;
                            
                            currentID =  result1.rows[0].id

                            for ( value in req.body.authorsid) {
                                pool.query('INSERT INTO author_tag(tag,author) VALUES($1,$2)',
                                    [currentID,value],
                                    (err)=>{
                                        if(err)
                                            throw err;
                                    })
                            }
                        
                            for ( value in req.body.booksid) {
                                pool.query('INSERT INTO book_tag(tag,book) VALUES($1,$2) ',
                                    [currentID,value],
                                    (err)=>{
                                        if(err)
                                            throw err;
                                    })
                            }
                        
                            for ( value in req.body.directionsid) {
                                pool.query('INSERT INTO direct_tag(tag,direction) VALUES($1,$2) returning id',
                                    [currentID,value],
                                    (err)=>{
                                        if(err)
                                            throw err;
                                    })
                            }
                            return res.status(201).json({message:'Тэг обновлен '})
                            })

                    }
                    
                    for ( value in req.body.authorsid) {

                          pool.query('INSERT INTO author_tag(tag,author) VALUES($1,$2)',
                            [currentID,authorsid[value]],
                            (err)=>{
                                try{
                                    if(err)
                                        throw err
                                }
                                catch(error){
                                    return res.status(400).json({message:error.message});   
                                } 
                            })
                    }
                
                    for ( value in req.body.booksid) {
                        pool.query('INSERT INTO book_tag(tag,book) VALUES($1,$2) ',
                            [currentID,booksid[value]],
                            (err)=>{
                                try{
                                    if(err)
                                        throw err;
                                }
                                catch(error){
                                    return res.status(400).json({message:error.message});   
                                } 

                            })
                    }
                
                    for ( value in req.body.directionsid) {
                        pool.query('INSERT INTO direct_tag(tag,direction) VALUES($1,$2) returning id',
                            [currentID,directionsid[value]],
                            (err)=>{
                                try{
                                    if(err)
                                        throw err;
                                }
                                catch(error){
                                    return res.status(400).json({message:error.message});   
                                } 
                            })
                    }

                    return res.status(201).json({message:'Тэг обновлен '}) 
                }
                catch(error){
                    console.log("кэтч сработал")
                    return res.status(400).json({message:error.message});
                    
                }   
            }
        );       
    }
    catch(e){
        res.status(500).json({message:'Something went Wrong', detail: e.detail})
        return 
    }


})

//сделать валидацию нормальную


async function insertItems (currentID,value,tagName,column)  {
    return new Promise( (resolve) => {
        pool.query('INSERT INTO '+tagName+'(tag,'+column+') VALUES($1,$2) returning id',
        [currentID,value], (error) => {
              resolve   ({result: !error});
            });
        }); 
} 



module.exports = router