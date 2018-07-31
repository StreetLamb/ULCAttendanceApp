import React from 'react';
import styled from 'styled-components';

const StyledDiv=styled.div`
display:flex;
flex-flow: column nowrap;
justify-content: center;
align-items: center;
align-content: space-between;
width:8em;
height: 10em;
background: PaleTurquoise;
margin: 1em;
border-radius: 5px;
`;

const StyledImg=styled.img`
vertical-align: middle;
  width: 70px;
  height: 70px;

`;

const Button=styled.button`
  color: SkyBlue;
  background: white;
  font-size: 0.8em;
  margin: 0.5em;
  padding: 0.25em 1em;
  border: 2px solid SkyBlue;
  border-radius: 3px;
`;

const Span=styled.span`
  width: 100px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  padding: 0.25em;
  color: SlateGrey;
`;

const Member=(props)=>{

  return(
    <StyledDiv onClick={props.checkMember} style={props.color!=='white'?{backgroundColor:props.color}:{}}>
      <StyledImg src={`https://robohash.org/${props.name}.png?set=set4`} alt="UniqueCats" width='100em' height='100em'/>
      <Span>{props.name}</Span>
      {
        props.ondeletebutton?
        <Button onClick={props.deleteMember}>Delete</Button>
        :null
      }
    </StyledDiv>
  )
}

export default Member;
