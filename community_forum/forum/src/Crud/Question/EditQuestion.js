
import { Form,Button,Menu, Header } from "semantic-ui-react";
import './Create.css';
import pic from './quest-low-resolution-logo-color-on-transparent-background (3).png';
import axios from "axios";
import { useSelector } from "react-redux";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import checkAuth from "../../Components/Checkauth";





function EditQuestion(){
    var history = useNavigate();
    const [title,setTitle] = useState('');
    const [question,setQuestion] = useState('');
    var user = useSelector(store=>store.auth.user);
    const{postId} = useParams();
 
   
    
    console.log(user)

    useEffect(()=>{
        axios.get('https://forum.mashupstack.com/api/question/'+postId,
        {headers: {
            'Authorization':"Bearer "+ user.token,
            'Accept' : 'application/json',
            'Content-Type': 'application/x-www-form-urlencoded'
        }
        }
        ).then(responce=>{
            setTitle(responce.data.title);
            setQuestion(responce.data.question);
           
        })
     },[])

    function updatePost(){
        axios.put('https://forum.mashupstack.com/api/question/'+postId
        ,{
            title:title,
            question:question,
            
        },
        {headers: {
            'Authorization':"Bearer "+ user.token,
            'Accept' : 'application/json',
            'Content-Type': 'application/x-www-form-urlencoded'
        }
        }
        ).then(responce=>{
            console.log(responce.data)
            history('/myquest')

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
                            
                                 <Menu.Item name="Back" onClick={()=>history('/myquest')} />
                                 <Menu.Item/>
                                </Menu.Menu>
                        </Menu>


            <div className="create">
                        <Form >
                                <Header as='h3' dividing>Edit Question</Header>
                                            <Form.Field widths={3} className="item">
                                                <Form.Input label='Title'  placeholder='Title'  onChange={(e)=>setTitle(e.target.value)} value={title} type="text" />
                                            </Form.Field>
                                            <br></br>
                                            <Form.Field widths={2}>
                                                <Form.Input label='What are the details of your Question?' onChange={(e)=>setQuestion(e.target.value)} value={question}  placeholder='Question' type="text" />
                                            </Form.Field>    
                                <Button type='submit' size='small' circular color='pink' onClick={updatePost} >Submit Question</Button>
                         
                        </Form>
            </div>

        </div>
    )
}export default checkAuth(EditQuestion);