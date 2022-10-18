import { Container } from './styles'

//Components
import { Link } from 'react-router-dom'
import Message from '../../components/Message/Message'

//Hooks
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'


// Redux
import { login, reset } from '../../slices/authSlice'

const Login = () => {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const dispatch = useDispatch()
  const { loading, error} = useSelector((state) => state.auth);

  const handleSubmit = (e) => {
    e.preventDefault();

    const user = {
      email,
      password
    }

    dispatch(login(user));
  }

  // Clean all auth states
  useEffect(() => {
    dispatch(reset())
  }, [dispatch])

  return (
    <Container>
      <h2>ReactGram</h2>
      <p className="subtitle">Faca o login para ver o que ha de novo.</p>
      <form onSubmit={handleSubmit}>
        <input 
          type="text" 
          placeholder='E-mail' 
          value={email} 
          onChange={(e) => setEmail(e.target.value)} />
        <input 
          type="password" 
          placeholder='Senha' 
          value={password} 
          onChange={(e) => setPassword(e.target.value)}/>
        {!loading && <button>Entrar</button>}
        {loading && <button disabled>Aguarde</button>}
        {error && <Message msg={error} type='error'/>}
      </form>
      <p>Nao tem uma conta? <Link to='/register'>Clique Aqui</Link></p>
    </Container>
  )
}

export default Login