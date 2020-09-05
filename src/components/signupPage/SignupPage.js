import React, { Fragment } from 'react';
import './SignupPage.css';


class SignupPage extends React.Component{
    
    constructor(props){
        super(props);
        this.state={

        }
    }

    render(){
        return(
            <div className='signup'>
                <h2>Create your Account</h2>
                <div>
                    <table>
                        <tr>
                            <td>First Name:  </td>
                            <td></td>
                        </tr>
                        <tr>
                            <td>Second Name:  </td>
                            <td></td>
                        </tr>
                        <tr>
                            <td>Address:  </td>
                            <td></td>
                        </tr>
                        <tr>
                            <td>Email Address:  </td>
                            <td></td>
                        </tr>
                        <tr>
                            <td></td>
                            <td></td>
                        </tr>
                    </table>
                </div>                
            </div>            
        );
    }

}

export default SignupPage;