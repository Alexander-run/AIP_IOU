import React from 'react';
import "./index.css";
import { Button, message, InputNumber } from 'antd';
import { GiChocolateBar, GiCupcake } from 'react-icons/gi';
import { FaCoffee, FaLeaf, FaPizzaSlice } from 'react-icons/fa';
import axios from 'axios';
import cookie from 'react-cookies';


class AddRequest extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            // Function states
            title: '',
            description: '',
            rewardsEnum: []
        };
    }

    componentDidMount() {
        // clear rewardsEnum
        this.setState({
            rewardsEnum: []
        });

        // pull rewardsEnum and parse into API JSON format and initialize with null array
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
    // store title from user input to component state
    changeTitle(e) {
        this.setState({
            title: e.target.value,
        });
    }
    // store description from user input to component state
    changeDescription(e) {
        this.setState({
            description: e.target.value,
        })
    }
    // store rewards enum
    onChangeRewards(e, Itemname) {

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

    handlePost() {
        let resMessage;
        // API parameters
        // save rewards whose count is more than 0
        let rewardsEnum = this.state.rewardsEnum;
        let newRewardsEnum = [];
        rewardsEnum.forEach(item => {
            if (item.qty > 0) {
                newRewardsEnum = newRewardsEnum.concat({
                    "name": item.name,
                    "qty": item.qty
                })
            }
        });
        // for reward name integration
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
                    message.error("No Rewards Matched");
            }
        });
        // HTTP post request to API 
        let userID = cookie.load("user_id");
        let data = {  // API request data in body
            "post": {
                // get logged in userID from cookie 
                "added_by": userID,
                "title": `${this.state.title}`,
                "description": `${this.state.description}`
            },
            "reward": newRewardsEnum
        };
        // input validation check
        if (data.post.title === "") {
            message.error("Title can not be null");
        } else if (data.post.title.length > 20) {
            message.error("Title are limited within 24 characters");
        } else if (data.post.description === "") {
            message.error("description can not be null");
        } else if (data.reward.length === 0) {
            message.error("you have to add at least one reward");
        } else {
            // HTTP request
            axios.post('https://aip-v1.ts.r.appspot.com/api/posts', data)
                .then(response => {
                    resMessage = response.data.message;
                    message.success(resMessage);
                    setTimeout(() => {
                        window.location.reload();
                    }, 2000);
                })
                .catch((e) => {
                    console.log(e)
                })
        }

    }

    render() {
        const self = this;
        return (
            <div className="addRequest">
                <div className="addRequest-title">
                    <p>Please enter the title of your request:</p>
                    <input
                        type='text'
                        autoFocus='autofocus'
                        value={this.state.title}
                        onChange={this.changeTitle.bind(this)} />
                </div>
                <div className="addRequest-description">
                    <p>Please describe your request:</p>
                    <textarea
                        value={this.state.description}
                        onChange={this.changeDescription.bind(this)} />
                </div>
                <div className="addRequest-rewardsOption">
                    Please click the icon to add the corresponding rewards
                    <ul>
                        {this.state.rewardsEnum.map(function (item) {
                            let itemName = item.name;
                            switch (itemName) {
                                case "Chocolate":
                                case "chocolate":
                                    return (
                                        <li>
                                            <span><GiChocolateBar /> {itemName}</span>
                                            <InputNumber defaultValue={0} min={0} onChange={(e) => self.onChangeRewards(e, itemName)} />

                                        </li>
                                    )
                                case "Coffee":
                                case "coffee":
                                    return (
                                        <li>
                                            <span><FaCoffee /> {itemName}</span>
                                            <InputNumber defaultValue={0} min={0} onChange={(e) => self.onChangeRewards(e, itemName)} />
                                        </li>
                                    )
                                case "Cupcake":
                                case "cupcake":
                                    return (
                                        <li>
                                            <span><GiCupcake /> {itemName}</span>
                                            <InputNumber defaultValue={0} min={0} onChange={(e) => self.onChangeRewards(e, itemName)} />
                                        </li>
                                    )
                                case "Mint":
                                case "mint":
                                    return (
                                        <li>
                                            <span><FaLeaf /> {itemName}</span>
                                            <InputNumber defaultValue={0} min={0} onChange={(e) => self.onChangeRewards(e, itemName)} />
                                        </li>
                                    )
                                case "Pizza":
                                case "pizza":
                                    return (
                                        <li>
                                            <span><FaPizzaSlice /> {itemName}</span>
                                            <InputNumber defaultValue={0} min={0} onChange={(e) => self.onChangeRewards(e, itemName)} />
                                        </li>
                                    )
                                default:
                                    return(
                                        <li>
                                            {"No Rewards Matched"}
                                        </li>
                                    )
                            }
                        })}
                    </ul>
                </div>
                <Button type="primary" onClick={this.handlePost.bind(this)}>Post</Button>
            </div>
        );
    }

}

export default AddRequest;