// This component implement the party detection function
import React from 'react';
import axios from 'axios';
import cookie from 'react-cookies';
import { Badge, Descriptions } from 'antd';


class Party extends React.Component{

    constructor(props){
        super(props);
        this.state = {
            // Function states
            cycleDetection:false,
            cycleInfo:[]
        }
    }

    componentDidMount(){
        let userID = cookie.load("user_id");

        this.setState({
            cycleInfo:[]
        })
        // Fetch the party detection result from backend API
        axios.get(`https://aip-v1.ts.r.appspot.com/api/favours/cycle-detection/${userID}`)
        .then(response =>{
            if(response.status === 200){

                this.setState({
                    cycleDetection:true,
                })
                // format the response data into local states
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

                }


            }
            else if(response.status === 404)
            {
                this.setState({
                    cycleDetection:false,
                })
            }
        })
    }


    render(){
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