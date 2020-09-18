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
            rewards: ["",""]
        }
    }

    handleAddCoffee(){
        let rewards=this.state.rewards;
        this.setState({
            rewards:rewards.concat("coffee")
        });
    }
    handleAddChocolate(){
        let rewards=this.state.rewards;
        this.setState({
            rewards:rewards.concat("chocolate")
        });
    }

    handleClearRewards(){
        this.setState({
            rewards:[]
        });
    }

    handleAddRewards(){

    }

    render(){
        return(
            <div className="addRewards">               
                <div className="addRewards-rewardsOption">
                    Please click the icon to add the corresponding rewards 
                    <ul>
                        <li onClick={this.handleAddCoffee.bind(this)}><FaCoffee /> coffee</li>
                        <li onClick={this.handleAddChocolate.bind(this)}><GiChocolateBar /> chocolate</li>
                    </ul>        
                </div>
                <div className="addRewards-rewards">            
                    <div>
                        <span>Total added rewards:</span><span className="addRequest-rewards-clear" onClick={this.handleClearRewards.bind(this)}><ImCross /></span>
                    </div>
                        {this.state.rewards.map(function(item){
                            switch(item){
                                case "coffee":
                                    return(<span><FaCoffee /> </span>);
                                case "chocolate":
                                    return(<span><GiChocolateBar /> </span>);
                            }
                        })}
                </div>
                <Button type="primary" onClick={this.handleAddRewards.bind(this)}>Add</Button>
            </div>
        );
    }

}

export default AddRewards;