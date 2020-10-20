import React from 'react';
import { Upload, Modal, Button, message } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import axios from 'axios';
import cookie from 'react-cookies';

function getBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = error => reject(error);
  });
}

class UploadProof extends React.Component{
    state = {
        previewVisible: false,
        previewImage: '',
        previewTitle: '',
        fileList: [],
        transactionID : this.props.transactionID
      };
    
      handleCancel = () => this.setState({ previewVisible: false });
    
    //   handlePreview = async file => {
    //     if (!file.url && !file.preview) {
    //       file.preview = await getBase64(file.originFileObj);
    //     }
    
    //     this.setState({
    //       previewImage: file.url || file.preview,
    //       previewVisible: true,
    //       previewTitle: file.name || file.url.substring(file.url.lastIndexOf('/') + 1),
    //     });
    //   };
    
      handleChange = ({ fileList }) => this.setState({ fileList });
    
      handleUploadAction(){
        let fileList = this.state.fileList;  
        let error = false;
        if(fileList.length == 0){
            error=true;
        }else{
            fileList.forEach(Item => {
                if(Item.status == 'uploading'){
                    error = true;
                }else if(Item.status == 'error'){
                    error = true;
                }
            });
        }    
        if(!error){
            let transactionID = this.state.transactionID;
            console.log("Uplod id"+transactionID);
            let user_id = cookie.load("user_id");
            let data = {   
                "transaction_id": transactionID,
                "user_id":user_id,
                "proof": 1
            }
            axios.put("https://aip-v1.ts.r.appspot.com/api/favours/transaction",data)
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
        else{
            message.error("Please select at least one image before upload");
        }
      }
    
      render() {
        const { previewVisible, previewImage, fileList, previewTitle } = this.state;
        const uploadButton = (
          <div>
            <UploadOutlined />
            <div style={{ marginTop: 8 }}>Upload</div>
          </div>
        );
        return (
          <div>
            <Upload
              action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
              listType="picture-card"
              fileList={fileList}
              onPreview={this.handlePreview}
              onChange={this.handleChange}
            >
              {fileList.length >= 8 ? null : uploadButton}
            </Upload>
            <Button type="primary" onClick={this.handleUploadAction.bind(this)}>Upload</Button>
            <Modal
              visible={previewVisible}
              title={previewTitle}
              footer={null}
              onCancel={this.handleCancel}
            >
              <img alt="example" style={{ width: '100%' }} src={previewImage} />
            </Modal>
          </div>
        );
      }
    }
    export default UploadProof;