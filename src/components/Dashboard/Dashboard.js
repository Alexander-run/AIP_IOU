import React from 'react';
import { Link, Router, Route } from 'react-router';
import './Dashboard.css';
import logo from '../../assert/utslogo.png'
import { Button, Layout, Modal } from 'antd';
import LeaderBoard from "../leaderBoard/LeaderBoard";
import RequestList from "../requestList/RequestList";
import AddRequest from "../AddRequest/Index";
import Sider from 'antd/lib/layout/Sider';
import axios from 'axios';
import LogoutPage from '../LogoutPage/Index';
import { GiBlockHouse } from 'react-icons/gi';


class Dashboard extends React.Component{

    constructor(props){
        super(props);
        this.state={
            addRequestVisible:false,
            logoutModalVisible:false,
            showLogoutButtons:"block",
            showRequestList:"block",
            showDashboard:"block",
            showLeaderBoard:"none",
            log: false,
            userID: null,

            browseButtonStyle:{},
            browseButtonStyle1:{},
            leaderBoardButtonStyle:{}
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

    handleLogoutClick(){
        this.setState({
              logoutModalVisible:true

       })
   }
   handleCancel(){
        this.setState({
            addRequestVisible:false,
            logoutModalVisible:false
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
            dashboardButtonStyle:{},
            leaderBoardButtonStyle:{},
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
         browseButtonStyle:{},
         showLeaderBoard:"none",
         showRequestList:"none"
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
         dashboardButtonStyle:{},
         showRequestList:"none",
         showDashboard:"none"
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
                                style={this.state.dashboardButtonStyle}
                                onClick={this.displayDashboardList.bind(this)}
                            >Transanction History</button>
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
                    <div className="start-header-right" style={{display:this.state.showLogoutButtons}}>
                        <Button 
                            type="default"
                            onClick={this.handleLogoutClick.bind(this)}
                        >Log Out</Button>
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

export default Dashboard;

