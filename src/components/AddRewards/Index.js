import React from 'react';
import { Link } from 'react-router-dom';
import "./index.css";
import { FaCoffee } from 'react-icons/fa';
import { ImCross } from 'react-icons/im';
import { Button } from 'antd';
import { GiChocolateBar } from 'react-icons/gi';


class AddRewards extends React.Component{
    
    constructor(props){
        super(props);
        this.state={
            title:'',
            description:'',
            rewards: {
                coffee:0,
                chocolate:0
            }
        }
    }

    onChangeRewards(ev,action,rewardType){
        let newCount = 0;
        if(action=="add"){
            switch(rewardType){
                case "coffee":
                    newCount = this.state.rewards.coffee + 1;
                    this.setState({
                        rewards:{
                            coffee:newCount,
                            chocolate:this.state.rewards.chocolate
                        }
                    });
                    break;
                case "chocolate":
                    newCount = this.state.rewards.chocolate + 1;
                    this.setState({
                        rewards:{
                            coffee:this.state.rewards.coffee,
                            chocolate:newCount
                        }
                    })
                    break;
            }
        }
        else{
            switch(rewardType){
                case "coffee":
                    newCount = this.state.rewards.coffee - 1;
                    if(newCount>=0){
                        this.setState({
                            rewards:{
                                coffee:newCount,
                                chocolate:this.state.rewards.chocolate
                            }
                        });
                        break;
                    }                  
                case "chocolate":
                    newCount = this.state.rewards.chocolate - 1;
                    if(newCount>=0){
                        this.setState({
                            rewards:{
                                coffee:this.state.rewards.coffee,
                                chocolate:newCount
                            }
                        })
                        break;
                    }
            }
        }   
    }


    handleAddRewards(){

    }

    render(){
        return(
            <div className="addRewards">               
                <div className="addRewards-rewardsOption">
                    Please click the icon to add the corresponding rewards 
                    <ul>
                        <li>
                            <span><FaCoffee /> coffee</span>
                            <span>
                                <span 
                                    className="addRewards-rewardsOption-countButton"
                                    onClick={(ev)=>{this.onChangeRewards(ev,"minus","coffee")}}
                                >-</span>
                                <span className="addRewards-rewardsOption-count">{this.state.rewards.coffee}</span>
                                <span 
                                    className="addRewards-rewardsOption-countButton"
                                    onClick={(ev)=>{this.onChangeRewards(ev,"add","coffee")}}
                                >+</span>
                            </span>                            
                        </li>
                        <li>
                            <span>
                                <GiChocolateBar /> chocolate
                            </span>
                            <span>
                                <span 
                                    className="addRewards-rewardsOption-countButton"
                                    onClick={(ev)=>{this.onChangeRewards(ev,"minus","chocolate")}}
                                >-</span>
                                <span className="addRewards-rewardsOption-count">{this.state.rewards.chocolate}</span>
                                <span 
                                    className="addRewards-rewardsOption-countButton"
                                    onClick={(ev)=>{this.onChangeRewards(ev,"add","chocolate")}}
                                >+</span>
                            </span>
                        </li>
                    </ul>      
                </div>
                <Button type="primary" onClick={this.handleAddRewards.bind(this)}>Add</Button>
            </div>
        );
    }

}

export default AddRewards;