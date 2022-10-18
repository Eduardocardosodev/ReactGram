import React from 'react'
import { Link } from 'react-router-dom'
import { uploads } from '../../utils/config'
import { Container } from './styles'



const PhotoItem = ({photo}) => {
  return (
    <Container>
        {photo.image && (
            <img src={`${uploads}/photos/${photo.image}`} alt={photo.title} />
        )}
        <h2>{photo.title}</h2>
        <p>Publicada por: <Link to={`/users/${photo.userId}`}> {photo.userName}</Link></p>
    </Container>
  )
}

export default PhotoItem