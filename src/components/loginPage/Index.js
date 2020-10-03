import React from 'react';
import "./index.css";
import { Button, message } from 'antd';
import axios from 'axios';


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
        // Ajax request for user account validation
        // API needed for validation
        // axios.post('API_login', {
        //     username: `${username}`,
        //     password: `${password}`
        //   })
        //   .then(res => {
        //     const loginSuccess = res.data.data.login;
        //     if(loginSuccess){
        //          message.success("Login success");
        //          this.setState({login:true});
        //          setTimeout(() => {
        //              window.location.reload();
        //          },2000);
        //     }
        //     else{
        //         this.setState({
        //              hintMessage:"The username or password you entered does not match any account, please try agian or sign up for an account"
        //          });
        //     }
        //   })
        // Ajax end  
        message.success("Login success");
        this.setState({login:true});
        setTimeout(() => {
            window.location.reload();
        },2000);
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