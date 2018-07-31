import React from 'react';
import styled from 'styled-components';

const Button=styled.button`
  color: palevioletred;
  background: white;
  font-size: 1em;
  margin: 1em;
  padding: 0.25em 1em;
  border: 2px solid palevioletred;
  border-radius: 3px;
`;

const SaveButton=Button.extend`
  color: white;
  background: LimeGreen;
  border: 2px solid LightGreen;
`;

const StyledDiv=styled.div`
  display:flex;
  justify-content: center;
`;

const Choices=(props)=>{
  let savebutton=null;
  if(props.showSaveButton){
    savebutton=(
      <SaveButton
        onClick={props.onSave}
      >Save</SaveButton>
    );
  }
  return (
    <StyledDiv>
      <Button
        style={props.addstyle}
        onClick={props.onaddclick}
      >Add Member</Button>

      <Button
        style={props.deletestyle}
        onClick={props.ondeleteclick}
      >Delete Member</Button>

      <Button
        style={props.checkstyle}
        onClick={props.oncheckclick}
      >Check Member</Button>

      {savebutton}

    </StyledDiv>
  );
};

export default Choices;
