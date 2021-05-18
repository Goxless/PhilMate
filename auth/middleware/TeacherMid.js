const {pool} = require('../dbConfig')

module.exports = async(req,res,next) =>{

    if(req.method == 'OPTIONS'){
        return next()
    }
    try{
        pool.query('SELECT * FROM teachers WHERE userid=$1',[req.user.userID],(err,results)=>{
            if(err){
                throw err;
            }
            if(results.rows.length <=0)            
                return res.status(401).json({message:"Доступ только для преподавателей"})
                next()
        })
      
    }catch(e){
        return res.status(401).json({message:e.message})
    }   

}

