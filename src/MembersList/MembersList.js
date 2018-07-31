import React, { PureComponent } from 'react';
import UserInput from '../UserInput/UserInput.js';
import Member from '../Members/Member/Member.js';
import Choices from '../Choices/Choices.js';
import styled from 'styled-components';
import axios from '../axios-savedata.js';
import {NotificationContainer, NotificationManager} from 'react-notifications';
import 'react-notifications/lib/notifications.css';
import SearchBar from '../SearchBar/SearchBar.js';
import Modal from '../Modal/Modal.js';
import Spinner from '../Spinner/Spinner.js';

const StyledDiv=styled.div`
  display: flex;
  flex-flow: column wrap;
  justify-content: center;
`;

const StyledMembersDiv=styled.div`
  display:flex;
  flex-flow: row wrap;
  justify-content: center;
`;

class MembersList extends PureComponent {
  state={
    userinput:'',
    members:[
    ],
    toAdd:false,
    toDelete:false,
    toCheck:false,
    date: 'Mon Jul 23 2018 00:00:00 GMT+0800 (+08)',
    onSaveButton: false,
    search:'',
    openModal:false,
    ModalAttendanceList:null,
    showSpinner:false,
  };

  nameChangeHandler=(event)=>{
    this.setState({
      userinput:event.target.value,
    })
  }

  searchChangeHandler=(event)=>{
    this.setState({
      search: event.target.value,
    });
  }

  addMemberHandler=()=>{
    const {members,userinput}=this.state;

    let memberexist=false;

    memberexist= members?members.some(i=>{
        return i.name.toLowerCase()===userinput.toLowerCase();
      }):memberexist=false;

    if(memberexist===false && userinput.trim()!==''){
      const newMembers=[
        ...members,
        {
          name: userinput,
          attendance:['0 0 0'],
          color: 'white',
        }
      ];
      this.setState({
        members: newMembers,
      },()=>this.saveHandler());

      NotificationManager.success('', 'Member Added!');

    }else{
      NotificationManager.warning('Cant input existing members or blank','Error!');
    }
  }

  deleteMemberHandler=(name)=>{
    const {members}=this.state;
    const newMembers=members.filter(i=>i.name!==name);
    this.setState({
      members: newMembers,
    },()=>this.saveHandler());
  }

  chooseChoices=(choice)=>{
    if(choice==='add'){
      if(this.state.toAdd){
        this.setState({
          toAdd:false,
          toDelete:false,
          toCheck: false,
        });
      }else{
        this.setState({
          toAdd:true,
          toDelete:false,
          toCheck: false,
        });
      }
    }else if (choice==='delete') {
      if(this.state.toDelete){
        this.setState({
          toAdd:false,
          toDelete:false,
          toCheck: false,

        });
      }else{
        this.setState({
          toAdd: false,
          toDelete:true,
          toCheck:false,
        });
      }
    }else if (choice==='check') {
      if(this.state.toCheck){
        this.setState({
          toAdd:false,
          toDelete:false,
          toCheck: false,
        });
      }else{
        this.setState({
          toAdd:false,
          toDelete: false,
          toCheck:true,
        });
      }
    }
  }

  openModalHandler=(name)=>{
    this.setState(prevState=>{
      const AttendanceList= prevState.members.filter(member=>member.name===name)[0];
      return {
        openModal: !prevState.openModal,
        ModalAttendanceList: AttendanceList,
      }
    });
  }

  closeModalHandler=()=>{
    this.setState(prevState=>{
      return {
        openModal: !prevState.openModal,
        ModalAttendanceList: null,
      }
    });
  }

  checkMemberHandler=(name)=>{
    const {members}=this.state;

    let newMembers=[...members];

    newMembers.forEach(i=>{
      if (i.name===name){
        let fullDate= new Date();
        const shortDate= new Date(fullDate.getFullYear(),fullDate.getMonth(),fullDate.getDate()).toString();
        if(i.attendance.includes(shortDate)){
          const newattendance=i.attendance.filter(date=> date!==shortDate );
          i.attendance=[...newattendance];
          i.color='white';
        }else{
          i.attendance.push(shortDate);
          i.color='PaleGreen';
        }
      }
    });

    this.setState({
      members:newMembers,
    },()=>this.saveHandler());

  }

  saveHandler=()=>{
    const post = {
      members:this.state.members,
      date: this.state.date,
    };
    console.log(this.state.date);
    axios.put('/members.json', post);
  }

  componentDidMount=()=>{
    this.setState({showSpinner:true});
    axios.get('/members.json')
      .then(res=>{
        const date=new Date();
        if(res.data.date!== new Date(date.getFullYear(),date.getMonth(),date.getDate()).toString()){

          let updateMembers=res.data.members?[...res.data.members]:[];

          if(updateMembers){
            updateMembers.forEach(i=>{
              i.color='white';
            });
          }

          this.setState({
            members:updateMembers,
            date: new Date(date.getFullYear(),date.getMonth(),date.getDate()).toString(),
            showSpinner:false,
          },()=>this.saveHandler());
        }else{
          this.setState({
            members: res.data.members,
            date: new Date(date.getFullYear(),date.getMonth(),date.getDate()).toString(),
            showSpinner:false,
          },()=>this.saveHandler());
        }
      });
    }

  render() {

    let addMemberInput=null;
    let checkstyles={};
    let deletestyles={};
    let addstyles={};
    if(this.state.toAdd){
      addstyles={
        backgroundColor: 'palevioletred',
        color: 'white',
      }
      addMemberInput=(
        <UserInput
          onChangeName={this.nameChangeHandler}
          value={this.state.userinput}
          onclick={this.addMemberHandler}
        />
      );
    }else if (this.state.toCheck) {
      checkstyles={
        backgroundColor: 'palevioletred',
        color: 'white',
      }
    }else if (this.state.toDelete) {
      deletestyles={
        backgroundColor: 'palevioletred',
        color: 'white',
      }
    }
    let memberslist=(
      <StyledMembersDiv>
        {
          this.state.members?
            this.state.members.filter(i=>i.name.toLowerCase().includes(this.state.search.toLowerCase())).map(member=>{
              return(
                <Member
                  name={member.name}
                  deleteMember={()=>this.deleteMemberHandler(member.name)}
                  ondeletebutton={this.state.toDelete}
                  oncheckbutton={this.state.toCheck}
                  checkMember={()=>this.state.toCheck&&!this.state.toDelete&&!this.state.toAdd
                      ?this.checkMemberHandler(member.name)
                      :!this.state.toDelete&&!this.state.toAdd
                        ?this.openModalHandler(member.name)
                        :null}
                  color={member.color}
                  key={member.name}
                />
              )
            }):<p>Either ULC is dead or no one bothered adding their names...</p>
        }
      </StyledMembersDiv>
    );

    if(this.state.showSpinner){
       memberslist=<Spinner/>
    }

    const ModalPage=(
      <div>
        {this.state.openModal?
          <Modal
            attendanceList={this.state.ModalAttendanceList.attendance}
            name={this.state.ModalAttendanceList.name}
            toggle={this.closeModalHandler}
          />:null}
      </div>
    );



    return (
      <StyledDiv className="App">
        <h1>ULC Attendance Sheet + Cats</h1>
        <Choices
          checkstyle={checkstyles}
          deletestyle={deletestyles}
          addstyle={addstyles}
          showSaveButton={this.state.onSaveButton}
          onaddclick={()=>this.chooseChoices('add')}
          ondeleteclick={()=>this.chooseChoices('delete')}
          oncheckclick={()=>this.chooseChoices('check')}
          onSave={()=>this.saveHandler()}
        />
        {addMemberInput}
        <SearchBar
          onChangeSearch={this.searchChangeHandler}
          search={this.state.search}/>
        {memberslist}
        {ModalPage}
        <NotificationContainer/>
      </StyledDiv>
    );
  }
}

export default MembersList;
