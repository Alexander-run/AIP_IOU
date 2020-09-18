import React from 'react';
import { Link, Router, Route } from 'react-router';
import './Index.css';
import logo from '../../assert/utslogo.png'
import { Button, Modal } from 'antd';
import SignupPage from '../signupPage/Index';
import LoginPage from '../loginPage/Index';
import LeaderBoard from "../leaderBoard/LeaderBoard";
import RequestList from "../requestList/RequestList";
import AddRequest from "../AddRequest/Index";


class StartPage extends React.Component{

    constructor(props){
        super(props);
        this.state={
            loginModalVisible:false,
            signupModalVisible:false,
            addRequestVisible:false,
            showRequestList:"block",
            showLeaderBoard:"none",
            loginStatus: false,
            userID: null,

            browseButtonStyle:{},
            leaderBoardButtonStyle:{}
        };
    }

    componentDidMount(){
        // check whether is logged in or not
 
    }

    componentDidUpdate(){
        // check whether is logged in or not
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
            showLeaderBoard:"none"
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
         showRequestList:"none"
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
                            >Browse all Requests</button>
                            <button
                                style={this.state.leaderBoardButtonStyle}
                                onClick={this.displayLeaderBoard.bind(this)}
                            >See who are in lead</button>
                        </div>
                    </div>
                    <div className="start-header-right">
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
            </div>  
        );        
    }
}

export default StartPage;