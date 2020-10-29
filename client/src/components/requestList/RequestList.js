import React from 'react';
import { Popover, Button, Modal, Input, message, Dropdown, Menu } from 'antd';
import { DownOutlined } from '@ant-design/icons';
import { FaCoffee } from 'react-icons/fa';
import { GiChocolateBar, GiCupcake } from 'react-icons/gi';
import { FaLeaf, FaPizzaSlice } from 'react-icons/fa';
import './RequestList.css';
import { UserOutlined, UsergroupAddOutlined, CalendarOutlined } from '@ant-design/icons'
import AddRewards from "../AddRewards/Index";
import axios from 'axios';
import cookie from 'react-cookies';
import CompletePost from '../CompletePost/CompletePost';

const { Search } = Input;
let timer = undefined;

class RequestList extends React.Component{
    
    constructor(props){
        super(props);
        this.state={
            // UI states
            login:false,
            displayButton:false,
            rewardButtonChecked:"",
            rewardButtonStyle:{
                chocolate:{},
                coffee:{},
                cupcake:{},
                mint:{},
                pizza:{},
            },  
            addRewardsVisible:false,
            uploadVisible:false,
            displayBodyRight:"none",
            displayAddRewardButton:"none",
            displaySignPost:"none",
            displayUploadProof:"none",
            displayNewAddRewardButton:"none",
            // UI states end

            // Function states
            allPosts: [],
            displayPosts:[],
            // loadMoreIndex: 1,
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
            // Function states end
        }
    }
    // Timer for refresh the post list
    timerStart = () =>  {
        timer = setInterval(() => {
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
            });
        },5000);  
    }

    componentDidMount(){

        // // get loadmoreIndex
        // let loadMoreIndex;
        // if(!cookie.load("loadMoreIndex")){
        //     cookie.save("loadMoreIndex",5,{path:"/"});
        //     loadMoreIndex = parseInt(cookie.load("loadMoreIndex"));
        // }else{
        //     loadMoreIndex = parseInt(cookie.load("loadMoreIndex"));
        // }

        // get all posts 
        let responseData = [];
        axios.get('https://aip-v1.ts.r.appspot.com/api/posts')
        .then(response => {
            message
            .loading('Loading.....', 0.5);
            // receive response Data
            responseData=response.data.post;

            // Parse Data into local states
            this.setState({
                allPosts:responseData
            })
            // let i;
            // for (i=0;i<loadMoreIndex;i++){
            //     if(responseData[i]){
            //         this.setState({
            //             displayPosts:this.state.displayPosts.concat(responseData[i])
            //         });
            //     }
            // }
        })
        .catch((e) => {
            console.log(e)
        })
        
        this.timerStart();
         
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
    // Display a post on the right page when user click a particular post item in the left list
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
            
            // UI logic: decide which button to show in the detail page
            // depends on 1. post status 2. logged user authentication
            this.setState({
                displayAddRewardButton:"none",
                displaySignPost:"none",
                displayUploadProof:"none",
                displayNewAddRewardButton:"none"
            });
            let loggedUserID=cookie.load("user_id");
            if(this.state.particularPost_Post[0].status == "Closed"){
                this.setState({
                    displayAddRewardButton:"none",
                    displaySignPost:"none",
                    displayUploadProof:"none",
                    displayNewAddRewardButton:"none"
                });
            }
            else if(this.state.particularPost_Post[0].status == "Assigned"){
                if(this.state.particularPost_Post[0].offer_by === loggedUserID){
                    this.setState({
                        displayUploadProof:"block",
                    });
                }
            }else if(this.state.particularPost_Post[0].status == "Open"){
                if(this.state.particularPost_Post[0].added_by === loggedUserID){
                    this.setState({
                        displayAddRewardButton:"block"
                    });
                }else if(this.state.particularPost_Post[0].offer_by == null){
                    let existAdder = false;
                    this.state.particularPost_Rewards.forEach(item => {
                        let adderID = item.user_id;
                        if(adderID === loggedUserID){
                            this.setState({
                                displayAddRewardButton:"block"
                            });
                            existAdder = true;
                        }
                    });
                    if(!existAdder){
                        this.setState({
                            displaySignPost:"block",
                            displayNewAddRewardButton:"block"
                        });
                    }
                }
            }
        })
        // fetch the post man name
        .then( () => {
            // find the post man
            let posterName;
            let posterID = this.state.particularPost_Post[0].added_by;
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
        })
        .then(()=>{
            // find people who add rewards
            // clear old particularPost_adders
            this.setState({
                particularPost_adders:[]
            });
            let rewards = this.state.particularPost_Rewards
            rewards.forEach(item => {
                let adderID = item.user_id;
                let adderRewards = item.rewards;
                axios.get(`https://aip-v1.ts.r.appspot.com/api/users/${adderID}`)
                .then(response =>{
                    let adderName = response.data.users[0].first_name
                                + " " +response.data.users[0].last_name;  
                    let particularPost_adders = this.state.particularPost_adders;                  
                    this.setState({
                        particularPost_adders:particularPost_adders.concat({
                            "name":adderName,
                            "rewards":adderRewards
                        })
                    })
                })
                .catch((e) => {
                    console.log(e)
                })
            });             
        })
        // find the man who signed this 
        .then(() =>{
            this.setState({
                particularPost_Signer:""
            });
            let signerID = this.state.particularPost_Post[0].offer_by
            if(signerID){
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
        // if no errors occur, then display the detail page
        .then(() =>{
            this.setState({
                displayBodyRight:"block"
            })
        })
        .catch((e) => {
            console.log(e)
        })
        
    }
    
    // onLoadMore(){       
    //     let loadMoreIndex = parseInt(cookie.load("loadMoreIndex"));
    //     loadMoreIndex +=5;
    //     cookie.save("loadMoreIndex",loadMoreIndex,{path:"/"});   
    //     window.location.reload();     
    // }

    // UI logic
    showAddRewardsModal(){
        this.setState({
            addRewardsVisible:true
        });
    }
    // UI logic
    handleCancel(){
        this.setState({
            addRewardsVisible:false,
            uploadVisible:false
        });
        window.location.reload();
    }

    // search function: when user input search keyword
    // if input values, store the keyword in component state
    // otherwise if the input is deleted to empty, then return to all posts list
    onSearchKeyChange(e){
        if(e.target.value){
            this.setState({
                searchKey:e.target.value
            })
            clearInterval(timer);
        }else{
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
            });
            this.timerStart();
        }
        
    }
    // when click search button or press enter, call this function to send request to API and stop intervally refreshing of the whole list
    handleSearch(){
        clearInterval(timer);
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
    // when user click the reward icon, call this function to send request to API to fetch particular posts which contains the chosen reward
    handleSearchReward(ev,rewardType){
        let reward = rewardType;
        clearInterval(timer);
        axios.get(`https://aip-v1.ts.r.appspot.com/api/posts?reward=${reward}`)
        .then(response =>{
            let posts = response.data.post;                             
            this.setState({
                allPosts:posts
            })
        })
    // UI logic, to show which reward is selected. Tell user the displayed list is related to which reward or not
        .then(()=>{
            let rewardButtonChecked = this.state.rewardButtonChecked;

            // following have 7 situations, each has same logic:
            // if user click a checked icon, means clear the reward selection, so return to displaying all posts list
            // else show border on the chosen icon to highlight it
            switch(rewardType){
                case "Chocolate":
                    if(rewardButtonChecked==="Chocolate"){
                        this.setState({
                            rewardButtonStyle:{
                                chocolate:{},
                                coffee:{},
                                cupcake:{},
                                mint:{},
                                pizza:{},
                            },
                            rewardButtonChecked:""
                        })
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
                        });
                        this.timerStart();
                    }else{
                        this.setState({
                            rewardButtonStyle:{
                                chocolate:{border:"1px solid"},
                                coffee:{},
                                cupcake:{},
                                mint:{},
                                pizza:{},
                            },
                            rewardButtonChecked:"Chocolate"
                        })
                    }
                    break;
                case "Coffee":
                    if(rewardButtonChecked==="Coffee"){
                        this.setState({
                            rewardButtonStyle:{
                                chocolate:{},
                                coffee:{},
                                cupcake:{},
                                mint:{},
                                pizza:{},
                            },
                            rewardButtonChecked:""
                        })
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
                        });
                        this.timerStart();
                    }else{
                        this.setState({
                            rewardButtonStyle:{
                                chocolate:{},
                                coffee:{border:"1px solid"},
                                cupcake:{},
                                mint:{},
                                pizza:{},
                            },
                            rewardButtonChecked:"Coffee"
                        })
                    }
                    break;
                case "Cupcake":
                    if(rewardButtonChecked==="Cupcake"){
                        this.setState({
                            rewardButtonStyle:{
                                chocolate:{},
                                coffee:{},
                                cupcake:{},
                                mint:{},
                                pizza:{},
                            },
                            rewardButtonChecked:""
                        })
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
                        });
                        this.timerStart();
                    }else{
                        this.setState({
                            rewardButtonStyle:{
                                chocolate:{},
                                coffee:{},
                                cupcake:{border:"1px solid"},
                                mint:{},
                                pizza:{},
                            },
                            rewardButtonChecked:"Cupcake"
                        })
                    }
                    break;
                case "Mint":
                    if(rewardButtonChecked==="Mint"){
                        this.setState({
                            rewardButtonStyle:{
                                chocolate:{},
                                coffee:{},
                                cupcake:{},
                                mint:{},
                                pizza:{},
                            },
                            rewardButtonChecked:""
                        })
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
                        });
                        this.timerStart();
                    }else{
                        this.setState({
                            rewardButtonStyle:{
                                chocolate:{},
                                coffee:{},
                                cupcake:{},
                                mint:{border:"1px solid"},
                                pizza:{},
                            },
                            rewardButtonChecked:"Mint"
                        })
                    }
                    break;
                case "Pizza":
                    if(rewardButtonChecked==="Pizza"){
                        this.setState({
                            rewardButtonStyle:{
                                chocolate:{},
                                coffee:{},
                                cupcake:{},
                                mint:{},
                                pizza:{},
                            },
                            rewardButtonChecked:""
                        })
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
                        });
                        this.timerStart();
                    }else{
                        this.setState({
                            rewardButtonStyle:{
                                chocolate:{},
                                coffee:{},
                                cupcake:{},
                                mint:{},
                                pizza:{border:"1px solid"},
                            },
                            rewardButtonChecked:"Pizza"
                        })
                    }
                    break;
            }
        })
        .catch((e) => {
            console.log(e)
        })    
    }
    // when user wants to sign this post
    handleSignAPost(){        
        // prepare data used in request body
        let post_id = this.state.particularPost_Post[0].post_id;
        let user_id = cookie.load("user_id");
        let data = {   
            "post_id": post_id,
            "user_id": user_id,
            "proof": 0
        }
        axios.put("https://aip-v1.ts.r.appspot.com/api/posts/apply_rewards",data)
        .then(response =>{
            let resMessage = response.data.message;
            message.success(resMessage);
            setTimeout(() => {
                window.location.reload();
            },2000);     
        })
        .catch((e) => {
            console.log(e)
        })
    }
    // UI logic
    showUploadModal(){
        this.setState({
            uploadVisible:true
        });
    }

    render(){
        let self = this;
        let popContent = [];
        let popContentIndex =0;
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
                        <Popover content={"Chocolate"}><GiChocolateBar  className="requestList-header-rewardList-item"
                                         onClick={(ev)=>{self.handleSearchReward(ev,"Chocolate")}}
                                         style={this.state.rewardButtonStyle.chocolate}/></Popover>
                        <Popover content={"Coffee"}><FaCoffee   className="requestList-header-rewardList-item"
                                    onClick={(ev)=>{self.handleSearchReward(ev,"Coffee")}}
                                    style={this.state.rewardButtonStyle.coffee}/></Popover>
                        <Popover content={"Cupcake"}><GiCupcake   className="requestList-header-rewardList-item"
                                    onClick={(ev)=>{self.handleSearchReward(ev,"Cupcake")}}
                                    style={this.state.rewardButtonStyle.cupcake}/></Popover>
                        <Popover content={"Mint"}><FaLeaf   className="requestList-header-rewardList-item"
                                    onClick={(ev)=>{self.handleSearchReward(ev,"Mint")}}
                                    style={this.state.rewardButtonStyle.mint}/></Popover>
                        <Popover content={"Pizza"}><FaPizzaSlice   className="requestList-header-rewardList-item"
                                        onClick={(ev)=>{self.handleSearchReward(ev,"Pizza")}}
                                        style={this.state.rewardButtonStyle.pizza}/></Popover>
                    </div>
                </div>
                <div className="requestList-body">
                    <div className="requestList-body-left">
                        {this.state.allPosts.map(function(item){
                     // {this.state.displayPosts.map(function(item){
                            switch (item.status) {
                                case "Open":
                                    return(
                                        <div 
                                            className="requestList-item"
                                            onClick={self.handleItemSelect.bind(self,item)}>      
                                            <div className="requestList-item-header">{item.title}</div>
                                            <div className="requestList-item-body">
                                                <ul>
                                                    <li><UserOutlined />Poster:{" "}{item.username}</li>                                            
                                                    <li><CalendarOutlined />Post Date:{" "}{item.added_datetime.split("T")[0]}</li>
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
                                                    <li><UserOutlined />Poster:{" "}{item.username}</li>                                            
                                                    <li><CalendarOutlined />Post Date:{" "}{item.added_datetime.split("T")[0]}</li>
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
                                                    <li><UserOutlined />Poster:{" "}{item.username}</li>                                            
                                                    <li><CalendarOutlined />Post Date:{" "}{item.added_datetime.split("T")[0]}</li>
                                                </ul>
                                            </div>
                                            <div className="requestList-item-status-assigned">{item.status}</div>
                                        </div>
                                    )
                                    break;
                                
                            }
                        })}
                        {/* <Button shape="round" type="primary"
                        className="requestList-body-left-loadMoreButton"
                        onClick={this.onLoadMore.bind(this)}>Load More</Button> */}
                    </div>
                    <div className="requestList-body-right">
                        <div className="requestList-body-right-header">
                            {this.state.particularPost_Post[0].title}                            
                        </div>
                        <div className="requestList-body-right-body" style={{display:this.state.displayBodyRight}}>
                            <div>
                                <span><UserOutlined />Posted BY:</span>
                                <span className="requestList-body-right-body-favoricon">{this.state.particularPost_Poster}</span>
                            </div>
                            <div>
                                <span>Status:</span>
                                <span>{this.state.particularPost_Post[0].status}</span>
                            </div>                          
                            <div>
                                <span><UsergroupAddOutlined />Rewards:</span>                                
                                    {this.state.particularPost_adders.map(function(item){
                                        popContent = popContent.concat(
                                            <Menu>
                                                {item.rewards.map(function(element){
                                                    return(
                                                        <Menu.Item>{element.qty}      {element.reward_name} </Menu.Item>
                                                    )
                                                })}
                                            </Menu>
                                        );
                                        popContentIndex++;
                                        return(
                                            <Dropdown overlay = {popContent[popContentIndex-1]} trigger={['click']}>
                                                <a>{item.name} <DownOutlined /></a>
                                            </Dropdown>                                            
                                        )
                                    })}
                            </div>
                            <div>
                                <span><CalendarOutlined />Post Date:</span>
                                <span>{this.state.particularPost_Post[0].added_datetime.split("T")[0]}</span>
                            </div>                           
                            <div>
                                <span><UserOutlined />Applicant:</span>
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
                            <Button type="primary" onClick={this.showAddRewardsModal.bind(this)} style={{display:this.state.displayNewAddRewardButton}}>Add Rewards</Button>
                            <Button type="primary" onClick={this.showAddRewardsModal.bind(this)} style={{display:this.state.displayAddRewardButton}}>Edit Rewards</Button>
                            <Button type="primary" onClick={this.handleSignAPost.bind(this)} style={{display:this.state.displaySignPost}}>Make an Offer</Button>
                            <Button type="primary" onClick={this.showUploadModal.bind(this)} style={{display:this.state.displayUploadProof}}>Complete</Button>
                        </div>
                    </div>
                </div>
                <Modal
                    title="Select the rewards you want to add to this public post"
                    footer={[]}
                    visible={this.state.addRewardsVisible}
                    onCancel={this.handleCancel.bind(this)}>
                        <AddRewards 
                            postID={this.state.particularPost_Post[0].post_id}/>
                </Modal>                 
                <Modal
                    title="Select and upload proof of completion"
                    footer={[]}
                    visible={this.state.uploadVisible}
                    onCancel={this.handleCancel.bind(this)}>
                        <CompletePost 
                            postID={this.state.particularPost_Post[0].post_id}/>
                </Modal>          
            </div>
        );
    }

}

export default RequestList;