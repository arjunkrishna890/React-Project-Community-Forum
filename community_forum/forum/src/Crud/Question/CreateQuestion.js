
import { Form,Button,Menu, Header } from "semantic-ui-react";
import { Link } from "react-router-dom";
import './Create.css';
import pic from './quest-low-resolution-logo-color-on-transparent-background (3).png';
import axios from "axios";
import { useSelector } from "react-redux";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import checkAuth from "../../Components/Checkauth";


function CreateQuestion () {

    var [question,setQuestion]  = useState('');
    var [title,setTitle] = useState('');
    var user = useSelector(store=>store.auth.user);
    var history = useNavigate();    
  


    const posttoAPI= () => {
        axios.post('https://forum.mashupstack.com/api/question',
        {
           
            title : title,
            question :question,
            

            
            
        },
        {
            headers:
            {
            'Authorization':"Bearer "+ user.token,
            'Accept' : 'application/json',
            'Content-Type': 'application/x-www-form-urlencoded'
            }
        }).then(responce=>{
            console.log(responce)
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
                           
                           <Menu.Item name="Back" onClick={()=>history('/read')}/>
                           <Menu.Item/>
                            </Menu.Menu>
                        </Menu>


            <div className="create">
                    <Form >
                                <Header as='h3' dividing>Ask a  question</Header>
                                            <Form.Field widths={3} className="item">
                                                <Form.Input label='Title'  placeholder='Title'  onInput={(e)=>setTitle(e.target.value)} value={title} type="text" />
                                            </Form.Field>
                                            <br></br>
                                            <Form.Field widths={2}>
                                                <Form.Input label='What are the details of your Question?' onInput={(e)=>setQuestion(e.target.value)} value={question}  placeholder='Question' type="text" />
                                            </Form.Field>    
                                <Button type='submit' size='small' circular color='pink' onClick={posttoAPI}>Submit Question</Button>
                                    
                        
                        
                        </Form>
            </div>

</div>
    )
}export default checkAuth(CreateQuestion);