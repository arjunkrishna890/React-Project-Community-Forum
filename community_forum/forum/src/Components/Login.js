import './Register.css';
import { Button,Form,Menu } from 'semantic-ui-react';
import pic from './quest-low-resolution-logo-color-on-transparent-background (3).png';
import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setUser } from '../Store/authslice';

function Login(){
const history = useNavigate();
const dispatch = useDispatch();

var [email,setEmail] = useState('');
var [password,setPassword] = useState('');
var [errorMessage,setErrorMessage] = useState('');
function Loginattempt()
{
    axios.post('https://forum.mashupstack.com/api/login',
    {
        email : email,
        password : password
    },
    {
        headers: 
        {
        'Accept' : 'application/json',
        'Content-Type': 'application/x-www-form-urlencoded'
        }
    }).then(responce=>{
        setErrorMessage('');
        var tokens = responce.data.token
        var names = responce.data.user.name
        var ids = responce.data.user.id
        var user = {
                email:email,
                token:tokens,
                name:names,
                ids:ids
            }
        dispatch(setUser(user))
        console.log(responce)
        history('/read')

        
    }).catch(error=>{

        if(error.response.data.errors)
        {

            setErrorMessage(Object.values(error.response.data.errors).join(' '));
            
        }
        else
        {
            setErrorMessage('Failed to connect to api');
            
        }
    })






}







    return(


<div>

        <Menu  secondary size="medium" >
                <Menu.Item  position="left" >
                          <img alt="logo" src={pic} style={{width:"100px" }}/>
                </Menu.Item>
                
                <Menu.Item name='Back to home' onClick={()=>history('/')}/>
                
                <Menu.Menu position='Left'>
                          <Menu.Item >
                
                          </Menu.Item>
                </Menu.Menu>
          </Menu>

    <div className='register' >


          <Form >
                     <h2 >Log in  to Quest</h2>
                     {errorMessage?<div className="alert alert-danger">{errorMessage}</div>:''}
                    <Form.Group unstackable widths={1}>
                            <Form.Input type="email" label='Email' placeholder='Email' onChange={(e)=>setEmail(e.target.value)}   value={email}/> 
                            <Form.Input label='Password' placeholder='Password' type="password" onChange={(e)=>setPassword(e.target.value)}  value={password}/>
                    </Form.Group>
                   
                    <br></br>      
              <Button type='submit' size='small' circular color='pink' fluid onClick={Loginattempt} >Log in</Button>
              <p style={{display:"inline-flex",}}>Don't have an account ?<Link to={'/register'}> <p style={{paddingLeft:"4px"}}>Sign Up</p></Link></p>
          </Form>



          </div>




</div>
    )
}export default Login