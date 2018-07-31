import React from 'react';
import styled from 'styled-components';
import Spinner from '../Spinner/Spinner.js';


const StyledDiv=styled.div`
  display: flex;
  flex-flow: column wrap;
  justify-content: center;
`;


const ScoreBoard=()=>{
  return(
    <StyledDiv>
      <h1>ULC LeaderBoard</h1>
      <span>Under construction :)</span>
    </StyledDiv>
  );

}

export default ScoreBoard;
