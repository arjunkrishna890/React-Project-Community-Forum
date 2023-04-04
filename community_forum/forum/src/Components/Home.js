import { Menu,Button,Comment,Header,Icon} from "semantic-ui-react";
import pic from './quest-low-resolution-logo-color-on-transparent-background (3).png';
import gif from './fire.gif';
import gif2 from './point.gif'
import './Home.css';
import { Link } from "react-router-dom";
import axios from "axios";
import { useState } from "react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function Home(){
    const history = useNavigate();
    const [apidata,setapiData] = useState([]);  
    useEffect(()=>{
        axios.get('https://forum.mashupstack.com/api/question/ ').then(responce=>{
            setapiData(responce.data)
            console.log(responce.data)
            
            
            
        })
    },[ ]);










    return(
        <div>



                    <Menu  secondary size="medium" >
                        <Menu.Item  position="left" onClick={()=>history('/')}>
                            <img alt="logo" src={pic} style={{width:"100px" }}/>
                        </Menu.Item>
                        
                        <Menu.Item  name="Search Question" onClick={()=>history('/search')}/>  

                        <Menu.Menu position='Left'>
                        <Menu.Item  name="Log in" onClick={()=>history('/login')}>  
                            
                        </Menu.Item>
                        <Menu.Item>
                        
                        <Button    color='pink'circular size="mini" onClick={()=>history('/register')} content="Sign Up"/>
                        
                        </Menu.Item>
                        </Menu.Menu>
                    </Menu>
     

    <div className="home" >


        
       
                   <div style={{textAlign:"centers",display:"inline-flex"}}> <h2 style={{color:"#ff3366",textShadow: "-2px 2px 2px rgba(251, 240, 9, 1)",fontSize:"40px",paddingLeft:"160px"}} >Trending Questions</h2> </div>
                    
                    {
                        apidata.data && apidata.data.length > 0
                        ?
                        apidata.data.map((data)=>{
                            return(
                                <div style={{paddingTop:"8px",paddingBottom:"0px",textAlign:"left"}}>
                                <Comment>
                                    <Comment.Content >
                                        <Comment.Author ><div style={{display:"inline-flex"}}><h4 style={{color:"#480048"}}><img alt="logo" src={gif2} style={{width:"20px" }}/> {data.question}</h4></div></Comment.Author>
                                        
                                       
                                        <Comment.Actions>
                                        
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
}export default Home;