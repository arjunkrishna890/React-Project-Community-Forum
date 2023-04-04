
import { useParams } from "react-router-dom";
import { Menu,Button,Comment,Header,Icon,Form,Dimmer,Segment,Loader} from "semantic-ui-react";
import pic from './quest-low-resolution-logo-color-on-transparent-background (3).png';
import './Answer.css';
import axios from "axios";
import { useState } from "react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import checkAuth from "../../Components/Checkauth";




function Readanswer(){

    const{postId} = useParams();
    const history = useNavigate();
    var user = useSelector(store=>store.auth.user);
    const [question,setQuestion] = useState('');
    const [answer,setAnswer] = useState('');
    const [ saved,setSaved] = useState([]);
    const [apidata,setapiData] = useState([]);  
    const [apidatas,setapiDatas] = useState([]);  
    useEffect(()=>{
        axios.get('https://forum.mashupstack.com/api/question/'+postId,
        {headers: {
            'Authorization':"Bearer "+ user.token,
            'Accept' : 'application/json',
            'Content-Type': 'application/x-www-form-urlencoded'
        }
        }
        ).then(responce=>{
            
            setQuestion(responce.data.question);
           
        })
     },[])

     useEffect(()=>{
        axios.get('https://forum.mashupstack.com/api/question/'+postId,
        {
            headers: {
            'Authorization':"Bearer "+ user.token,
            'Accept' : 'application/json',
            'Content-Type': 'application/x-www-form-urlencoded'
        }
        }
        ).then(responce=>{
            
            setSaved(responce.data);
            console.log(responce.data)
           
        })
    },[])
    useEffect(()=>{
        axios.get('https://forum.mashupstack.com/api/question/ ').then(responce=>{
            setapiData(responce.data)
            console.log(responce.data)
        })
    },[ ]);
  






     function Answer(){
        axios.post('https://forum.mashupstack.com/api/question/'+postId+'/answer',
        {
            answer:answer,
        },
        {
            headers:
            {
            'Authorization':"Bearer "+ user.token,
            'Accept' : 'application/json',
            'Content-Type': 'application/x-www-form-urlencoded',
            
            }
        }).then(responce=>{
           
            
                axios.get('https://forum.mashupstack.com/api/question/'+postId,
                {
                    headers: {
                    'Authorization':"Bearer "+ user.token,
                    'Accept' : 'application/json',
                    'Content-Type': 'application/x-www-form-urlencoded'
                }
                }
                ).then(responce=>{
                    
                    setSaved(responce.data);
                    console.log(responce)
                   
                })
            


        }).catch (error=> {
            console.log(error.message);     
        })
    }



    

const getdelete = (id) =>{
                axios.delete(`https://forum.mashupstack.com/api/answer/${id}/`,{headers: {
                    'Authorization':"Bearer "+ user.token,
                    'Accept' : 'application/json',
                    'Content-Type': 'application/x-www-form-urlencoded'
                }
                }).then(responce => {
                    axios.get('https://forum.mashupstack.com/api/question/'+postId,
                    {
                        headers: {
                        'Authorization':"Bearer "+ user.token,
                        'Accept' : 'application/json',
                        'Content-Type': 'application/x-www-form-urlencoded'
                    }
                    }
                    ).then(responce=>{
                        
                        setSaved(responce.data);
                        console.log(responce.data)
                       
                    })
                 }
                

                )

}

    return(       
                    <div>
                                            <Menu  secondary size="medium" >
                                                        <Menu.Item  position="left" onClick={()=>history('/')}>
                                                            <img alt="logo" src={pic} style={{width:"100px" }}/>
                                                        </Menu.Item>
                                                        
                                                    
                                                        <Menu.Menu position='Left'>

                                                        <Menu.Item  name="Back"  onClick={()=>history('/read')}/>    
                                                        <Menu.Item>
                                                        
                                                            
                                                        </Menu.Item>
                                                        </Menu.Menu>
                                            </Menu>
                        <div className="answer">

                                        <h1>{question}</h1>
                                            {
                                            saved.answers && saved.answers.length > 0
                                                    ?
                                                    saved.answers.map((data)=>{
                                                        return(
                                                            <div >
                                                                <div style={{borderTop: "0.5px solid #bbb",paddingTop:"10px",paddingBottom:"0px",marginTop:"0px"}}></div>
                                                                {
                                                                            function myques(){
                                                                                if(user.ids === data.user.id)
                                                                               
                                                                                return(
                                                                                    <h5 style={{color:"#cc537c"}}>My answer <Icon name="star"/></h5>
                                                                                )
                                                                            }()
                                                                        }
                                                                    <Comment >
                
                                                                    <Comment.Content>
                                                                       
                                                                <div  style={{display:'inline-flex'}}><h3 style={{color:"#e23d75"}}>{data.user.name}</h3><div style={{opacity:"0.5",fontSize:"13px",paddingLeft:"10px"}}>{data.created_at}</div></div>
                                                                
                                                                <Comment.Text style={{fontSize:"16px",color:"#456789"}}><p>{data.answer}</p></Comment.Text>
                                                                {
                                                                    
                                                                   function my (){
                                                                        if(user.ids === data.user.id)
                                                                        
                                                                        return(
                                                                            <div>
                                                                            <Header as={'a'} content="Edit" color="pink" size="tiny"  onClick={()=>history('/editans/'+data.id)}circular >Edit</Header>
                                                                            
                                                                            <Header as={'a'} content="Edit" color="pink" size="tiny" 
                                                                            circular style={{paddingLeft:"10px"}} onClick={()=> getdelete(data.id)}>Delete</Header>
                                                                            </div>
                                                                        )
                                                                    }()
                                                            
                                                                }
                                                                
                                                              

                                                                </Comment.Content>
                                                                
                                                                
                                                            </Comment>
                                                            </div>
                                                        )
                                                    })
                                                    :
                                                        "NO data"
                                            }
                                        <Form>
                                        <div style={{borderTop: "0.5px solid #bbb",paddingTop:"10px",paddingBottom:"0px",marginTop:"10px"}}></div>
                                                    <Form.Field widths={3} className="item">
                                                            <Form.TextArea  placeholder='Answer' value={answer} onChange={(e)=>setAnswer(e.target.value)}  type="text" />
                                                            <Button content="Submit" onClick={Answer} size="tiny" color="pink" circular />
                                                            
                                                    </Form.Field>
                                        </Form>           
                        </div>
                    </div>

    )

}export default checkAuth(Readanswer);