import { Menu,Button,Comment,Header,Icon} from "semantic-ui-react";
import pic from './quest-low-resolution-logo-color-on-transparent-background (3).png';
import './Answer.css';
import axios from "axios";
import { useState } from "react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import checkAuth from "../../Components/Checkauth";



function MyAnswer(){
  
    var user = useSelector(store=>store.auth.user);
    const history = useNavigate();
    const [apidata,setapiData] = useState([]);  
    const [answer,setAnswer] = useState([]);
 


   
    
    useEffect(()=>{
        axios.get('https://forum.mashupstack.com/api/question/answered-by-me',
        {
            headers: {
            'Authorization':"Bearer "+ user.token,
            'Accept' : 'application/json',
            'Content-Type': 'application/x-www-form-urlencoded'
        }
        }
        ).then(responce=>{
            setapiData(responce.data.questions)
           
        })
    },[ ]);

       

    












    
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

                    <div style={{display:"inline-flex",paddingBottom:"20px"}}><Header as='h2'   style={{paddingRight:"800px"}} >Answered Questions </Header></div>
                    {
                           
                                  
                             
                                
                                
                                    
                                
                               apidata.data && apidata.data.length > 0
                               ?
                               apidata.data.map((data)=>{
                                
                                
                                return(
                                   
                                   <div>
                                    <div style={{borderTop: "0.5px solid #bbb",paddingTop:"8px",paddingBottom:"10px"} }>
                                    <p style={{paddingRight:"10px",color:"#456789",fontSize:"18px"}} onClick={()=>history('/answerquestion/'+data.id)}>{data.question}</p>
                                    
                                    
                                    </div>
                                    </div>
                                )
                               })
                               :"No data"
                              }
                                
                                    
                                   
                            
             </div>


    
    </div>
   
)
}export default checkAuth(MyAnswer);