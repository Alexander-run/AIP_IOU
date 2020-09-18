import React from 'react';
import { Button, Modal, Input } from 'antd';
import { FaCoffee } from 'react-icons/fa';
import { GiChocolateBar } from 'react-icons/gi';
import './RequestList.css';
import { UserOutlined, UsergroupAddOutlined, CalendarOutlined } from '@ant-design/icons'
import AddRewards from "../AddRewards/Index";

const { Search } = Input;

class RequestList extends React.Component{
    
    constructor(props){
        super(props);
        this.state={
            requestArr:[
                {poster:'Alex',adder:['Grace','Bob','Mia'],title:'Request 1',description:'This is a request',date:'2020/1/5'},
                {poster:'Alex',adder:['Grace','Bob','Mia'],title:'Request 2',description:'This is a request',date:'2020/1/5'},
                {poster:'Alex',adder:['Grace','Bob','Mia'],title:'Request 3',description:'This is a request',date:'2020/1/5'},
                {poster:'Alex',adder:['Grace','Bob','Mia'],title:'Request 4',description:'This is a request',date:'2020/1/5'},
                {poster:'Alex',adder:['Grace','Bob','Mia'],title:'Request 5',description:'This is a request',date:'2020/1/5'},
                {poster:'Alex',adder:['Grace','Bob','Mia'],title:'Request 6',description:'This is a request',date:'2020/1/5'},
                {poster:'Alex',adder:['Grace','Bob','Mia'],title:'Request 7',description:'This is a request',date:'2020/1/5'},
                {poster:'Alex',adder:['Grace','Bob','Mia'],title:'Request 8',description:'This is a request',date:'2020/1/5'},
                {poster:'Alex',adder:['Grace','Bob','Mia'],title:'Request 9',description:'This is a request',date:'2020/1/5'},
                {poster:'Alex',adder:['Grace','Bob','Mia'],title:'Request 10',description:'This is a request',date:'2020/1/5'},
                {poster:'Alex',adder:['Grace','Bob','Mia'],title:'Request 11',description:'This is a request',date:'2020/1/5'},
                {poster:'Alex',adder:['Grace','Bob','Mia'],title:'Request 12',description:'This is a request',date:'2020/1/5'},
                {poster:'Alex',adder:['Grace','Bob','Mia'],title:'Request 13',description:'This is a request',date:'2020/1/5'},
                {poster:'Alex',adder:['Grace','Bob','Mia'],title:'Request 14',description:'This is a request',date:'2020/1/5'},
                {poster:'Alex',adder:['Grace','Bob','Mia'],title:'Request 15',description:'This is a request',date:'2020/1/5'},
                {poster:'Alex',adder:['Grace','Bob','Mia'],title:'Request 16',description:'This is a request',date:'2020/1/5'},
                {poster:'Alex',adder:['Grace','Bob','Mia'],title:'Request 17',description:'This is a request',date:'2020/1/5'},
                {poster:'Alex',adder:['Grace','Bob','Mia'],title:'Request 18',description:'This is a request',date:'2020/1/5'},
                {poster:'Alex',adder:['Grace','Bob','Mia'],title:'Request 19',description:'This is a request',date:'2020/1/5'},
                {poster:'Alex',adder:['Grace','Bob','Mia'],title:'Request 20',description:'This is a request',date:'2020/1/5'},
                {poster:'Alex',adder:['Grace','Bob','Mia'],title:'Request 21',description:'This is a request',date:'2020/1/5'},
                {poster:'Alex',adder:['Grace','Bob','Mia'],title:'Request 22',description:'This is a request',date:'2020/1/5'}
            ],
            selectedRequest:{poster:'Alex',adder:['Grace','Bob','Mia'],title:'Request 1',description:'This is a request',date:'2020/1/5'},
            searchKey:'',

            addRewardsVisible:false
        }
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

    }

    handleItemSelect(item){
        this.setState({
            selectedRequest:item
        });
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
                </div>
                <div className="requestList-body">
                    <div className="requestList-body-left">
                        {this.state.requestArr.map(function(item){
                            return(
                                <div 
                                    className="requestList-item"
                                    onClick={self.handleItemSelect.bind(self,item)}>      
                                    <div className="requestList-item-header">{item.title}</div>
                                    <div className="requestList-item-body">
                                        <ul>
                                            <li><UserOutlined />Poster:{item.poster}</li>
                                            <li><UsergroupAddOutlined />Adder:
                                                {item.adder.map(function(adder){
                                                    return(<span>{adder}</span>)
                                                })}
                                            </li>
                                            <li><CalendarOutlined />Poster:{item.date}</li>
                                        </ul>
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                    <div className="requestList-body-right">
                        <div className="requestList-body-right-header">
                            {this.state.selectedRequest.title}
                        </div>
                        <div className="requestList-body-right-body">
                            <div>
                                <span><UserOutlined />Posted BY:{this.state.selectedRequest.poster}</span>
                                <span className="requestList-body-right-body-favoricon"><GiChocolateBar /><GiChocolateBar /></span>
                            </div>
                            <div>
                                <span><UsergroupAddOutlined />Added BY:</span>
                                <span> </span>
                            </div>
                            {this.state.selectedRequest.adder.map(function(item){
                                return(
                                    <div style={{margin:"0 2vh"}}>
                                        <span><UserOutlined />{item}</span>
                                        <span className="requestList-body-right-body-favoricon"><GiChocolateBar /><FaCoffee /></span>
                                    </div>
                                )
                            })}
                            <div>
                                <span><CalendarOutlined />Post Date:</span>
                                <span>{this.state.selectedRequest.date}</span>
                            </div>
                            <div>
                                <span>Total Reward:</span>
                                <span className="requestList-body-right-body-favoricon"><GiChocolateBar /><GiChocolateBar /><GiChocolateBar /><GiChocolateBar /><GiChocolateBar /><FaCoffee /><FaCoffee /><FaCoffee /></span>
                            </div>   
                            <div>
                                <span>Description:</span>
                                <span> </span>
                            </div>     
                            <div style={{border:"1px solid #E5E5E5"}}>
                                <p>{this.state.selectedRequest.description}</p>
                            </div>                    
                        </div>
                        <div className="requestList-body-right-footer"> 
                        <Button type="primary" onClick={this.showAddRewardsModal.bind(this)}>Add Rewards</Button>
                        <Button type="primary">Make an Offer</Button>
                        </div>
                    </div>
                </div>
                <Modal
                    title="Select the rewards you want to add to this public request"
                    footer={[]}
                    visible={this.state.addRewardsVisible}
                    onCancel={this.handleCancel.bind(this)}>
                        <AddRewards />
                </Modal>       
            </div>
        );
    }

}

export default RequestList;