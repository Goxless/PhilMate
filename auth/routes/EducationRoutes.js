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
                        return res.status(400).json({message:'маршрут отутствует '});
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

router.get("/route", (req,res)=>{

    try{ 
        

            const sqlQuery=`SELECT    s.id, a.name,a.surname,a.age,a.borndate,a.dieddate,a.resting_place,
                                        b.title,b.page_count,b.publication_date,d.main_conception,d.history,d.first_date
                            FROM stages  as s
                                LEFT JOIN stage_author AS sa ON s.id = sa.stageid 
                                    LEFT JOIN author AS a ON sa.authorid = a.id
                                LEFT JOIN stage_book AS sb ON s.id = sb.stageid 
                                    LEFT JOIN book AS b ON sb.bookid = b.id
                                LEFT JOIN stage_dir AS sd ON s.id = sd.stageid 
                                    LEFT JOIN direction AS d ON sd.dirid = d.id	
                                WHERE s.userid = $1
                                order by s.id`

            pool.query(sqlQuery
                ,[req.user.userID],(err,results)=>{


                    if(err){
                        throw err;
                    }
                    
                    var i = 1

                    if(results.rows.length <= 0 ){
                        return res.status(400).json({message:'маршрут отутствует '});
   

                    }
                    
                    var author
                    var book
                    var dir
                    
                    for(value in results.rows){
                        results.rows[value].id = i++ 

                        if(results.rows[value].name){
                            results.rows[value].author = {
                                name:results.rows[value].name,
                                surname:results.rows[value].surname,
                                age:results.rows[value].age,
                                borndate:results.rows[value].borndate,
                                dieddate:results.rows[value].dieddate,
                                resting_place:results.rows[value].resting_place
                            }
                            
                            
                        }  
                        if(results.rows[value].title){

                            results.rows[value].book = {
                                title:results.rows[value].title,
                                page_count:results.rows[value].page_count,
                                publication_date:results.rows[value].publication_date,
                            }
                            
                            
                        }  
                        if(results.rows[value].history){

                            results.rows[value].direction = {
                                main_conception:results.rows[value].main_conception,
                                history:results.rows[value].history,
                                first_date:results.rows[value].first_date,
                            }
                            
                            
                        }
                           
                        delete results.rows[value]['name'];
                        delete results.rows[value]['surname'];
                        delete results.rows[value]['borndate'];
                        delete results.rows[value]['age'];
                        delete results.rows[value]['dieddate'];
                        delete results.rows[value]['resting_place'];
                        delete results.rows[value]['main_conception'];
                        delete results.rows[value]['history'];
                        delete results.rows[value]['first_date'];
                        delete results.rows[value]['title'];
                        delete results.rows[value]['page_count'];
                        delete results.rows[value]['publication_date'];

                        
                    }//тут также костылим для удобства интерпретации json'а 

                    res.status(201).json({route:results.rows});

                    });
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