import React from 'react';
import './App.css';
import MainPage from './components/mainPage/MainPage';
import { BrowserRouter, Route, Switch, Link } from 'react-router-dom';
import SignupPage from './components/signupPage/SignupPage';
import logo from './components/utslogo.png';
import { Button } from 'antd';
import Home from './components/Home/Home';
import 'antd/dist/antd.css';


class App extends React.Component{
  
  constructor(props){
    super(props);
    this.state={
        login: false
    };
  }

  handleSignOut(){
    // SignOut
    this.setState({login:false});
    // API needed to sign out

    
    // After logout request finished, redirect to entry page
    this.props.history.push('/');
  }

  render(){
    if(this.state.login){
      return(
        <BrowserRouter>
          <div className='header'>
              <Link to='/'>
                  <img 
                      class='main-header-logo' 
                      src={logo}>                            
                  </img>
              </Link>
              <Button 
                type='primary'
                className='signout'
                onClick={this.handleSignOut.bind(this)}> Sign out
              </Button>
          </div>
          <div className='body'>          
              <Switch>      
                <Route path='/home/:id' component={Home}/>      
                <Route path='/signupPage' component={SignupPage}/>
                <Route path='/' component={MainPage}/>
              </Switch>           
          </div> 
        </BrowserRouter>    
      ) 
    }
    else{
        return(
          <BrowserRouter>
          <div className='header'>
              <Link to='/'>
                  <img 
                      class='main-header-logo' 
                      src={logo}>                            
                  </img>
              </Link>            
          </div>
          <div className='body'>          
              <Switch>      
                <Route path='/home/:id' component={Home}/>      
                <Route path='/signupPage' component={SignupPage}/>
                <Route path='/' component={MainPage}/>
              </Switch>           
          </div> 
        </BrowserRouter>
        ) 
    }   
  }
}

export default App;
