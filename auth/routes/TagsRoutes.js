const {Router} = require('express')
const {pool} = require('../dbConfig')
const{check,validationResult, body,query} = require('express-validator')
const router = Router()
const teacherMid = require('../middleware/TeacherMid')
const authMid = require('../middleware/AuthMid')
const config = require('config')
const jwt = require('jsonwebtoken')
const bcrypt = require("bcrypt");
const concurrently = require('concurrently')


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

            pool.query(`SELECT * FROM tag
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
            pool.query(`SELECT * FROM tag
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
            pool.query(`SELECT * FROM tag
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


router.post('/',authMid,teacherMid,async (req,res)=>{

    // TODO:добавить валидацию 
    //return res.status(500).json({message:'Something went Wrong'})

    const{name,authorsid,booksid,directionsid,complexity} = req.body

    try{  
        let currentID = await pool.query(`SELECT id FROM tag WHERE name = $1 `,[name]);  
        
        
        if( currentID.rows.length <= 0){
            currentID = (await pool.query('INSERT INTO tag(name,complexity) VALUES($1,$2) returning id',[name,complexity])).rows[0].id

            if(!req.body.complexity){
                    res.status(400).json({message:'Отсутствует уровень сложности в новом теге'});
            }

            for ( value in req.body.authorsid) {
                await pool.query('INSERT INTO author_tag(tag,author) VALUES($1,$2)',[currentID,authorsid[value]])
            }
        
            for ( value in req.body.booksid) {
                await pool.query('INSERT INTO book_tag(tag,book) VALUES($1,$2) ',[currentID,booksid[value]])
            }
        
            for ( value in req.body.directionsid) {
                await pool.query('INSERT INTO direct_tag(tag,direction) VALUES($1,$2)',[currentID,directionsid[value]])
            }

            return res.status(201).json({message:'Тэг добавлен '})
        
        }

        currentID = currentID.rows[0].id

        for ( value in req.body.authorsid) {    
            await pool.query('INSERT INTO author_tag(tag,author) VALUES($1,$2)',[currentID,authorsid[value]])
        }
        for ( value in req.body.booksid) {
            await pool.query('INSERT INTO book_tag(tag,book) VALUES($1,$2)',[currentID,booksid[value]])
        }
   
        for ( value in req.body.directionsid) {
            await pool.query('INSERT INTO direct_tag(tag,direction) VALUES($1,$2)',[currentID,directionsid[value]])
        }

        res.status(201).json({message:'Тэг обновлен'}) 
    }
    catch(e){
        res.status(500).json({message:'Something went Wrong', detail: e.detail,message:e.message})
    }

})

//сделать валидацию нормальную и рефакторинга завезти 


async function insertItems (currentID,value,tagName,column)  {
    return new Promise( (resolve) => {
        pool.query('INSERT INTO '+tagName+'(tag,'+column+') VALUES($1,$2) returning id',
        [currentID,value], (error) => {
              resolve   ({result: !error});
            });
        }); 
} 



module.exports = router