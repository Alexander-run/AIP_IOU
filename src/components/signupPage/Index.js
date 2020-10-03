import React, { Fragment } from 'react';
import "./index.css";


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
                        type="text" 
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