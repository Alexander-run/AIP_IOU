import React from 'react';

import { Button, Modal, Input, message, Collapse} from 'antd';


import "../Transaction/Transaction.css";
import { MinusOutlined, UserOutlined, PlusOutlined } from '@ant-design/icons'
import AddFrend from "../AddFriend/Index";
import axios from 'axios';
import cookie from 'react-cookies';

class Transaction extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            addFrendVisible: false,
            users: [],
            userloginId: "",
            totalFavourQty: "",
            favourOwes: [],
            favourOwned: [],
            totalOwes: [],
            totalOwned: [],
            SumOfOwes: 0,
            SumOfOwed: 0,
            userTransaction: [],
            allTransaction:[]

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
                    totalFavourQty: qty,
                    userloginId: userID
                })
            })
            .catch((e) => {
                console.log(e)
            })

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
            //Total Sum of Owes
            .then(() => {
                this.setState({
                    totalOwes: []
                });

                this.state.favourOwes.forEach(outerItem => {
                    let qty = outerItem.favour_qty;
                    let userID = cookie.load("user_id");
                    let existItem = false;
                    this.state.totalOwes.forEach((item, index) => {
                        if (item.user_id == userID) {
                            let totalOwes = this.state.totalOwes;
                            totalOwes[index].favour_qty += qty;
                            this.setState({
                                totalOwes: totalOwes
                            });
                            existItem = true;
                        }


                    });
                    if (existItem == false) {
                        let totalOwes = this.state.totalOwes;
                        let newReward = {
                            "favour_qty": qty
                        };
                        this.setState({
                            totalOwes: totalOwes.concat(newReward)
                        })
                    }
                    let tot = 0;
                    this.state.totalOwes.forEach(qty => {
                        tot += qty.favour_qty;

                    });
                    this.setState({
                        SumOfOwes: tot
                    })

                });

            })
            //Total Sum of Owed
            .then(() => {

                this.setState({
                    totalOwned: []
                });
                this.state.favourOwned.forEach(outerItem => {
                    let qty = outerItem.favour_qty;
                    let userID = cookie.load("user_id");
                    let existItem = false;
                    this.state.totalOwned.forEach((item, index) => {
                        if (item.user_id == userID) {
                            let totalOwned = this.state.totalOwned;
                            totalOwned[index].favour_qty += qty;
                            this.setState({
                                totalOwned: totalOwned
                            });
                            existItem = true;
                        }


                    });
                    if (existItem == false) {
                        let totalOwned = this.state.totalOwned;
                        let newReward = {
                            "favour_qty": qty
                        };
                        this.setState({
                            totalOwned: totalOwned.concat(newReward)
                        })
                    }
                    let tot = 0;
                    this.state.totalOwned.forEach(qty => {
                        tot += qty.favour_qty;

                    });
                    this.setState({
                        SumOfOwed: tot
                    })

                });

            })

        this.setState({
            userTransaction: []
        });
//change it id
        axios.get(`https://aip-v1.ts.r.appspot.com/api/favours/?user_id=${userID}`)
            .then(response => {
                for (let i = 0; i < response.data.favours_owes.length; i++) {
                    let username = response.data.favours_owes[i].username;
                    let userid = response.data.favours_owes[i].user_id;
                    let userTransaction = this.state.userTransaction;
                    let userdetails = {
                        "username": username,
                        "userid": userid
                    };
                    this.setState({
                        userTransaction: userTransaction.concat(userdetails)
                    })
                    console.log(this.state.userTransaction);
                }

                for (let i = 0; i < response.data.favours_owed.length; i++) {
                    let username = response.data.favours_owed[i].username;
                    let userid = response.data.favours_owed[i].user_id;
                    let userTransaction = this.state.userTransaction
                    let userdetails = {
                        "username": username,
                        "userid": userid
                    };
                    this.setState({
                        userTransaction: userTransaction.concat(userdetails)
                    })
                    console.log(this.state.userTransaction);

                }


            })

    }
    handleUserSelect(item) {
        let userOwe = cookie.load("user_id");
        let userOwned = item.userid;
        let allTransaction;
       axios.get(`https://aip-v1.ts.r.appspot.com/api/favours/transaction?user_owes=${userOwe}&user_owed=${userOwned}`)
       .then(response =>{
             allTransaction = response.data.transactions;
        console.log(allTransaction);

       })

    }

    handleCancel() {
        this.setState({
            addFrendVisible: false
        })
        this.forceUpdate();
    }
    handleAddFrend() {
        this.setState({
            addFrendVisible: true
        })
    }


    render() {
        let self = this;
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
                               {this.state.userTransaction.map(function (item) {
                                return (
                                    <div className="friends-index-item" onClick={self.handleUserSelect.bind(self,item)}> 
                                    <ul><li >
                                        <UserOutlined />  {item.username}  </li></ul>
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
                    <div className="middle-dash-header">
                        <div className="upper-header">
                            <h2>Transaction History</h2>
                        </div>
                        <div className="aggregates">
                            <div className="aggregate-type green">
                                <h3>Total Favours:</h3>
                                <h4><PlusOutlined />  {this.state.totalFavourQty}</h4>
                            </div>

                            <div className="aggregate-type red">
                                <h3>you owe:</h3>
                                <h4><MinusOutlined />{this.state.SumOfOwes}</h4>
                            </div>

                            <div className="aggregate-type green">
                                <h3>you are owed:</h3>
                                <h4><PlusOutlined />{this.state.SumOfOwed}</h4>
                            </div>
                        </div>
                    </div>
                    <div>
                    </div>
                </div>
            </div>


        );
    }
}
export default Transaction;
