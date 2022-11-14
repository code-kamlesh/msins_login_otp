import React,{useState,useEffect} from "react"; 
import { useNavigate } from 'react-router-dom'
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import '../assets/css/status.css'
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { Button } from "@mui/material";
import {fetchAllStudentDataByEngagementId} from './../utility/Api'
import {changeStudentStatus,fetchActiveCycle,captureStudentEngagementDetails} from "./../utility/Api";

export default function Status() {
  const history = useNavigate();
  const [disabledButton, setDisabledButton] = useState(false)
  const[ studentData, setStudentData] = useState([])
  const [open, setOpen] = useState(false);
  const [msinsCycle,setMsinsCycle] = useState();
  useEffect(() => {
       if (window.jwtTokenResult == "") {
      history('/', { replace: true })
    }
    else{
      checkForAvailabityOfCycle();
      ApplicationStatus();
    }
  },[]);

    // Checking for Active cycle 
    const checkForAvailabityOfCycle = () =>{
     
    }

  // Checking the status of application
  const ApplicationStatus = ()=>{
    try{
      fetchAllStudentDataByEngagementId(window.engagementId,window.refreshJwtToken).then((jsondata)=>{
        if(jsondata.data!==null){
          let res  = JSON.parse(jsondata.data)
          var msins_cycle_name = res[0].msinsCycle
          setStudentData(res[0])
          try{
            fetchActiveCycle("Y",window.refreshJwtToken).then((jsondata)=>{
              let res =(jsondata)
              setMsinsCycle(res.data?.remarks) // settimg msins cycle name
              if(res?.data !== null &&  res?.eligible === false ){
                setDisabledButton(true)
                alert("Applications is Under Process!")
                // history('/',{ replace: true });
              }
              else if(res?.data === null){
                setDisabledButton(true)
                alert("Window is Closed! Please try in Next Window.")
                // history('/',{ replace: true });
              }
              // Checking weither student belong to previous cycle or not
              else {
                if(msins_cycle_name !==res.data?.remarks){
                  setDisabledButton(true)
                  setOpen(true)
                }
              }
            })
          }
          catch(err){
            alert(err.message)
          }
        }
      })
    }
    catch(err){
      alert(err.message)
    }
  }

  const submitData = (event)=>{
    if(studentData.status === "Draft"){
    let statusChangeData = '"engagementId":' + window.engagementId + ',"status":"Mobilised", "updatedBy":' + window.userid + '';
    changeStudentStatus(statusChangeData,window.jwtTokenResult).then((jsondata) => {
      let resultStatus = jsondata.status
      if (resultStatus === "success") {
        alert("Successfully Mobilized")
        history('/' ,{replace:true})
      }
      })
    }
    else{
      history('/' ,{replace:true})
    }
  }
  const editForm = (event)=>{
    event.preventDefault();
    history('/basicdetails', { replace: true })
  }
  const logout = ()=>{
    history('/', { replace: true })
  }
  // closing dailog box
  const handleClose = () => {
    setOpen(false);
  };
  // generating new engagment id
  const genrateNewEngagmentId =()=>{
    setOpen(false);
    // capturing engagement details
    captureStudentEngagementDetails(studentData?.dbUserId, 0, window.userid, window.studentType,msinsCycle, window.refreshJwtToken).then(async(jsondata) => {
      let json = JSON.parse(jsondata.data);
      window.engagementId = json[0].engagementId //setting engagementid 
      alert("Successfully Applied")
      setDisabledButton(false)
    })  
  }
  return (
    <>
          <Grid container  style={{justifyContent: "end", mr:"20px", mt:"20px"}}>
          <Button  variant='contained' onClick={ ()=>logout()}>Exit</Button>
          </Grid>
      <h2 style={{ textAlign: 'center', marginTop: '50px', color: '#8665f7' }}>
        Status of your Application
      </h2>
      <Box className='table-box' style={{ marginTop: '100px'}}>
        <Box className='table-row table-head'>
          <Box className='table-cell first-cell'>
            <p>Name</p>
          </Box>
          <Box className='table-cell'>
            <p>Engagement ID</p>
          </Box>
          <Box className='table-cell'>
            <p>Idea Type</p>
          </Box>
          <Box className='table-cell last-cell'>
            <p>Status</p>
          </Box>
          <Box className='table-cell last-cell'>
            <p>Action</p>
          </Box>
        </Box>

        <Box className='table-row'>
          <Box className='table-cell first-cell'>
            <p>{studentData.firstName}  {studentData.lastName}</p>
          </Box>
          <Box className='table-cell'>
            <p>{studentData.engagementId}</p>
          </Box>
          <Box className='table-cell'>
            <p>{window.studentType}</p>
          </Box>
          <Box className='table-cell'>
            <p>{studentData.status}</p>
          </Box>
          <Box className='table-cell last-cell'>
           <Button  class='btn info' 
           disabled={studentData.status !== "Draft" || disabledButton === true }
           onClick={(e)=>editForm(e)}>Edit</Button>
          </Box>
        </Box>
      </Box>
      <Grid item xs={12} style={{marginLeft:"65px"}} >
       <Button type="submit" disabled={studentData.status !== "Draft" || disabledButton === true} variant="contained"  onClick={submitData} autoFocus>Submit</Button>
      </Grid>
      
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Alert!"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description" style={{fontWeight:"bold"}}>
          Unfortunately You are not Selected in Previous Funding Round. 
          So You want to apply for Funding in this Round?  
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={genrateNewEngagmentId} autoFocus>Submit</Button>
        </DialogActions>
      </Dialog>
    </>
  )
}
