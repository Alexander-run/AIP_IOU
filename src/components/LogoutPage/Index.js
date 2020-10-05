import React from 'react';
import "./index.css";
import { Button, message } from 'antd';
import axios from 'axios';


class LogoutPage extends React.Component{
    
    constructor(props){
        super(props);
        this.state={
            logout:false,
        }
    }
    
    logout(){        

        message.success("Logout Success");
        this.setState({logout:true});
        setTimeout(() => {
          this.props.logout();
        },2000);
    }


    render(){
        return(
            <div class="logoutPage">                      
                <Button type='primary' onClick={this.logout.bind(this)}>Logout</Button>
            </div>
        );
    }
}

export default LogoutPage;