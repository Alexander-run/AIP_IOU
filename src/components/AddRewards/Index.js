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
            rewards: {},            
            // [{
            //     user_id: ""
            //     rewards:[
            //         {
            //             reward_name:"",qty:int
            //         },
            //         {
            //             reward_name:"",qty:int
            //         }
            //     ]
            // }]
            rewardsEnum:[],
        }        
    }

    componentDidMount(){
        // clear rewardsEnum
        this.setState({
            rewardsEnum:[]
        });

        // pull rewardsEnum
        let responseData;
        let selectedPostID = this.state.postID;
        axios.get(`https://aip-v1.ts.r.appspot.com/api/posts/${selectedPostID}`)
        .then( response => {
            let particularPost_Rewards = response.data.rewards;
            // parse data into local states
            this.setState({
                rewards:particularPost_Rewards
            });

            axios.get(`https://aip-v1.ts.r.appspot.com/api/rewards`)
            .then(response =>{
                responseData = response.data;
                responseData.forEach(item => {
                    this.setState({
                        rewardsEnum:this.state.rewardsEnum.concat({
                            "name":item.reward_name,
                            "qty":0
                        })
                    });
                });
                let newRewards = this.state.rewardsEnum;
                newRewards.forEach(item => {
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
                this.setState({
                    rewardsEnum:newRewards
                });
            })        
            .then(() => {
                let rewards = this.state.rewards;
                let user_id = cookie.load("user_id");
                rewards.forEach(item => {
                    if(item.user_id == user_id){
                        let currentRewards = item.rewards;
                        let rewardsEnum = this.state.rewardsEnum;
                        currentRewards.forEach(element => {
                            rewardsEnum.forEach(i => {
                                if(i.name==element.reward_name){
                                    i.qty = element.qty;
                                }
                            });
                        });
                        this.setState({
                            rewardsEnum:rewardsEnum
                        });
                    }
                });
            })
            .catch((e) => {
                console.log(e);
            })                
        })
        .catch((e) => {
            console.log(e);
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
        let rewardsEnum = this.state.rewardsEnum;
        let newRewards=[];
        rewardsEnum.forEach(item => {
            if(item.qty > 0){
                newRewards = newRewards.concat(item);
            }
        });
        // check if the addList is null
        if(newRewards.length == 0){
            message.error("You have to add at least one reward first");
        }else{      
            let userID = cookie.load("user_id");
            let data = {
                "post_id":`${this.state.postID}`,
                // get logged userID from cookie JWT
                "user_id":userID,
                "reward":newRewards
            };
            console.log(data);
            // axios.post("https://aip-v1.ts.r.appspot.com/api/posts/add_rewards",data)
            // .then( res => {
            //     let resMessage = res.data.message;
            //     message.success(resMessage);
            //     setTimeout(() => {
            //         window.location.reload();
            //     },2000);  
            // })
            // .catch((e) => {
            //     console.log(e);
            //     message.error("Error from server,Please try again");
            // })
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
                                                    onClick={(ev)=>{self.onChangeRewards(ev,"minus","Chocolate")}}
                                                >-</span>
                                                <span className="addRewards-rewardsOption-count">{qty}</span>
                                                <span 
                                                    className="addRewards-rewardsOption-countButton"
                                                    onClick={(ev)=>{self.onChangeRewards(ev,"add","Chocolate")}}
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
                                                    onClick={(ev)=>{self.onChangeRewards(ev,"minus","Coffee")}}
                                                >-</span>
                                                <span className="addRewards-rewardsOption-count">{qty}</span>
                                                <span 
                                                    className="addRewards-rewardsOption-countButton"
                                                    onClick={(ev)=>{self.onChangeRewards(ev,"add","Coffee")}}
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
                                                    onClick={(ev)=>{self.onChangeRewards(ev,"minus","Cupcake")}}
                                                >-</span>
                                                <span className="addRewards-rewardsOption-count">{qty}</span>
                                                <span 
                                                    className="addRewards-rewardsOption-countButton"
                                                    onClick={(ev)=>{self.onChangeRewards(ev,"add","Cupcake")}}
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
                                                    onClick={(ev)=>{self.onChangeRewards(ev,"minus","Mint")}}
                                                >-</span>
                                                <span className="addRewards-rewardsOption-count">{qty}</span>
                                                <span 
                                                    className="addRewards-rewardsOption-countButton"
                                                    onClick={(ev)=>{self.onChangeRewards(ev,"add","Mint")}}
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
                                                    onClick={(ev)=>{self.onChangeRewards(ev,"minus","Pizza")}}
                                                >-</span>
                                                <span className="addRewards-rewardsOption-count">{qty}</span>
                                                <span 
                                                    className="addRewards-rewardsOption-countButton"
                                                    onClick={(ev)=>{self.onChangeRewards(ev,"add","Pizza")}}
                                                >+</span>
                                            </span>
                                        </li>
                                    )
                            }                            
                        })}                        
                    </ul>      
                </div>
                <div className="addRewards-submitButton" >
                    <Button type="primary" onClick={this.handleAddRewards.bind(this)}>Edit</Button>
                </div>
            </div>
        );
    }

}

export default AddRewards;
