import React from 'react';
import axios from 'axios';
import { Button, message, Input, Radio } from 'antd';
import { UserOutlined, PlusOutlined  } from '@ant-design/icons';
import { Link } from 'react-router-dom';
import cookie from 'react-cookies';

const { Search } = Input;

class AddFriend extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            user_owes:'',
            searchKey:'',
            proof:'',
            user_owned:''
        };
    }

    componentDidMount(){
        //get login status from cookie
        let loginID = cookie.load("user_id");
        if(loginID)
        {
            this.setState({
                user_owned:loginID
            })
        }
    }

       handleSearch(){
           const searchkey = this.state.searchKey;
        if(searchkey == "")
        {
            message.error("Blank User cant be searched");
        }
        else{
            axios.get(`https://aip-v1.ts.r.appspot.com/api/users/?username=${searchkey}`)
            .then(response =>{
                let searcheduser = response.data.users[0].user_id;
                message.success("User Found!");                          
                this.setState({
                    user_owes:searcheduser
                    
                })
            })
            .catch((e) => {
                message.error("User Doesn't Exist! Please Try again!");
                console.log(e)
            })    
        }
    }

    onSearchKeyChange(e){
        this.setState({
            searchKey:e.target.value
        })
    }

    onChangeRadio(e)
    {
        this.setState({
            user_owes:e.target.value
        })
    }

    onChangeProof(e)
    {
        this.setState({
         proof:e.target.value
        })
    }

    addFavour(){
        const user_owes = this.state.user_owes;
        const user_owned = this.state.user_owned;
        const proof = this.state.proof;
        let responseMessage;
        let data = {
            "user_owes": user_owes,
            "user_owed": user_owned,
            "proof": proof,
            "reward" : [
                {
                    "name": "Coffee",
                    "qty" : 1
                },
                {
                    "name" : "Mint",
                    "qty" : 3
                }
            ]
        }
        axios.post('https://aip-v1.ts.r.appspot.com/api/favours/add_transaction',data)
        .then(response => {
            responseMessage = response.data.message;
            message.success(responseMessage);
            setTimeout(() => {
                window.location.reload();
            },5000);
        })
        .catch((e) => {
            console.log(e)
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
                <p>Choose Favour?</p>
                <div onChange={this.onChangeRadio.bind(this)}>
                    <input type="radio" value={this.state.user_owes} name="Favour" /> Owes <br/>
                    <input type="radio" value={this.state.user_owned} name="Favour" /> Owned
                </div>
            <hr/>

            <p>Select if proof is need or not?</p>
            <div onChange={this.onChangeProof.bind(this)}>
                <input type="radio" value="1" name="Proof" /> Yes <br/>
                <input type="radio" value="0" name="Proof" /> No
            </div>

            <p>Rewards</p>
           {/*Add Rewards*/}

            <Button type="primary" onClick={this.addFavour.bind(this)}>Add Favour</Button>

            </div>          
                       
      



        )
    }

}

export default AddFriend;