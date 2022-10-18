import styled from 'styled-components';

export const Container = styled.div`
  width: 50%;
  margin: 0 auto;
`;

export const ProfileHeader = styled.div`
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    padding: 1em;
    border-bottom: 1px solid #363636;
    img{
        width: 100px;
        height: 100px;
        border-radius: 50%;
        margin-right: 2em;
    }
`

export const NewPhoto = styled.div`
    padding: 1em;
    border-bottom: 1px solid #363636;
`

export const PhotoContainer = styled.div`
    display: flex;
    flex-wrap: wrap;
    .photo{
        width: 32%;
        margin: 0.3%;
        img{
            width: 100%;
        }
    }
`

export const Actions = styled.div`
    display: flex;
    justify-content: space-around;
    padding: 10px;
    svg{
        cursor: pointer;
    }
`

export const EditPhoto = styled.div`
    margin-bottom: 1em;
    img{
        width: 100%;
        margin-bottom: 1em;
    }
`