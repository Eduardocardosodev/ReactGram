import styled from 'styled-components';

export const Container = styled.nav`
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #000;
  border-bottom: 1px solid #363636;
  padding: 0.1em 1em;
`;

export const Search = styled.form`
    position: relative;
    width: 20%;
    svg {
        position: absolute;
        top: 10px;
        left: 9px;
    }
    input {
        padding-left: 2.5em;
        border: none;
        border-radius: 5px;
        width: 100%;
        margin: 0;
    }
`

export const NavLinks = styled.ul`
    display: flex;
    align-items: center;
  
  li{
    margin-right: 1em;
  }
  span{
    cursor: pointer;
  }
  svg{
    font-size: 1.5em;
  }
`