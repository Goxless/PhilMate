import React,{useContext, useState} from 'react';
import { useHttp } from '../hooks/HttpHook';
import {useHistory} from 'react-router-dom';
import {useMessage} from '../hooks/MessageHook'
import {AuthContext} from '../context/authContext'

import '../styles/bootstrap/css/bootstrap.css'
import 'bootstrap/dist/js/bootstrap.js';
import 'bootstrap/dist/css/bootstrap.min.css';
//import 'bootstrap/dist/css/bootstrap.css';


import '../styles/dist/css/style.css'
import '../styles/dist/font-awesome/css/font-awesome.min.css'
import '../styles/dist/et-line-font/et-line-font.css'
import '../styles/dist/weather/weather-icons.min.css'

{/* <link rel="stylesheet" href="bootstrap/css/bootstrap.min.css">

<!— Google Font —>
<link href="https://fonts.googleapis.com/css?family=Poppins:300,400,500,600,700" rel="stylesheet">

<!— Template style —>
<link rel="stylesheet" href="dist/css/style.css">
<link rel="stylesheet" href="dist/et-line-font/et-line-font.css">
<link rel="stylesheet" href="dist/font-awesome/css/font-awesome.min.css">
<link type="text/css" rel="stylesheet" href="dist/weather/weather-icons.min.css">
<link type="text/css" rel="stylesheet" href="dist/weather/weather-icons-wind.min.css"> */}


//import '../styles/font-awesome.min.css';
//import 'font-awesome/css/font-awesome.min.css'
//import '../styles/et-line-font/et-line-font.css'
//import 'bootstrap'
// не нужно import '../styles/font-awesome.min.css';
//не нужно import 'font-awesome/css/font-awesome.min.css'
// не нужно import '../styles/et-line-font/et-line-font.css'
//import 'bootstrap'
//не нужно import 'bootstrap/dist/css/bootstrap.css';
//import 'bootstrap/dist/js/bootstrap.js';
//import 'bootstrap/dist/css/bootstrap.min.css'
//import '../styles/weather/weather-icons-wind.min.css'

/**
 * TODO: 
 *  сделать вывод ошибок при авторизации - регистрации 
 * 
 */


export const OfficePage =() =>{


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
    
    const auth = useContext(AuthContext)
    const history = useHistory()

    const logoutHandler = event =>{
        event.preventDefault()
        auth.logout()  
        history.push('/')
    }

    const settingsPageRedirectHandler = event =>{
      event.preventDefault()
      history.push('/settings')
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
    {/*
        <link href="https://fonts.googleapis.com/css?family=Poppins:300,400,500,600,700" rel="stylesheet" />

        link rel="stylesheet" href="dist/css/style.css" />
        link rel="stylesheet" href="dist/et-line-font/et-line-font.css" />
        /* <link rel="stylesheet" href="dist/font-awesome/css/font-awesome.min.css" /> 
        link type="text/css" rel="stylesheet" href="dist/weather/weather-icons.min.css" />
        link type="text/css" rel="stylesheet" href="dist/weather/weather-icons-wind.min.css" />


    */}
    const err =[
      {id:1,message:'suka ti eblan'}
    ]
    
    return(<div> 
        <meta charSet="utf-8" />
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        {/* The above 3 meta tags *must* come first in the head; any other head content must come *after* these tags */}
        <title>office template</title>
        {/* {/* <link rel="stylesheet" href="bootstrap/css/bootstrap.min.css" />
        
        {/* HTML5 shim and Respond.js for IE8 support of HTML5 elements and media queries */}
        <div className="wrapper"> 
          {/* Main Header */}
          <header className="main-header dark-bg"> 
            {/* Logo */} 
            <a href="index.html" className="logo dark-bg"> 
              {/* mini logo for sidebar mini 50x50 pixels */} 
              <span className="logo-mini"><img src="dist/img/logo.png" alt="Ovio" /></span> 
              {/* logo for regular state and mobile devices */} 
              <span className="logo-lg"><img src="dist/img/logo-lg.png" alt="Ovio" /></span> </a> 
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
                              <div className="pull-left"><img src="dist/img/img1.jpg" className="img-circle" alt="User Image" /></div>
                              <h4>Florence Douglas</h4>
                              <p>Lorem ipsum dolor sit amet.</p>
                              <p><small><i className="fa fa-clock-o" /> 2 mins</small></p>
                            </a></li>
                          <li><a href="#">
                              <div className="pull-left"><img src="dist/img/img2.jpg" className="img-circle" alt="User Image" /></div>
                              <h4>Douglas Smith</h4>
                              <p>Lorem ipsum dolor sit amet.</p>
                              <p><small><i className="fa fa-clock-o" /> 15 mins</small></p>
                            </a></li>
                          <li><a href="#">
                              <div className="pull-left"><img src="dist/img/img3.jpg" className="img-circle" alt="User Image" /></div>
                              <h4>Lorence Deo</h4>
                              <p>Lorem ipsum dolor sit amet.</p>
                              <p><small><i className="fa fa-clock-o" /> 35 mins</small></p>
                            </a></li>
                          <li><a href="#">
                              <div className="pull-left"><img src="dist/img/img1.jpg" className="img-circle" alt="User Image" /></div>
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

                  <li className="dropdown user user-menu"> <a href="#" className="dropdown-toggle" data-toggle="dropdown"> <img src="dist/img/img1.jpg" className="user-image" alt="User Image" /> <span className="hidden-xs">Florence Douglas</span> </a>
                    <ul className="dropdown-menu">
                      <li className="user-header">
                        <div className="pull-left user-img"><img src="dist/img/img1.jpg" className="img-responsive" alt="User" /></div>
                        <p className="text-left">Florence Douglas <small>florence@gmail.com</small> </p>
                        <div className="view-link text-left"><a href="#">View Profile</a> </div>
                      </li>
                      <li><a href="#"><i className="icon-profile-male" /> My Profile</a></li>
                      <li><a href="#"><i className="icon-wallet" /> My Balance</a></li>
                      <li><a href="#"><i className="icon-envelope" /> Inbox</a></li>
                      <li role="separator" className="divider" />
                      <li><a href="#" onClick={settingsPageRedirectHandler}><i className="icon-gears" /> Account Setting</a></li>
                      <li role="separator" className="divider" />
                      <li><a href="#" onClick={logoutHandler}><i className="fa fa-power-off" /> Logout</a></li>
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
                <div className="pull-left image"> <img src="dist/img/img1.jpg" className="img-circle" alt="User Image" /> </div>
                <div className="pull-left info">
                  <p>Florence Douglas</p>
                  <a href="#"><i className="fa fa-circle" /> Online</a> </div>
              </div>
              {/* Sidebar Menu */}
              <ul className="sidebar-menu" data-widget="tree">
                <li className="header dark-bg">Menu</li>
                <li className="treeview"><a href="#"><i className="fa fa-dashboard" /> <span>Dashboard</span> <span className="pull-right-container"> <i className="fa fa-angle-left pull-right" /> </span> </a>
                  <ul className="treeview-menu">
                    <li><a href="index.html"><i className="fa fa-angle-right" /> Dashboard 1</a></li>
                    <li><a href="dashboard-2.html"><i className="fa fa-angle-right" /> Dashboard 2</a></li>
                    <li><a href="dashboard-3.html"><i className="fa fa-angle-right" /> Dashboard 3</a></li>
                  </ul>
                </li>
                <li className="treeview active"> <a href="#"><i className="fa fa-desktop" /> <span>Templates</span> <span className="pull-right-container"> <i className="fa fa-angle-left pull-right" /> </span> </a>
                  <ul className="treeview-menu">
                    <li><a href="index.html"><i className="fa fa-angle-right" /> Default</a></li>
                    <li><a href="index-light.html"><i className="fa fa-angle-right" /> Light</a></li>
                    <li className="active"><a href="index-dark.html"><i className="fa fa-angle-right" /> Dark</a></li>
                    <li><a href="index-collapsed-sidebar.html"><i className="fa fa-angle-right" /> Collapsed Sidebar</a></li>
                    <li><a href="index-boxed.html"><i className="fa fa-angle-right" /> Boxed</a></li>
                    <li><a href="index-top-nav.html"><i className="fa fa-angle-right" /> Top Navigation</a></li>
                    <li><a href="index-rtl.html"><i className="fa fa-angle-right" /> RTL</a></li>
                  </ul>
                </li>
                <li className="treeview"> <a href="#"><i className="fa fa-bullseye" /> <span>Apps</span> <span className="pull-right-container"> <i className="fa fa-angle-left pull-right" /> </span> </a>
                  <ul className="treeview-menu">
                    <li><a href="app/project-summary.html"><i className="fa fa-angle-right" /> Project Summary</a></li>
                    <li><a href="app/invoice.html"><i className="fa fa-angle-right" /> Invoice</a></li>
                    <li><a href="app/calendar.html"><i className="fa fa-angle-right" /> Calendar</a></li>
                    <li><a href="app/gallery.html"><i className="fa fa-angle-right" /> Gallery</a></li>
                    <li><a href="app/timeline.html"><i className="fa fa-angle-right" /> Timeline</a></li>
                    <li><a href="app/contacts.html"><i className="fa fa-angle-right" /> Contacts</a></li>
                  </ul>
                </li>
                <li> <a href="widgets.html"> <i className="fa fa-th" /> <span>Widgets</span></a> </li>
                <li className="header dark-bg">Components</li>
                <li className="treeview"> <a href="#"><i className="fa fa-briefcase" /> <span>UI Components</span> <span className="pull-right-container"> <i className="fa fa-angle-left pull-right" /> </span> </a>
                  <ul className="treeview-menu">
                    <li><a href="component/alerts.html"><i className="fa fa-angle-right" /> Alerts</a></li>
                    <li><a href="component/buttons.html"><i className="fa fa-angle-right" /> Buttons</a></li>
                    <li><a href="component/carousel.html"><i className="fa fa-angle-right" /> Carousel</a></li>
                    <li><a href="component/collapse.html"><i className="fa fa-angle-right" /> Collapse</a></li>
                    <li><a href="component/listgroup.html"><i className="fa fa-angle-right" /> List Group</a></li>
                    <li><a href="component/pagination.html"><i className="fa fa-angle-right" /> Pagination</a></li>
                    <li><a href="component/tabs.html"><i className="fa fa-angle-right" /> Tabs</a></li>
                    <li><a href="component/tooltips.html"><i className="fa fa-angle-right" /> Tooltips</a></li>
                    <li><a href="component/popovers.html"><i className="fa fa-angle-right" /> Popovers</a></li>
                    <li><a href="component/progress.html"><i className="fa fa-angle-right" /> Progress</a></li>
                    <li><a href="component/mediaobjects.html"><i className="fa fa-angle-right" /> Media Objects</a></li>
                  </ul>
                </li>
                <li className="treeview"> <a href="#"><i className="fa fa-pencil-square-o" /> <span>Forms</span> <span className="pull-right-container"> <i className="fa fa-angle-left pull-right" /> </span> </a>
                  <ul className="treeview-menu">
                    <li><a href="forms/general-elements.html"><i className="fa fa-angle-right" /> General Elements</a></li>
                    <li><a href="forms/layouts.html"><i className="fa fa-angle-right" /> Form Layouts</a></li>
                    <li><a href="forms/validation.html"><i className="fa fa-angle-right" /> Form Validation</a></li>
                    <li><a href="forms/wizard.html"><i className="fa fa-angle-right" /> Form Wizard</a></li>
                  </ul>
                </li>
                <li className="treeview"> <a href="#"><i className="fa fa-table" /> <span>Tables</span> <span className="pull-right-container"> <i className="fa fa-angle-left pull-right" /> </span> </a>
                  <ul className="treeview-menu">
                    <li><a href="tables/basic.html"><i className="fa fa-angle-right" /> Basic Tables</a></li>
                    <li><a href="tables/data.html"><i className="fa fa-angle-right" /> Data Tables</a></li>
                  </ul>
                </li>
                <li className="treeview"> <a href="#"><i className="fa fa-bar-chart" /> <span>Charts</span> <span className="pull-right-container"> <i className="fa fa-angle-left pull-right" /> </span> </a>
                  <ul className="treeview-menu">
                    <li><a href="charts/line.html"><i className="fa fa-angle-right" /> Line Charts</a></li>
                    <li><a href="charts/area.html"><i className="fa fa-angle-right" /> Area Charts</a></li>
                    <li><a href="charts/bar.html"><i className="fa fa-angle-right" /> Bar Charts</a></li>
                    <li><a href="charts/pie.html"><i className="fa fa-angle-right" /> Pie Charts</a></li>
                    <li><a href="charts/bubble.html"><i className="fa fa-angle-right" /> Bubble Charts</a></li>
                    <li><a href="charts/combinations.html"><i className="fa fa-angle-right" /> Combinations</a></li>
                    <li><a href="charts/3d.html"><i className="fa fa-angle-right" /> 3D Charts</a></li>
                  </ul>
                </li>
                <li className="treeview"> <a href="#"><i className="fa fa-map-marker" /> <span>Maps</span> <span className="pull-right-container"> <i className="fa fa-angle-left pull-right" /> </span> </a>
                  <ul className="treeview-menu">
                    <li><a href="maps/google-maps.html"><i className="fa fa-angle-right" /> Google Maps</a></li>
                    <li><a href="maps/vector-map.html"><i className="fa fa-angle-right" /> Vector Map</a></li>
                  </ul>
                </li>
                <li className="treeview"> <a href="#"><i className="fa fa-files-o" /> <span>Pages</span> <span className="pull-right-container"> <i className="fa fa-angle-left pull-right" /> </span> </a>
                  <ul className="treeview-menu">
                    <li><a href="pages/login.html"><i className="fa fa-angle-right" /> Login</a></li>
                    <li><a href="pages/register.html"><i className="fa fa-angle-right" /> Register</a></li>
                    <li><a href="pages/forgot-password.html"><i className="fa fa-angle-right" /> Forgot password</a></li>
                    <li><a href="pages/coming-soon.html"><i className="fa fa-angle-right" /> Coming Soon</a></li>
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
          <div className="content-wrapper dark-bg"> 
            {/* Content Header (Page header) */}
            <section className="content-header">
              <h1>Dashboard</h1>
              <ol className="breadcrumb">
                <li><a href="#"><i className="fa fa-home" /> Home</a></li>
                <li className="active"><i className="fa fa-dashboard" /> Dashboard</li>
              </ol>
            </section>
            {/* Main content */}
            <section className="content container-fluid">
              <div className="row">
                <div className="col-lg-3 col-xs-6">
                  <div className="media-box">
                    <div className="media-icon pull-left"><i className="icon-bargraph" /> </div>
                    <div className="media-info">
                      <h5>Total Leads</h5>
                      <h3>1530</h3>
                    </div>
                  </div>
                </div>
                <div className="col-lg-3 col-xs-6">
                  <div className="media-box bg-sea">
                    <div className="media-icon pull-left"><i className="icon-wallet" /> </div>
                    <div className="media-info">
                      <h5>Total Payment</h5>
                      <h3>$8,530</h3>
                    </div>
                  </div>
                </div>
                <div className="col-lg-3 col-xs-6">
                  <div className="media-box bg-blue">
                    <div className="media-icon pull-left"><i className="icon-basket" /> </div>
                    <div className="media-info">
                      <h5>Total Sales</h5>
                      <h3>935</h3>
                    </div>
                  </div>
                </div>
                <div className="col-lg-3 col-xs-6">
                  <div className="media-box bg-green">
                    <div className="media-icon pull-left"><i className="icon-layers" /> </div>
                    <div className="media-info">
                      <h5>New Orders</h5>
                      <h3>5324</h3>
                    </div>
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col-lg-7">
                  <div className="chart-box">
                    <h4>Product Sales</h4>
                    <div className="chart">
                      <div id="container" />
                      {/*for values check "Product Sales" chart on char-function.js*/} 
                    </div>
                  </div>
                </div>
                <div className="col-lg-5">
                  <div className="chart-box">
                    <h4>Sales Overview</h4>
                    <div className="chart">
                      <div id="container1" />
                      {/*for values check "Sales Overview" chart on char-function.js*/} 
                    </div>
                  </div>
                </div>
                <div className="col-lg-5">
                  <div className="chart-box">
                    <h4>Recent Messages</h4>
                    <div className="message-widget"> <a href="#">
                        <div className="user-img pull-left"> <img src="dist/img/img1.jpg" className="img-circle img-responsive" alt="User Image" /> <span className="profile-status online pull-right" /> </div>
                        <div className="mail-contnet">
                          <h5>Florence Douglas</h5>
                          <span className="mail-desc">Lorem Ipsum is simply dummy text of the printing and type setting industry. Lorem Ipsum has been.</span> <span className="time">9:30 AM</span> </div>
                      </a> <a href="#">
                        <div className="user-img pull-left"> <img src="dist/img/img3.jpg" className="img-circle img-responsive" alt="User Image" /> <span className="profile-status invisable pull-right" /> </div>
                        <div className="mail-contnet">
                          <h5>Florence Douglas</h5>
                          <span className="mail-desc">Lorem Ipsum is simply dummy text of the printing and type setting industry. Lorem Ipsum has been.</span> <span className="time">10:30 AM</span> </div>
                      </a> <a href="#">
                        <div className="user-img pull-left"> <img src="dist/img/img4.jpg" className="img-circle img-responsive" alt="User Image" /> <span className="profile-status offline pull-right" /> </div>
                        <div className="mail-contnet">
                          <h5>Florence Douglas</h5>
                          <span className="mail-desc">Lorem Ipsum is simply dummy text of the printing and type setting industry. Lorem Ipsum has been.</span> <span className="time">12:30 AM</span> </div>
                      </a> </div>
                  </div>
                </div>
                <div className="col-lg-7">
                  <div className="chart-box">
                    <h4>Recent Orders</h4>
                    <div className="table-block">
                      <div className="info-block">
                        <p>Total paid invoices 5340, unpaid 130. <span className="pull-right"><a href="app/invoice.html">Invoice Summary <i className="fa fa-long-arrow-right" /></a></span> </p>
                      </div>
                      <div className="table-responsive">
                        <table className="table table-responsive">
                          <thead>
                            <tr>
                              <th>SKU</th>
                              <th>Invoice#</th>
                              <th>Customer Name</th>
                              <th>Status</th>
                              <th>Amount</th>
                            </tr>
                          </thead>
                          <tbody>
                            <tr>
                              <td className="text-truncate">OV-101777</td>
                              <td className="text-truncate"><a href="#">VIO-0035421</a></td>
                              <td className="text-truncate">Florence Douglas</td>
                              <td className="text-truncate"><span className="lable-tag tag-success">Paid</span></td>
                              <td className="text-truncate">$ 653.00</td>
                            </tr>
                            <tr>
                              <td className="text-truncate">OV-101775</td>
                              <td className="text-truncate"><a href="#">VIO-0028954</a></td>
                              <td className="text-truncate">Dr. Douglas</td>
                              <td className="text-truncate"><span className="lable-tag tag-unpaid">Overdue</span></td>
                              <td className="text-truncate">$ 421.00</td>
                            </tr>
                            <tr>
                              <td className="text-truncate">OV-101687</td>
                              <td className="text-truncate"><a href="#">VIO-0025864</a></td>
                              <td className="text-truncate">Andrew Florence</td>
                              <td className="text-truncate"><span className="lable-tag tag-success">Paid</span></td>
                              <td className="text-truncate">$ 632.00</td>
                            </tr>
                            <tr>
                              <td className="text-truncate">OV-101657</td>
                              <td className="text-truncate"><a href="#">VIO-0085815</a></td>
                              <td className="text-truncate">Florence Sr.</td>
                              <td className="text-truncate"><span className="lable-tag tag-success">Paid</span></td>
                              <td className="text-truncate">$ 285.00</td>
                            </tr>
                            <tr>
                              <td className="text-truncate">OV-101625</td>
                              <td className="text-truncate"><a href="#">VIO-0053812</a></td>
                              <td className="text-truncate">Florence Douglas</td>
                              <td className="text-truncate"><span className="lable-tag tag-warning">Overdue</span></td>
                              <td className="text-truncate">$ 538.00</td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col-lg-6">
                  <div className="chart-box"> 
                    {/* Nav tabs */}
                    <ul className="nav nav-tabs" role="tablist">
                      <li role="presentation" className="active"><a href="#home" aria-controls="home" role="tab" data-toggle="tab">Activity</a></li>
                      <li role="presentation"><a href="#profile" aria-controls="profile" role="tab" data-toggle="tab">Profile</a></li>
                      <li role="presentation"><a href="#messages" aria-controls="messages" role="tab" data-toggle="tab">Settings</a></li>
                    </ul>
                    {/* Tab panes */}
                    <div className="tab-content">
                      <div role="tabpanel" className="tab-pane active" id="home">
                        <div className="message-widget">
                          <div>
                            <div className="user-img pull-left"> <img src="dist/img/img3.jpg" className="img-circle img-responsive" alt="User Image" /> </div>
                            <div className="mail-contnet">
                              <h5>Florence Douglas</h5>
                              <p>Lorem Ipsum is simply dummy text of the printing and type setting industry. Lorem Ipsum has been the printing and type setting simply dummy text industry.</p>
                              <span className="time m-bot-2">10:30 AM</span>
                              <div className="row">
                                <div className="col-lg-4 col-xs-4 m-bot-2"><img src="dist/img/img5.jpg" alt="user" className="img-responsive img-rounded" /></div>
                                <div className="col-lg-4 col-xs-4 m-bot-2"><img src="dist/img/img6.jpg" alt="user" className="img-responsive img-rounded" /></div>
                                <div className="col-lg-4 col-xs-4 m-bot-2"><img src="dist/img/img7.jpg" alt="user" className="img-responsive img-rounded" /></div>
                                <div className="m-top-2"><a href="#" className="pull-left">2 comment</a> <a href="#" className="pull-left"><i className="fa fa-heart text-success" /> 5 Love</a> </div>
                              </div>
                            </div>
                          </div>
                          <div>
                            <div className="user-img pull-left"> <img src="dist/img/img2.jpg" className="img-circle img-responsive" alt="User Image" /> </div>
                            <div className="mail-contnet">
                              <h5>Florence Douglas</h5>
                              <p>Lorem Ipsum is simply dummy text of the printing and type setting industry. Lorem Ipsum has been the printing and type setting simply dummy text industry.</p>
                              <span className="time m-bot-2">10:30 AM</span> </div>
                          </div>
                        </div>
                      </div>
                      <div role="tabpanel" className="tab-pane" id="profile">
                        <div className="message-widget">
                          <div>
                            <div className="user-img pull-left"> <img src="dist/img/img2.jpg" className="img-circle img-responsive" alt="User Image" /> </div>
                            <div className="mail-contnet">
                              <h5>Florence Douglas</h5>
                              <p>Lorem Ipsum is simply dummy text of the printing and type setting industry. Lorem Ipsum has been the printing and type setting simply dummy text industry.</p>
                              <span className="time m-bot-2">10:30 AM</span> </div>
                          </div>
                          <div>
                            <div className="user-img pull-left"> <img src="dist/img/img3.jpg" className="img-circle img-responsive" alt="User Image" /> </div>
                            <div className="mail-contnet">
                              <h5>Florence Douglas</h5>
                              <p>Lorem Ipsum is simply dummy text of the printing and type setting industry. Lorem Ipsum has been the printing and type setting simply dummy text industry.</p>
                              <span className="time m-bot-2">10:30 AM</span>
                              <div className="row">
                                <div className="col-lg-4 col-xs-4 m-bot-2"><img src="dist/img/img5.jpg" alt="user" className="img-responsive img-rounded" /></div>
                                <div className="col-lg-4 col-xs-4 m-bot-2"><img src="dist/img/img6.jpg" alt="user" className="img-responsive img-rounded" /></div>
                                <div className="col-lg-4 col-xs-4 m-bot-2"><img src="dist/img/img7.jpg" alt="user" className="img-responsive img-rounded" /></div>
                                <div className="m-top-2"><a href="#" className="pull-left">2 comment</a> <a href="#" className="pull-left"><i className="fa fa-heart text-success" /> 5 Love</a> </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div role="tabpanel" className="tab-pane" id="messages">
                        <div className="message-widget">
                          <div>
                            <div className="user-img pull-left"> <img src="dist/img/img2.jpg" className="img-circle img-responsive" alt="User Image" /> </div>
                            <div className="mail-contnet">
                              <h5>Florence Douglas</h5>
                              <p>Lorem Ipsum is simply dummy text of the printing and type setting industry. Lorem Ipsum has been the printing and type setting simply dummy text industry.</p>
                              <span className="time m-bot-2">10:30 AM</span> </div>
                          </div>
                          <div>
                            <div className="user-img pull-left"> <img src="dist/img/img2.jpg" className="img-circle img-responsive" alt="User Image" /> </div>
                            <div className="mail-contnet">
                              <h5>Florence Douglas</h5>
                              <p>Lorem Ipsum is simply dummy text of the printing and type setting industry. Lorem Ipsum has been the printing and type setting simply dummy text industry.</p>
                              <span className="time m-bot-2">10:30 AM</span> </div>
                          </div>
                          <div>
                            <div className="user-img pull-left"> <img src="dist/img/img2.jpg" className="img-circle img-responsive" alt="User Image" /> </div>
                            <div className="mail-contnet">
                              <h5>Florence Douglas</h5>
                              <p>Lorem Ipsum is simply dummy text of the printing and type setting industry. Lorem Ipsum has been the printing and type setting simply dummy text industry.</p>
                              <span className="time m-bot-2">10:30 AM</span> </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-lg-6">
                  <div className="row">
                    <div className="col-lg-6 col-xs-6">
                      <div className="twitter-box m-bot-3">
                        <div id="carousel-example-generic" className="carousel slide" data-ride="carousel"> 
                          {/* Wrapper for slides */}
                          <div className="carousel-inner text-center" role="listbox">
                            <div className="item active">
                              <div> <i className="fa fa-twitter" /> </div>
                              <p>Puns, humor, and quotes are great content on <span className="text-danger">#Twitter</span>. Find some related to your business.
                              </p><p className="text-italic pt-1">- John Doe</p>
                              <p />
                            </div>
                            <div className="item">
                              <div> <i className="fa fa-twitter" /> </div>
                              <p>Puns, humor, and quotes are great content on <span className="text-danger">#Twitter</span>. Find some related to your business.
                              </p><p className="text-italic pt-1">- John Doe</p>
                              <p />
                            </div>
                            <div className="item">
                              <div> <i className="fa fa-twitter" /> </div>
                              <p>Puns, humor, and quotes are great content on <span className="text-danger">#Twitter</span>. Find some related to your business.
                              </p><p className="text-italic pt-1">- John Doe</p>
                              <p />
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="col-lg-6 col-xs-6">
                      <div className="facebook-box m-bot-3">
                        <div id="carousel-example-generic1" className="carousel slide" data-ride="carousel"> 
                          {/* Wrapper for slides */}
                          <div className="carousel-inner text-center" role="listbox">
                            <div className="item active">
                              <div> <i className="fa fa-facebook" /> </div>
                              <p>Puns, humor, and quotes are great content on
                                Find some related to your business.
                              </p><p className="text-italic pt-1">- John Doe</p>
                              <p />
                            </div>
                            <div className="item">
                              <div> <i className="fa fa-facebook" /> </div>
                              <p>Puns, humor, and quotes are great content on
                                Find some related to your business.
                              </p><p className="text-italic pt-1">- John Doe</p>
                              <p />
                            </div>
                            <div className="item">
                              <div> <i className="fa fa-facebook" /> </div>
                              <p>Puns, humor, and quotes are great content on
                                Find some related to your business.
                              </p><p className="text-italic pt-1">- John Doe</p>
                              <p />
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="col-lg-12">
                      <div> <img src="dist/img/img8.jpg" className="img-responsive" alt="User Image" />
                        <div className="panel-body">
                          <div className="row">
                            <div className="col-md-5">
                              <p className="text-bold text-uppercase">Today</p>
                              <div className="row-fluid">
                                <div className="col-md-3">
                                  <div className="wi wi-day-snow font-25 text-warning" />
                                </div>
                                <div className="col-md-9">
                                  <div className="weather-cent text-warning text-bold font-30"><span>25</span></div>
                                </div>
                              </div>
                            </div>
                            <div className="col-md-7">
                              <div className="row">
                                <div className="col-md-2 col-xs-4">
                                  <p className="text-uppercase ">Mon</p>
                                  <div className="wi wi-day-snow font-18 text-indigo" />
                                  <div className="wi-small weather-cent"><span>17</span></div>
                                </div>
                                <div className="col-md-2 col-xs-4">
                                  <p className="text-uppercase">Tue</p>
                                  <div className="wi wi-day-cloudy-windy font-18 text-lime" />
                                  <div className="wi-small weather-cent"><span>22</span></div>
                                </div>
                                <div className="col-md-2 col-xs-4">
                                  <p className="text-uppercase">Wed</p>
                                  <div className="wi wi-day-lightning font-18 text-amber" />
                                  <div className="wi-small weather-cent"><span>17</span></div>
                                </div>
                                <div className="col-md-2 col-xs-4">
                                  <p className="text-uppercase">Thur</p>
                                  <div className="wi wi-night-rain-mix font-18 text-blue" />
                                  <div className="wi-small weather-cent"><span>24</span></div>
                                </div>
                                <div className="col-md-2 col-xs-4">
                                  <p className="text-uppercase">Fri</p>
                                  <div className="wi wi-night-rain font-18 text-slate" />
                                  <div className="wi-small weather-cent"><span>20</span></div>
                                </div>
                                <div className="col-md-2 col-xs-4">
                                  <p className="text-uppercase">Sat</p>
                                  <div className="wi wi-sunrise font-18 text-success" />
                                  <div className="wi-small weather-cent"><span>16</span></div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>
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
