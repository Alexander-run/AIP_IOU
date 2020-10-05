import React from 'react';
import { Link } from 'react-router-dom';
import "./index.css";
import { FaCoffee } from 'react-icons/fa';
import { GiChocolateBar, GiCupcake } from 'react-icons/gi';
import { FaLeaf, FaPizzaSlice } from 'react-icons/fa';
import { ImCross } from 'react-icons/im';
import { Button, message } from 'antd';
import axios from 'axios';


class AddRewards extends React.Component{
    
    constructor(props){
        super(props);
        this.state={
            postID:this.props.postID,
            rewardsEnum:[]
        }        
    }

    componentDidMount(){
        // clear rewardsEnum
        this.setState({
            rewardsEnum:[]
        });

        // pull rewardsEnum
        let responseData;
        axios.get(`https://aip-v1.ts.r.appspot.com/api/rewards`)
        .then(response =>{
            responseData = response.data;
            responseData.forEach(item => {
                this.setState({
                    rewardsEnum:this.state.rewardsEnum.concat({
                        "name":item.reward_name,
                        "qty":0
                    })
                })
            });
        })
        .catch((e) => {
            console.log(e)
        })
    }

    onChangeRewards(ev,action,rewardType){
        let newCount = 0;
        let rewardsEnum = this.state.rewardsEnum;
        rewardsEnum.forEach(item => {
            if(item.name == rewardType){
                if(action =='add'){
                    item.qty += 1;
                }
                else{
                    if(item.qty > 0){
                        item.qty -= 1;
                    }                    
                }
            }
        });
        this.setState({
            rewardsEnum:rewardsEnum
        });
    }


    handleAddRewards(){
        let resMessage;
        // API parameters
        // save rewards whose count is more than 0
        let rewardsEnum = this.state.rewardsEnum;
        let newRewardsEnum = [];
        rewardsEnum.forEach(item => {
            if(item.qty > 0){
                newRewardsEnum = newRewardsEnum.concat({
                    "name":item.name,
                    "qty":item.qty
                })
            }
        });
        newRewardsEnum.forEach(item => {
            switch(item.name){
                case "chocolate":
                    item.name = "Chocolate";
                    break;
                case "coffee":
                    item.name = "Coffee"
                    break;
                case "mint":
                    item.name = "Mint"
                    break;
                case "cupcake":
                    item.name = "Cupcake"
                    break;
                case "pizza":
                    item.name = "Pizza"   
                    break;         
            }
        });
        let data = {
            "post_id":`${this.state.postID}`,
            // get logged userID from cookie JWT
            "user_id":"8eff921e-cd56-4146-b902-d8d0438b0ae0",
            "reward":newRewardsEnum
        };
        // HTTP request
        axios.post('https://aip-v1.ts.r.appspot.com/api/posts/add_rewards',data)
        .then(response => {
            resMessage = response.data.message;
            message.success(resMessage);
            setTimeout(() => {
                window.location.reload();
            },2000);
        })
        .catch((e) => {
            console.log(e)
        })
    }

    render(){
        let self = this;
        return(
            <div className="addRewards">               
                <div className="addRewards-rewardsOption">
                    Please click the icon to add the corresponding rewards 
                    <ul>
                        {this.state.rewardsEnum.map(function(item){
                            let itemName = item.name;
                            let qty;
                            switch(itemName){
                                case "Chocolate":
                                case "chocolate":
                                    qty = item.qty;
                                    return(
                                        <li>
                                            <span><GiChocolateBar /> chocolate</span>
                                            <span>
                                                <span 
                                                    className="addRewards-rewardsOption-countButton"
                                                    onClick={(ev)=>{self.onChangeRewards(ev,"minus","chocolate")}}
                                                >-</span>
                                                <span className="addRewards-rewardsOption-count">{qty}</span>
                                                <span 
                                                    className="addRewards-rewardsOption-countButton"
                                                    onClick={(ev)=>{self.onChangeRewards(ev,"add","chocolate")}}
                                                >+</span>
                                            </span>
                                        </li>
                                    )
                                case "Coffee":
                                case "coffee":
                                    qty = item.qty;
                                    return(
                                        <li>
                                            <span><FaCoffee /> coffee</span>
                                            <span>
                                                <span 
                                                    className="addRewards-rewardsOption-countButton"
                                                    onClick={(ev)=>{self.onChangeRewards(ev,"minus","coffee")}}
                                                >-</span>
                                                <span className="addRewards-rewardsOption-count">{qty}</span>
                                                <span 
                                                    className="addRewards-rewardsOption-countButton"
                                                    onClick={(ev)=>{self.onChangeRewards(ev,"add","coffee")}}
                                                >+</span>
                                            </span>
                                        </li>
                                    )
                                case "Cupcake":
                                case "cupcake":
                                    qty = item.qty;
                                    return(
                                        <li>
                                            <span><GiCupcake /> cupcake</span>
                                            <span>
                                                <span 
                                                    className="addRewards-rewardsOption-countButton"
                                                    onClick={(ev)=>{self.onChangeRewards(ev,"minus","cupcake")}}
                                                >-</span>
                                                <span className="addRewards-rewardsOption-count">{qty}</span>
                                                <span 
                                                    className="addRewards-rewardsOption-countButton"
                                                    onClick={(ev)=>{self.onChangeRewards(ev,"add","cupcake")}}
                                                >+</span>
                                            </span>
                                        </li>
                                    )
                                case "Mint":
                                case "mint":
                                    qty = item.qty;
                                    return(
                                        <li>
                                            <span><FaLeaf /> mint</span>
                                            <span>
                                                <span 
                                                    className="addRewards-rewardsOption-countButton"
                                                    onClick={(ev)=>{self.onChangeRewards(ev,"minus","mint")}}
                                                >-</span>
                                                <span className="addRewards-rewardsOption-count">{qty}</span>
                                                <span 
                                                    className="addRewards-rewardsOption-countButton"
                                                    onClick={(ev)=>{self.onChangeRewards(ev,"add","mint")}}
                                                >+</span>
                                            </span>
                                        </li>
                                    )
                                case "Pizza":
                                case "pizza":
                                    qty = item.qty;
                                    return(
                                        <li>
                                            <span><FaPizzaSlice /> pizza</span>
                                            <span>
                                                <span 
                                                    className="addRewards-rewardsOption-countButton"
                                                    onClick={(ev)=>{self.onChangeRewards(ev,"minus","pizza")}}
                                                >-</span>
                                                <span className="addRewards-rewardsOption-count">{qty}</span>
                                                <span 
                                                    className="addRewards-rewardsOption-countButton"
                                                    onClick={(ev)=>{self.onChangeRewards(ev,"add","pizza")}}
                                                >+</span>
                                            </span>
                                        </li>
                                    )
                            }                            
                        })}                        
                    </ul>      
                </div>
                <Button type="primary" onClick={this.handleAddRewards.bind(this)}>Add</Button>
            </div>
        );
    }

}

export default AddRewards;