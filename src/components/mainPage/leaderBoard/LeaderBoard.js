import React, { Fragment } from 'react';
import './LeaderBoard.css';
import {Progress} from 'antd';

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
            <Fragment> 
                <h2>Today's Leader Board</h2>
                <ol>
                    {this.state.leaderBoardItems.map((item) => {
                        return (
                            <li>
                                <Progress
                                    percent={100*item.profit/this.state.leaderBoardItems[0].profit} 
                                    showInfo={false} 
                                    // set trailColor == {mainpage.content} background color
                                    strokeColor='#E27D60'
                                    trailColor=''
                                />
                                <span className='leftspan'>{item.name}</span><span className='rightspan'>{item.profit}</span>
                            </li>
                        )
                    })}
                </ol>
            </Fragment>
        );
    }
}

export default LeaderBoard;