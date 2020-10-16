import React from 'react';
import "./index.css";
import { Button, message } from 'antd';
import axios from 'axios';
import cookie from 'react-cookies';


class LogoutPage extends React.Component{
    
    constructor(props){
        super(props);
        this.state={
            logout:false,
        }
    }
    
    logout(){        
        cookie.remove("user_id");

            message
            .loading('Logout in progress..', 2.5);
      
        this.setState({logout:true});
        setTimeout(() => {
          window.location.reload();
        },1000);
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