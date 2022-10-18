import React, { useEffect } from 'react'

//Hooks
import { useDispatch, useSelector } from 'react-redux'
import { useResetComponentMessage } from '../../hooks/useResetComponentMessage'
import { useQuery } from '../../hooks/useQuery'

//Components
import LikeContainer from '../../components/LikeContainer/LikeContainer'
import PhotoItem from '../../components/PhotoItem/PhotoItem'
import { Link } from 'react-router-dom'



// Redux
import { like, searchPhotos } from '../../slices/photoSlice'
import { Container } from './styles'

const Search = () => {
    const query = useQuery();
    const search = query.get("q");

    const dispatch = useDispatch()
    const resetMessage = useResetComponentMessage(dispatch);

    const { user } = useSelector((state) => state.auth);
    const { photos, loading } = useSelector((state) => state.photo);

    //Load photos
    useEffect(() => {
      dispatch(searchPhotos(search))
    }, [dispatch, search]);

    //Like a photo
    const handleLike = (photo) => {
        dispatch(like(photo._id));

        resetMessage();
    }

    if(loading) {
        return <p>Carregando...</p>
    }
    

  return (
    <Container>
        <h2>Voce esta buscando por: {search}</h2>
        {photos && photos.map((photo) => (
            <div key={photo._id}>
                <PhotoItem photo={photo} />
                <LikeContainer photo={photo} user={user} handleLike={handleLike} />
                <Link className='btn' to={`/photos/${photo._id}`}>Ver mais</Link>
            </div>
        ))}
        {photos && photos.length === 0 && (
            <h2 className="no-photos">Nao foram encontradas resultados para a sua busca...</h2>

        )}
    </Container>
  )
}

export default Search