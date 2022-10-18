import React, { useState } from 'react'
import { NavLink, Link, useNavigate } from 'react-router-dom'
import { BsSearch, BsHouseDoorFill, BsFillPersonFill, BsFillCameraFill} from 'react-icons/bs'
import { Container, NavLinks, Search } from './styles'

//Redux
import { logout, reset } from '../../slices/authSlice';

//Hooks
import { useAuth } from '../../hooks/useAuth'
import { useDispatch, useSelector } from 'react-redux'


const Navbar = () => {

  const { auth } = useAuth();
  const { user } = useSelector((state) => state.auth);

  const [query, setQuery] = useState("");

  const navigate = useNavigate();

  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logout());
    dispatch(reset());

    navigate("/login");
  }

  const handleSearch = (e) => {
    e.preventDefault();

    if(query){
      return navigate(`/search?q=${query}`);
    }
  }

  return (
    <Container>
        <Link to='/'>ReactGram</Link>
        <Search onSubmit={handleSearch}>
            <BsSearch />
            <input 
              type="text" 
              placeholder='Pesquisar' 
              value={query} 
              onChange={(e) => setQuery(e.target.value)}/>
        </Search>
        <NavLinks>
            {auth ? (
              <>
                <li><NavLink to='/'><BsHouseDoorFill /></NavLink></li>
                {user && (
                  <li>
                    <NavLink to={`/users/${user._id}`}>
                      <BsFillCameraFill />
                    </NavLink>
                  </li>
                )}
                <li>
                  <NavLink to='/profile'>
                    <BsFillPersonFill />
                  </NavLink>
                </li>
                <li>
                  <span onClick={handleLogout}>Sair</span>
                </li>
              </>
            ) : (
              <>
                <li><NavLink to='/login'>Entrar</NavLink></li>
                <li><NavLink to='/register'>Registrar</NavLink></li>
              </>
            )}

        </NavLinks>
    </Container>
  )
}

export default Navbar