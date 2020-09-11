import React from 'react';
import { Link } from 'react-router-dom';
import './Index.css';
import logo from '../../assert/utslogo.png'
import { Button, Modal } from 'antd';
import { UserOutlined, RetweetOutlined, UsergroupDeleteOutlined } from '@ant-design/icons';
import SignupPage from '../signupPage/Index';
import LoginPage from '../loginPage/Index';


class StartPage extends React.Component{

    constructor(props){
        super(props);
        this.state={
            loginModalVisible:false,
            signupModalVisible:false,
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
    
    handleOk(){

    }

    handleCancel(){

    }

    handleSignUpClick(){
         this.setState({
                signupModalVisible:true
        })
    }
    handleLoginClick(){
        this.setState({
               loginModalVisible:true
       })
   }
   handleCancel(){
    this.setState({
        signupModalVisible:false,
        loginModalVisible:false
    })
   }

    render(){
        return(
            <div className='start'>  
                <div className='start-left'>
                    <ol>
                        <li><UserOutlined />Find your friend</li>
                        <li><RetweetOutlined />Record your interactions</li>
                        <li><UsergroupDeleteOutlined />Find a party interaction</li>
                    </ol>
                </div>                      
                <div className='start-right'>
                    <div className='start-right-header'>
                        <table>
                            <tr>
                                <td>Email or username</td>
                                <td>Password</td>
                            </tr>
                            <tr>
                                <td><div className='start-right-header-inputborder'><input type='text' autoFocus="true"></input></div></td>
                                <td><div className='start-right-header-inputborder'><input type='text'></input></div></td>
                                <td rowSpan='2'><Button type='primary' style={{background:"white",color:"#3872EA"}}>Log in</Button></td>
                            </tr>
                        </table>
                    </div>
                    <div className='start-right-content'>
                        <h1>Start your IOU life right now!</h1>                        
                            <Button type='primary' 
                                    onClick={this.handleSignUpClick.bind(this)}>Sign Up
                            </Button> 
                            <Modal
                                title="Sign Up"
                                footer={[]}
                                visible={this.state.signupModalVisible}
                                onOk={this.handleSignupSubmit}
                                onCancel={this.handleCancel.bind(this)}
                            ><SignupPage /></Modal>                   
                            <Button type='primary' style={{background:"white",color:"#3872EA"}}
                                    onClick={this.handleLoginClick.bind(this)}>Log In
                            </Button>     
                            <Modal
                                title="Log in"
                                footer={[]}
                                visible={this.state.loginModalVisible}
                                onOk={this.handleOk}
                                onCancel={this.handleCancel.bind(this)}
                            ><LoginPage /></Modal>                     
                    </div>                                          
                </div>
            </div>  
        );        
    }
}

export default StartPage;