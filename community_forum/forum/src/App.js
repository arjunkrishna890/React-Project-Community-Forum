
import './App.css';
import Home from './Components/Home';
import Register from './Components/Register';
import Login from './Components/Login';
import Read from './Crud/Question/Read';
import CreateQuestion from './Crud/Question/CreateQuestion';
import MyQuestion from './Crud/Question/MyQuestion';
import EditQuestion from './Crud/Question/EditQuestion';
import Readanswer from './Crud/Answers/Readanswer';
import MyAnswer from './Crud/Answers/MyAnswer';
import EditAnswer from './Crud/Answers/EditAnswer';
import Search from './Crud/Question/Search';
import { BrowserRouter as Router,Route,Routes } from 'react-router-dom';

function App() {
  return (
    <div className='mained'>
    <div className='main'>
      <Router>
        <Routes>
        <Route exact path='/' element={<Home/>}/>
        <Route exact path='/register' element={<Register/>}/>
        <Route exact path='/login' element={<Login/>}/>
        <Route exact path='/read' element={<Read/>}/>
        <Route exact path='/createq' element={<CreateQuestion/>}/>
        <Route exact path='/myquest' element={<MyQuestion/>}/>
        <Route exact path='/editques/:postId' element={<EditQuestion/>}/>
        <Route exact path='/answerquestion/:postId' element={<Readanswer/>}/>
        <Route exact path='/myans' element={<MyAnswer/>}/>
        <Route exact path='/editans/:postId' element={<EditAnswer/>}/>
        <Route exact path='/search' element={<Search/>}/>
       
        </Routes>
      </Router>

      </div>
    </div>
  );
}

export default App;
