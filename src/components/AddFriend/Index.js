import React from 'react';
import axios from 'axios';
import { Button, message, Input,InputNumber } from 'antd';
import { FaCoffee } from 'react-icons/fa';
import { GiChocolateBar, GiCupcake } from 'react-icons/gi';
import { FaLeaf, FaPizzaSlice } from 'react-icons/fa';
import { UserOutlined, PlusOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';
import cookie from 'react-cookies';

const { Search } = Input;

class AddFriend extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            user_owes: '',
            searchKey: '',
            proof: '',
            user_owned: '',
            rewardsEnum: [],
            rewardname:'',
            rewardqty:1
        };
    }

    componentDidMount() {
        //get login status from cookie
        let loginID = cookie.load("user_id");
        if (loginID) {
            this.setState({
                user_owned: loginID,
                rewardsEnum: []
            })
        }
        // pull rewardsEnum
        let responseData;
        axios.get(`https://aip-v1.ts.r.appspot.com/api/rewards`)
            .then(response => {
                responseData = response.data;
                responseData.forEach(item => {
                    this.setState({
                        rewardsEnum: this.state.rewardsEnum.concat({
                            "name": item.reward_name,
                            "qty": 0
                        })
                    })
                });
            })
            .catch((e) => {
                console.log(e)
            })

    }


    handleSearch() {
        const searchkey = this.state.searchKey;
        if (searchkey == "") {
            message.error("Blank User cant be searched");
        }
        else {
            axios.get(`https://aip-v1.ts.r.appspot.com/api/users/?username=${searchkey}`)
                .then(response => {
                    let searcheduser = response.data.users[0].user_id;
                    message.success("User Found!");
                    this.setState({
                        user_owes: searcheduser

                    })
                })
                .catch((e) => {
                    message.error("User Doesn't Exist! Please Try again!");
                    console.log(e)
                })
        }
    }

    onSearchKeyChange(e) {
        this.setState({
            searchKey: e.target.value
        })
    }

    onChangeRadio(e) {
        this.setState({
            user_owes: e.target.value
        })
    }

    onChangeProof(e) {
        this.setState({
            proof: e.target.value
        })
    }

     onChangeQty(e,Itemname) {   
        let rewardsEnum = this.state.rewardsEnum;
        rewardsEnum.forEach(item => {
            console.log(item.name);
            if(item.name == Itemname){
              item.qty=e;
            }
        });
        this.setState({
            rewardsEnum:rewardsEnum
        });
      }

    addFavour() {
        const user_owes = this.state.user_owes;
        const user_owned = this.state.user_owned;
        const proof = this.state.proof;
        let responseMessage;

        // API parameters
        // save rewards whose count is more than 0
        let rewardsEnum = this.state.rewardsEnum;
        let newRewardsEnum = [];
        let rewards = [];
        rewardsEnum.forEach(item => {
            if(item.qty > 0){
                newRewardsEnum = newRewardsEnum.concat({
                    "name":item.name,
                    "qty":item.qty
                })
            }
        });

        if(newRewardsEnum.length == 0)
        {
            message.error("You have to choose at least one favour first");
        }
        else
        {
            newRewardsEnum.forEach(item => {
                switch(item.name){
                    case "chocolate":
                        item.name = "Chocolate";
                        break;
                    case "coffee":
                        item.name = "Coffee"
                        break;
                    case "mint":
                        item.name = "Mint"
                        break;
                    case "cupcake":
                        item.name = "Cupcake"
                        break;
                    case "pizza":
                        item.name = "Pizza"   
                        break;         
                }
            });
            newRewardsEnum.forEach(currentfavor=>{
                let ItemChanged = false;
                rewards.forEach(oldFavour =>{
                    if(currentfavor.name == oldFavour.name){
                        oldFavour.qty+=currentfavor.qty
                        ItemChanged = true;
                    }
                });
                if(ItemChanged == false){
                    rewards = rewards.concat(currentfavor);
                }
            });
        }

        if(user_owes == "")
        {
            message.error("Please search the user before adding.!")
        }
        else
        {
            let data = {
                "user_owes": user_owes,
                "user_owed": user_owned,
                "proof": proof,
                "reward": rewards
            }
            
            axios.post('https://aip-v1.ts.r.appspot.com/api/favours/add_transaction', data)
                .then(response => {
                    responseMessage = response.data.message;
                    message.success(responseMessage);
                   
                })
                .catch((e) => {
                    console.log(e)
                })
        }
       

    }


    render() {
        let self = this;
        return (
            <div>
                <p>Search the Username</p>
                <Search
                    placeholder="Search"
                    onChange={this.onSearchKeyChange.bind(this)}
                    onSearch={this.handleSearch.bind(this)}
                    style={{ width: "30vh" }}
                />

                <hr />
                <p>Choose Favour?</p>
                <div onChange={this.onChangeRadio.bind(this)}>
                    <input type="radio" value={this.state.user_owes} name="Favour" /> Owes <br />
                    <input type="radio" value={this.state.user_owned} name="Favour" /> Owned
                </div>
                <hr />

                <p>Select if proof is need or not?</p>
                <div onChange={this.onChangeProof.bind(this)}>
                    <input type="radio" value="1" name="Proof" /> Yes <br />
                    <input type="radio" value="0" name="Proof" /> No
            </div>
            <hr/>
                <p>Select the Favour OWed or Owned</p>
                <div className="addRewards">
                    <div className="addRewards-rewardsOption">
                        <ul>
                            {this.state.rewardsEnum.map(function (item) {
                                let itemName = item.name;
                                switch (itemName) {
                                    case "Chocolate":
                                    case "chocolate":
                                        return (
                                            <li>
                                                <span><GiChocolateBar /> {itemName}</span>
                                                 <InputNumber  defaultValue={0}  onChange={(e)=>self.onChangeQty(e,itemName)}/>
                                           
                                            </li>
                                        )
                                    case "Coffee":
                                    case "coffee":
                                        return (
                                            <li>
                                                <span><FaCoffee /> {itemName}</span>
                                                <InputNumber defaultValue={0}  onChange={(e)=>self.onChangeQty(e,itemName)}/>
                                            </li>
                                        )
                                    case "Cupcake":
                                    case "cupcake":
                                        return (
                                            <li>
                                                <span><GiCupcake /> {itemName}</span>
                                                <InputNumber defaultValue={0}  onChange={(e)=>self.onChangeQty(e,itemName)}/>
                                            </li>
                                        )
                                    case "Mint":
                                    case "mint":
                                        return (
                                            <li>
                                                <span><FaLeaf /> {itemName}</span>
                                                <InputNumber defaultValue={0} onChange={(e)=>self.onChangeQty(e,itemName)}/>
                                            </li>
                                        )
                                    case "Pizza":
                                    case "pizza":
                                        return (
                                            <li>
                                                <span><FaPizzaSlice /> {itemName}</span>
                                                <InputNumber defaultValue={0}  onChange={(e)=>self.onChangeQty(e,itemName)}/>
                                            </li>
                                        )
                                }
                            })}
                        </ul>
                    </div>
                </div>
                

                <Button type="primary" onClick={this.addFavour.bind(this)}>Add Favour</Button>

            </div>





        )
    }

}

export default AddFriend;