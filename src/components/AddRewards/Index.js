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


class AddRewards extends React.Component{
    
    constructor(props){
        super(props);
        this.state={
            postID:this.props.postID,
            rewards:this.props.rewards,
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


    handleAddRewards(ev, operationType){
        // API parameters
        // save rewards whose count is more than 0
        let rewardsEnum = this.state.rewardsEnum;
        let newRewardsEnum = [];
        let originalRewards = this.state.rewards;
        let rewards = [];
        originalRewards.forEach(item => {
            rewards = rewards.concat({
                "name":item.reward_name,
                "qty":item.qty
            });
        });
        rewardsEnum.forEach(item => {
            if(item.qty > 0){
                newRewardsEnum = newRewardsEnum.concat({
                    "name":item.name,
                    "qty":item.qty
                })
            }
        });
        // check if the addList is null
        if(newRewardsEnum.length == 0){
            message.error("You have to add at least one reward first");
        }else{

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
            
            // update rewards            
            let validation = true;
            if(operationType == "add"){
                newRewardsEnum.forEach(gapReward => {
                    let existItem = false;
                    rewards.forEach(oldReward =>{
                        if(gapReward.name == oldReward.name){
                            oldReward.qty +=gapReward.qty
                            existItem = true;
                        }
                    });
                    if(existItem == false){
                        rewards = rewards.concat(gapReward);
                    }
                });
            }
            else if(operationType == "reduce"){
                newRewardsEnum.forEach(gapReward => {
                    let existItem = false;
                    rewards.forEach(oldReward =>{
                        if(gapReward.name == oldReward.name){
                            oldReward.qty -=gapReward.qty
                            if(oldReward.qty<0){
                                oldReward.qty = 0;
                            }
                            existItem = true;
                        }
                    });
                    if(existItem == false){
                        message.error("This post has no "+gapReward.name+" reward currently")
                        validation = false;
                    }
                });
            }
            
            let userID = cookie.load("user_id");
            let data = {
                "post_id":`${this.state.postID}`,
                // get logged userID from cookie JWT
                "user_id":userID,
                "reward":rewards
            };
        }
        
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
                <div className="addRewards-submitButton" >
                    <Button type="primary" onClick={(ev) => {self.handleAddRewards(ev,"add")}}>Add</Button>
                    <Button type="primary" onClick={(ev) => {self.handleAddRewards(ev,"reduce")}}>Reduce</Button>
                </div>
            </div>
        );
    }

}

export default AddRewards;