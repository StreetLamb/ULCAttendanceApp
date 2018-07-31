import React from 'react';
import styled from 'styled-components';
import {NavLink} from 'react-router-dom';

const StyledUl=styled.ul`
  display: flex;
  flex-flow: row nowrap;
  justify-content: flex-start;
  align-items: center;
  background:palevioletred;
  margin: 0;
  padding: 0;
  height:50px;

`;

const StyledLi=styled.li`
  margin: 1em;
  list-style-type: none;
`;

const StyledNavLink=styled(NavLink)`
  display: block;
  color: white;
  text-decoration: none;
`;

const P=styled.p`
  color:black;
`;



const NavBar=(props)=>{

  return(
    <div>
      <header>
        <nav>
          <StyledUl>
            <StyledLi><StyledNavLink to='/'>Home</StyledNavLink></StyledLi>
            <StyledLi><StyledNavLink to='/leaderboard'>LeaderBoard</StyledNavLink></StyledLi>
          </StyledUl>

        </nav>
      </header>
    </div>
  )
}

export default NavBar;
