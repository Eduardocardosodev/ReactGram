import React, { useEffect, useState } from 'react'
import { uploads } from '../../utils/config'

// Hooks
import { useDispatch, useSelector } from 'react-redux'


// Redux
import { profile, resetMessage, updateProfile } from '../../slices/userSlice'

//Components
import Message from '../../components/Message/Message'
import { Container } from './styles'

const EditProfile = () => {

    const dispatch = useDispatch();

    const {user, message, error, loading} = useSelector((state) => state.user);

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [profileImage, setProfileImage] = useState('');
    const [bio, setBio] = useState('');
    const [previewImage, setPreviewImage] = useState('');

    //Load user data
    useEffect(() => {
        dispatch(profile())
    }, [dispatch]);

    // Fill form with user data
    useEffect(() => {

        if(user){
            setName(user.name);
            setEmail(user.email);
            setBio(user.bio);
        }

    }, [user])



    const handleSubmit = async (e) => {
        e.preventDefault();


        //Gather user data from states
        const userData = {
            name,
        }

        if(profileImage){
            userData.profileImage = profileImage;
        }

        if(bio){
            userData.bio = bio;
        }

        if(password){
            userData.password = password;
        }

        //Build form data
        const formData = new FormData();

        const userFormData = Object.keys(userData).forEach((key) => formData.append(key, userData[key]));

        formData.append("user", userFormData);

        await dispatch(updateProfile(formData));

        setTimeout(() => {
            dispatch(resetMessage());
        }, 2000);

        console.log(bio)
    }

    const handleFile = (e) => {
        //Image preview
        const image = e.target.files[0];

        setPreviewImage(image);

        //update image state
        setProfileImage(image);
    }

  return (
    <Container>
        <h2>Edite seus dados</h2>
        <p>Adicione uma imagem de perfil e conte mais sobre voce...</p>
        {(user.profileImage || previewImage) && (
            <img 
                className='profile-image'
                src={
                    previewImage ? URL.createObjectURL(previewImage) : `${uploads}/users/${user.profileImage}`
                }
                alt={user.name}/>
        )}
        <form onSubmit={handleSubmit}>
            <input type="text" placeholder='Nome' value={name || ''} onChange={(e) => setName(e.target.value)}/>
            <input type="email" placeholder='E-mail' value={email || ''} disabled/>
            <label>
                <span>Imagem do Perfil:</span>
                <input type="file" onChange={handleFile}/>
            </label>
            <label>
                <span>Bio:</span>
                <input type="text" placeholder='Descricao do perfil' value={bio} onChange={(e) => setBio(e.target.value)}/>
            </label>
            <label>
                <span>Quer alterar sua senha?</span>
                <input type="password" placeholder='Digite sua nova senha' value={password || ''} onChange={(e) => setPassword(e.target.value)} />
            </label>
            {!loading && <button>Atualizar</button>}
            {loading && <button disabled>Aguarde</button>}
            {error && <Message msg={error} type='error'/>}
            {message && <Message msg={message} type='success'/>}
        </form>
    </Container>
  )
}

export default EditProfile