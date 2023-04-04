
import { Form,Button,Menu, Header } from "semantic-ui-react";
import './Answer.css';
import pic from './quest-low-resolution-logo-color-on-transparent-background (3).png';
import axios from "axios";
import { useSelector } from "react-redux";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import checkAuth from "../../Components/Checkauth";




function EditAnswer(){
    var history = useNavigate();
    const [answer,setAnswer] = useState('');
   
    var user = useSelector(store=>store.auth.user);
    const{postId} = useParams();
 
   
    
   console.log(postId)

    useEffect(()=>{
        axios.get(`https://forum.mashupstack.com/api/answer/`+postId,
        {headers: {
            'Authorization':"Bearer "+ user.token,
            'Accept' : 'application/json',
            'Content-Type': 'application/x-www-form-urlencoded'
        }
        }
        ).then(responce=>{
           
            console.log(responce)
           
           
        })
     },[])

    function updatePost(){
        axios.put(`https://forum.mashupstack.com/api/answer/`+postId
        ,{
           answer:answer
            
        },
        {headers: {
            'Authorization':"Bearer "+ user.token,
            'Accept' : 'application/json',
            'Content-Type': 'application/x-www-form-urlencoded'
        }
        }
        ).then(responce=>{
            console.log(responce.data)
            history('/read')

        }).catch (error=> {
            console.log(error.message);     
        })
    }


    






return(


        <div>

                        <Menu  secondary size="medium" >
                                <Menu.Item  position="left" >
                                    <img alt="logo" src={pic} style={{width:"100px" }}/>
                                </Menu.Item>
                                
                                <Menu.Menu position='Left'>
                            
                                 <Menu.Item name="Back" onClick={()=>history('/read')} />
                                 <Menu.Item/>
                                </Menu.Menu>
                        </Menu>


            <div className="create">
                        <Form >
                                <Header as='h3' dividing>Edit Answers</Header>
                                            <Form.Field widths={3} className="item">
                                                <Form.TextArea label='Title'  placeholder='Answer'  onChange={(e)=>setAnswer(e.target.value)} value={answer} type="text" />
                                            </Form.Field>
                                            <br></br>
                                               
                                <Button type='submit' size='small' circular color='pink' onClick={updatePost} >Submit Answer</Button>
                         
                        </Form>
            </div>

        </div>
    )
}export default checkAuth(EditAnswer);