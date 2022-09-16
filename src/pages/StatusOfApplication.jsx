import React,{useState,useEffect} from "react"; 
import { useNavigate } from 'react-router-dom'
import Box from '@mui/material/Box'
import '../assets/css/status.css'
import { Button } from "@mui/material";
import {fetchAllStudentDataByEngagementId} from './../utility/Api'
export default function Status() {
  const history = useNavigate();
  const[ studentData, setStudentData] = useState([])
  useEffect(() => {
       if (window.jwtTokenResult == "") {
      history('/', { replace: true })
    }
    else{
      ApplicationStatus();
    }
  },[]);

  const ApplicationStatus = ()=>{
    fetchAllStudentDataByEngagementId(window.engagementId,window.refreshJwtToken).then((jsondata)=>{
      if(jsondata.data!==null){
        let res  = JSON.parse(jsondata.data)
        setStudentData(res[0])
      }
    })
  }

  const editForm = (event)=>{
    event.preventDefault();
    history('/basicdetails', { replace: true })
  }
  return (
    <>
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
           <Button class='btn info' onClick={(e)=>editForm(e)}>Edit</Button>
          </Box>
        </Box>
      </Box>
    </>
  )
}

// <span class="btn success">Success</span>
// <span class="btn info">Info</span>
// <span class="btn warning">Warning</span>
// <span class="btn danger">Danger</span>
// <span class="btn default">Default</span>
