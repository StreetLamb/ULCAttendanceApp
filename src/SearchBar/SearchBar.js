import React from 'react';
import styled from 'styled-components';

const StyledInput=styled.input`
  margin: 0.5em;
  font-size: 1em;
  color: white;
  background: Plum;
  border: none;
  border-radius: 3px;
  padding: 0.2em;
  ::placeholder{
    color:white
  }
`;

const SearchBar=(props)=>{
  return(
    <div>
      <StyledInput required placeholder="Search member..." type='text' onChange={props.onChangeSearch} value={props.search}/>
    </div>
  );
}

export default SearchBar;
