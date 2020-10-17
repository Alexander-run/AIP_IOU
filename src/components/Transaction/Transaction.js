import React from 'react';

import { Button, Modal, Collapse, Space, Divider, Typography, PageHeader, Tabs, message } from 'antd';
import "../Transaction/Transaction.css";
import { MinusOutlined, UserOutlined, PlusOutlined, CloudUploadOutlined } from '@ant-design/icons'
import AddFrend from "../AddFriend/Index";
import axios from 'axios';
import cookie from 'react-cookies';
import UploadProof from '../TransacationProof/UploadProof';

const { Panel } = Collapse;
const { TabPane } = Tabs;


class Transaction extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            allOwesTransaction: [],
            allOWedTransaction: [],
            RewardsEnumnation: [],
            addFrendVisible: false,
            users: [],
            userloginId: "",
            userloginName: "",
            totalFavourQty: "",
            SumOfOwes: 0,
            SumOfOwed: 0,
            favourOwes: [],
            favourOwned: [],
            userTransaction: [],
            message: "",
            proof: false,
            transactionID:"",
            uploadprof:false



        }
    }

    componentDidMount() {
        let userID = cookie.load("user_id");

        //get Total Favour Qty
        this.setState({
            totalFavourQty: ""
        });
        axios.get(`https://aip-v1.ts.r.appspot.com/api/users/${userID}`)
            .then(response => {
                let qty = response.data.users[0].favour_qty
                this.setState({
                    totalFavourQty: qty
                })
            })
            .catch((e) => {
                console.log(e)
            })

        let rewards = [];
        axios.get(`https://aip-v1.ts.r.appspot.com/api/rewards/`)
            .then(response => {
                rewards = response.data;
            })
            .catch((e) => {
                console.log(e)
            })
        this.setState({
            RewardsEnumnation: rewards
        });

        let favourOwes;
        let favourOwned;
        axios.get(`https://aip-v1.ts.r.appspot.com/api/favours/?user_id=${userID}`)
            .then(response => {
                favourOwes = response.data.favours_owes;
                favourOwned = response.data.favours_owed;
                // parse data into local states
                this.setState({
                    favourOwes: favourOwes,
                    favourOwned: favourOwned
                });

            })



        this.setState({
            userTransaction: []
        });

        axios.get(`https://aip-v1.ts.r.appspot.com/api/favours/?user_id=${userID}`)
            .then(response => {
                if (response.data.favours_owes != null) {
                    for (let i = 0; i < response.data.favours_owes.length; i++) {
                        let username = response.data.favours_owes[i].username;
                        let userid = response.data.favours_owes[i].user_id;
                        let qty = response.data.favours_owes[i].favour_qty;
                        let userTransaction = this.state.userTransaction;
                        let userdetails = {
                            "userid": userid,
                            "username": username,
                            "FavourQty": qty,
                            "FavourType": "Owes"

                        };
                        this.setState({
                            userTransaction: userTransaction.concat(userdetails)
                        })
                        console.log(this.state.userTransaction);
                    }
                }

                if (response.data.favours_owed != null) {

                    for (let i = 0; i < response.data.favours_owed.length; i++) {
                        let username = response.data.favours_owed[i].username;
                        let userid = response.data.favours_owed[i].user_id;
                        let qty = response.data.favours_owed[i].favour_qty;
                        let userTransaction = this.state.userTransaction;
                        let userdetails = {
                            "userid": userid,
                            "username": username,
                            "FavourQty": qty,
                            "FavourType": "Owed"

                        };
                        this.setState({
                            userTransaction: userTransaction.concat(userdetails)
                        })
                        console.log(this.state.userTransaction);

                    }
                }




            })

    }
    handleUserSelect(item) {
        let username = item.username;
        let user1 = item.userid;
        let user2 = cookie.load("user_id");
        let type = item.FavourType;


        let responseData = [];
        this.setState({
            userloginName: username,
            allOWedTransaction: [],
            allOwesTransaction: []
        })
        if (type == "Owes") {

            let FavourQt = item.FavourQty;
            this.setState({
                SumOfOwes: FavourQt,
                SumOfOwed: 0
            });

        }
        else {
            let FavourQt = item.FavourQty;

            this.setState({
                SumOfOwed: FavourQt,
                SumOfOwes: 0
            });
        }


        axios.get(`https://aip-v1.ts.r.appspot.com/api/favours/transaction?user_owes=${user2}&user_owed=${user1}`)
            .then(response => {
                if (response.status == 200) {
                    responseData = response.data.transactions;
                    console.log("Transaciton id" + response.data.transactions[0].transaction_id);
                    console.log("Transaciton proof" + response.data.transactions[0].proof);

                    if (response.data.transactions[0].proof == true) {
                        this.setState({
                            proof: true,
                            transactionID: response.data.transactions[0].transaction_id
                        })
                        console.log("Uplod owes"+this.state.transactionID);
                    }

                    this.setState({
                        allOwesTransaction: responseData
                    });
                }
            })
            .catch((e) => {
                console.log(e);
            })

        axios.get(`https://aip-v1.ts.r.appspot.com/api/favours/transaction?user_owes=${user1}&user_owed=${user2}`)
            .then(response => {
                if (response.status == 200) {
                    responseData = response.data.transactions;
                    console.log("Transaciton id" + response.data.transactions[0].transaction_id);
                    console.log("Transaciton proof" + response.data.transactions[0].proof);
                    if (response.data.transactions[0].proof == true) {
                        this.setState({
                            proof: true,
                            transactionID: response.data.transactions[0].transaction_id
                        })
                        console.log("Uplod Owe"+this.state.transactionID);
                    }

                    this.setState({
                        allOWedTransaction: responseData
                    });

                }
            })
            .catch((e) => {
                console.log(e);
            })




    }
    callback(key) {
        if (key == 1) {
            console.log("Owes Selected");
        }
        else if (key == 2) {
            console.log("Owed Selected");
        }

    }

    handleCancel() {
        this.setState({
            addFrendVisible: false,
            uploadprof:false

        })
        this.forceUpdate();
    }
    showUploadModal(){
            this.setState({
                uploadprof:true
            })
     
        
    }
    handleAddFrend() {
        this.setState({
            addFrendVisible: true
        })

      
    }


    render() {
        let self = this;
        let statusmessage = "";
        let totalOwes = 0;
        let totalOwed = 0;
        let message="";
        if(this.state.proof==false){
            message="tre";
        }
        if (this.state.userTransaction.length == 0) {
            statusmessage = "No user";
        }
        let color = "aggregate-type orange";
        return (
            <div className="dashboard">
                <div className="left-nav">
                    <div className="friends-index">
                        <header>
                            <div>
                                <Button type="primary" danger onClick={this.handleAddFrend.bind(this)}><PlusOutlined />Add Favour</Button>
                                <hr />

                            </div>
                        </header>
                        <div className="friends-index-body-left">
                            {statusmessage}
                            {this.state.userTransaction.map(function (item) {
                                return (
                                    <div className="friends-index-item" onClick={self.handleUserSelect.bind(self, item)}>
                                        <ul><li ><UserOutlined />  {item.username}  </li>

                                        </ul>
                                    </div>

                                )
                            })}

                        </div>

                    </div>
                    <Modal
                        title="Add A Bill"
                        footer={[]}
                        visible={this.state.addFrendVisible}
                        onOk={this.handleAddFrendSubmit}
                        onCancel={this.handleCancel.bind(this)}>
                        <AddFrend />
                    </Modal>
                </div>
                <div className="middle-dash">
                    <h1>Your Transaction History</h1>
                    <div className="middle-dash-header">
                        <div className="aggregates">
                            <div className={color}>
                                <h3>Total Balance</h3>
                                <h4>  {this.state.totalFavourQty}</h4>
                            </div>

                            <div className="aggregate-type red">
                                <h3>Total you owe</h3>
                                <h4>{this.state.SumOfOwes}</h4>
                            </div>

                            <div className="aggregate-type green">
                                <h3>Total owned</h3>
                                <h4>{this.state.SumOfOwed}</h4>
                            </div>
                        </div>
                        <div className="upper-header">


                        </div>
                        <div className="lower-header">
                            <div>

                            </div>
                            with  {this.state.userloginName}
                        </div>
                        <hr />
                        <Tabs defaultActiveKey="1" onChange={this.callback}>
                            <TabPane tab="Owes" key="1">
                                {this.state.allOwesTransaction.map(function (item) {

                                    return (
                                      
                                        <div>
                                            <Collapse>
                                                <Panel header={item.timestamp.split("T")[0]}>
                                                <Button type="primary" onClick={self.showUploadModal.bind(self)}> <CloudUploadOutlined/> Complete it</Button>
                                                    <PageHeader
                                                        ghost={false}
                                                        title="Your Rewards">
                                                           {item.rewards.map(function (element) {
                                                            return (


                                                                <div className="site-page-header-ghost-wrapper">

                                                                    <Space split={<Divider type="vertical" />}>
                                                                        <Typography>{element.reward_name}={element.qty},&nbsp;

                                                                        </Typography>
                                                                    </Space>
                                                                    <p hidden>total:{totalOwes = totalOwes + element.qty}</p>

                                                                </div>


                                                            )


                                                        })}
                                                    </PageHeader>


                                                </Panel>

                                            </Collapse>
                                        </div>
                                    )
                                })}
                                <p>total:{totalOwes}</p>
                            </TabPane>
                            <TabPane tab="Owed" key="2">
                                {this.state.allOWedTransaction.map(function (item) {

                                    return (

                                        <div>
                                            <Collapse>
                                                <Panel header={item.timestamp.split("T")[0]}>
                                                <Button type="primary" onClick={self.showUploadModal.bind(self)} style={{ marginTop: 40 }}><CloudUploadOutlined/>Complete it</Button>
                                                    <PageHeader
                                                        ghost={false}
                                                        title="Your Rewards">
                                                       
                                                        {item.rewards.map(function (element) {
                                                            return (


                                                                <div className="site-page-header-ghost-wrapper">

                                                                    <Space split={<Divider type="vertical" />}>
                                                                        <Typography>{element.reward_name}={element.qty},&nbsp;
                                                                        
                                                                       </Typography>
                                                                    </Space>
                                                                    <p hidden>total:{totalOwed = totalOwed + element.qty}</p>
                                                                </div>


                                                            )

                                                        })}
                                                    </PageHeader>


                                                </Panel>

                                            </Collapse>
                                        </div>
                                    )
                                })}
                                <p>total:{totalOwed}</p>
                            </TabPane>
                        </Tabs>

                    </div>
                    <div>
                    </div>
                </div>
                <Modal
                    title="Select and upload the proof image"
                    footer={[]}
                    visible={this.state.uploadprof}
                    onCancel={this.handleCancel.bind(this)}>
                        <UploadProof
                            transactionID={this.state.transactionID}/>
                </Modal>             

            </div>


        );
    }
}
export default Transaction;
