// This component is not in use, but for backup need
// This could be used for applying React-Router to reestablish the front-end structure


import React from 'react';
import './Dashboard.css';
import logo from '../../assert/utslogo.png'
import { Button, Modal } from 'antd';
import LeaderBoard from "../leaderBoard/LeaderBoard";
import RequestList from "../requestList/RequestList";
import AddRequest from "../AddRequest/Index";
import MyPosts from '../MyPosts/MyPosts';
import Transaction from '../Transaction/Transaction';
import LogoutPage from '../LogoutPage/Index';


class Dashboard extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            // UI states
            addRequestVisible: false,
            logoutModalVisible: false,
            showLogoutButtons: "block",
            showRequestList: "block",
            showDashboard: "block",
            showLeaderBoard: "none",
            showMyPosts: "none",
            browseButtonStyle: {},
            browseButtonStyle1: {},
            leaderBoardButtonStyle: {},

            // Function states
            logoutStatus: false,
            userID: null,

        };
    }

    componentDidMount() {
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
        // if(this.state.loginStatus){
        //     // hide login button and sign up button, show personal home button

        // }

    }
    // UI logic controll
    handleLogoutClick() {
        this.setState({
            logoutModalVisible: true

        })
    }
    // UI logic controll
    handleCancel() {
        this.setState({
            addRequestVisible: false,
            logoutModalVisible: false
        })
        this.forceUpdate();
    }
    // UI logic controll
    handleAddRequest() {
        this.setState({
            addRequestVisible: true
        })
    }
    // UI logic controll
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
            myPostsButtonStyle: {},
            browseButtonStyle: {},
            showLeaderBoard: "none",
            showRequestList: "none",
            showMyPosts: "none"
        });
    }
    // UI logic controll
    displayRequestsList() {
        this.setState({
            browseButtonStyle: {
                marginTop: "2px",
                borderBottom: "2px solid #008FB4",
                cursor: "pointer",
                color: "#008FB4",
            },
            showRequestList: "block",
            dashboardButtonStyle: {},
            leaderBoardButtonStyle: {},
            myPostsButtonStyle: {},
            showLeaderBoard: "none",
            showDashboard: "none",
            showMyPosts: "none"
        });
    }
    // UI logic controll
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
            myPostsButtonStyle: {},
            dashboardButtonStyle: {},
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
            dashboardButtonStyle: {},
            showRequestList: "none",
            showLeaderBoard: "none",
            showDashboard: "none"
        });
    }

    render() {
        return (
            <div className="start">
                <div className="start-header">
                    <div className="start-header-left">
                        <img alt="Logo" src={logo}></img>
                        <div
                            className="start-header-addRequestButton"
                            onClick={this.handleAddRequest.bind(this)}
                        >Add new Request
                        </div>
                        <div className="start-header-navigation">
                            <button
                                style={this.state.dashboardButtonStyle}
                                onClick={this.displayDashboardList.bind(this)}
                            >Transactions</button>
                            <button
                                style={this.state.browseButtonStyle}
                                onClick={this.displayRequestsList.bind(this)}
                            >Browse all Requests</button>
                            <button
                                style={this.state.leaderBoardButtonStyle}
                                onClick={this.displayLeaderBoard.bind(this)}
                            >See who are in lead</button>
                            <button
                                style={this.state.myPostsButtonStyle}
                                onClick={this.displayMyPosts.bind(this)}
                            >My Posts</button>
                        </div>

                    </div>
                    <div className="start-header-right" style={{ display: this.state.showLogoutButtons }}>
                        <Button
                            type="default"
                            onClick={this.handleLogoutClick.bind(this)}
                        >Log Out</Button>
                    </div>
                </div>
                <div className="start-body">
                    <div style={{ display: this.state.showDashboard }}><Transaction /></div>
                    <div style={{ display: this.state.showRequestList }}><RequestList /></div>
                    <div style={{ display: this.state.showLeaderBoard }}><LeaderBoard /></div>
                    <div style={{ display: this.state.showMyPosts }}><MyPosts /></div>
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

