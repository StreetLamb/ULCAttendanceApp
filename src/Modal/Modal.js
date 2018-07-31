import React from 'react';
import styled from 'styled-components';
import Calendar from 'react-calendar';

const StyledDate=styled.div`
  background: palevioletred;
`;

const StyledModalMain=styled.div`
  display:flex;
  justify-content:center;
  align-items:center;
  flex-flow: column nowrap;
  position:fixed;
  background: white;
  width: auto;
  height: auto;
  top:50%;
  left:50%;
  transform: translate(-50%,-50%);
`;

const StyledModal=styled.div`
  display:flex;
  color: black;
  position: fixed;
  top: 0;
  left: 0;
  width:100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.6);
`;

const Button=styled.button`
  display:flex;
  color: white;
  background: palevioletred;
  font-size: 1em;
  margin: 1em;
  padding: 0.25em 1em;
  border-radius: 3px;
`;



const Modal=(props)=>{

  const dateArr=props.attendanceList.map(i=>{
    return new Date(i).getTime();
  });


  return(
    <StyledModal>
      <StyledModalMain>
        <Calendar
          tileContent={({ date, view }) => {
                switch (view) {
                  case 'month':
                    return dateArr.includes(date.getTime())?<StyledDate>✓</StyledDate>:null;
                  default:

                }

              }
            }
        />
        <Button
          onClick={props.toggle}
        >Close</Button>
      </StyledModalMain>
    </StyledModal>
  );
}

export default Modal;
