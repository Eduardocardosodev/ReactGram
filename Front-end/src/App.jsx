import {BrowserRouter as Router, Routes, Route, Navigate} from 'react-router-dom'

//Styles
import { Container } from './app.styles';
import { GlobalStyle } from './globalStyles';

//Hooks
import { useAuth } from './hooks/useAuth';

//Components
import Footer from './components/Footer/Footer';
import Navbar from './components/Navbar/Navbar';

//Pages
import Login from './pages/Auth/Login';
import Register from './pages/Auth/Register';
import Home from './pages/Home/Home';
import EditProfile from './pages/EditProfile/EditProfile';
import Profile from './pages/Profile/Profile';
import Photo from './pages/Photo/Photo'
import Search from './pages/Search/Search';


function App() {

  const {auth, loading} = useAuth();

  if(loading){
    return <p>Carregando...</p>
  }

  return (
    <div className="App">
      <Router>
        <GlobalStyle />
        <Navbar />
        <Container>
          <Routes>
            <Route path='/' element={auth ? <Home /> : <Navigate to='/login'/>}/>
            <Route path='/profile' element={auth ? <EditProfile /> : <Navigate to='/login'/>}/>
            <Route path='/users/:id' element={auth ? <Profile /> : <Navigate to='/login'/>}/>
            <Route path='/login' element={!auth ? <Login /> : <Navigate to='/'/>}/>
            <Route path='/register' element={!auth ? <Register /> : <Navigate to='/'/>}/>
            <Route path='/search' element={auth ? <Search /> : <Navigate to='/login'/>}/>
            <Route path='/photos/:id' element={auth ? <Photo /> : <Navigate to='/login'/>}/>
          </Routes>
        </Container>
        <Footer />
      </Router>
    </div>
  );
}

export default App;