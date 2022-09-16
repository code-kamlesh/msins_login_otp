import Grid from '@mui/material/Grid'
import React,{useState,useEffect} from "react"; 
import Radio from '@mui/material/Radio'
import RadioGroup from '@mui/material/RadioGroup'
import FormControlLabel from '@mui/material/FormControlLabel'
import FormControl from '@mui/material/FormControl'
import FormLabel from '@mui/material/FormLabel'
import Container from '@mui/material/Container'
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Box from '@mui/material/Box'
import { useNavigate } from 'react-router-dom'
import { DropzoneArea } from 'material-ui-dropzone';
import { Button } from "@mui/material";
import Stack from '@mui/material/Stack';
import useStyles from '../../components/layout'
import {uploadDocument,fetchUserDocumentsByEngagementId,deleteDocumentById} from "./../../utility/Api";
import { serviceEndPoint } from './../../utility/ServiceEndPoint';


const token = "eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJrYW1sZXNoX3NpbmdoIiwiaWF0IjoxNjYzMDY3NjcxLCJleHAiOjE2NjMxNTQwNzF9.AM_ivWrc3tamo-fkSU7Sn3BvSgUNIUWK-hApOqfPCaRciYWS5-5Z_3KFcQuMbeWVSA5OfEZb5UAUKoEF1sMiaw"

export default function UploadDocuments() {
  useEffect(() => {
    console.log(window)
    // if (window.jwtTokenResult == "") {
    //   history('/', { replace: true })
    // }
     if (window.loginType === "SignIn") {
      // getStudentData();
      // getAddressData();
      getSubmittedDocument(window.engagementId);
    }
    else{
     getSubmittedDocument(window.engagementId);
    }
 },[]);
  var x = 0;
  const classes = useStyles();
  const history = useNavigate();
  const[DocumentList,setDocumentList] = useState([])
  const selectGenderOptions = ['Aadhar Card', 'Pan Card', 'Driving License']
  const [file,setFile] = useState(null)
  const [documentName,setDocumentName] = useState("")
  const [documnetType,setDocumnetType]  = useState("")
  const typeOfDocument = [{  value: "Address Proof", name: "Address Proof" },
                          {  value: "Identity Proof", name: "Identity Proof" },
                          {  value: "Education Proof", name: "Education Proof" },]
  const typeOfProofs = [
    {id:"Address Proof",  value: "Aadhar Card", name: "Aadhar Card" },
    { id:"Address Proof", value: "Voting Card", name: "Voting Card" },
    {id:"Address Proof",  value: "Light Bill", name: "Light Bill" },
    {id:"Address Proof",   value: "Ration Card", name: "Ration Card"},
    { id:"Identity Proof",value: "Pan Card", name: "Pan Card" },
    { id:"Identity Proof",value: "Passport", name: "Passport" },
    {id:"Education Proof", value: "10th Certificate", name: "10th Certificate" },
    {id:"Education Proof", value: "12th Certificate", name: "12th Certificate" },
    {id:"Education Proof", value: "Degree", name: "Degree" },
    {id:10, value: "", name: "" },
  ];
  const handleFileChange =(event)=>{
    setFile(event)
  }
  const handleDocument = (event)=>{
    event.preventDefault();
    console.log(documentName)
    console.log(documnetType)
    console.log(file)
    if(file.length === 0){
      alert("Please Select File.")
    }
    else{
      file.map(async (file,id)=>{
        getBase64(file).then(async (data)=>{
          var doc = data;
          UploadFile(doc)
        })
      })
    }
  }
  const UploadFile = async(doc)=>{
    try{
      // dbUserId,engagementId,documentType,typeOfDocument,documentName,document,createdBy,updatedBy) {
       uploadDocument(window.dbUserId,window.engagementId,documnetType,"G",documentName,doc,window.userId,window.userId)
       .then((jsondata) => {
        let res = JSON.parse(jsondata.data)
        console.log(res)
         if(res[0]!== null){
           alert("Data Saved Suucessfully")
          //  document.getElementsByName("demo-row-radio-buttons-group-label").click()
           setDocumentName("")
           setDocumnetType("")
           getSubmittedDocument(res[0].engagementId);
         }
       })
    }catch(err){
      alert(err.message)
    }
  }
  // fetching User Document List
  const getSubmittedDocument = (engagementId)=>{
    fetchUserDocumentsByEngagementId(engagementId).then((jsondata) => {   
      let jsonobjects = JSON.parse(jsondata.data); 
      setDocumentList(jsonobjects)
    })
  }
 
  const getBase64= async(file) =>{
    try{
      return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = error => reject(error);
      });
    }catch(err){
      alert(err.message)
    }
   
  }
  const handleRadioButtonDocument =(event)=>{
    setDocumnetType(event?.target?.value)
  }
  
  const handleRadioButton = (event)=>{
    setDocumentName(event?.target?.value)
  }
  const downloadDocuments =(basicDocId)=>{
    let formData = new FormData();
  formData.append('data', '{"token" : "", "action" : "downloadDocument", "data" : [{"basicDocId":'+basicDocId+'}]}');
  fetch(serviceEndPoint.documentServiceEndPoint, {
      method: 'post',
      headers: {
        'Authorization': 'Bearer '+token
    }, 
      body: formData
  }).then(response => response.json()).then((jsondata)=>{
    let jsonobjects = JSON.parse(jsondata.data);
    // console.log("response>>>",jsonobjects)
    console.log(jsonobjects[0].documentPath)
    var url=serviceEndPoint.downloadDocument+jsonobjects[0].documentPath+""; 

    window.open(url, "_blank");
  });
    console.log(basicDocId)
  }
  const deleteDocument =async (basicDocId)=>{
    await deleteDocumentById(basicDocId).then((jsondata) => {

      getSubmittedDocument(window.dbUserId)
    });
    
  }
  const handleBack = ()=>{
    window.studentType === "Innovator" ? history('/Businessdetails' ,{replace:true}) : history('/entrepreneurbusinessform' ,{replace:true}) 
  }
const finalSubmission = (event)=>{
  
}

  return (
    <div className={classes.root} >
      <h3 style={{ textAlign: "center" }}>Upload Documents</h3>
      <Container component="main" maxWidth="md" sx={{ mb: 5 }}>
        <br/>
        <form method="post" >
      {/* <Container component='main' maxWidth='md' sx={{ mb: 5 }}> */}
        {/* <Box mb={17}> */}
        <Grid container>

        <FormControl style={{ marginTop: '20px' }}>
                <FormLabel id='demo-row-radio-buttons-group-label'>
                  Type of Document
                </FormLabel>
                <RadioGroup row aria-labelledby='demo-row-radio-buttons-group-label'
                  name='row-radio-buttons-group'>
                 {typeOfDocument.map((item) =>(  
                  <FormControlLabel
                    value={item.value}
                    control={<Radio />}
                    label={item.name}
                    onChange={handleRadioButtonDocument}
                  />
                ))}
                </RadioGroup>
              </FormControl>

              <Grid  item xs={12} ></Grid>
              <FormControl style={{ marginTop: '20px' }}>
                <FormLabel id='demo-row-radio-buttons-group-label'>
                  Select Document
                </FormLabel>
                <RadioGroup row aria-labelledby='demo-row-radio-buttons-group-label'
                  name='row-radio-buttons-group'>
                 {typeOfProofs.filter(val=>val.id === documnetType).map((item) =>(  
                  <FormControlLabel
                    value={item.value}
                    control={<Radio />}
                    label={item.name}
                    onChange={handleRadioButton}
                  />
                ))}
                </RadioGroup>
              </FormControl>
            
        {
          (documentName !=="" && documnetType !== "" ) &&
          <>
          <Grid  item xs={12} ></Grid>
          <Box>
          <Grid  item xs={12} sm={5}>
          <DropzoneArea
            name="file" id="file"
            acceptedFiles={['image/*','.csv','.eml', '.rtf','text/*','.docx','.pdf','.ppt','.pptx','.xls' ,'.xlsx','.ods','.tsv','.odt','.txt','.odp','.svg', '.mp4']}
            maxFileSize={5000000}
            filesLimit={1} showFileNames={true}
            onChange={(e)=>handleFileChange(e)}
            onAlert={(message, variant) => console.log(`${variant}: ${message}`)}
            onDelete={(fileObj) =>fileObj= null}
          />
          </Grid>
          </Box>
          <Grid  item xs={12}></Grid>
          <Grid >
          <Button  variant="contained" color="primary"  style={{color:"white" , background:"blue"}} onClick={(e)=>handleDocument(e)} >Upload</Button>
          </Grid>
          <br />
          </>
        }
        </Grid>
      </form>
      <br/ >
      <h5 style={{ textAlign: "left" }}>Uploaded Documents</h5>
      <Table aria-label="simple table" xs={1} >
      <TableHead>
          <TableRow>
            <TableCell>Document Type</TableCell>
            <TableCell>Document Name</TableCell>
            <TableCell >Download</TableCell>
            <TableCell >Delete</TableCell>
          </TableRow>
        </TableHead>

        <TableBody>
          {DocumentList.filter(val=>(val.isActive==="Y")).map(row=>(
            <TableRow key={row.basicDocId}>
              <TableCell component="th" scope="row">
                {row.documentType}
              </TableCell>
              <TableCell component="th" scope="row">
                {row.documentName}
              </TableCell>
            <TableCell >                 
              <Button variant="contained" color="primary" size="small" name="download" id="download"
               onClick={()=>downloadDocuments(row.basicDocId)}
              >Download</Button>
            </TableCell>            

            <TableCell >                 
              <Button variant="contained" color="primary" size="small" name="delete" id="delete" 
               onClick={()=>deleteDocument(row.basicDocId)}
              >Delete</Button>
            </TableCell>            
            </TableRow>
          ))}
        </TableBody>
       </Table>
       <br/>
      <Stack direction="row" spacing={2}>
        <Button  variant="contained"  onClick={handleBack} style={{color:"white" , background:"blue"}}>Back</Button>
        <Button type="submit" variant="contained" style={{color:"white" , background:"blue"}} onClick={(e)=>finalSubmission(e)}>Save</Button>
      </Stack>
      </Container>
    </div>
    
  )
}
