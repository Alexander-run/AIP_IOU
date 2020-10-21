import React from 'react';


import axios from 'axios';
import cookie from 'react-cookies';
import { Badge, Descriptions } from 'antd';


class Party extends React.Component{

    constructor(props){
        super(props);
        this.state = {
            cycleDetection:false,
            cycleInfo:[]
        }
    }

    componentDidMount(){
        let userID = cookie.load("user_id");

        this.setState({
            cycleInfo:[]
        })
        
        axios.get(`https://aip-v1.ts.r.appspot.com/api/favours/cycle-detection/${userID}`)
        .then(response =>{
            if(response.status == 200){

                this.setState({
                    cycleDetection:true,
                })

                for(let i=0;i<response.data.favours.length;i++){
                    let userowes = response.data.favours[i].user_owes;
                    let userowed = response.data.favours[i].user_owed;
                    let qty = response.data.favours[i].favour_qty;
                    let cycleInfo = this.state.cycleInfo;
                    let userDetails = {
                        "userowes":userowes,
                        "userowed":userowed,
                        "qty":qty
                    };
                    this.setState({
                        cycleInfo:cycleInfo.concat(userDetails)
                    })
                    console.log("cycle info"+this.state.cycleInfo);

                }


            }
            else if(response.status == 404)
            {
                this.setState({
                    cycleDetection:false,
                })
            }
        })
    }


    render(){
        let self = this;
        return(

            <Descriptions title="Party Cycle" bordered>
            <Descriptions.Item label="Cycle Detected">{this.state.cycleDetection ? <Badge status="success" text="Detected" /> :  <Badge status="error" text="No Cycle Detected" /> }</Descriptions.Item>
            {this.state.cycleDetection ? 
            <Descriptions.Item label="User Involved">
            {this.state.cycleInfo.map(function (item){
                return(
                   
                       <p>
                       {item.userowes} <strong>Owes</strong> {item.userowed} <br/> Favour Qty = {item.qty}
                        </p>
                     
                )
              })}
    </Descriptions.Item>
    :  <Descriptions.Item label="No User Involed"> </Descriptions.Item>
            }

           </Descriptions>
        )
    }
}
export default Party;