import React from 'react';
import './LeaderBoard.css';
import {Button, Progress} from 'antd';
import {HeartFilled, HeartTwoTone} from '@ant-design/icons';
import axios from 'axios';

let timer = undefined;

class LeaderBoard extends React.Component{

    
    constructor(props){
        super(props);
        this.state={
            // UI change states
            profitButtonStyle:"primary",
            debtButtonStyle:"default",
            profit:true,

            // Function states
            leaderBoardItems: []
        };
    }

    // Timer for refreshing the list
    timerStart(displayProfit)  {
        
        timer = setInterval(() => {
            axios.get(`https://aip-v1.ts.r.appspot.com/api/favours/leaderboard?high_favours=${displayProfit}&order=DESC`)
            .then(response => {
                let allUsers = response.data.users;
                this.setState({
                    leaderBoardItems:allUsers
                });
            })
            .catch((e) => {
                console.log(e)
            });
        },5000); 
    }

    // API used to retrieve the leaders from backend
    componentDidMount(){
        axios.get(`https://aip-v1.ts.r.appspot.com/api/favours/leaderboard?high_favours=1&order=DESC`)
        .then(response => {
            let allUsers = response.data.users;
            this.setState({
                leaderBoardItems:allUsers
            });
        })
        .catch((e) => {
            console.log(e);
        })
        // start timer for refreshing
        this.timerStart(1);        
    }
    // when user click buttons to exchange between profit rank and debt rank, use this function to 
    // change UI and fetch leaders list from backend
    onChangeDisplay(e,displayProfit){
        if(displayProfit === 1){
            this.setState({
                profit:true,
                profitButtonStyle:"primary",
                debtButtonStyle:"default",
            });
        } else{
            this.setState({
                profit:false,
                profitButtonStyle:"default",
                debtButtonStyle:"primary",
            });
        }
        axios.get(`https://aip-v1.ts.r.appspot.com/api/favours/leaderboard?high_favours=${displayProfit}&order=DESC`)
        .then(response => {
            let allUsers = response.data.users;
            this.setState({
                leaderBoardItems:allUsers
            });
            clearInterval(timer);
            this.timerStart(displayProfit);
        })
        .catch((e) => {
            console.log(e);
        })
    }

    render(){
        let self = this;
        let profit = this.state.profit;
        let rankBaseIcon;
        if(profit){
            rankBaseIcon = <HeartFilled style={{color:"#EB2F96"}}/>;
        }else{
            rankBaseIcon = <HeartTwoTone twoToneColor="#EB2F96"/>;
        }     
        return(
            <div className="leaderBoard"> 
                <h2>Today's Leader Board</h2>
                <div className="leaderBoard-changeButton">
                    <Button type={this.state.profitButtonStyle} onClick={(e) => self.onChangeDisplay(e,1)}>Profit</Button>
                    <Button type={this.state.debtButtonStyle} onClick={(e) => self.onChangeDisplay(e,0)}>Debt</Button>
                </div>
                {this.state.leaderBoardItems.map((item,index) => {
                    let id = "item"+(index+1);
                    let img = item.username.substr(0,1);
                    return (
                        <div id={id} className="leaderBoard-item">
                            <div className="leaderBoard-item-rank">
                                {index+1}
                            </div>
                            {/* <div className="leaderBoard-item-img">
                                {img}
                            </div> */}
                            <div className="leaderBoard-item-name">
                                {item.username}
                            </div>
                            <div className="leaderBoard-item-rankBase">
                                <span>{rankBaseIcon}</span>
                                <span>{item.favour_qty}</span>
                            </div>
                        </div>
                    )
                })}
            </div>
        );
    }
}

export default LeaderBoard;