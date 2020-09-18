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
            password:null
        }
    }

    changeFirstname(e){
        this.setState({
            firstname:e.target.value,
        })
    }
    changeSurname(e){
        this.setState({
            surname:e.target.value,
        })
    }
    changeEmailaddress(e){
        this.setState({
            emailaddress:e.target.value,
        })
    }
    changeUsername(e){
        this.setState({
            username:e.target.value,
        })
    }
    changePassword(e){
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
                            onChange={this.changeFirstname.bind(this)}/>
                    </div>
                    <div className="signup-surname">
                        <input 
                            type="text" 
                            placeholder="Surname"
                            value={this.state.surname}
                            onChange={this.changeSurname.bind(this)}/>
                    </div>
                </div> 
                <div className="signup-emailaddress">
                    <input 
                        type="text" 
                        placeholder="Email Address"
                        value={this.state.emailaddress}
                        onChange={this.changeEmailaddress.bind(this)}/>
                </div> 
                <div className="signup-username">
                    <input 
                        type="text" 
                        placeholder="User name"
                        value={this.state.username}
                        onChange={this.changeUsername.bind(this)}/>
                </div>
                <div className="signup-password">
                    <input 
                        type="password" 
                        placeholder="Password"
                        value={this.state.password}
                        onChange={this.changePassword.bind(this)}/>
                </div>    
                <button type="primary" onClick={this.handleSignup.bind(this)}>Sign up</button>
            </div>            
        );
    }

}

export default SignupPage;