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
import Transaction from '../Transaction/Transaction';
import LogoutPage from '../LogoutPage/Index';
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
            logoutModalVisible:false,
            showLoginButtons:"block",
            showLogoutButtons:"none",
            showRequestList:"block",
            showMypostButton:"none",
            showDashboard:"none",
            showLeaderBoard:"none",
            showMyPosts:"none",
            loginStatus: false,
            userID: null,

            
            browseButtonStyle:{},
            leaderBoardButtonStyle:{},
            dashboardButtonStyle:{display:"none"},
            myPostsButtonStyle:{display:"none"}
        };
    }

    componentDidMount(){
        // get login status from cookie

        // hide login button and sign up button, show personal home button
        if(this.state.loginStatus){
            this.setState({                
                dashboardButtonStyle:{display:"block"},
                myPostsButtonStyle:{display:"block"},
                showLoginButtons:"none",
                showLogoutButtons:"block"
            })            
        }
        else{
            this.setState({
                dashboardButtonStyle:{display:"none"},
                myPostsButtonStyle:{display:"none"},
                showLoginButtons:"block",
                showLogoutButtons:"none"
            })    
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
   handleLogoutClick(){
    this.setState({
          logoutModalVisible:true

   })
}
   handleCancel(){
        this.setState({
            signupModalVisible:false,
            loginModalVisible:false,
            logoutModalVisible:false,
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
            dashboardButtonStyle:{display:`${this.state.dashboardButtonStyle.display}`},
            leaderBoardButtonStyle:{},
            myPostsButtonStyle:{display:`${this.state.myPostsButtonStyle.display}`},
            showLeaderBoard:"none",
            showDashboard:"none",
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
            myPostsButtonStyle:{display:`${this.state.myPostsButtonStyle.display}`},
            dashboardButtonStyle:{display:`${this.state.dashboardButtonStyle.display}`},
            showRequestList:"none",
            showDashboard:"none",
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
            dashboardButtonStyle:{display:`${this.state.dashboardButtonStyle.display}`},
            showRequestList:"none",
            showLeaderBoard:"none",
            showDashboard:"none"
        });   
    }
    displayDashboardList(){
        this.setState({
             dashboardButtonStyle:{
                 marginTop: "2px",
                 borderBottom: "2px solid #008FB4",
                 cursor: "pointer",
                 color: "#008FB4",
             },
             showDashboard:"block",
             leaderBoardButtonStyle:{},
             myPostsButtonStyle:{display:`${this.state.myPostsButtonStyle.display}`},
             browseButtonStyle:{},
             showLeaderBoard:"none",
             showRequestList:"none",
             showMyPosts:"none"
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
                            >Leader-Board</button>
                            <button
                                style={this.state.myPostsButtonStyle}
                                onClick={this.displayMyPosts.bind(this)}
                            >My Posts</button>
                            <button
                                style={this.state.dashboardButtonStyle}
                                onClick={this.displayDashboardList.bind(this)}
                            >My Owes</button>
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
                    <div className="start-header-right" style={{display:this.state.showLogoutButtons}}>
                        <Button 
                            type="default"
                            onClick={this.handleLogoutClick.bind(this)}
                        >Log Out</Button>                            
                    </div>                    
                </div>
                <div className="start-body">
                    <div style={{display:this.state.showRequestList}}><RequestList  userID = {this.state.userID}/></div>
                    <div style={{display:this.state.showLeaderBoard}}><LeaderBoard /></div>                    
                    <div style={{display:this.state.showMyPosts}}><MyPosts userID = {this.state.userID}/></div> 
                    <div style={{display:this.state.showDashboard}}><Transaction /></div>
                </div>

                <Modal
                    title="Create your Request"
                    footer={[]}
                    visible={this.state.addRequestVisible}
                    onOk={this.handleAddRequestSubmit}
                    onCancel={this.handleCancel.bind(this)}>
                        <AddRequest  userID = {this.state.userID}/>
                </Modal>                
                <Modal
                    title="Create a new account"
                    footer={[]}
                    visible={this.state.signupModalVisible}
                    onOk={this.handleSignupSubmit}
                    onCancel={this.handleCancel.bind(this)}>
                        <SignupPage />
                </Modal>                    
                <Modal
                    title="Log in to IOU"
                    footer={[]}
                    visible={this.state.loginModalVisible}
                    onOk={this.handleLoginSubmit}
                    onCancel={this.handleCancel.bind(this)}>
                        <LoginPage />
                </Modal>    
                <Modal
                    title="Are Your Sure Want to logout?"
                    footer={[]}
                    visible={this.state.logoutModalVisible}
                    onOk={this.handleLoginSubmit}
                    onCancel={this.handleCancel.bind(this)}>
                        <LogoutPage />
                </Modal>                             
            </div>  
        );        
    }
}

export default StartPage;

