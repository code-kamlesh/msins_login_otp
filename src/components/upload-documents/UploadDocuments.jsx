import Grid from '@mui/material/Grid'
import {useState} from "react"; 
import Container from '@mui/material/Container'
import SelectOption from '../shared/SelectOption'
import Box from '@mui/material/Box'
import { Link, useNavigate } from 'react-router-dom'
import { DropzoneArea } from 'material-ui-dropzone';
import { Button } from "@mui/material";
import Stack from '@mui/material/Stack';
import {uploadDocument,fetchUserDocumentsByEngagementId} from "./../../utility/Api";

const dbUserId = 1000011;
const engagementId=1000011;
export default function UploadDocuments() {
  const history = useNavigate();
  //adding select box options
  const selectGenderOptions = ['Aadhar Card', 'Pan Card', 'Driving License']
  const [file,setFile] = useState(null)
  const [fileName,setFileName] = useState("")
  const [documentType,setDocumentType]  = useState("")
  // const onFileChange = (files) => {
  //   console.log(files)
  // }
  const onSelectChange = (event) => {
    console.log(event)
    setDocumentType(event);
    window.name="kamlesh"
    console.log(window.name)
  };
  const handleFileChange =(event)=>{
    setFile(event)
    let files = event
    setFileName(files[0]?.name)
  }
  const handleDocument = (event)=>{
    event.preventDefault();
    console.log(fileName)
    console.log(documentType)
    file.map(async (file,id)=>{
    getBase64(file).then(async (data)=>{
      var doc = data;
      UploadFile(doc)
    })
  })
  }
  const UploadFile = async(doc)=>{
    console.log("basr64file",doc)
    
     // dbUserId,engagementId,documentType,typeOfDocument,documentName,document,documentNumber,createdBy,updatedBy) {
      uploadDocument(dbUserId,engagementId,fileName,"G",fileName,doc,1,700019,700019)
      .then((jsondata) => {
        // if(jsondata.appError == null){
          alert("Data Saved Suucessfully")
        // }
      })
  }
  const getBase64= async(file) =>{
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = error => reject(error);
    });
  }

  const handleBack = ()=>{
    window.studentType === "Innovator" ? history('/Businessdetails' ,{replace:true}) : history('/entrepreneurbusinessform' ,{replace:true}) 
  }
  return (
    <>
    <form method="post" onSubmit={(e)=>handleDocument(e)}>
      <Container component='main' maxWidth='md' sx={{ mb: 5 }}>
        <Box mb={17}>
          <SelectOption
            label='Upload Documents'
            id='documentUpload'
            name='documentUpload'
            fullWidth='fullWidth'
            options={selectGenderOptions}
            required='required'
            variant='filled'
            autoFocus={true}
            onChange={onSelectChange}
          />
        </Box>

        <Box>
        <DropzoneArea
          name="file" id="file"
          acceptedFiles={['image/*','.csv','.eml', '.rtf','text/*','.docx','.pdf','.ppt','.pptx','.xls' ,'.xlsx','.ods','.tsv','.odt','.txt','.odp','.svg', '.mp4']}
          maxFileSize={5000000}
          filesLimit={1} showFileNames={true}
          onChange={(e)=>handleFileChange(e)}
          onAlert={(message, variant) => console.log(`${variant}: ${message}`)}
          onDelete={(fileObj) =>fileObj= null}
        />
        
        </Box>

        <br /><br />        
        <Stack direction="row" spacing={2}>
        <Button  variant="contained" color="primary" onClick={handleBack} >Back</Button>
        <Button type="submit" variant="contained" color="primary" >Next</Button>
      </Stack>
       
      </Container>
      </form>
    </>
  )
}
