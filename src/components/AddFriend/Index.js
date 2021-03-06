import React from 'react';
import axios from 'axios';
import { Button, message, InputNumber, Select } from 'antd';
import { FaCoffee } from 'react-icons/fa';
import { GiChocolateBar, GiCupcake } from 'react-icons/gi';
import { FaLeaf, FaPizzaSlice } from 'react-icons/fa';
import cookie from 'react-cookies';

class AddFriend extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            // Function states
            user_owes: '',
            searchKey: '',
            proof: 0,
            user_owned: '',
            rewardsEnum: [],
            options: [],
            userSelectId: ''
        };
    }

    componentDidMount() {
        // initialize users list
        this.handleoptions();

        this.setState({
            options: []
        });

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
    // Get all users and store into options list
    async handleoptions() {
        axios.get(`https://aip-v1.ts.r.appspot.com/api/users/`)
            .then(response => {
                const data = response.data.users
                const selectOptions = data.map(users => ({
                    "value": users.user_id,
                    "label": users.first_name + " " + users.last_name
                }))

                this.setState({ options: selectOptions })

            })
    }
    // update the selected user
    onoptionChange(e) {

        this.setState({
            user_owes: e,
        })
    }
    // update the user selection of "I owes" or "I am owed"
    onChangeRadio(e) {

        if (e.target.value === "Owned") {
            this.setState({
                proof: 0,
                user_owes: this.state.user_owes,
                user_owned: this.state.user_owned
            })
        }
        else if (e.target.value === "Owes") {
            this.setState({
                proof: 1,
                user_owes: this.state.user_owned,
                user_owned: this.state.user_owes
            })
        }
    }
    // update the selected rewards
    onChangeQty(e, Itemname) {
        let rewardsEnum = this.state.rewardsEnum;
        rewardsEnum.forEach(item => {
            if (item.name === Itemname) {
                item.qty = e;
            }
        });

        this.setState({
            rewardsEnum: rewardsEnum
        });
    }
    // handle user action of submit a transaction with another user
    // based on user input
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
            if (item.qty > 0) {
                newRewardsEnum = newRewardsEnum.concat({
                    "name": item.name,
                    "qty": item.qty
                })
            }
        });
        if (newRewardsEnum.length === 0) {
            message.error("You have to choose at least one favour first");
        } else {
            newRewardsEnum.forEach(item => {
                switch (item.name) {
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
                    default:
                      message.error("No Rewards is selected");
                }
            });
            newRewardsEnum.forEach(currentfavor => {
                let ItemChanged = false;
                rewards.forEach(oldFavour => {
                    if (currentfavor.name === oldFavour.name) {
                        oldFavour.qty += currentfavor.qty
                        ItemChanged = true;
                    }
                });
                if (ItemChanged === false) {
                    rewards = rewards.concat(currentfavor);
                }
            });
            // logic validation
            if (user_owes === user_owned || user_owned === user_owes) {
                message.error('User Cannot be the same');
            }
            else {
                // prepare data in request body
                let data = {
                    "user_owes": user_owes,
                    "user_owed": user_owned,
                    "proof": proof,
                    "reward": rewards
                }

                axios.post('https://aip-v1.ts.r.appspot.com/api/favours/add_transaction', data)
                    .then(response => {

                        responseMessage = response.data.message;
                        message
                            .loading('Transaction is Getting Added...', 2.5)
                            .then(() => message.success(responseMessage, 2));




                    })
                    .catch((e) => {
                        console.log(e)
                    })
            }


        }



    }


    render() {
        const { parentCall } = this.props;
        let self = this;
        return (
            <div>
                <Select
                    placeholder="Select user"
                    options={this.state.options}
                    onChange={this.onoptionChange.bind(this)}
                    style={{ width: "30vh" }}
                >
                </Select>

                <hr />
                <p>Add Favour?</p>
                <div onChange={this.onChangeRadio.bind(this)}>
                    <input type="radio" value="Owes" name="Favour" /> I Owe <br />
                    <input type="radio" value="Owned" name="Favour" /> I am owed
                </div>
                <hr />
                <p>Select Rewards</p>
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
                                                <InputNumber defaultValue={0} min={0} onChange={(e) => self.onChangeQty(e, itemName)} />

                                            </li>
                                        )
                                    case "Coffee":
                                    case "coffee":
                                        return (
                                            <li>
                                                <span><FaCoffee /> {itemName}</span>
                                                <InputNumber defaultValue={0} min={0} onChange={(e) => self.onChangeQty(e, itemName)} />
                                            </li>
                                        )
                                    case "Cupcake":
                                    case "cupcake":
                                        return (
                                            <li>
                                                <span><GiCupcake /> {itemName}</span>
                                                <InputNumber defaultValue={0} min={0} onChange={(e) => self.onChangeQty(e, itemName)} />
                                            </li>
                                        )
                                    case "Mint":
                                    case "mint":
                                        return (
                                            <li>
                                                <span><FaLeaf /> {itemName}</span>
                                                <InputNumber defaultValue={0} min={0} onChange={(e) => self.onChangeQty(e, itemName)} />
                                            </li>
                                        )
                                    case "Pizza":
                                    case "pizza":
                                        return (
                                            <li>
                                                <span><FaPizzaSlice /> {itemName}</span>
                                                <InputNumber defaultValue={0} min={0} onChange={(e) => self.onChangeQty(e, itemName)} />
                                            </li>
                                        )
                                    default:
                                        return(
                                            <li>
                                                
                                            </li>
                                        )    
                                }
                            })}
                        </ul>
                    </div>
                </div>


                <Button type="primary"
                    onClick={() => {
                        this.addFavour();
                        this.componentDidMount();
                        parentCall();
                    }}
                >Add Favour</Button>

            </div>





        )
    }

}

export default AddFriend;