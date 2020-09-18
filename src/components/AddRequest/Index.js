import React from 'react';
import { Link } from 'react-router-dom';
import "./index.css";
import { FaCoffee } from 'react-icons/fa';
import { ImCross } from 'react-icons/im';
import { Button } from 'antd';
import { GiChocolateBar } from 'react-icons/gi';


class AddRequest extends React.Component{
    
    constructor(props){
        super(props);
        this.state={
            title:'',
            description:'',
            rewards: ["",""]
        }
    }

    changeTitle(e){
        this.setState({
            title:e.target.value,
        });
    }
    changeDescription(e){
        this.setState({
            description:e.target.value,
        })
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

    handlePost(){

    }

    render(){
        return(
            <div className="addRequest">
                <div className="addRequest-title">
                    <p>Please enter the title of your request:</p>
                    <input 
                        type='text'                         
                        autoFocus='autofocus'
                        value={this.state.title}
                        onChange={this.changeTitle.bind(this)}/>
                </div>
                <div className="addRequest-description">
                    <p>Please describe your request:</p>
                    <textarea                        
                        value={this.state.description}
                        onChange={this.changeDescription.bind(this)}/>
                </div>
                <div className="addRequest-rewardsOption">
                    Please click the icon to add the corresponding rewards 
                    <ul>
                        <li onClick={this.handleAddCoffee.bind(this)}><FaCoffee /> coffee</li>
                        <li onClick={this.handleAddChocolate.bind(this)}><GiChocolateBar /> chocolate</li>
                    </ul>        
                </div>
                <div className="addRequest-rewards">            
                    <div>
                        <span>Total rewards:</span><span className="addRequest-rewards-clear" onClick={this.handleClearRewards.bind(this)}><ImCross /></span>
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
                <Button type="primary" onClick={this.handlePost.bind(this)}>Post</Button>
            </div>
        );
    }

}

export default AddRequest;