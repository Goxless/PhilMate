const {Router} = require('express')
const {pool} = require('../dbConfig')
const{check,validationResult} = require('express-validator')
const router = Router()
const config = require('config')
const jwt = require('jsonwebtoken')
const bcrypt = require("bcrypt");
const authMid = require('../middleware/AuthMid')
var fs = require('fs');


router.get("/ids",authMid,(req,res)=>{
    try{
        pool.query(
            `SELECT tags FROM preferences WHERE userid = $1`,
            [req.user.userID],
            (err,result)=>{
                try{
                    if(err){
                        throw err;
                    }            
                    else{

                        // TODO: добавить название тегов 

                        var authors= []
                        var books  = []
                        var dirs   = []
                        var tags   = []
                        
                        var keys = Object.keys(result.rows[0])
                        
                        for(iter in result.rows){
                            for(iter2 in result.rows[iter]){

                                if(result.rows[iter][iter2])
                                    switch (iter2) {
                                        case keys[0]:
                                            authors.push(result.rows[iter][iter2])
                                            break;
                                        case keys[1]:
                                            books.push(result.rows[iter][iter2])
                                            break;    
                                        case keys[2]:
                                            dirs.push(result.rows[iter][iter2])
                                            break;
                                        case keys[3]:
                                            tags.push(result.rows[iter][iter2])
                                            break;
                                    }
                            }
                        }
                        
                        res.status(201).json({
                            tags:authors
                        });

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
});


router.get("/",authMid, (req,res)=>{
    try{
        pool.query(
            `SELECT tags FROM preferences WHERE userid = $1`,
            [req.user.userID],
            async (err,result)=>{
                try{
                    if(err){
                        throw err;
                    }            
                    else{
                        var tags   = []
                        
                        for(iter in result.rows){
                           tags.push(result.rows[iter].tags)
                        }

                        var names = await pool.query(`SELECT name FROM tag WHERE id = ANY($1);`,[tags])

                        tags.length = 0

                        for(iter in names.rows){
                            tags.push(names.rows[iter]["name"])
                         }


                        res.status(201).json({
                            tags
                        });

                        //res.status(201).json({message:result1.rows[0]});
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
});


router.post('/', 
    [
        check('tags','имена тегов должны являтся списком').isArray(),
        check('tags','теги не заданы').notEmpty()
    ],
    async (req,res)=>{
    try{

        const errors = validationResult(req);

        if(!errors.isEmpty()){
            return res.status(400).json({errors: errors.array(), message:'Некорректные данные'});
        }

        const {tags} = req.body    
               
        //переводим названия в id
        const idViaNames = await pool.query(`SELECT id FROM tag WHERE name = ANY($1);`,[tags])
        
        if(idViaNames.rows.length <= 0){
            throw new Error('Теги с подобным названием отсутсвуют')
        }

        tags.length = 0

        for(value in idViaNames.rows){
            tags.push(idViaNames.rows[value].id)
        }       

        pool.query(
            `SELECT tags FROM preferences WHERE userid = $1`,
            [req.user.userID],
            async (err,results)=>{
                try{
                    if(err){
                        throw err;
                    }
                                        
                    // приводим в божеский вид массив из обьектов 
                    for(value in results.rows){
                        results.rows[value] = results.rows[value].tags
                    }


                    if(results.rows.some( i => tags.includes(i))){
                        return res.status(400).json({message:'Дублирование тегов'});
                    }

                    for(value in tags){
                        await pool.query('INSERT INTO preferences(userid,tags) VALUES($1,$2)',
                            [req.user.userID,tags[value]]   
                        )
                    }
                    
                    return res.status(201).json({message:'Теги добавлены'})
                }
                catch(e){
                    
                    return res.status(500).json({message:"Что то пошло не так",detail:e.message})
                }
            }
        );

        //----------------------------------------------------------- 
    }
    catch(e){
        console.log("тут кетч будет")
        return res.status(500).json({message:e.message})
    }
})




router.put("/route",authMid, async (req,res)=>{
    try{

    kindOfSqlQuery=`SELECT DISTINCT p.tags,t.name,t.complexity,
                                    d.id AS dirid,d.main_conception,d.history,
                                    a.id AS authorid ,a.name,a.surname,a.patronymic,
                                    a.age,a.borndate,a.dieddate,
                                    a.resting_place,b.id AS bookid,b.page_count,b.publication_date,b.title
                    
                FROM preferences AS p 

                JOIN tag AS t ON t.id = p.tags 
                    LEFT JOIN author_tag AS at ON t.id = at.tag
                        LEFT JOIN author AS a ON at.author = a.id
                    LEFT JOIN book_tag AS bt ON t.id = bt.tag
                        LEFT JOIN book AS b ON bt.book = b.id
                    LEFT JOIN direct_tag AS dt ON t.id = dt.tag
                        LEFT JOIN direction AS d ON dt.direction = d.id	
                WHERE p.userid = $1
                ORDER BY complexity ,borndate  ` // ууууууух страааашно  【✖╭╮✖】

    const tags = await pool.query(
        kindOfSqlQuery,
        [req.user.userID]
    )
    const previousStages = await pool.query('SELECT * FROM stages WHERE userid=$1',[req.user.userID])
    
    if(previousStages.rows.length > 0  ){
 
        pool.query(
            `DELETE FROM stage_author 
                WHERE stageid IN   (SELECT id
                                    FROM stages 
                                    WHERE userid = $1) `,
            [req.user.userID],(err)=>{
                if(err)
                    throw err;
            })
        pool.query(
            `DELETE FROM stage_book 
                WHERE stageid IN   (SELECT id
                                    FROM stages 
                                    WHERE userid = $1) `,
            [req.user.userID],(err)=>{
                if(err)
                    throw err;
            })
        pool.query(
            `DELETE FROM stage_dir 
                WHERE stageid IN   (SELECT id
                                    FROM stages 
                                    WHERE userid = $1) `,
            [req.user.userID],(err)=>{
                if(err)
                    throw err;
            })
        pool.query(
            `DELETE FROM stages 
                WHERE userid = $1 `,
            [req.user.userID],(err)=>{
                if(err)
                    throw err;
            })
    }
   
    var currentStageid

    for(value in tags.rows){

        currentStageid = await pool.query(`INSERT INTO stages(userid) VALUES($1) returning id `,[req.user.userID])
        currentStageid = currentStageid.rows[0].id

        if(tags.rows[value].authorid){ 
           await pool.query(
                `INSERT INTO stage_author(authorid,stageid) VALUES($1,$2) `,
                [tags.rows[value].authorid,currentStageid])
        }
        if(tags.rows[value].bookid){
            await pool.query(
                `INSERT INTO stage_book(bookid,stageid) VALUES($1,$2) `,
                [tags.rows[value].bookid,currentStageid])
        }
        if(tags.rows[value].dirid){
            await pool.query(
                `INSERT INTO stage_dir(dirid,stageid) VALUES($1,$2) `,
                [tags.rows[value].dirid,currentStageid])
        }
    }

    return res.status(201).json({message:"Маршрут составлен"});
    }


    catch(e){
        res.status(500).json({message:e.message})
    }

});
   

router.put("/route2",authMid, async (req,res)=>{
    try{

    kindOfSqlQuery=`SELECT DISTINCT p.tags,t.name,t.complexity,
                                    d.id AS dirid,d.main_conception,d.history,
                                    a.id AS authorid ,a.name,a.surname,a.patronymic,
                                    a.age,a.borndate,a.dieddate,
                                    a.resting_place,b.id AS bookid,b.page_count,b.publication_date,b.title
                    
                FROM preferences AS p 

                JOIN tag AS t ON t.id = p.tags 
                    LEFT JOIN author_tag AS at ON t.id = at.tag
                        LEFT JOIN author AS a ON at.author = a.id
                    LEFT JOIN book_tag AS bt ON t.id = bt.tag
                        LEFT JOIN book AS b ON bt.book = b.id
                    LEFT JOIN direct_tag AS dt ON t.id = dt.tag
                        LEFT JOIN direction AS d ON dt.direction = d.id	
                WHERE p.userid = $1
                ORDER BY complexity ,borndate  `


    const tags = await pool.query(
        kindOfSqlQuery,
        [req.user.userID]
    )

    var onlyTags = []
    
    for(value in tags.rows){
        onlyTags.push(tags.rows[value]["tags"])
    }

    var uniqueTags = onlyTags.filter(function(item, pos) {
        return onlyTags.indexOf(item) == pos;
    })

    const previousStages = await pool.query('SELECT * FROM stages WHERE userid=$1',[req.user.userID])
    
    if(previousStages.rows.length > 0  ){
 
        pool.query(
            `DELETE FROM stage_author 
                WHERE stageid IN   (SELECT id
                                    FROM stages 
                                    WHERE userid = $1) `,
            [req.user.userID],(err)=>{
                if(err)
                    throw err;
            })
        pool.query(
            `DELETE FROM stage_book 
                WHERE stageid IN   (SELECT id
                                    FROM stages 
                                    WHERE userid = $1) `,
            [req.user.userID],(err)=>{
                if(err)
                    throw err;
            })
        pool.query(
            `DELETE FROM stage_dir 
                WHERE stageid IN   (SELECT id
                                    FROM stages 
                                    WHERE userid = $1) `,
            [req.user.userID],(err)=>{
                if(err)
                    throw err;
            })
        pool.query(
            `DELETE FROM stages 
                WHERE userid = $1 `,
            [req.user.userID],(err)=>{
                if(err)
                    throw err;
            })
    }

    var currentStageid

    for(value in uniqueTags){
        currentStageid = await pool.query(`INSERT INTO stages(userid) VALUES($1) returning id `,[req.user.userID])
        currentStageid = currentStageid.rows[0].id

           
        pool.query(
            `INSERT INTO stage_author (authorid,stageid)
            (SELECT author,$2 from author_tag where tag = $1)`,
            [uniqueTags[value],currentStageid])
        pool.query(
            `INSERT INTO stage_book (bookid,stageid)
            (SELECT book,$2 from book_tag where tag = $1)`,
            [uniqueTags[value],currentStageid])
        pool.query(
            `INSERT INTO stage_dir (dirid,stageid)
            (SELECT direction,$2 from direct_tag where tag = $1)`,
            [uniqueTags[value],currentStageid])
    }

    return res.status(201).json({message:"Маршрут составлен"});
    }


    catch(e){
        return res.status(500).json({message:e.message})
    }

});


router.delete('/remove', 
    [
        check('names','имена тегов должны являтся списком').isArray().exists({ checkFalsy: true }).optional({ nullable: true })
    ],
    async (req,res)=>{
    try{
 
        const errors = validationResult(req);

        if(!errors.isEmpty()){
            return res.status(400).json({errors: errors.array(), message:'Некорректные данные'});
        }

        const {names} = req.body    

        const idViaNames = await pool.query(`SELECT id FROM tag WHERE name = ANY($1);`,[names])
        
        if(idViaNames.rows.length <= 0){
            throw new Error('Теги с подобным названием отсутсвуют')
        }

        for(value in idViaNames.rows){
            await pool.query(`DELETE FROM preferences WHERE userid = $1 AND tags = $2 `,[req.user.userID,idViaNames.rows[value].id])
        }

        return res.status(200).json({message:"Список успешно изменен"})
    }
    catch(e){
        return res.status(500).json({message:"Что то пошло не так",detail:e.message})
    }
})


module.exports = router


