import React from 'react';
import { Link } from 'react-router-dom';
import "./index.css";
import { FaCoffee } from 'react-icons/fa';
import { GiChocolateBar, GiCupcake } from 'react-icons/gi';
import { FaLeaf, FaPizzaSlice } from 'react-icons/fa';
import { ImCross } from 'react-icons/im';
import { Button, message } from 'antd';
import axios from 'axios';
import cookie from 'react-cookies';

class TransactionHistory extends React.Component{

    constructor(props){
        super(props);
        this.state={
            Tra:this.props.postID,
            rewards:this.props.rewards,
            rewardsEnum:[]
        }        
    }

}
export default TransactionHistory;