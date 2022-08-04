const {Router} = require('express')
const {pool} = require('../dbConfig')
const{check,validationResult, body,query} = require('express-validator')
const router = Router()
const config = require('config')
const jwt = require('jsonwebtoken')
const bcrypt = require("bcrypt");
const authMid = require('../middleware/AuthMid')


router.get("/progress",(req,res)=>{
    try{ 
        
            pool.query(`SELECT id,completed FROM stages
                        WHERE userid = $1
                        ORDER BY id`
                ,[req.user.userID],(err,results)=>{


                    if(err){
                        throw err;
                    }
                    
                    if(results.rows.length <= 0 ){
                        return res.status(400).json({message:'маршрут отcутствует '});
                    }

                    var i = 1
                    

                    for(value in results.rows){
                        results.rows[value].id = i++  //маленький костыль для читаймости 
                    }    

                    res.status(201).json({result:results.rows});


                    });
        }
        
        catch(e){
            console.log(e.message)
            res.status(500).json({message:'Something went Wrong'})
        }
});


router.get("/route",(req,res)=>{
    try{ 
            pool.query(`SELECT id,completed from stages where userid = $1 order by id`,
                [req.user.userID],async (err,results)=>{
                try{

                    if(err){
                        throw err;
                    }
                    
                    var i = 1

                    if(results.rows.length <= 0 ){
                        return res.status(400).json({message:'маршрут отутствует '});
                    }
                    
                    
                    for(value in results.rows){

                        results.rows[value].authors = (await pool.query(
                        `SELECT name,surname,patronymic,age,borndate,dieddate,resting_place FROM author WHERE id = ANY(
                        SELECT authorid FROM stage_author WHERE stageid = $1)`,[results.rows[value].id])).rows

                        results.rows[value].books = (await pool.query(
                            `SELECT page_count,publication_date,title FROM book WHERE id = ANY(
                            SELECT bookid FROM stage_book WHERE stageid = $1)`,[results.rows[value].id])).rows

                        results.rows[value].directions = (await pool.query(
                            `SELECT main_conception,history,first_date FROM direction WHERE id = ANY(
                            SELECT dirid FROM stage_dir WHERE stageid = $1)`,[results.rows[value].id])).rows  
                            
                            results.rows[value].id = i++     

                    }
                    res.status(201).json({route:results.rows});
                }
                catch(e){
                    console.log(e.message)
                    res.status(500).json({message:'Something went Wrong'})
                }
            }); 
        }
        catch(e){
            console.log(e.message)
            res.status(500).json({message:'Something went Wrong'})
        }
});


router.post('/complete',async (req,res)=>{
    try{

        const{stage,parts} = req.body

        var stageID = (await pool.query(`SELECT id FROM stages
                WHERE userid = $1
                ORDER BY id
                LIMIT 1 OFFSET $2
                `,[req.user.userID,stage - 1])).rows[0]

        if(!stageID){
            return res.status(400).json({message:'Этап отсутствует'});
        }
        
        stageID = stageID.id 

        for ( value in parts) {

            switch (parts[value]) {
                case 'book':
                await pool.query(`UPDATE stage_book SET completed = $1 WHERE stageid = $2`,[true,stageID])
                    break;
                case 'author':
                    await pool.query(`UPDATE stage_author SET completed = $1 WHERE stageid = $2`,[true,stageID])
                    break;    
                case 'direction':
                    await pool.query(`UPDATE stage_dir SET completed = $1 WHERE stageid = $2`,[true,stageID])
                    break;
                default:
                    break;        
            }
        }

        const bookReady = await pool.query(`select completed from stage_book where stageid = $1`,[stageID])
        const authorReady = await pool.query(`select completed from stage_author where stageid = $1`,[stageID])
        const dirReady = await pool.query(`select completed from stage_book where stageid = $1`,[stageID])


        const completeCheck = (object) =>{
            

            if(object.rows[0] == undefined || object.rows[0] == null)
                return true

            else {
                return object.rows[0].completed;
            }
        }

        if(  completeCheck(bookReady) &&
            completeCheck(authorReady) &&
            completeCheck(dirReady)
        ){
            await pool.query(`UPDATE stages SET completed = $1 WHERE id = $2`,[true,stageID])
        }

        return res.status(400).json({message:'Этап обновлен'});
    }
    catch(e){
        console.log(e)
        return res.status(500).json({message:'Something went Wrong', detail: e.detail})
    }   

    //добавить проверку на выполненость всего 

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

async function insertItems (currentID,value,tagName,column)  {
    return new Promise( (resolve) => {
        pool.query('INSERT INTO '+tagName+'(tag,'+column+') VALUES($1,$2) returning id',
        [currentID,value], (error) => {
              resolve   ({result: !error});
            });
        }); 
} 

module.exports = router