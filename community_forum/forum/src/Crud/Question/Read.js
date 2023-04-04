import { Menu,Button,Comment,Header,Icon,List,Label} from "semantic-ui-react";
import pic from './quest-low-resolution-logo-color-on-transparent-background (3).png';
import './Read.css';

import axios from "axios";
import { useState } from "react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import checkAuth from "../../Components/Checkauth";




function Read(){
  


                    var user = useSelector(store=>store.auth.user);
                    const history = useNavigate();
                    const [apidata,setapiData] = useState([]);  
                
                    useEffect(()=>{
                        axios.get('https://forum.mashupstack.com/api/question/ ').then(responce=>{
                            setapiData(responce.data)
                            console.log(responce.data)
                        })
                    },[ ]);
                    

                    function like(id){
                        axios.post(`https://forum.mashupstack.com/api/question/${id}/like`,
                        {headers: {
                            'Authorization':"Bearer "+ user.token,
                            'Accept' : 'application/json',
                            'Content-Type': 'application/x-www-form-urlencoded'
                        },
                        },).then(responce=>{
                        
                            axios.get('https://forum.mashupstack.com/api/question/',{headers: {
                                            'Authorization':"Bearer "+ user.token,
                                            'Accept' : 'application/json',
                                            'Content-Type': 'application/x-www-form-urlencoded'
                                        }
                                        }
                                        ).then((response)=>{
                                        setapiData(response.data)
                                        })
                        })
                    }
                    function unlike(id){
                        axios.post(`https://forum.mashupstack.com/api/question/${id}/remove-like`,
                        {headers: {
                            'Authorization':"Bearer "+ user.token,
                            'Accept' : 'application/json',
                            'Content-Type': 'application/x-www-form-urlencoded'
                        }
                        }).then(responce=>{
                            axios.get('https://forum.mashupstack.com/api/question/',{headers: {
                                            'Authorization':"Bearer "+ user.token,
                                            'Accept' : 'application/json',
                                            'Content-Type': 'application/x-www-form-urlencoded'
                                        }
                                        }
                                        ).then((response)=>{
                                        setapiData(response.data)
                                        })
                        })
                    }
                


                    return(
                        <div>
                            
                                    <Menu  secondary size="medium" >
                                        
                                        <Menu.Item  position="left" >
                                            <img alt="logo" src={pic} style={{width:"100px" }}/>
                                        </Menu.Item>
                                        
                                    
                                        <Menu.Menu position='Left'>
                                       
                                        <Menu.Item  name="My Question" onClick={()=>history('/Myquest')}/>  
                                        <Menu.Item  name=" Answered Questions" onClick={()=>history('/myans')}/> 
                                        
                                        <Menu.Item>
                                            <Button    color='pink' size="tiny" onClick={()=>history('/')} content="Log out"/>
                                        </Menu.Item>
                                        </Menu.Menu>
                                    </Menu>
                    

                    <div className="read">

                                    <div style={{display:"inline-flex",paddingBottom:"20px"}}><Header as='h2'   style={{paddingRight:"800px"}} >All Questions </Header>
                                    <Button size="tiny" className="Button" color="pink" circular content="Ask Question" onClick={()=>history('/createq')}/></div>
                                    {
                                        apidata.data && apidata.data.length > 0
                                        ?
                                        
                                        apidata.data.map((data)=>{
                                        
                                    









                                                
                                            return (
                                                
                                                <div style={{paddingTop:"3px"}}>
                                                <Comment>
                                                    <Comment.Content >
                                                    
                                                    <List>
                                                    <List.Item as='a' className="list"  
                                                        style={{paddingRight:"0px",color:"#456789",fontSize:"18px"}} 
                                                        onClick={()=>history('/answerquestion/'+data.id)}> {data.question}    
                                                        <Comment.Text><div style={{display:"inline-flex",backgroundColor:  "rgba(255, 133, 165, 0.2)",
                                                        borderRadius:"5px",fontSize:"11px"}}>{data.title}</div></Comment.Text>
                                                        <div style={{opacity:"0.5",fontSize:"10px"}}>{data.created_at}</div>
                                                        
                                                    </List.Item>
                                                
                                                    
                                                    <div style={{display:"block" }}>
                                                    <Button.Group size="tiny" circular style={{paddingLeft:'10px'}}>                                 
                                                    <Button color='pink'size="tiny" circular onClick={()=>like(data.id)} icon='thumbs up'/>
                                                    <Button color='pink'size="tiny" circular onClick={()=>unlike(data.id)} icon='thumbs down'/>
                                                    </Button.Group>
                                                    <div style={{display:"inline-flex",paddingLeft:"15px",color:"#e23d75"}}><h5>{data.likes}</h5></div>
                                                    
                                                    </div>
                                                    </List>
                                                    </Comment.Content>
                                                    <br></br>
                                                    
                                                    </Comment>
                                                    
                                                    </div>
                                                    
                                                
                                            )
                                            
                                            
                                                })
                                                :"No data"
                                                
                                            }
                            </div>


                    
                    </div>
   
)
}export default checkAuth(Read);