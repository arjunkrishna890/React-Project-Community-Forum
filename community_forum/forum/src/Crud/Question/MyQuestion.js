import { Menu,Button,Comment,Header,Icon} from "semantic-ui-react";
import pic from './quest-low-resolution-logo-color-on-transparent-background (3).png';
import './Read.css';
import axios from "axios";
import { useState } from "react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import checkAuth from "../../Components/Checkauth";




function MyQuestion(){
  
    var user = useSelector(store=>store.auth.user);
    const history = useNavigate();
    const [apidata,setapiData] = useState([]);  
    useEffect(()=>{
        axios.get('https://forum.mashupstack.com/api/question/ ').then(responce=>{
            setapiData(responce.data)
            console.log(responce.data)
        })
    },[ ]);

    const getData = () =>{
                        axios.get('https://forum.mashupstack.com/api/question/',{headers: {
                            'Authorization':"Bearer "+ user.token,
                            'Accept' : 'application/json',
                            'Content-Type': 'application/x-www-form-urlencoded'
                        }
                        }
                        ).then((response)=>{
                        setapiData(response.data)
                        })
        
        }
    
    const getdelete = (id) =>{
                axios.delete(`https://forum.mashupstack.com/api/question/${id}`,{headers: {
                    'Authorization':"Bearer "+ user.token,
                    'Accept' : 'application/json',
                    'Content-Type': 'application/x-www-form-urlencoded'
                }
                }).then(()=> {
                getData();
    })
    
    }
    












    
    return(
        <div>
           
                    <Menu  secondary size="medium" >
                        <Menu.Item  position="left" >
                            <img alt="logo" src={pic} style={{width:"100px" }}/>
                        </Menu.Item>

                        <Menu.Menu position='Left'>
                        
                        <Menu.Item  name="Back"  onClick={()=>history('/read')}/>    
                        <Menu.Item>
                        </Menu.Item>
                        </Menu.Menu>
                    </Menu>
     

    <div className="read">

                    <div style={{display:"inline-flex",paddingBottom:"20px"}}><Header as='h2'   style={{paddingRight:"800px"}} >My Questions </Header></div>
                    {
                        apidata.data && apidata.data.length > 0
                        ?
                        
                        apidata.data.map((data)=>{
                           
                           if(user.ids === data.user_id)
                                  
                             return (
                                
                                <div style={{borderTop: "0.5px solid #bbb",paddingTop:"8px",paddingBottom:"0px"}}>
                                    
                                <Comment>
                                    <Comment.Content >
                                        <Comment.Author style={{display:"inline-flex",paddingRight:"20px"}}><p style={{paddingRight:"10px",color:"#456789",fontSize:"18px"}}> {data.question}</p>
                                        <Button size="tiny"  circular color="pink" onClick={()=>history('/editques/'+data.id)}  >Edit</Button> 
                                        <Button   onClick={()=> getdelete(data.id)}   basic circular size="tiny"color="pink"> Delete</Button>
                                         </Comment.Author>
                                        
                                        <Comment.Text><div style={{display:"inline-flex",backgroundColor:  "rgba(255, 133, 165, 0.2)",borderRadius:"5px",padding:"2px",color:"#456789",fontSize:"13px"}}>{data.title}</div></Comment.Text>
                                        <Comment.Metadata >
                                        <div style={{opacity:"0.5",fontSize:"10px"}}>{data.created_at}</div>
                                        </Comment.Metadata>
                                        
                                        <Comment.Actions>
                                        <Comment.Action><Icon name='like'color="red" />{data.likes}</Comment.Action>
                                        </Comment.Actions>
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
}export default checkAuth(MyQuestion);