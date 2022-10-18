import React, { useEffect, useState } from 'react'


import { uploads } from '../../utils/config'

// components
import { Link, useParams } from 'react-router-dom'
import Message from '../../components/Message/Message'
import PhotoItem from '../../components/PhotoItem/PhotoItem'

// Hooks
import { useDispatch, useSelector } from 'react-redux'
import { getPhoto, like, comment } from '../../slices/photoSlice'
import { CommentsStyled, Container,} from './styles'
import LikeContainer from '../../components/LikeContainer/LikeContainer'
import { useResetComponentMessage } from '../../hooks/useResetComponentMessage'


const Photo = () => {

  const{ id } = useParams();

  const dispatch = useDispatch();

  const resetMessage = useResetComponentMessage(dispatch);

  const { user } = useSelector((state) => state.auth);
  const {photo, loading, error, message} = useSelector((state) => state.photo);

  // Comments
  const [commentText, setCommentText] = useState("");

  //Load photo data
  useEffect(() => {
    dispatch(getPhoto(id))
  }, [dispatch, id])

  //Insert a like
  const handleLike = () => {
    dispatch(like(photo._id));

    resetMessage();
  }

  //Insert a comment
  const handleComment = (e) => {
    e.preventDefault();

    const commentData = {
      comment: commentText,
      id: photo._id
    }

    dispatch(comment(commentData));

    setCommentText("");

    resetMessage();
  }

  // like and Comments
  if(loading){
    return <p>Carregando...</p>
  }

  return (
    <Container>
      <PhotoItem photo={photo} />
      <LikeContainer photo={photo} user={user} handleLike={handleLike} />
      <div className='messageContainer'>
        {error && <Message msg={error} type="error"/>}
        {message && <Message msg={message} type="success"/>}
      </div>
      <CommentsStyled>
       {photo.comments && (
        <>
          <h3>Comentarios: ({photo.comments.length})</h3>
          <form onSubmit={handleComment}>
            <input 
              type="text" 
              placeholder='Insira o seu comentario...'
              value={commentText}
              onChange={(e) => setCommentText(e.target.value)} />
              <button>Enviar</button>
          </form>
              {photo.comments.length === 0 && <p>Nao ha comentarios</p>}
              {photo.comments.map((comment) => (
                <div className="comment" key={comment.comment}>
                  <div className="author">
                    {comment.userImage && (
                      <img src={`${uploads}/users/${comment.userImage}`} alt={comment.userName} />
                    )}
                    <Link to={`/users/${comment.userId}`}><p>{comment.userName}</p></Link>
                  </div>
                  <p>{comment.comment}</p>
                </div>
              ))}
        </>
       )}
      </CommentsStyled>
    </Container>
  )
}

export default Photo