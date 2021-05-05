import React,{useState,useContext} from 'react';
import { useHttp } from '../hooks/HttpHook';
import '../styles/Auth/style.css';
import '../styles/Auth/style.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import {useMessage} from '../hooks/MessageHook'
import {useHistory} from 'react-router-dom';
import { AuthContext } from '../context/authContext';


export const SettingsPage = () =>{

    const auth = useContext(AuthContext) 
    const {loading,error,request} = useHttp();
    
    const [form,setForm] = useState({
      email:'',password:''
    })
    

    const changeHandler = event => {
      setForm({...form,[event.target.name]: event.target.value})
    }

    const registerHandler = async () =>{
        try{   
         const data = await request('/user/auth/register','POST',{...form})
        // return <Redirect to='/register' />
        }
        catch(e){
          
        }
    } 

    const loginHandler = async () =>{
      try{   
        const data = await request('/user/auth/login','POST',{...form})
        
        auth.login(data.token,data.userId)

      }
      catch(e){
        
      }
  } 

    const Errors = (params) =>{
        return(
        <div>
          { params.length > 0 &&
          <div class="alert alert-danger" role="alert">
              {params.message}
            </div>
          }
        </div>
        )
    
    }

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
  
    const {loading,error,request} = useHttp();

    const history = useHistory()

    const restartPage = (event) => {
    
      event.preventDefault()
      window.location.reload();

      //history.push('/settings')
      //this.setState({ games: [] });
    }

    const err =[
      {id:1,message:'suka ti eblan'}
    ]
    
    return( 
      <div>
      <meta charSet="utf-8" />
      <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      {/* The above 3 meta tags *must* come first in the head; any other head content must come *after* these tags */}
      <title>Ovio -  Bootstrap Based Responsive Dashboard &amp; Admin Template</title>
      {/* Bootstrap */}
      <link rel="stylesheet" href="../bootstrap/css/bootstrap.min.css" />
      {/* Google Font */}
      <link href="https://fonts.googleapis.com/css?family=Poppins:300,400,500,600,700" rel="stylesheet" />
      {/* Template style */}
      <link rel="stylesheet" href="../dist/css/style.css" />
      <link rel="stylesheet" href="et-line-font/et-line-font.css" />
      <link rel="stylesheet" href="font-awesome/css/font-awesome.min.css" />
      <link type="text/css" rel="stylesheet" href="../dist/weather/weather-icons.min.css" />
      <link type="text/css" rel="stylesheet" href="../dist/weather/weather-icons-wind.min.css" />
      {/* HTML5 shim and Respond.js for IE8 support of HTML5 elements and media queries */}
      {/* WARNING: Respond.js doesn't work if you view the page via file:// */}
      {/*[if lt IE 9]>
    
    
  <![endif]*/}
      <div className="wrapper"> 
        {/* Main Header */}
        <header className="main-header dark-bg"> 
          {/* Logo */} 
          <a href="../index.html" className="logo dark-bg"> 
            {/* mini logo for sidebar mini 50x50 pixels */} 
            <span className="logo-mini"><img src="../dist/img/logo.png" alt="Ovio" /></span> 
            {/* logo for regular state and mobile devices */} 
            <span className="logo-lg"><img src="../dist/img/logo-lg.png" alt="Ovio" /></span> </a> 
          {/* Header Navbar */}
          <nav className="navbar navbar-static-top" role="navigation"> 
            {/* Sidebar toggle button*/} 
            <a href="#" className="sidebar-toggle" data-toggle="push-menu" role="button"> <span className="sr-only">Toggle navigation</span> </a>
            <div className="pull-left search-box">
              <form action="#" method="get" className="search-form">
                <div className="input-group">
                  <input type="text" name="search" className="form-control" placeholder="Search..." />
                  <span className="input-group-btn">
                    <button type="submit" name="search" id="search-btn" className="btn btn-flat"><i className="fa fa-search" /> </button>
                  </span></div>
              </form>
              {/* search form */} </div>
            {/* Navbar Right Menu */}
            <div className="navbar-custom-menu">
              <ul className="nav navbar-nav">
                <li className="dropdown messages-menu"> <a href="#" className="dropdown-toggle" data-toggle="dropdown"> <i className="icon-envelope" />
                    <div className="notify"> <span className="heartbit" /> <span className="point" /> </div>
                  </a>
                  <ul className="dropdown-menu">
                    <li className="header">You have 4 messages</li>
                    <li>
                      <ul className="menu">
                        <li><a href="#">
                            <div className="pull-left"><img src="../dist/img/img1.jpg" className="img-circle" alt="User Image" /></div>
                            <h4>Florence Douglas</h4>
                            <p>Lorem ipsum dolor sit amet.</p>
                            <p><small><i className="fa fa-clock-o" /> 2 mins</small></p>
                          </a></li>
                        <li><a href="#">
                            <div className="pull-left"><img src="../dist/img/img2.jpg" className="img-circle" alt="User Image" /></div>
                            <h4>Douglas Smith</h4>
                            <p>Lorem ipsum dolor sit amet.</p>
                            <p><small><i className="fa fa-clock-o" /> 15 mins</small></p>
                          </a></li>
                        <li><a href="#">
                            <div className="pull-left"><img src="../dist/img/img3.jpg" className="img-circle" alt="User Image" /></div>
                            <h4>Lorence Deo</h4>
                            <p>Lorem ipsum dolor sit amet.</p>
                            <p><small><i className="fa fa-clock-o" /> 35 mins</small></p>
                          </a></li>
                        <li><a href="#">
                            <div className="pull-left"><img src="../dist/img/img1.jpg" className="img-circle" alt="User Image" /></div>
                            <h4>Florence Douglas</h4>
                            <p>Lorem ipsum dolor sit amet.</p>
                            <p><small><i className="fa fa-clock-o" /> 2 mins</small></p>
                          </a></li>
                      </ul>
                    </li>
                    <li className="footer"><a href="#">Check all notifications</a></li>
                  </ul>
                </li>
                {/* messages-menu */} 
                {/* Notifications Menu */}
                <li className="dropdown notifications-menu"> <a href="#" className="dropdown-toggle" data-toggle="dropdown"> <i className="icon-megaphone" />
                    <div className="notify"> <span className="heartbit" /> <span className="point" /> </div>
                  </a>
                  <ul className="dropdown-menu">
                    <li className="header">Notifications</li>
                    <li>
                      <ul className="menu">
                        <li><a href="#"><i className="icon-lightbulb" /> Lorem ipsum dolor sit amet </a> </li>
                        <li><a href="#"><i className="icon-map-pin blue" /> Lorem ipsum dolor sit amet </a> </li>
                        <li><a href="#"><i className="icon-refresh orange" /> Lorem ipsum dolor sit amet </a> </li>
                        <li><a href="#"><i className="icon-map-pin blue" /> Lorem ipsum dolor sit amet </a> </li>
                      </ul>
                    </li>
                    <li className="footer"><a href="#">View all</a></li>
                  </ul>
                </li>
                {/* Tasks Menu */} 
                {/* User Account Menu */}
                <li className="dropdown user user-menu"> <a href="#" className="dropdown-toggle" data-toggle="dropdown"> <img src="../dist/img/img1.jpg" className="user-image" alt="User Image" /> <span className="hidden-xs">Florence Douglas</span> </a>
                  <ul className="dropdown-menu">
                    <li className="user-header">
                      <div className="pull-left user-img"><img src="../dist/img/img1.jpg" className="img-responsive" alt="User" /></div>
                      <p className="text-left">Florence Douglas <small>florence@gmail.com</small> </p>
                      <div className="view-link text-left"><a href="#">View Profile</a> </div>
                    </li>
                    <li><a href="#"><i className="icon-profile-male" /> My Profile</a></li>
                    <li><a href="#"><i className="icon-wallet" /> My Balance</a></li>
                    <li><a href="#"><i className="icon-envelope" /> Inbox</a></li>
                    <li role="separator" className="divider" />
                    <li><a href="#"><i className="icon-gears" /> Account Setting</a></li>
                    <li role="separator" className="divider" />
                    <li><a href="#"><i className="fa fa-power-off" /> Logout</a></li>
                  </ul>
                </li>
              </ul>
            </div>
          </nav>
        </header>
        {/* Left side column. contains the logo and sidebar */}
        <aside className="main-sidebar dark-bg">
          <section className="sidebar">
            <div className="user-panel black-bg">
              <div className="pull-left image"> <img src="../dist/img/img1.jpg" className="img-circle" alt="User Image" /> </div>
              <div className="pull-left info">
                <p>Florence Douglas</p>
                <a href="#"><i className="fa fa-circle" /> Online</a> </div>
            </div>
            {/* Sidebar Menu */}
            <ul className="sidebar-menu" data-widget="tree">
              <li className="header dark-bg">Menu</li>
              <li className="treeview"><a href="#"><i className="fa fa-dashboard" /> <span>Dashboard</span> <span className="pull-right-container"> <i className="fa fa-angle-left pull-right" /> </span> </a>
                <ul className="treeview-menu">
                  <li><a href="../index.html"><i className="fa fa-angle-right" /> Dashboard 1</a></li>
                  <li><a href="../dashboard-2.html"><i className="fa fa-angle-right" /> Dashboard 2</a></li>
                  <li><a href="../dashboard-3.html"><i className="fa fa-angle-right" /> Dashboard 3</a></li>
                </ul>
              </li>
              <li className="treeview"> <a href="#"><i className="fa fa-desktop" /> <span>Templates</span> <span className="pull-right-container"> <i className="fa fa-angle-left pull-right" /> </span> </a>
                <ul className="treeview-menu">
                  <li><a href="../index.html"><i className="fa fa-angle-right" /> Default</a></li>
                  <li><a href="../index-light.html"><i className="fa fa-angle-right" /> Light</a></li>
                  <li><a href="../index-dark.html"><i className="fa fa-angle-right" /> Dark</a></li>
                  <li><a href="../index-collapsed-sidebar.html"><i className="fa fa-angle-right" /> Collapsed Sidebar</a></li>
                  <li><a href="../index-boxed.html"><i className="fa fa-angle-right" /> Boxed</a></li>
                  <li><a href="../index-top-nav.html"><i className="fa fa-angle-right" /> Top Navigation</a></li>
                  <li><a href="../index-rtl.html"><i className="fa fa-angle-right" /> RTL</a></li>
                </ul>
              </li>
              <li className="treeview active"> <a href="#"><i className="fa fa-bullseye" /> <span>Apps</span> <span className="pull-right-container"> <i className="fa fa-angle-left pull-right" /> </span> </a>
                <ul className="treeview-menu">
                  <li><a href="project-summary.html"><i className="fa fa-angle-right" /> Project Summary</a></li>
                  <li className="active"><a href="invoice.html"><i className="fa fa-angle-right" /> Invoice</a></li>
                  <li><a href="calendar.html"><i className="fa fa-angle-right" /> Calendar</a></li>
                  <li><a href="gallery.html"><i className="fa fa-angle-right" /> Gallery</a></li>
                  <li><a href="timeline.html"><i className="fa fa-angle-right" /> Timeline</a></li>
                  <li><a href="contacts.html"><i className="fa fa-angle-right" /> Contacts</a></li>
                </ul>
              </li>
              <li> <a href="../widgets.html"> <i className="fa fa-th" /> <span>Widgets</span></a> </li>
              <li className="header dark-bg">Components</li>
              <li className="treeview"> <a href="#"><i className="fa fa-briefcase" /> <span>UI Components</span> <span className="pull-right-container"> <i className="fa fa-angle-left pull-right" /> </span> </a>
                <ul className="treeview-menu">
                  <li><a href="../component/alerts.html"><i className="fa fa-angle-right" /> Alerts</a></li>
                  <li><a href="../component/buttons.html"><i className="fa fa-angle-right" /> Buttons</a></li>
                  <li><a href="../component/carousel.html"><i className="fa fa-angle-right" /> Carousel</a></li>
                  <li><a href="../component/collapse.html"><i className="fa fa-angle-right" /> Collapse</a></li>
                  <li><a href="../component/listgroup.html"><i className="fa fa-angle-right" /> List Group</a></li>
                  <li><a href="../component/pagination.html"><i className="fa fa-angle-right" /> Pagination</a></li>
                  <li><a href="../component/tabs.html"><i className="fa fa-angle-right" /> Tabs</a></li>
                  <li><a href="../component/tooltips.html"><i className="fa fa-angle-right" /> Tooltips</a></li>
                  <li><a href="../component/popovers.html"><i className="fa fa-angle-right" /> Popovers</a></li>
                  <li><a href="../component/progress.html"><i className="fa fa-angle-right" /> Progress</a></li>
                  <li><a href="../component/mediaobjects.html"><i className="fa fa-angle-right" /> Media Objects</a></li>
                </ul>
              </li>
              <li className="treeview"> <a href="#"><i className="fa fa-pencil-square-o" /> <span>Forms</span> <span className="pull-right-container"> <i className="fa fa-angle-left pull-right" /> </span> </a>
                <ul className="treeview-menu">
                  <li><a href="../forms/general-elements.html"><i className="fa fa-angle-right" /> General Elements</a></li>
                  <li><a href="../forms/layouts.html"><i className="fa fa-angle-right" /> Form Layouts</a></li>
                  <li><a href="../forms/validation.html"><i className="fa fa-angle-right" /> Form Validation</a></li>
                  <li><a href="../forms/wizard.html"><i className="fa fa-angle-right" /> Form Wizard</a></li>
                </ul>
              </li>
              <li className="treeview"> <a href="#"><i className="fa fa-table" /> <span>Tables</span> <span className="pull-right-container"> <i className="fa fa-angle-left pull-right" /> </span> </a>
                <ul className="treeview-menu">
                  <li><a href="../tables/basic.html"><i className="fa fa-angle-right" /> Basic Tables</a></li>
                  <li><a href="../tables/data.html"><i className="fa fa-angle-right" /> Data Tables</a></li>
                </ul>
              </li>
              <li className="treeview"> <a href="#"><i className="fa fa-bar-chart" /> <span>Charts</span> <span className="pull-right-container"> <i className="fa fa-angle-left pull-right" /> </span> </a>
                <ul className="treeview-menu">
                  <li><a href="../charts/line.html"><i className="fa fa-angle-right" /> Line Charts</a></li>
                  <li><a href="../charts/area.html"><i className="fa fa-angle-right" /> Area Charts</a></li>
                  <li><a href="../charts/bar.html"><i className="fa fa-angle-right" /> Bar Charts</a></li>
                  <li><a href="../charts/pie.html"><i className="fa fa-angle-right" /> Pie Charts</a></li>
                  <li><a href="../charts/bubble.html"><i className="fa fa-angle-right" /> Bubble Charts</a></li>
                  <li><a href="../charts/combinations.html"><i className="fa fa-angle-right" /> Combinations</a></li>
                  <li><a href="../charts/3d.html"><i className="fa fa-angle-right" /> 3D Charts</a></li>
                </ul>
              </li>
              <li className="treeview"> <a href="#"><i className="fa fa-map-marker" /> <span>Maps</span> <span className="pull-right-container"> <i className="fa fa-angle-left pull-right" /> </span> </a>
                <ul className="treeview-menu">
                  <li><a href="../maps/google-maps.html"><i className="fa fa-angle-right" /> Google Maps</a></li>
                  <li><a href="../maps/vector-map.html"><i className="fa fa-angle-right" /> Vector Map</a></li>
                </ul>
              </li>
              <li className="treeview"> <a href="#"><i className="fa fa-files-o" /> <span>Pages</span> <span className="pull-right-container"> <i className="fa fa-angle-left pull-right" /> </span> </a>
                <ul className="treeview-menu">
                  <li><a href="../pages/login.html"><i className="fa fa-angle-right" /> Login</a></li>
                  <li><a href="../pages/register.html"><i className="fa fa-angle-right" /> Register</a></li>
                  <li><a href="../pages/forgot-password.html"><i className="fa fa-angle-right" /> Forgot password</a></li>
                  <li><a href="../pages/coming-soon.html"><i className="fa fa-angle-right" /> Coming Soon</a></li>
                </ul>
              </li>
              <li className="treeview"> <a href="#"> <i className="fa fa-align-left" /> <span>Multilevel</span> <span className="pull-right-container"> <i className="fa fa-angle-left pull-right" /> </span> </a>
                <ul className="treeview-menu" style={{display: 'none'}}>
                  <li><a href="#"><i className="fa fa-angle-right" /> Level One</a></li>
                  <li className="treeview"> <a href="#"><i className="fa fa-angle-right" /> Level One <span className="pull-right-container"> <i className="fa fa-angle-left pull-right" /> </span> </a>
                    <ul className="treeview-menu" style={{display: 'none'}}>
                      <li><a href="#"><i className="fa fa-angle-right" /> Level Two</a></li>
                      <li className="treeview"> <a href="#"><i className="fa fa-angle-right" /> Level Two <span className="pull-right-container"> <i className="fa fa-angle-left pull-right" /> </span> </a>
                        <ul className="treeview-menu" style={{display: 'none'}}>
                          <li><a href="#"><i className="fa fa-angle-right" /> Level Three</a></li>
                          <li><a href="#"><i className="fa fa-angle-right" /> Level Three</a></li>
                        </ul>
                      </li>
                    </ul>
                  </li>
                  <li><a href="#"><i className="fa fa-angle-right" /> Level One</a></li>
                </ul>
              </li>
            </ul>
            {/* sidebar-menu */} 
          </section>
        </aside>
        {/* Content Wrapper. Contains page content */}
        <div className="content-wrapper"> 
          {/* Content Header (Page header) */}
          <section className="content-header">
            <h1>Invoice list</h1>
            <ol className="breadcrumb">
              <li><a href="#"><i className="fa fa-home" /> Home</a></li>
              <li className="active"><i className="fa fa-bullseye" />Settings</li>
              <li className="active"><i className="fa fa-credit-card" /> Invoice list</li>
            </ol>
          </section>
          {/* Main content */}
          <section className="content container-fluid">
            <div className="row">
              <div className="col-lg-12">
                <div className="chart-box">
                  <div className="m-bot-3 over-hidden">
                    <h4 className="pull-left">Пользователь номер: </h4>
                    <h4 className="pull-left"># some id iduno</h4>
                    {/* Split button */}
                    <div className="btn-group pull-right">
                      <button type="button" className="btn btn-danger">Invoice Options</button>
                      <button type="button" className="btn btn-danger dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"> <span className="caret" /> <span className="sr-only">Toggle Dropdown</span> </button>
                      <ul className="dropdown-menu dropdown-menu-right">
                        <li><a href="#"><i className="fa fa-plus" />Add New Invoice</a></li>
                        <li><a href="#"><i className="fa fa-save" />Save Invoice</a></li>
                        <li><a href="#"><i className="fa fa-print" />Print Invoice</a></li>
                        <li><a href="#"><i className="fa fa-ban" />Cancel Invoice</a></li>
                        <li><a href="#"><i className="fa fa-credit-card" />Paid Invoice</a></li>
                        <li><a href="#"><i className="fa fa-trash-o" />Delete Invoice</a></li>
                      </ul>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md-6 col-xs-6 m-t-10">
                      <h5>Invoice: #INV0353</h5>
                      <ul className="list-unstyled m-bot-3">
                        <li>Date: <span className="text-semibold">April 15, 2017</span></li>
                        <li>Due date: <span className="text-semibold">May 20, 2017</span></li>
                      </ul>
                      <h5>Company Inc.</h5>
                      <address>15 Barnes Wallis Way,<br />
                        Francisco, CA 94107<br /><br />
                        +1 012 345 6789<br />
                        <a href="#">example@example.com</a></address>
                    </div>
                    <div className="col-md-6 text-right">
                      <div className="col-md-3 pull-right m-bot-2 text-right"><img src="../dist/img/img3.jpg" className="img-circle img-responsive" alt="User Image" /></div>
                      <div className="col-md-12"><ul className="px-0 list-unstyled">
                          <li>Balance Due</li>
                          <li className="lead text-bold-800">$ 12,000.00</li>
                        </ul>
                        <h5>Bill To</h5>
                        <address>Sr. John Deo<br />
                          Francisco, CA 94107</address></div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-md-12">
                <div className="chart-box">
                  <h4>Изменить данные</h4>
                  <div className="row">
                    <form>
                      <div className="col-md-6">
                        <div className="form-group has-feedback">
                          <label className="control-label">First Name</label>
                          <input type="text" className="form-control" placeholder="First Name" />
                          <span className="fa fa-user form-control-feedback" aria-hidden="true" /> </div>
                      </div>
                      <div className="col-md-6">
                        <div className="form-group has-feedback">
                          <label className="control-label">Last Name</label>
                          <input type="text" className="form-control" placeholder="Last Name" />
                          <span className="fa fa-user form-control-feedback" aria-hidden="true" /> </div>
                      </div>
                      <div className="col-md-6">
                        <div className="form-group has-feedback">
                          <label className="control-label">E-mail</label>
                          <input type="text" className="form-control" placeholder="E-mail" />
                          <span className="fa fa-envelope-o form-control-feedback" aria-hidden="true" /> </div>
                      </div>
                      <div className="col-md-6">
                        <div className="form-group has-feedback">
                          <label className="control-label">Contact Number</label>
                          <input type="text" className="form-control" placeholder="Contact Number" />
                          <span className="fa fa-phone form-control-feedback" aria-hidden="true" /> </div>
                      </div>
                      <div className="col-md-6">
                        <div className="form-group has-feedback">
                          <label className="control-label">Company</label>
                          <input type="text" className="form-control" placeholder="Company" />
                          <span className="fa fa-briefcase form-control-feedback" aria-hidden="true" /> </div>
                      </div>
                      <div className="col-md-6">
                        <div className="form-group has-feedback">
                          <label className="control-label">Website</label>
                          <input type="text" className="form-control" placeholder="https://" />
                          <span className="fa fa-globe form-control-feedback" aria-hidden="true" /> </div>
                      </div>
                      <div className="col-md-12">
                        <div className="form-group has-feedback">
                          <label className="control-label">Bio</label>
                          <textarea className="form-control" id="placeTextarea" rows={3} placeholder="Bio" defaultValue={""} />
                        </div>
                      </div>
                      <div className="col-md-12">
                        <div className="form-group has-feedback">
                          <label className="control-label">Аватарка</label>
                          <label className="custom-file center-block block">
                            <input id="file" className="custom-file-input" type="file" />
                            <span className="custom-file-control" /> </label>
                        </div>
                        <div className="col-md-12">
                          <button type="submit" className="btn btn-default" disabled = {loading} > Submit </button>
                        </div>
                      </div></form>
                  </div>
                </div>
              </div></div></section>
          {/* content */} 
        </div>
        {/* content-wrapper */} 
        {/* Main Footer */}
        <footer className="main-footer dark-bg">
          <div className="pull-right hidden-xs"> Version 1.0</div>
          Copyright © 2017 Yourdomian. All rights reserved. </footer>
      </div>
      {/* wrapper */} 
      {/* jQuery */} 
      {/*charts*/} 
    </div>
    )
}
