import React from 'react';
import "./index.css";
import {message} from 'antd';
import axios from 'axios';
import cookie from 'react-cookies';


class SignupPage extends React.Component{
    
    constructor(props){
        super(props);
        this.state={
            // function states
            firstname:'',
            surname:'',
            emailaddress:'',
            username:'',
            password:'',
            reEnterpassword:''
        }
    }
    // add pressing enter event to handle sign action
    onKeyUp(e){
        if(e.keyCode === 13) {
            this.handleSignup();
        }
    }
    // store user input into component states
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
    onchangereEnterPassword(e){
        this.setState({
            reEnterpassword:e.target.value,
        })
    }
    // store user input into component states
    // end
    
    // when user click sign up button
    handleSignup(){
        // prepare data for request body
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
        // check input validation
        // username is a 1-12 length string with numbers and letters only
        // password must longer than 8 characters and contain at least 1 number
        // email format check
        if(!/^[0-9a-zA-Z]{1,12}$/.test(data.user.username)){
            message.error("Please check your Username. Usernames can only contain 1-12 numbers and letters");
        }
        else if(!/^(?=.*[0-9]+.*)(?=.*[a-zA-Z]+.*)[0-9a-zA-Z]{8,}$/.test(data.user.password)){
            message.error("Passwords should contain at least 1 number and should be longer than 8 characters");
        }
        else if(!/^[a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/.test(data.user.email)){
            message.error("Please check your Email Address");
        }
        else if(data.user.first_name === ""){
            message.error("First name can not be empty");
        }
        else if(data.user.last_name === ""){
            message.error("Surname can not be empty");
        }else if(this.state.password !== this.state.reEnterpassword){
            message.error("Passwords do not match!")
        }
        // if validation passed
        else{
            // HTTP request to add a user in the backend
            axios.post('https://aip-v1.ts.r.appspot.com/api/users',data)
            .then(response => {
                message.success("Sign Up Successful");
            })
            // after successfully sign up, directly log in 
            .then(() =>{
                const username = this.state.username;
                const password = this.state.password;
                let data = {
                    "user":{
                        "username": username,
                        "password": password
                    }
                }
                axios.post('https://aip-v1.ts.r.appspot.com/api/users/login',data)
                .then(res => {
                    let userInfo = res.data.users; 
                    // set cookie to store logged userID for use in other component
                    cookie.save("user_id",userInfo.user_id,{path:"/"});
                    message.success("Welcome!");
                    this.setState({login:true});
                    setTimeout(() => {
                        window.location.reload();
                    },2500);  
                })                
                .catch((e) => {
                    console.log(e);                   
                })
            })
            .catch((e) => {
                message.error("Username is unavailable, please try another one");
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
                            onKeyUp={this.onKeyUp.bind(this)}
                            type="text" 
                            placeholder="First name"
                            autoFocus='autofocus'
                            value={this.state.firstname}
                            onChange={this.onchangeFirstname.bind(this)}/>
                    </div>
                    <div className="signup-surname">
                        <input 
                            onKeyUp={this.onKeyUp.bind(this)}
                            type="text" 
                            placeholder="Surname"
                            value={this.state.surname}
                            onChange={this.onchangeSurname.bind(this)}/>
                    </div>
                </div> 
                <div className="signup-emailaddress">
                    <input
                        onKeyUp={this.onKeyUp.bind(this)}
                        type="email" 
                        placeholder="Email Address"
                        value={this.state.emailaddress}
                        onChange={this.onchangeEmailaddress.bind(this)}/>
                </div> 
                <div className="signup-username">
                    <input 
                        onKeyUp={this.onKeyUp.bind(this)}
                        type="text" 
                        placeholder="User name"
                        value={this.state.username}
                        onChange={this.onchangeUsername.bind(this)}/>
                </div>
                <div className="signup-password">
                    <input 
                        onKeyUp={this.onKeyUp.bind(this)}
                        type="password" 
                        placeholder="Password"
                        value={this.state.password}
                        onChange={this.onchangePassword.bind(this)}/>
                </div>  
                <div className="signup-password">
                    <input 
                        onKeyUp={this.onKeyUp.bind(this)}
                        type="password" 
                        placeholder="Re-enter Password"
                        value={this.state.reEnterpassword}
                        onChange={this.onchangereEnterPassword.bind(this)}/>
                </div>   
                <button type="primary" onClick={this.handleSignup.bind(this)}>Sign up</button>
            </div>            
        );
    }

}

export default SignupPage;