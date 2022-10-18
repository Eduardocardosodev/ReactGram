import React from 'react'
import { Container } from './styles'

const Message = ({msg, type}) => {
  return (
    <Container>
        <div className={`${type}`}>
            <p>{msg}</p>
        </div>
    </Container>
  )
}

export default Message