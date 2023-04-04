import axios from "axios";
import { useState } from "react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Menu,Button,Comment,Header,Icon,List,Label,Form} from "semantic-ui-react";
import pic from './quest-low-resolution-logo-color-on-transparent-background (3).png';
import './Read.css';


function Search(){

    const [search,setSearch] = useState('');
    const [result,setResult] = useState([]);
    const history = useNavigate();
    function searchkey(keyword){
        axios.get(`https://forum.mashupstack.com/api/question/search?keyword=`+keyword).
        then(responce=>{
            setResult(responce.data)
            console.log(result)
            console.log(keyword)
            
        })
    }


    return(
        <div >
            <Menu  secondary size="medium" >
                            <Menu.Item  position="left"  onClick={()=>history('/')}>
                                <img alt="logo" src={pic} style={{width:"100px" }} />
                            </Menu.Item>

                            <Menu.Menu position='Left'>
                            
                            <Menu.Item  name="Back" onClick={()=>history('/')}/>    
                            <Menu.Item>
                            </Menu.Item>
                            </Menu.Menu>
                            </Menu>
                            <div className="read">
                        <Form >
                                <Header as='h3' dividing>Search Keyword</Header>
                                            <Form.Field widths={3} className="item">
                                                <Form.Input  placeholder='Keyword' onChange={(e)=>setSearch(e.target.value)} value={search} type="text" />
                                         </Form.Field>
                                            <br></br>
                                               
                                <Button type='submit' size='small' circular color='pink' onClick={()=>searchkey(search)} >Search</Button>
                         
                        </Form>
                        {
                            result.data && result.data.length > 0
                            ?
                            result.data.map(data=>{
                                return(
                                    <h4>{data.question}</h4>
    
                                )

                            })
                            
                            :"No data"
                        }
            </div> 
             </div>
     
    )
}export default Search;