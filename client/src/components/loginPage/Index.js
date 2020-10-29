import React from 'react';
import "./index.css";
import { Button, message,Spin } from 'antd';
import axios from 'axios';
import cookie from 'react-cookies';


class LoginPage extends React.Component{
    
    constructor(props){
        super(props);
        this.state={
            login:false,

            // Function states
            userName: '',
            password:'',

            // UI states
            hintMessage:''
        }
    }
    // Add Enter press event to handle login action
    onKeyUp(e){
        if(e.keyCode === 13) {
            this.login();
        }
    }
    // store user name from user input into component state
    changeUserName(e){
        this.setState({
            userName:e.target.value,
            hintMessage:''
        });
    }
    // store password from user input into component state
    changePassword(e){
        this.setState({
            password:e.target.value,
            hintMessage:''
        })
    }
    // handle login action when user click button or press Enter key
    login(){        
        let username = this.state.userName;
        const password = this.state.password;
        // data needed in request body
        let data = {
            "user":{
                "username": username,
                "password": password
            }
        }
        // user input validation check
        if(username == ""){
            message.error("Username can not be empty");
        }else if(password == ""){
            message.error("Password can not be empty");
        }else{
            // http request for user account validation
            axios.post('https://aip-v1.ts.r.appspot.com/api/users/login',data)
            .then(res => {
                let userInfo = res.data.users; 
                // set cookie to store logged userID for future use in other components
                cookie.save("user_id",userInfo.user_id,{path:"/"});
                this.setState({login:true});
                setTimeout(() => {
                    window.location.reload();
                },2500);            
            })
            .catch((e) => {
                console.log(e);
                // if error replied, display hint message on UI
                this.setState({
                    hintMessage:"The username or password you entered does not match any account, please try again or create an account"
                });
            })
        }        
    }


    render(){
        return(
            <div class="loginPage">
                <div className="loginPage-inputarea">
                    <input 
                        onKeyUp={this.onKeyUp.bind(this)}
                        type='text' 
                        placeholder="Enter User name" 
                        autoFocus='autofocus'
                        value={this.state.userName}
                        onChange={this.changeUserName.bind(this)}/>
                </div>  
                <p>{this.state.hintMessage}</p> 
                <div className="loginPage-inputarea">
                    <input 
                        onKeyUp={this.onKeyUp.bind(this)}
                        type='password' 
                        placeholder="Password"
                        value={this.state.password}
                        onChange={this.changePassword.bind(this)}/>
                </div>                        
                <Button type='primary' onClick={this.login.bind(this)}>Login
                </Button>
            </div>
        );
    }
}

export default LoginPage;