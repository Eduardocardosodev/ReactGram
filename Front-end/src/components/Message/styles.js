import styled from 'styled-components';

export const Container = styled.div`
  border-radius: 5px;
  padding: 5px 10px;
  position: relative;
  margin: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  .error{
    border-radius: 5px;
    color: #721C24;
    background-color: #F8D7DA;
    border-color: #f5c6cb;
    padding: 5px 10px;
  }
  .success{
    border-radius: 5px;
    color: #155724;
    background-color: #D4EDDA;
    border-color: #C3E6CB;
    padding: 5px 10px;
  }
`;