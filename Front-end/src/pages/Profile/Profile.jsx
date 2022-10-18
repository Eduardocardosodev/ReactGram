import React, { useEffect, useRef, useState } from 'react'
import { Container, NewPhoto, ProfileHeader, PhotoContainer, Actions, EditPhoto } from './styles'
import { uploads } from '../../utils/config'

//components 
import Message from '../../components/Message/Message'
import { Link, useParams } from 'react-router-dom'
import { BsFillEyeFill, BsPencilFill, BsXLg } from 'react-icons/bs'


//Hooks
import { useDispatch, useSelector } from 'react-redux'


// redux
import { getUserDetails } from '../../slices/userSlice'
import { publishPhoto, resetMessage, getUserPhotos, deletePhoto, updatePhoto } from '../../slices/photoSlice'


const Profile = () => {

  const {id} = useParams();

  const dispatch = useDispatch();

  const {user, loading} = useSelector((state) => state.user);
  const {user: userAuth} = useSelector((state) => state.auth);
  const {photos, loading: loadingPhoto, message: messagePhoto, error: errorPhoto} = useSelector((state) => state.photo);

  const [title, setTitle] = useState("");
  const [image, setImage] = useState("");

  const [editId, setEditId] = useState("");
  const [editImage, setEditImage] = useState("");
  const [editTitle, setEditTitle] = useState("");

  // New form and edit form refs
  const newPhotoForm = useRef();
  const editPhotoForm = useRef();

  // Load user data
  useEffect(() => {
    dispatch(getUserDetails(id));
    dispatch(getUserPhotos(id))
  }, [dispatch, id]);

  if(loading){
    return <p>Carregando...</p>
  }

  const handleFile = (e) => {
    const image = e.target.files[0];

    setImage(image);
}

  const resetComponentMessage = () => {
    setTimeout(() => {
      dispatch(resetMessage());
    }, 2000);
  }

  const handleSubmit = (e) => {
    e.preventDefault();

    const photoData = {
      title,
      image
    }

    //build form data
    const formData = new FormData()

    const photoFormData = Object.keys(photoData).forEach((key) => formData.append(key, photoData[key]))

    formData.append("photo", photoFormData);

    dispatch(publishPhoto(formData));

    setTitle('');

    resetComponentMessage();
  }

  //Delete a photo
  const handleDelete = (id) => {

    dispatch(deletePhoto(id));
    
    resetComponentMessage();
  };

  // Show or hide forms
  const hideOrShowForm = () => {
    newPhotoForm.current.classList.toggle("hide");
    editPhotoForm.current.classList.toggle("hide");
  }

  // Update a photo
  const handleUpdate = (e) => {
    e.preventDefault();

    const photoData = {
      title: editTitle,
      id: editId
    }

    dispatch(updatePhoto(photoData));

    resetComponentMessage();
  }

  //Open edit form

  const handleEdit = (photo) => {
    if(editPhotoForm.current.classList.contains("hide")){
      hideOrShowForm();
    }

    setEditId(photo._id);
    setEditTitle(photo.title);
    setEditImage(photo.image);
  }

  const handleCancelEdit = (e) => {
    hideOrShowForm();
  }
  

  return (
    <Container>
      <ProfileHeader>
        {user.profileImage && (
          <img src={`${uploads}/users/${user.profileImage}`} alt={user.name} />
        )}
        <div className="prfiledexcript">
          <h2>{user.name}</h2>
          <p>{user.bio}</p>
        </div>
      </ProfileHeader>
      {id === userAuth._id && (
        <>
          <NewPhoto ref={newPhotoForm}>
              <h3>Compartilhe algum momento seu:</h3>
              <form onSubmit={handleSubmit}>
                <label>
                  <span>Titulo para a foto:</span>
                  <input type="text" placeholder='Insira um titulo' value={title} onChange={(e) => setTitle(e.target.value)} />
                </label>
                <label>
                  <span>Imagem:</span>
                  <input type="file" onChange={handleFile}/>
                </label>
                {!loadingPhoto && <button>Postar</button>}
                {loadingPhoto && <button disabled>Aguarde</button>}
              </form>
          </NewPhoto>
          <EditPhoto className='hide' ref={editPhotoForm}>
            <p>Editando:</p>
            {editImage && (
              <img src={`${uploads}/photos/${editImage}`} alt={editTitle} />
            )}
              <form onSubmit={handleUpdate}>
                  <input type="text" placeholder='Insira o novo titulo' value={editTitle} onChange={(e) => setEditTitle(e.target.value)} />

                  <input type="submit" value="Atualizar" />
                  <button className='cancel-btn' onClick={handleCancelEdit}>Cancelar edicao</button>
              </form>
          </EditPhoto>
          {errorPhoto && <Message msg={errorPhoto} type="error"/>}
          {messagePhoto && <Message msg={messagePhoto} type="success"/>}
        </>
      )}
      <div className="userphots">
        <h2>Fotos publicadas:</h2>
        <PhotoContainer>
          {photos && photos.map((photo) => (
            <div className="photo" key={photo._id}>
              {photo.image && (<img src={`${uploads}/photos/${photo.image}`} alt={photo.title}/>)}
              {id === userAuth._id ? (
                <Actions>
                  <Link to={`/photos/${photo._id}`}><BsFillEyeFill /></Link>
                  <BsPencilFill onClick={() => handleEdit(photo)}/>
                  <BsXLg onClick={() => handleDelete(photo._id)}/>
                </Actions>
              ) : (
                <Link className="btn" to={`/photos/${photo._id}`}>Ver</Link>
              )}
            </div>
          ))}
          {photos.length === 0 && <p>Ainda nao ha fotos publicadas</p>}
        </PhotoContainer>
      </div>
    </Container>
  )
}

export default Profile