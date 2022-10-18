//Components
import { Link } from 'react-router-dom'
import Message from '../../components/Message/Message'

//Hooks
import { useEffect, useState } from 'react'
import { Container } from './styles'
import { useSelector, useDispatch} from 'react-redux'

// Redux
import { register, reset } from '../../slices/authSlice';


const Register = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const dispatch = useDispatch();

    const {loading, error} = useSelector((state) => state.auth);

    const handleSubmit = (e) => {
        e.preventDefault();

        const user = {
            name,
            email,
            password,
            confirmPassword
        }

        console.log(user);

        dispatch(register(user));
    }

    //Clean all auth states
    useEffect(() => {

        dispatch(reset())

    }, [dispatch])

  return (
    <Container>
        <h2>ReactGram</h2>
        <p className="subtitile">Cadastre-se para ver as fotos dos seus amigos.</p>
        <form onSubmit={handleSubmit}>
            <input type="text" placeholder='Nome' value={name} onChange={(e) => setName(e.target.value)} />
            <input type="email" placeholder='E-mail' value={email} onChange={(e) => setEmail(e.target.value)}/>
            <input type="password" placeholder='Senha' value={password} onChange={(e) => setPassword(e.target.value)}/>
            <input type="password" placeholder='Confirme a senha' value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)}/>
            {!loading && <button>Cadastrar</button>}
            {loading && <button disabled>Aguarde</button>}
            {error && <Message msg={error} type='error'/>}
        </form>
        <p>Ja tem conta? <Link to='/login'>Clique Aqui.</Link></p>
    </Container>
  )
}

export default Register