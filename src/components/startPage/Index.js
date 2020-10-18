import React from 'react';
import { Link, Router, Route } from 'react-router';
import './Index.css';
import logo from '../../assert/utslogo.png'
import { Button, Layout, Modal, Avatar } from 'antd';
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
import cookie from 'react-cookies';


class StartPage extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            loginModalVisible: false,
            signupModalVisible: false,
            addRequestVisible: false,
            logoutModalVisible: false,
            showLoginButtons: "block",
            showLogoutButtons: "none",
            showRequestList: "block",
            showMypostButton: "none",
            showDashboard: "none",
            showLeaderBoard: "none",
            showMyPosts: "none",
            loginStatus: false,
            userID: null,
            username:"",

            browseButtonStyle: {},
            leaderBoardButtonStyle: {},            
            showAddRewardButton:{display:"none"},
            dashboardButtonStyle: { display: "none" },
            myPostsButtonStyle: { display: "none" }
        };
    }

    componentDidMount() {

        // get login status from cookie
        let userID = cookie.load("user_id");

        axios.get(`https://aip-v1.ts.r.appspot.com/api/users/${userID}`)
        .then(response => {
            let username = response.data.users[0].first_name+" "+response.data.users[0].last_name
            this.setState({
                username: username
            })
        })
        .catch((e) => {
            console.log(e)
        })
        // hide login button and sign up button, show personal home button
        if (userID) {
            this.setState({
                dashboardButtonStyle: { display: "block" },
                myPostsButtonStyle: { display: "block" },
                showAddRewardButton:{display:"block"},
                showLoginButtons: "none",
                showLogoutButtons: "block"
            })
        }
        else {
            this.setState({
                dashboardButtonStyle: { display: "none" },
                myPostsButtonStyle: { display: "none" },
                showAddRewardButton:{display:"none"},
                showLoginButtons: "block",
                showLogoutButtons: "none"
            })
        }

    }

    handleSignUpClick() {
        this.setState({
            signupModalVisible: true
        })
    }
    handleLoginClick() {
        this.setState({
            loginModalVisible: true
        })
    }
    handleLogoutClick() {
        this.setState({
            logoutModalVisible: true

        })
    }
    handleCancel() {
        this.setState({
            signupModalVisible: false,
            loginModalVisible: false,
            logoutModalVisible: false,
            addRequestVisible: false
        })
        this.forceUpdate();
    }
    handleAddRequest() {
        this.setState({
            addRequestVisible: true
        })
    }

    displayRequestsList() {
        this.setState({
            browseButtonStyle: {
                marginTop: "2px",
                borderBottom: "2px solid #008FB4",
                cursor: "pointer",
                color: "#008FB4",
            },
            showRequestList: "block",
            dashboardButtonStyle: { display: `${this.state.dashboardButtonStyle.display}` },
            leaderBoardButtonStyle: {},
            myPostsButtonStyle: { display: `${this.state.myPostsButtonStyle.display}` },
            showLeaderBoard: "none",
            showDashboard: "none",
            showMyPosts: "none"
        });
    }
    displayLeaderBoard() {
        this.setState({
            leaderBoardButtonStyle: {
                marginTop: "2px",
                borderBottom: "2px solid #008FB4",
                cursor: "pointer",
                color: "#008FB4",
            },
            showLeaderBoard: "block",
            browseButtonStyle: {},
            myPostsButtonStyle: { display: `${this.state.myPostsButtonStyle.display}` },
            dashboardButtonStyle: { display: `${this.state.dashboardButtonStyle.display}` },
            showRequestList: "none",
            showDashboard: "none",
            showMyPosts: "none"
        });
    }
    displayMyPosts() {
        this.setState({
            myPostsButtonStyle: {
                marginTop: "2px",
                borderBottom: "2px solid #008FB4",
                cursor: "pointer",
                color: "#008FB4",
            },
            showMyPosts: "block",
            browseButtonStyle: {},
            leaderBoardButtonStyle: {},
            dashboardButtonStyle: { display: `${this.state.dashboardButtonStyle.display}` },
            showRequestList: "none",
            showLeaderBoard: "none",
            showDashboard: "none"
        });
    }
    displayDashboardList() {
        this.setState({
            dashboardButtonStyle: {
                marginTop: "2px",
                borderBottom: "2px solid #008FB4",
                cursor: "pointer",
                color: "#008FB4",
            },
            showDashboard: "block",
            leaderBoardButtonStyle: {},
            myPostsButtonStyle: { display: `${this.state.myPostsButtonStyle.display}` },
            browseButtonStyle: {},
            showLeaderBoard: "none",
            showRequestList: "none",
            showMyPosts: "none"
        });
    }

    render() {
        let self = this;
        return (
            <div className="start">
                <div className="start-header">
                    <div className="start-header-left">
                        <img src={logo}></img>
                        <div
                            className="start-header-addRequestButton"
                            style={self.state.showAddRewardButton}
                            onClick={self.handleAddRequest.bind(self)}
                        >Add new Request
                        </div>
                        <div className="start-header-navigation">
                            <button
                                style={self.state.browseButtonStyle}
                                onClick={self.displayRequestsList.bind(self)}
                            >All Posts</button>
                            <button
                                style={self.state.leaderBoardButtonStyle}
                                onClick={self.displayLeaderBoard.bind(self)}
                            >Leader-Board</button>
                            <button
                                style={self.state.myPostsButtonStyle}
                                onClick={self.displayMyPosts.bind(self)}
                            >My Posts</button>
                            <button
                                style={self.state.dashboardButtonStyle}
                                onClick={self.displayDashboardList.bind(self)}
                            >My Owes</button>
                        </div>
                    </div>
                    <div className="start-header-right" style={{ display: self.state.showLoginButtons }}>
                        <Button
                            type="default"
                            onClick={self.handleLoginClick.bind(self)}
                        >Log In</Button>
                        <Button
                            type="primary"
                            onClick={self.handleSignUpClick.bind(self)}
                        >Join now</Button>
                    </div>
                    <div className="start-header-right" style={{ display: self.state.showLogoutButtons }}>
                        <Avatar style={{
                            color: '#f56a00',
                            backgroundColor: '#fde3cf',
                            overflow:"true"
                        }} size={75}>{this.state.username}</Avatar>
                        <Button
                            type="default"
                            onClick={self.handleLogoutClick.bind(self)}
                        >
                            Log Out</Button>
                           

                    </div>
                </div>
                <div className="start-body">
                    <div style={{ display: self.state.showRequestList }}><RequestList userID={self.state.userID} /></div>
                    <div style={{ display: self.state.showLeaderBoard }}><LeaderBoard /></div>
                    <div style={{ display: self.state.showMyPosts }}><MyPosts userID={self.state.userID} /></div>
                    <div style={{ display: self.state.showDashboard }}><Transaction /></div>
                </div>

                <Modal
                    title="Create your Request"
                    footer={[]}
                    visible={self.state.addRequestVisible}
                    onOk={self.handleAddRequestSubmit}
                    onCancel={self.handleCancel.bind(self)}>
                    <AddRequest userID={self.state.userID} />
                </Modal>
                <Modal
                    title="Create a new account"
                    footer={[]}
                    visible={self.state.signupModalVisible}
                    onOk={self.handleSignupSubmit}
                    onCancel={self.handleCancel.bind(self)}>
                    <SignupPage />
                </Modal>
                <Modal
                    title="Log in to IOU"
                    footer={[]}
                    visible={self.state.loginModalVisible}
                    onOk={self.handleLoginSubmit}
                    onCancel={self.handleCancel.bind(self)}>
                    <LoginPage />
                </Modal>
                <Modal
                    title="Are Your Sure Want to logout?"
                    footer={[]}
                    visible={self.state.logoutModalVisible}
                    onOk={self.handleLoginSubmit}
                    onCancel={self.handleCancel.bind(self)}>
                    <LogoutPage />
                </Modal>
            </div>
        );
    }
}

export default StartPage;

