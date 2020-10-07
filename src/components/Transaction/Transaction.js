import React from 'react';
import { Link } from 'react-router-dom';

import { Button, Modal, Input } from 'antd';
import { FaCoffee } from 'react-icons/fa';
import { GiChocolateBar, GiCupcake } from 'react-icons/gi';
import { FaLeaf, FaPizzaSlice } from 'react-icons/fa';
import "../Transaction/Transaction.css";
import { UserOutlined, PlusOutlined  } from '@ant-design/icons'
import AddRewards from "../AddRewards/Index";
import AddFrend from "../AddFriend/Index";
import MyPosts from '../MyPosts/MyPosts';
import axios from 'axios';

class Transaction extends React.Component
{

    constructor(props){
        super(props);
        this.state={
            addFrendVisible:false,
            users: []
            
        }
    }

    componentDidMount(){

        // get all posts related to the logged in user(with user_id parameter)
        let responseData = [];
        setTimeout(() => {
            axios.get('https://aip-v1.ts.r.appspot.com/api/users/')
            .then(response => {
                // receive response Data
                responseData=response.data.users;

                // Parse Data into local states
                this.setState({
                    users:responseData
                })
            })
            .catch((e) => {
                console.log(e)
            })
        },2000);            

     
    }

    handleCancel(){
        this.setState({
            addFrendVisible:false
        })
        this.forceUpdate();
   }
   handleAddFrend(){
        this.setState({
            addFrendVisible:true
        })
   }

    render() {
       
        return (
            <div className="left-nav">
                <div className="friends-index">
                    <header>
                        <h2>Friends List 
                        <div onClick={this.handleAddFrend.bind(this)} className="add-friend" ><PlusOutlined/> add</div>
                        </h2>
                    </header>
                    {this.state.users.map(function(item){
                            return(

                            <ul><li className="friends-index-item">
                                <UserOutlined />  <Link to={`/users/${item.user_id}`} className="eachfriend">{item.username}</Link>  </li></ul>
                       
                       )
                    })}
                </div>
                <Modal
                    title="Add Frend"
                    footer={[]}
                    visible={this.state.addFrendVisible}
                    onOk={this.handleAddFrendSubmit}
                    onCancel={this.handleCancel.bind(this)}>
                    <AddFrend/>
                </Modal>    
            </div>

        );
    }
}
export default Transaction;
