import React, { Fragment } from 'react';
import './LeaderBoard.css';
import {Progress, Carousel } from 'antd';

class LeaderBoard extends React.Component{

    constructor(props){
        super(props);
        this.state={
            leaderBoardItems: [
                {name:'Alex',profit:113,debt:60},
                {name:'Mia',profit:86,debt:60},
                {name:'Greg',profit:65,debt:70},
                {name:'Bob',profit:63,debt:30},
                {name:'Alice',profit:52,debt:15},
                {name:'Hunter',profit:32,debt:15},
                {name:'Warrior',profit:27,debt:15},
                {name:'Wizard',profit:26,debt:15},
                {name:'Paladin',profit:16,debt:15},
                {name:'Priest',profit:3,debt:15}
            ]
        };
    }

    // API used to retrieve the leaders
    async componentDidMount(){
        const res = await fetch('API_Name');
        const result = await res.json();
        this.setState({
            leaderBoardItems:result
        })
    }
    // API used to retrieve the leaders
    async componentDidUpdate(){
        const res = await fetch('API_Name');
        const result = await res.json();
        this.setState({
            leaderBoardItems:result
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
                                    <span>{item.name}</span>
                                </div>
                                <div className="leaderBoard-item-body">
                                    <span>Profit:{item.profit}</span>
                                    <span>Debt:{item.debt}</span>
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