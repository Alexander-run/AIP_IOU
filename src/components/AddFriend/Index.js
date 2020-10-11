import React from 'react';
import axios from 'axios';
import { Button, message, Input } from 'antd';
import { UserOutlined, PlusOutlined  } from '@ant-design/icons';
import { Link } from 'react-router-dom';

const { Search } = Input;

class AddFriend extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            user_id:'',
            searchKey:'',
        };
    }



       handleSearch(){
        axios.get(`https://aip-v1.ts.r.appspot.com/api/users/?username=${this.state.searchKey}`)
        .then(response =>{
            let userid = response.data.users[0].user_id;
            console.log(userid);                             
            this.setState({
                user_id:userid
            })
        })
        .catch((e) => {
            message.error("User Doesn't Exist! Please Try again!");
            console.log(e)
        })    
    }

    onSearchKeyChange(e){
        this.setState({
            searchKey:e.target.value
        })
    }


    render() {
        return (
            <div>
                <p>Search the Username</p>
                <Search
                        placeholder="Search"
                        onChange={this.onSearchKeyChange.bind(this)}
                        onSearch={this.handleSearch.bind(this)}
                        style={{ width: "30vh" }}
                />
                <hr/>
            

             
             

            </div>          
                       
      



        )
    }

}

export default AddFriend;