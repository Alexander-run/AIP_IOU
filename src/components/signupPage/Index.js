import React, { Fragment } from 'react';
import "./index.css";
import {message} from 'antd';
import axios from 'axios';


class SignupPage extends React.Component{
    
    constructor(props){
        super(props);
        this.state={
            firstname:'',
            surname:'',
            emailaddress:'',
            username:'',
            password:''
        }
    }

    onchangeFirstname(e){
        this.setState({
            firstname:e.target.value,
        })
    }
    onchangeSurname(e){
        this.setState({
            surname:e.target.value,
        })
    }
    onchangeEmailaddress(e){        
        this.setState({
            emailaddress:e.target.value,
        })
    }
    onchangeUsername(e){
        this.setState({
            username:e.target.value,
        })
    }
    onchangePassword(e){
        this.setState({
            password:e.target.value,
        })
    }
    handleSignup(){
        let resMessage;
        // HTTP post request to API (create a new post)
        let data = {
            "user":{
                "first_name":`${this.state.firstname}`,
                "username":`${this.state.username}`,
                "last_name":`${this.state.surname}`,
                "email":`${this.state.emailaddress}`,
                "password":`${this.state.password}`
            }
        };        
        console.log(data);
        // check input information
        if(!/^[0-9a-zA-Z]{1,12}$/.test(data.user.username)){
            message.error("Please check your Username. Username can only contain 1-12 number and letters");
        }
        else if(!/^[0-9a-zA-Z]{1,12}$/.test(data.user.password)){
            message.error("Please check your Password. Password can only contain 1-12 number and letters");
        }
        else if(!/^[a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/.test(data.user.email)){
            message.error("Please check your Email Address");
        }
        else if(data.user.first_name == ""){
            message.error("First name can not be null");
        }
        else if(data.user.last_name == ""){
            message.error("Surname can not be null");
        }
        else{
            // HTTP request
            axios.post('https://aip-v1.ts.r.appspot.com/api/users',data)
            .then(response => {
                resMessage = response.data.message;
                message.success(resMessage);
                setTimeout(() => {
                    window.location.reload();
                },2000);
            })
            .catch((e) => {
                message.error("please recheck your input and change a new user name");
                console.log(e)
            })
        }       
    }

    render(){
        return(
            <div className='signup'>
                <div className="signup-fullname">
                    <div className="signup-firstname">
                        <input 
                            type="text" 
                            placeholder="First name"
                            autoFocus='autofocus'
                            value={this.state.firstname}
                            onChange={this.onchangeFirstname.bind(this)}/>
                    </div>
                    <div className="signup-surname">
                        <input 
                            type="text" 
                            placeholder="Surname"
                            value={this.state.surname}
                            onChange={this.onchangeSurname.bind(this)}/>
                    </div>
                </div> 
                <div className="signup-emailaddress">
                    <input
                        type="email" 
                        placeholder="Email Address"
                        value={this.state.emailaddress}
                        onChange={this.onchangeEmailaddress.bind(this)}/>
                </div> 
                <div className="signup-username">
                    <input 
                        type="text" 
                        placeholder="User name"
                        value={this.state.username}
                        onChange={this.onchangeUsername.bind(this)}/>
                </div>
                <div className="signup-password">
                    <input 
                        type="password" 
                        placeholder="Password"
                        value={this.state.password}
                        onChange={this.onchangePassword.bind(this)}/>
                </div>    
                <button type="primary" onClick={this.handleSignup.bind(this)}>Sign up</button>
            </div>            
        );
    }

}

export default SignupPage;