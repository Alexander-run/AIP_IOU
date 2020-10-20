import React from 'react';
import { Upload, Modal, Button, message } from 'antd';
import { LoadingOutlined, PlusOutlined } from '@ant-design/icons';
import axios from 'axios';
import cookie from 'react-cookies';

function getBase64(img, callback) {
  const reader = new FileReader();
  reader.addEventListener('load', () => callback(reader.result));
  reader.readAsDataURL(img);
}

class CompletePost extends React.Component {
  state = {
    loading: false,
    photo:null,
    post_id:this.props.postID
  };

  
  handleChange = info => {
    if (info.file.status === 'uploading') {
      this.setState({ loading: true });
      return;
    }
    if (info.file.status === 'done') {
      // Get this url from response in real world.
      getBase64(info.file.originFileObj, imageUrl =>
        this.setState({
          imageUrl,
          photo:info.file,
          loading: false,
        }),
      );
      message.success("Upload success, Please press submit button to complete your work")
    }
  };
  handleSubmit(){
    let {loading,photo} = this.state;
    if(photo === null){
      message.error("Please upload one image first");
    }else if(loading){
      message.error("Please wait for uploading finish");
    }else{
      let post_id = this.state.post_id;
      let user_id = cookie.load("user_id");
      let data = {   
          "post_id": post_id,
          "user_id": user_id,
          "proof": 1
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
    }
  }

  render() {
    const { loading, imageUrl } = this.state;
    const header={"enctype":"multipart/form-data"}
    const uploadButton = (
      <div>
        {loading ? <LoadingOutlined /> : <PlusOutlined />}
        <div style={{ marginTop: 8 }}>Upload</div>
      </div>
    );
    return (
      <div>
      <Upload
        name="file"
        method="POST"
        headers={header}
        listType="picture-card"
        showUploadList={false}
        action="http://localhost:5000/upload"
        onChange={this.handleChange}
      >
        {imageUrl ? <img src={imageUrl} alt="file" style={{ width: '100%' }} /> : uploadButton}
      </Upload>
      <Button type="primary" onClick={this.handleSubmit.bind(this)}>Submit</Button>
      </div>
    );
  }
}
export default CompletePost;
