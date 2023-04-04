import React from 'react';
import { Button, Form,Menu } from 'semantic-ui-react';
import { useState } from 'react';
import pic from './quest-low-resolution-logo-color-on-transparent-background (3).png';
import'./Register.css';
import axios from 'axios';
import { Link } from 'react-router-dom';

import { useNavigate } from 'react-router-dom';

function Register(){

  var [names,setName] = useState("");
  var [emails,setEmail] = useState("");
  var [passwords, setPassword] = useState('');
  var [passwordConfs, setPasswordConf] = useState('');
  var [errorMessage, setErrorMessage] = useState('');
  const history = useNavigate();


  function registerUser(){
    axios.post('https://forum.mashupstack.com/api/register',
    {
      name:names,
      email:emails,
      password:passwords,
      password_confirmation:passwordConfs
    },
    {headers: 
      {
      'Accept' : 'application/json',
      'Content-Type': 'application/x-www-form-urlencoded'
      }
    }).then(responce=>{
      setErrorMessage('');
      console.log(responce)
      history('/')
    }).catch(error=>{
      if(error.response.data.errors){
          setErrorMessage(Object.values(error.response.data.errors).join(' '));
          console.log(errorMessage);
      }else{
          setErrorMessage('Failed to connect to api');
          console.log(errorMessage);
      }
  })





  }






console.log(names)

















  

    return(

    <div>


          <Menu  secondary size="medium" >
                <Menu.Item  position="left" onClick={()=>history('/')}>
                          <img alt="logo" src={pic} style={{width:"100px" }}/>
                </Menu.Item>
                
                <Menu.Item name='Back to home' onClick={()=>history('/')}/>
                
                <Menu.Menu position='Left'>
                          <Menu.Item/>
                </Menu.Menu>
          </Menu>
  



      <div className='register'>
         <Form >
                     <h2 >Sign Up to Quest</h2>
                     {errorMessage?<div className="alert alert-danger">{errorMessage}</div>:''}
                    <Form.Group unstackable widths={1}>
                        <Form.Input label='Name' placeholder='Name'onInput={(e)=>setName(e.target.value)} value={names} />
                        <Form.Input type="email" label='Email' placeholder='Email' onInput={(e)=>setEmail(e.target.value)} value={emails}/>
                      </Form.Group>
                    <Form.Group widths={1}>
                        <Form.Input label='Password' placeholder='Password' type="password"  onInput={(e)=>setPassword(e.target.value)} value={passwords}/>
                        <Form.Input label='Re-Enter password' type="password" placeholder='Password' onInput={(e)=>setPasswordConf(e.target.value)} value={passwordConfs}  />
                    </Form.Group> 
                    <br></br>      
              <Button type='submit' size='small' circular color='pink' fluid onClick={registerUser}>Create account</Button>
              <p style={{display:"inline-flex",}}>Already have an account ?<Link to={'/login'}> <p style={{paddingLeft:"4px"}}>Log In</p></Link></p>
          </Form>
       
       </div>





  </div>
  
    )
    

}export default Register;