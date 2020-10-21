import React from 'react';
import {storage} from "../Firebase";
import { Button, message } from 'antd';
import axios from 'axios';
import cookie from 'react-cookies';


class CompletePost extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      image: null,
      url: '',
      progress: 0,
      post_id:this.props.postID
    }

    this.handleChange = this
    .handleChange
    .bind(this);
    this.handleUpload = this.handleUpload.bind(this);
}
handleChange = e => {
  if (e.target.files[0]) {
    const image = e.target.files[0];
    this.setState(() => ({image}));
  }
}

handleUpload = () => {
  const {image} = this.state;
  if(image == null){
    message.error("Please select one image firstly");
  }else{
    const uploadTask = storage.ref(`images/${image.name}`).put(image);
    uploadTask.on('state_changed', 
    (snapshot) => {
      // progrss function ....
      const progress = Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
      this.setState({progress});
    }, 
    (error) => {
          // error function ....
      console.log(error);
    }, 
    () => {
      // complete function ....
      storage.ref('images').child(image.name).getDownloadURL().then(url => {
          console.log(url);      
        let post_id = this.state.post_id;
        let user_id = cookie.load("user_id");
        let data = {   
          "post_id": post_id,
          "user_id": user_id,
          "proof": 1,
          "image_url":url
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
          console.log(e);
          message.error("Error, Please try again");
      })
      
        this.setState({url});


      })
    });
  }
}

  render() {
    return (
      <div>
        <input type="file" onChange={this.handleChange} accept="image/x-png,image/gif,image/jpeg"/>
        <br/>
        <hr/>
        <Button onClick={this.handleUpload}>Upload</Button>
        <br/>
      </div>
    )
  }
}
export default CompletePost;
