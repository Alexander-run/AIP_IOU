import React from 'react';
import './LeaderBoard.css';
import { Carousel } from 'antd';
import axios from 'axios';

class LeaderBoard extends React.Component{

    constructor(props){
        super(props);
        this.state={
            leaderBoardItems: [
                {
                "user_id": "8eff921e-cd56-4146-b902-d8d0438b0ae0",
                "username": "Vraj Mehta",
                "favour_qty": 18
                }
            ]
        };
    }

    // API used to retrieve the leaders
    componentDidMount(){
        axios.get('https://aip-v1.ts.r.appspot.com/api/favours/leaderboard?high_favours=1&order=DESC')
        .then(response => {
            let allUsers = response.data.users;
            this.setState({
                leaderBoardItems:allUsers
            });
        })
        .catch((e) => {
            console.log(e);
        })
        
    }


    render(){
        return(
            <div className="leaderBoard"> 
                <h2>Today's Leader Board</h2>
                <Carousel autoplay>
                    {this.state.leaderBoardItems.map((item,index) => {
                        return (
                            <div className="leaderBoard-item">
                                <div className="leaderBoard-item-header">
                                    <span>No.{index+1}</span>
                                    <span>{item.username}</span>
                                </div>
                                <div className="leaderBoard-item-body">
                                    <span>Profit:</span>
                                    <span>{item.favour_qty}</span>
                                </div>
                            </div>
                        )
                    })}
                </Carousel>,
            </div>
        );
    }
}

export default LeaderBoard;