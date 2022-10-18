import React from 'react'
import { BsHeart, BsHeartFill } from 'react-icons/bs'
import { Container } from './styles'



const LikeContainer = ({ photo, user, handleLike }) => {
  return (
    <Container>
        {photo.likes && user && (
            <>
                {photo.likes.includes(user._id) ? (
                    <BsHeartFill />
                ) : (
                    <BsHeart onClick={() => handleLike(photo)}/>
                )}
                <p>{photo.likes.length} like(s)</p>
            </>
        )}
    </Container>
  )
}

export default LikeContainer