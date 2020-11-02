import React from 'react';
import './Index.css';
import logo from '../../assert/utslogo.png'
import { Button, Modal, Avatar } from 'antd';
import SignupPage from '../signupPage/Index';
import LoginPage from '../loginPage/Index';
import LeaderBoard from "../leaderBoard/LeaderBoard";
import RequestList from "../requestList/RequestList";
import AddRequest from "../AddRequest/Index";
import Transaction from '../Transaction/Transaction';
import LogoutPage from '../LogoutPage/Index';
import axios from 'axios';
import MyPosts from '../MyPosts/MyPosts';
import cookie from 'react-cookies';
import Party from '../Party/party';


class StartPage extends React.Component {

    constructor(props) {
        super(props);
        this.state = {

            // UI logic  states
            username:"",
            loginModalVisible: false,
            signupModalVisible: false,
            addRequestVisible: false,
            logoutModalVisible: false,
            showLoginButtons: "block",
            showLogoutButtons: "none",
            showRequestList: "block",
            showMypostButton: "none",
            showDashboard: "none",
            showParty:"none",
            showLeaderBoard: "none",
            showMyPosts: "none",
            loginStatus: false,
            userID: null,                    
            browseButtonStyle: {},
            leaderBoardButtonStyle: {},            
            showAddRewardButton:{display:"none"},
            dashboardButtonStyle: { display: "none" },
            myPartyButtonStyle: {display:"none"},
            myPostsButtonStyle: { display: "none" }
            // UI logic  states end
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
        // if user log in
        // hide login button and sign up button, show personal home button
        if (userID) {
            this.setState({
                dashboardButtonStyle: { display: "block" },
                myPostsButtonStyle: { display: "block" },
                showAddRewardButton:{display:"block"},
                myPartyButtonStyle: {display:"block"},
                showLoginButtons: "none",
                showLogoutButtons: "block"
            })
        }
        // else if no user currently log in 
        else {
            this.setState({
                dashboardButtonStyle: { display: "none" },
                myPostsButtonStyle: { display: "none" },
                showAddRewardButton:{display:"none"},
                myPartyButtonStyle: {display:"none"},
                showLoginButtons: "block",
                showLogoutButtons: "none"
            })
        }

    }
    // when user wants to sign a new account, show sign up component in a modal
    handleSignUpClick() {
        this.setState({
            signupModalVisible: true
        })
    }
    // when user wants to log in, show log in component in a modal
    handleLoginClick() {
        this.setState({
            loginModalVisible: true
        })
    }
    // when user wants to log out, show log out component in a modal
    handleLogoutClick() {
        this.setState({
            logoutModalVisible: true

        })
    }
    // UI logic
    handleCancel() {
        this.setState({
            signupModalVisible: false,
            loginModalVisible: false,
            logoutModalVisible: false,
            addRequestVisible: false
        })
        this.forceUpdate();
    }
    // when user wants to create a new post, show addRequest component in a modal
    handleAddRequest() {
        this.setState({
            addRequestVisible: true
        })
    }
    // UI logic, for top navigation buttons
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
            showMyPosts: "none",
            showParty:"none",
            myPartyButtonStyle:{display: `${this.state.myPartyButtonStyle.display}`}
        });
    }
    // UI logic, for top navigation buttons
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
            showMyPosts: "none",
            showParty:"none",
            myPartyButtonStyle:{display: `${this.state.myPartyButtonStyle.display}`}
        });
    }
    // UI logic, for top navigation buttons
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
            showDashboard: "none",
            showParty:"none",
            myPartyButtonStyle:{display: `${this.state.myPartyButtonStyle.display}`}
        });
    }
    // UI logic, for top navigation buttons
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
            showMyPosts: "none",
            showParty:"none",
            myPartyButtonStyle:{display: `${this.state.myPartyButtonStyle.display}`}
        });
    }
    // UI logic, for top navigation buttons
    displayPartyDetecing(){
        this.setState({
            myPartyButtonStyle: {
                marginTop: "2px",
                borderBottom: "2px solid #008FB4",
                cursor: "pointer",
                color: "#008FB4",
            },
            showParty:"block",
            browseButtonStyle: {},
            dashboardButtonStyle:{},
            leaderBoardButtonStyle: {},
            myPostsButtonStyle:{},
            showRequestList: "none",
            showMyPosts: "none",
            showLeaderBoard: "none",
            showDashboard: "none",

        });
    }
    // UI logic, when user click the application logo, reload the page to return to the start page from any position
    handleReload(){
        window.location.reload();
    }




    render() {
        let self = this;
        return (
            <div className="start">
                <div className="start-header">
                    <div className="start-header-left">
                        <img alt="Logo" src={logo} onClick={this.handleReload.bind(this)}></img>
                        <div
                            className="start-header-addRequestButton"
                            style={self.state.showAddRewardButton}
                            onClick={self.handleAddRequest.bind(self)}
                        >Add Post
                        </div>
                        <div className="start-header-navigation">
                            <button
                                style={self.state.browseButtonStyle}
                                onClick={self.displayRequestsList.bind(self)}
                            >All Posts</button>
                            <button
                                style={self.state.leaderBoardButtonStyle}
                                onClick={self.displayLeaderBoard.bind(self)}
                            >Leader Board</button>
                            <button
                                style={self.state.myPostsButtonStyle}
                                onClick={self.displayMyPosts.bind(self)}
                            >Posted</button>
                            <button
                                style={self.state.dashboardButtonStyle}
                                onClick={self.displayDashboardList.bind(self)}
                            >Favours History</button>
                            <button 
                                style={self.state.myPartyButtonStyle}
                                onClick={self.displayPartyDetecing.bind(self)}>
                                Party
                            </button>
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
                    <div style={{display:self.state.showParty}}><Party/></div>
                </div>

                <Modal
                    title="Create a post"
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

