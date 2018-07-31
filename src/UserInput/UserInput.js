import React from 'react';
import styled from 'styled-components';

const StyledInput=styled.input`
  margin: 0.5em;
  font-size: 1em;
  color: palevioletred;
  background: papayawhip;
  border: none;
  border-radius: 3px;
  padding: 0.2em;
`;

const StyledDiv=styled.div`
  display: flex;
  flex-flow: row wrap;
  justify-content: center;
`;

const Button=styled.button`
  color: palevioletred;
  font-size: 0.8em;
  margin: 0.5em;
  padding: 0.25em 1em;
  background:white;
  border: 2px solid palevioletred;
  border-radius: 3px;
`;

const UserInput=(props)=>{
  return(
    <StyledDiv>
      <StyledInput required placeholder="new member name..." type='text' onChange={props.onChangeName} value={props.name}/>
      <Button
        onClick={props.onclick}
      >Add</Button>
    </StyledDiv>
  )
}

export default UserInput;
