import React from 'react';
import { Link, Router, Route } from 'react-router';
import './Index.css';
import logo from '../../assert/utslogo.png'
import { Button, Layout, Modal } from 'antd';
import SignupPage from '../signupPage/Index';
import LoginPage from '../loginPage/Index';
import LeaderBoard from "../leaderBoard/LeaderBoard";
import RequestList from "../requestList/RequestList";
import AddRequest from "../AddRequest/Index";
import Sider from 'antd/lib/layout/Sider';
import axios from 'axios';
import MyPosts from '../MyPosts/MyPosts';


class StartPage extends React.Component{

    constructor(props){
        super(props);
        this.state={
            loginModalVisible:false,
            signupModalVisible:false,
            addRequestVisible:false,
            showLoginButtons:"block",
            showRequestList:"block",
            showLeaderBoard:"none",
            showMyPosts:"none",
            loginStatus: false,
            userID: null,

            browseButtonStyle:{},
            leaderBoardButtonStyle:{},
            myPostsButtonStyle:{}
        };
    }

    componentDidMount(){
        // check whether is logged in or not
        // API for check_login
        
        // axios.get('API_checkloginstatus')
        //     .then(res => {
        //         const loginStatus = res.data.data.login;
        //         this.setState({
        //             loginStatus:`${loginStatus}`
        //         })
        //     })
        // // API end
        if(this.state.loginStatus){
            // hide login button and sign up button, show personal home button
            
        }
            
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
            loginModalVisible:false,
            addRequestVisible:false
        })
        this.forceUpdate();
   }
   handleAddRequest(){
        this.setState({
            addRequestVisible:true
        })
   }

   displayRequestsList(){
       this.setState({
            browseButtonStyle:{
                marginTop: "2px",
                borderBottom: "2px solid #008FB4",
                cursor: "pointer",
                color: "#008FB4",
            },
            showRequestList:"block",
            leaderBoardButtonStyle:{},
            myPostsButtonStyle:{},
            showLeaderBoard:"none",
            showMyPosts:"none"
       });
   }
   displayLeaderBoard(){
        this.setState({
            leaderBoardButtonStyle:{
                marginTop: "2px",
                borderBottom: "2px solid #008FB4",
                cursor: "pointer",
                color: "#008FB4",
            },
            showLeaderBoard:"block",
            browseButtonStyle:{},
            myPostsButtonStyle:{},
            showRequestList:"none",
            showMyPosts:"none"
        });    
    }
    displayMyPosts(){
        this.setState({
            myPostsButtonStyle:{
                marginTop: "2px",
                borderBottom: "2px solid #008FB4",
                cursor: "pointer",
                color: "#008FB4",
            },
            showMyPosts:"block",
            browseButtonStyle:{},
            leaderBoardButtonStyle:{},
            showRequestList:"none",
            showLeaderBoard:"none"
        });   
    }

    render(){
        return( 
            <div className="start"> 
                <div className="start-header">
                    <div className="start-header-left">
                        <img src={logo}></img>
                        <div 
                            className="start-header-addRequestButton"                        
                            onClick={this.handleAddRequest.bind(this)}
                        >Add new Request
                        </div>
                        <div className="start-header-navigation">
                            <button
                                style={this.state.browseButtonStyle}
                                onClick={this.displayRequestsList.bind(this)}
                            >All Posts</button>
                            <button
                                style={this.state.leaderBoardButtonStyle}
                                onClick={this.displayLeaderBoard.bind(this)}
                            >Leader Board</button>
                            <button
                                style={this.state.myPostsButtonStyle}
                                onClick={this.displayMyPosts.bind(this)}
                            >My Posts</button>
                        </div>
                    </div>
                    <div className="start-header-right" style={{display:this.state.showLoginButtons}}>
                        <Button 
                            type="default"
                            onClick={this.handleLoginClick.bind(this)}
                        >Log In</Button>
                        <Button
                            type="primary"
                            onClick={this.handleSignUpClick.bind(this)}
                        >Join now</Button>
                    </div>
                </div>
                <div className="start-body">
                    <div style={{display:this.state.showRequestList}}><RequestList /></div>
                    <div style={{display:this.state.showLeaderBoard}}><LeaderBoard /></div>                    
                    <div style={{display:this.state.showMyPosts}}><MyPosts /></div> 
                </div>

                <Modal
                    title="Create your Request"
                    footer={[]}
                    visible={this.state.addRequestVisible}
                    onOk={this.handleAddRequestSubmit}
                    onCancel={this.handleCancel.bind(this)}>
                        <AddRequest />
                </Modal>                
                <Modal
                    title="Create a new account"
                    footer={[]}
                    visible={this.state.signupModalVisible}
                    onOk={this.handleSignupSubmit}
                    onCancel={this.handleCancel.bind(this)}>
                        <SignupPage/>
                </Modal>                    
                <Modal
                    title="Log in to IOU"
                    footer={[]}
                    visible={this.state.loginModalVisible}
                    onOk={this.handleLoginSubmit}
                    onCancel={this.handleCancel.bind(this)}>
                        <LoginPage />
                </Modal>                             
            </div>  
        );        
    }
}

export default StartPage;

