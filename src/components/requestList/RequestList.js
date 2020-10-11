import React from 'react';
import { Button, Modal, Input } from 'antd';
import { FaCoffee } from 'react-icons/fa';
import { GiChocolateBar, GiCupcake } from 'react-icons/gi';
import { FaLeaf, FaPizzaSlice } from 'react-icons/fa';
import './RequestList.css';
import { UserOutlined, UsergroupAddOutlined, CalendarOutlined } from '@ant-design/icons'
import AddRewards from "../AddRewards/Index";
import axios from 'axios';
import cookie from 'react-cookies';

const { Search } = Input;

class RequestList extends React.Component{
    
    constructor(props){
        super(props);
        this.state={
            login:false,
            displayButton:false,

            allPosts: [],
            particularPost_Post:[{
                "post_id": "",
                "added_by": "",
                "offer_by": "",
                "title": "",
                "description": "",
                "added_datetime": "",
                "status": "",
                "proof": false
            }],
            particularPost_Rewards:[],
            searchKey:'',
            particularPost_Poster:"",
            particularPost_Signer:"",
            particularPost_adders:[],
            RewardsEnumnation:[],
            particularPost_Reward_Qty:[],
            addRewardsVisible:false,

            displayAddRewardButton:"none",
            displaySignPost:"none",
            displayUploadProof:"none"

        }
    }

    componentDidMount(){

        // get login status from cookie
        let userID = cookie.load("user_id");
        if(userID){
            this.setState({
                displayButton:"block"
            });
        }else{
            this.setState({
                displayButton:"none"
            });
        }

        // get all posts
        let responseData = [];
        axios.get('https://aip-v1.ts.r.appspot.com/api/posts')
        .then(response => {
            // receive response Data
            responseData=response.data.post;

            // Parse Data into local states
            this.setState({
                allPosts:responseData
            })
        })
        .catch((e) => {
            console.log(e)
        })

        // get the reward enumation
        let rewards = [];
        axios.get('https://aip-v1.ts.r.appspot.com/api/rewards')
        .then(response => {
            rewards = response.data;
        })
        .catch((e) => {
            console.log(e)
        })
        this.setState({
            RewardsEnumnation:rewards
        });
    }

    handleItemSelect(item){
        let particularPost_Post;
        let particularPost_Rewards;
        let selectedPostID=item.post_id;  
        // retrieve the selected Post data      
        axios.get(`https://aip-v1.ts.r.appspot.com/api/posts/${selectedPostID}`)
        .then(response => {
            particularPost_Post = response.data.post;
            particularPost_Rewards = response.data.rewards;
            // parse data into local states
            this.setState({
                particularPost_Post:particularPost_Post,
                particularPost_Rewards:particularPost_Rewards
            });
            
            // decide which button to show in the detail page
            this.setState({
                displayAddRewardButton:"none",
                displaySignPost:"none",
                displayUploadProof:"none"
            });
            let loggedUserID=cookie.load("user_id");
            if(this.state.particularPost_Post.offer_by == null){
                this.setState({
                    displaySignPost:"block",
                    displayAddRewardButton:"block"
                });
            }else if(this.state.particularPost_Post.offer_by == loggedUserID
                    & this.state.particularPost_Post.status != "Closed"){
                this.setState({
                    displayUploadProof:"block",
                    displayAddRewardButton:"none"
                });
            }else if(this.state.particularPost_Post.status == "Closed"){
                this.setState({
                    displayAddRewardButton:"none",
                    displaySignPost:"none",
                    displayUploadProof:"none"
                });
            }

        })
        // find the man who signed this 
        .then(() =>{
            this.setState({
                particularPost_Signer:""
            });
            let signerID = this.state.particularPost_Post[0].offer_by
            if(signerID != ""){
                axios.get(`https://aip-v1.ts.r.appspot.com/api/users/${signerID}`)
                .then(response =>{
                    let signerName = response.data.users[0].first_name
                                + " " +response.data.users[0].last_name;
                    this.setState({                
                        particularPost_Signer:signerName
                    })
                })
                .catch((e) => {
                    console.log(e)
                })
            }
        })
        .then( () => {
            // find the post man
            let posterName;
            let posterID = this.state.particularPost_Rewards[0].user_id;
            axios.get(`https://aip-v1.ts.r.appspot.com/api/users/${posterID}`)
            .then(response =>{
                posterName = response.data.users[0].first_name
                            + " " +response.data.users[0].last_name;
                this.setState({                
                    particularPost_Poster:posterName
                })
            })
            .catch((e) => {
                console.log(e)
            })
            // find people who add rewards
            // clear old particularPost_adders
            this.setState({
                particularPost_adders:[]
            });
            for ( let i=1; i<this.state.particularPost_Rewards.length;i++){
                let adderID = this.state.particularPost_Rewards[i].user_id;
                axios.get(`https://aip-v1.ts.r.appspot.com/api/users/${adderID}`)
                .then(response =>{
                    let adderName = response.data.users[0].first_name
                                + " " +response.data.users[0].last_name;  
                    let particularPost_adders = this.state.particularPost_adders;                  
                    this.setState({
                        particularPost_adders:particularPost_adders.concat(adderName)
                    })
                })
                .catch((e) => {
                    console.log(e)
                })
            }
            
            // update rewardsEnumnation
            // clear old particularPost_Reward_Qty
            this.setState({
                particularPost_Reward_Qty:[]
            });
            this.state.particularPost_Rewards.forEach(outerItem => {
                outerItem.rewards.forEach(innerItem => {
                    let rewardName = innerItem.reward_name;
                    let qty = innerItem.qty;
                    let existItem = false;
                    if(this.state.particularPost_Reward_Qty != []){
                        this.state.particularPost_Reward_Qty.forEach((item,index) => {
                            if(item.reward_name == rewardName){
                                let particularPost_Reward_Qty = this.state.particularPost_Reward_Qty;
                                particularPost_Reward_Qty[index].qty += qty;
                                this.setState({
                                    particularPost_Reward_Qty:particularPost_Reward_Qty
                                });
                                existItem = true;
                            }
                        });
                        if(existItem == false){
                            let particularPost_Reward_Qty = this.state.particularPost_Reward_Qty;   
                            let newReward = {
                                "reward_name":rewardName,
                                "qty":qty
                            };               
                            this.setState({
                                particularPost_Reward_Qty:particularPost_Reward_Qty.concat(newReward)
                            })
                        }
                    }                        
                })
            });
        })
        .catch((e) => {
            console.log(e)
        })
        
    }
    
    showAddRewardsModal(){
        this.setState({
            addRewardsVisible:true
        });
    }
    handleCancel(){
        this.setState({
            addRewardsVisible:false
        });
    }

    onSearchKeyChange(e){
        this.setState({
            searchKey:e.target.value
        })
    }
    handleSearch(){
        axios.get(`https://aip-v1.ts.r.appspot.com/api/posts?keyword=${this.state.searchKey}`)
        .then(response =>{
            let posts = response.data.post;                             
            this.setState({
                allPosts:posts
            })
        })
        .catch((e) => {
            console.log(e)
        })    
    }
    handleSearchReward(ev,rewardType){
        // switch(rewardType){
        //     case "chocolate":
                
        //         break;
        //     case "coffee":
            
        //         break;
        //     case "cupcake":
            
        //         break;
        //     case "mint":
            
        //         break;
        //     case "pizza":
            
        //         break;
        // }
    }

    render(){
        let self = this;
        return(
            <div classNam="requestList">
                <div className="requestList-header">
                    <Search
                        placeholder="Search"
                        onChange={this.onSearchKeyChange.bind(this)}
                        onSearch={this.handleSearch.bind(this)}
                        style={{ width: "30vh" }}
                    />
                    <div className="requestList-header-rewardList"> 
                        Search by rewards:                       
                        <GiChocolateBar  className="requestList-header-rewardList-item"
                                         onClick={(ev)=>{self.handleSearchReward(ev,"chocolate")}}/>
                        <FaCoffee   className="requestList-header-rewardList-item"
                                    onClick={(ev)=>{self.handleSearchReward(ev,"coffee")}}/>
                        <GiCupcake   className="requestList-header-rewardList-item"
                                    onClick={(ev)=>{self.handleSearchReward(ev,"cupcake")}}/>
                        <FaLeaf   className="requestList-header-rewardList-item"
                                    onClick={(ev)=>{self.handleSearchReward(ev,"mint")}}/>
                        <FaPizzaSlice   className="requestList-header-rewardList-item"
                                        onClick={(ev)=>{self.handleSearchReward(ev,"pizza")}}/>
                    </div>
                </div>
                <div className="requestList-body">
                    <div className="requestList-body-left">
                        {this.state.allPosts.map(function(item){
                            switch (item.status) {
                                case "Open":
                                    return(
                                        <div 
                                            className="requestList-item"
                                            onClick={self.handleItemSelect.bind(self,item)}>      
                                            <div className="requestList-item-header">{item.title}</div>
                                            <div className="requestList-item-body">
                                                <ul>
                                                    <li><UserOutlined />Poster:{item.username}</li>                                            
                                                    <li><CalendarOutlined />Post Date:{item.added_datetime.split("T")[0]}</li>
                                                </ul>
                                            </div>
                                            <div className="requestList-item-status-open">{item.status}</div>
                                        </div>
                                    )
                                    break;
                                case "Closed":
                                    return(
                                        <div 
                                            className="requestList-item"
                                            onClick={self.handleItemSelect.bind(self,item)}>      
                                            <div className="requestList-item-header">{item.title}</div>
                                            <div className="requestList-item-body">
                                                <ul>
                                                    <li><UserOutlined />Poster:{item.username}</li>                                            
                                                    <li><CalendarOutlined />Post Date:{item.added_datetime.split("T")[0]}</li>
                                                </ul>
                                            </div>
                                            <div className="requestList-item-status-closed">{item.status}</div>
                                        </div>
                                    )
                                    break;
                                case "Assigned":
                                    return(
                                        <div 
                                            className="requestList-item"
                                            onClick={self.handleItemSelect.bind(self,item)}>      
                                            <div className="requestList-item-header">{item.title}</div>
                                            <div className="requestList-item-body">
                                                <ul>
                                                    <li><UserOutlined />Poster:{item.username}</li>                                            
                                                    <li><CalendarOutlined />Post Date:{item.added_datetime.split("T")[0]}</li>
                                                </ul>
                                            </div>
                                            <div className="requestList-item-status-assigned">{item.status}</div>
                                        </div>
                                    )
                                    break;
                                
                            }
                        })}
                    </div>
                    <div className="requestList-body-right">
                        <div className="requestList-body-right-header">
                            {this.state.particularPost_Post[0].title}                            
                        </div>
                        <div className="requestList-body-right-body">
                            <div>
                                <span><UserOutlined />Posted BY:</span>
                                <span className="requestList-body-right-body-favoricon">{this.state.particularPost_Poster}</span>
                            </div>
                            <div>
                                <span>Status:</span>
                                <span>{this.state.particularPost_Post[0].status}</span>
                            </div>                          
                            <div>
                                <span><UsergroupAddOutlined />Added BY:</span>                                
                                    {this.state.particularPost_adders.map(function(item){
                                        return(
                                            <span>{item} | </span>
                                        )
                                    })}
                            </div>
                            <div>
                                <span><CalendarOutlined />Post Date:</span>
                                <span>{this.state.particularPost_Post[0].added_datetime.split("T")[0]}</span>
                            </div>
                            {/* <div>
                                <span>Total Reward:</span>
                                <span className="requestList-body-right-body-favoricon">
                                    {this.state.particularPost_Reward_Qty.map(function (item) {
                                        let itemName = item.reward_name;
                                        let qty = item.qty;
                                        switch(itemName){
                                            case "Chocolate":
                                            case "Chocolate":
                                                return(<span><GiChocolateBar /> x  {qty}</span>)
                                            case "Coffee":
                                            case "coffee":
                                                return(<span><FaCoffee /> x  {qty}</span>)
                                            case "Cupcake":
                                            case "cupcake":
                                                return(<span><GiCupcake /> x  {qty}</span>)
                                            case "Mint":
                                            case "mint":
                                                return(<span><FaLeaf /> x  {qty}</span>)
                                            case "Pizza":
                                            case "pizza":
                                                return(<span><FaPizzaSlice /> x  {qty}</span>)
                                        }
                                    })} 
                                </span>
                            </div>    */}
                            <div>
                                <span><UserOutlined />Who is working on this:</span>
                                <span className="requestList-body-right-body-favoricon">{this.state.particularPost_Signer}</span>
                            </div>
                            <div>
                                <span>Description:</span>
                                <span> </span>
                            </div>     
                            <div style={{border:"1px solid #E5E5E5"}}>
                                <p>{this.state.particularPost_Post[0].description}</p>
                            </div>                    
                        </div>
                        <div className="requestList-body-right-footer" 
                            style={{display:this.state.displayButton}}> 
                            <Button type="primary" onClick={this.showAddRewardsModal.bind(this)} style={{display:this.state.displayAddRewardButton}}>Add or Reduce Rewards</Button>
                            <Button type="primary" style={{display:this.state.displaySignPost}}>Make an Offer</Button>
                            <Button type="primary" style={{display:this.state.displayUploadProof}}>Complete it</Button>
                        </div>
                    </div>
                </div>
                <Modal
                    title="Select the rewards you want to add to this public request"
                    footer={[]}
                    visible={this.state.addRewardsVisible}
                    onCancel={this.handleCancel.bind(this)}>
                        <AddRewards 
                            postID={this.state.particularPost_Post[0].post_id}
                            rewards={this.state.particularPost_Reward_Qty}/>
                </Modal>       
            </div>
        );
    }

}

export default RequestList;