import React from 'react';
import axios from 'axios';
import { Button, message } from 'antd';

class AddFriend extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            users: [],
            username:''
        };
    }

    changeTitle(e)
    {
        this.setState({
            username:e.target.value,
        });
    }

    handlePost(){
        let resMessage;
        let data = {
            "users" : {
                "first_name":``,
                "username":`${this.state.username}`,
                "last_name":``,
                "email":``,
                "password":``
            }
        }

        axios.post('https://aip-v1.ts.r.appspot.com/api/users',data)
        .then(response => {
            resMessage = response.data.message;
            message.success(resMessage);
            setTimeout(() => {
                window.location.reload();
            },2000);
        })
        .catch((e) => {
            message.error("please recheck your input and change a new user name");
            console.log(e)
        })

    }

    render() {
        return (
            <div>
                <p>Enter the Username</p>
                <input
                    type='text' 
                    autoFocus='autofocus'
                    value={this.state.username}
                    onChange={this.changeTitle.bind(this)} />

    <Button type="primary" onClick={this.handlePost.bind(this)}>Post</Button>
      </div>
          


        )
    }

}

export default AddFriend;