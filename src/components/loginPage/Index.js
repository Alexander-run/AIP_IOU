import React from 'react';
import "./index.css";
import { Button, message } from 'antd';
import axios from 'axios';
import cookie from 'react-cookies';


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
    
    login(){        
        const username = this.state.userName;
        const password = this.state.password;
        let data = {
            "user":{
                "username": username,
                "password": password
            }
        }
        if(username == ""){
            message.error("Username can not be null");
        }else if(password == ""){
            message.error("Password can not be null");
        }else{
            // http request for user account validation
            axios.post('https://aip-v1.ts.r.appspot.com/api/users/login',data)
            .then(res => {
                let userInfo = res.data.users; 
                // set cookie to store logged userID for use in other component
                cookie.save("user_id",userInfo.user_id,{path:"/"});
                message.success("Login Success, will return to main page in 2 seconds");
                this.setState({login:true});
                setTimeout(() => {
                    window.location.reload();
                },2000);            
            })
            .catch((e) => {
                console.log(e);
                this.setState({
                    hintMessage:"The username or password you entered does not match any account, please try again or sign up for an account"
                });
            })
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
                <Button type='primary' onClick={this.login.bind(this)}>Login</Button>
                <div className="loginPage-fogetPassword"> 
                    Forgotten password?
                </div>
            </div>
        );
    }
}

export default LoginPage;