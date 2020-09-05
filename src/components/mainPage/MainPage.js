import React, { Fragment } from 'react';
import LeaderBoard from './leaderBoard/LeaderBoard';
import LoginPage from './loginPage/LoginPage';
import { Link } from 'react-router-dom';
import './MainPage.css';
import { Button } from 'antd';

class MainPage extends React.Component{

    constructor(props){
        super(props);
        this.state={
            login: false,
            userID: null
        };
    }

    componentDidMount(){
        // check whether is logged in or not
 
    }

    componentDidUpdate(){
        // check whether is logged in or not
    }
    
    render(){
        // if logged in, render a button linking to home page
        // else not loggedin, render the login page
        if(this.state.login){
            return(
                <table className='main'><tr>                
                    <td className='leaderBoard'><LeaderBoard/></td>
                    <td className='login'>
                        <Link to='/home'>
                            <Button type='primary'>My Home</Button>
                        </Link>
                        <Link to='/signupPage'>
                            <Button type='primary'>Sign Up a new Account</Button>
                        </Link>                        
                    </td>
                </tr></table>  
            );
        }
        else{
            return(
                <table className='main'><tr>                
                    <td className='leaderBoard'><LeaderBoard/></td>
                    <td className='login'><LoginPage/></td>
                </tr></table>              
            );
        }
        
    }
}

export default MainPage;