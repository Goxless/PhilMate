import React,{useState} from 'react';
import { useHttp } from '../hooks/HttpHook';
import '../styles/Auth/style.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import {useMessage} from '../hooks/MessageHook'

/**
 * TODO: 
 *  сделать вывод ошибок при авторизации - регистрации 
 * 
 */


export const RegPage =() =>{


    const {loading,error,request} = useHttp();
    
    const [form,setForm] = useState({
      email:'',password:'',login:'',confirm:''
    })

    //useEffect(()=>{    },[error])

    const changeHandler = event => {
      setForm({...form,[event.target.name]: event.target.value})
    }

    const registerHandler = async () =>{
        try{   
          const data = await request('/user/auth/register','POST',{...form})
          
        }
        catch(e){
          
        }
    } 

    const Errors = (params) =>{
        return(
        <div>
          { params.length > 0 &&
          <div classname="alert alert-danger" role="alert">
              {params.message}
            </div>
          }
        </div>
        )
    
    }

    const err =[
      {id:1,message:'suka ti eblan'}
    ]
    
    return( <div>
      <meta charSet="utf-8" />
      <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      {/* The above 3 meta tags *must* come first in the head; any other head content must come *after* these tags */}
      <title>Registration</title>
      {/* Bootstrap */}
      <link rel="stylesheet" href="../bootstrap/css/bootstrap.min.css" />
      {/* Google Font */}
      <link href="https://fonts.googleapis.com/css?family=Poppins:300,400,500,600,700" rel="stylesheet" />
      {/* Template style */}
      <link rel="stylesheet" href="../dist/css/style.css" />
      <link rel="stylesheet" href="../pages/et-line-font/et-line-font.css" />
      <link rel="stylesheet" href="../pages/font-awesome/css/font-awesome.min.css" />
      <link type="text/css" rel="stylesheet" href="../dist/weather/weather-icons.min.css" />
      <link type="text/css" rel="stylesheet" href="../dist/weather/weather-icons-wind.min.css" />
      {/* HTML5 shim and Respond.js for IE8 support of HTML5 elements and media queries */}
      {/* WARNING: Respond.js doesn't work if you view the page via file:// */}
      {/*[if lt IE 9]>
    
    
  <![endif]*/}
      <div className="wrapper">
        <div className="form-body">
          <form  className="col-form" noValidate>
            <div className="col-logo"><a href="../index.html"><img alt="" src="../dist/img/logo-lg.png" /></a></div>
            <header>Register</header>
            <fieldset>
              <section>
                <div className="form-group has-feedback">
                  <label className="control-label">Login</label>
                  <input className="form-control" placeholder="login" name="login" type="text" onChange={changeHandler}/>
                  <span className="fa fa-user form-control-feedback" aria-hidden="true" /> </div>
              </section>
              <section>
                <div className="form-group has-feedback">
                  <label className="control-label">E-mail</label>
                  <input className="form-control" placeholder="e-mail" type="text" name="email" onChange={changeHandler}/>
                  <span className="fa fa-envelope form-control-feedback" aria-hidden="true" /> </div>
              </section>
              <section>
                <div className="form-group has-feedback">
                  <label className="control-label">Password</label>
                  <input className="form-control" placeholder="password" type="password" name="password" onChange={changeHandler}/>
                  <span className="fa fa-lock form-control-feedback" aria-hidden="true" /> </div>
              </section>
              <section>
                <div className="form-group has-feedback">
                  <label className="control-label">Confirm password</label>
                  <input className="form-control" placeholder="password" type="password" name="confirm" onChange={changeHandler}/>
                  <span className="fa fa-lock form-control-feedback" aria-hidden="true" /> </div>
              </section>
              <section>
                <div className="row">
                  <div className="col-md-12 text-center">
                    <label className="checkbox">
                      <input name="remember" defaultChecked type="checkbox" />
                      <i />Agree the terms and policy </label>
                  </div>
                </div>
              </section>
            </fieldset>
            <footer className="text-left">
              {/*<button type="button" className="btn btn-info pull-right">Register</button> <a href="login.html" className="button button-secondary">Login</a> */}
              
                  <a href="/auth" class="btn btn-secondary">Back</a>
                  <button type="button" className="btn btn-info pull-right" onClick={registerHandler} disabled = {loading}>Register</button>
                  
              </footer>

          </form>
        </div>
      </div>
      {/* wrapper */} 
      {/* jQuery */} 
    </div>
    )
}
