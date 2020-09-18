import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import "./index.css";
import { Button, message } from 'antd';


class LoginPage extends React.Component{
    
    constructor(props){
        super(props);
        this.state={
            login:false,
            userName: '',
            password:'',
            hintMessage:''
        }
    }

    changeUserName(e){
        this.setState({
            userName:e.target.value,
            hintMessage:''
        });
    }
    changePassword(e){
        this.setState({
            password:e.target.value,
            hintMessage:''
        })
    }
    
    checkLogin(){
        this.setState({
            hintMessage:"The username or password you entered does not match any account, please try agian or sign up for an account"
        });
        const login=false;
        // Ajax request for user account validation
        // API needed for validation

        // Ajax end
        if(login){
            message.success("Login success");
            this.setState({login:true});
        }
        else{
            message.error("Login failed");
        }
    }


    render(){
        return(
            <div class="loginPage">
                <div className="loginPage-inputarea">
                    <input 
                        type='text' 
                        placeholder="Enter User name" 
                        autoFocus='autofocus'
                        value={this.state.userName}
                        onChange={this.changeUserName.bind(this)}/>
                </div>  
                <p>{this.state.hintMessage}</p> 
                <div className="loginPage-inputarea">
                    <input 
                        type='password' 
                        placeholder="Password"
                        value={this.state.password}
                        onChange={this.changePassword.bind(this)}/>
                </div>                        
                <Button type='primary' onClick={this.checkLogin.bind(this)}>Login</Button>
                <div className="loginPage-fogetPassword"> 
                    Forgotten password?
                </div>
            </div>
        );
    }

}

export default LoginPage;