import React, { useEffect } from 'react'

import { Link } from 'react-router-dom'

//Components
import LikeContainer from '../../components/LikeContainer/LikeContainer'
import PhotoItem from '../../components/PhotoItem/PhotoItem'

//Hooks
import { useDispatch, useSelector } from 'react-redux'
import { useResetComponentMessage } from '../../hooks/useResetComponentMessage'


//Redux
import { getAllPhotos, like } from '../../slices/photoSlice'
import { Container } from './styles'


const Home = () => {

  const dispatch = useDispatch();

  const resetMessage = useResetComponentMessage(dispatch);

  const { user } = useSelector((state) => state.auth);
  const { photos, loading } = useSelector((state) => state.photo);

  //Load all photos
  useEffect(() => {
    dispatch(getAllPhotos())
  }, [dispatch]);

  //Like a photo
  const handleLike = (photo) => {

    dispatch(like(photo._id));

    resetMessage();
  }

  if(loading){
    return <p>Carregando...</p>
  }
  

  return (
    <Container>
      {photos && photos.map((photo) => (
        <div key={photo._id}>
          <PhotoItem photo={photo}/>
          <LikeContainer photo={photo} user={user} handleLike={handleLike} />
          <Link className='btn' to={`/photos/${photo._id}`}>Ver mais</Link>
        </div>
      ))}
      {photos && photos.length === 0 && (
        <h2 className="no-photos">
          Ainda nao ha fotos publicadas, <Link to={`/users/${user._id}`}>Clique Aqui</Link>
        </h2>

      )}
    </Container>
  )
}

export default Home