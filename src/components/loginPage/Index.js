import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import { Button, message } from 'antd';


class LoginPage extends React.Component{
    
    constructor(props){
        super(props);
        this.state={
            login:false,
            userName: '',
            password:''
        }
    }

    changeUserName(e){
        this.setState({
            userName:e.target.value
        });
    }
    changePassword(e){
        this.setState({
            password:e.target.value
        })
    }
    
    checkLogin(){
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
            <Fragment>                
                <input 
                    type='text' 
                    placeholder="Enter User name" 
                    autoFocus='autofocus'
                    value={this.state.userName}
                    onChange={this.changeUserName.bind(this)}/><br></br><br></br>
                <input 
                    type='password' 
                    placeholder="Password"
                    value={this.state.password}
                    onChange={this.changePassword.bind(this)}/><br></br><br></br>
                <Button type='primary' onClick={this.checkLogin.bind(this)}>Login</Button>
            </Fragment>
        );
    }

}

export default LoginPage;