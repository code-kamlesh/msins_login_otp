import { serviceEndPoint } from './ServiceEndPoint';
import {isSessionValid, isTokenValid} from './session';
import { regenerateToken } from './Validation';
export async function login() {
    let requestFormData = new FormData();  
    requestFormData.append('data', '{"token" : "", "action" : "login", "data" : [{"userName":"rahul@CL","password":"Pass@123"}]}');
    return  fetch(serviceEndPoint.loginService,{
    method: "POST",
    body: requestFormData,
    }).then(response => response.json()); 
}

// export async function saveBasicData(action,aadharNo, gender, firstName, middleName, lastName,dob,highestQualification,religion, bloodGroup,incomeStatus,category,passingYear, primaryContactNumber, secondaryContactNumber,primaryEmailId, secondaryEmailId,remarks) {
    export async function saveBasicData(action,data,token) {
    if(isSessionValid()){
    let requestFormData = new FormData();  
    requestFormData.append('data', '{"token" : "1234", "action" : "'+action+'", "data" : [' + JSON.stringify(data) + ']}');
    if(!isTokenValid()) 
        await regenerateToken();
   return await fetch(serviceEndPoint.studentServiceEndPoint,{
     method: "POST",
     headers: {
        'Authorization': 'Bearer '+token
    }, 
     body: requestFormData,
     }).then(response => response.json());
    }
    return null;
}

export async function fetchAddressDetailsBasedOnPincode(pincode) {
    if(isSessionValid()){
    let requestFormData = new FormData();  
    requestFormData.append('data', '{"token" : "", "action" : "findpincode", "data" : [{"pincode":'+pincode+'}]}');
    if(!isTokenValid()) 
        await regenerateToken();
   return await fetch(serviceEndPoint.cityVillageServiceEndPoint,{
     method: "POST",
     body: requestFormData,
     }).then(response => response.json());
    }
    return null;    
}
// saving aaddress data
export async function submitAddressData(action,data,token)
{
    if(isSessionValid()){
    let formData = new FormData();
       formData.append('data','{"token" : "'+ "1234" +'", "action" : "'+  action +'", "data" :[' + JSON.stringify(data) + ']}');
       if(!isTokenValid()) 
        await regenerateToken();
         return await fetch(serviceEndPoint.addressServiceEndPoint, {
         method: "POST",
         headers: {
           'Authorization': 'Bearer '+token
       },  
         body: formData 
         }).then(response => response.json())
}
return null;
}
    export async function captureStudentEngagementDetails(dbUserId,centerId,userId, studentType,token) {
    if(isSessionValid()){
    let requestFormData = new FormData();  
    requestFormData.append('data','{"token" : "'+ "1234" +'", "action" : "captureStudentEngagement", "data" :[{"dbUserId"  : ' + dbUserId + ' , "centerId" : ' + centerId + ', "createdBy" : ' + userId + ', "ideaType": "'+studentType+'", "remarks" : "","status" : "Draft"}]}');
    
    if(!isTokenValid()) 
        await regenerateToken();
 return await fetch(serviceEndPoint.engagementServiceEndPoint,{
     method: "POST",
     headers: {
        'Authorization': 'Bearer '+token
    }, 
     body: requestFormData,
     }).then(response => response.json());
    }
    return null;  
}

// fectch Existing data of student baised on dbuserid
export async function fetchStduentDataBaisedOndbUserId(dbUserId,token) {
    if(isSessionValid()){
        let formData = new FormData();
        formData.append('data','{"token" : "'+ "1234" +'", "action" : "'+  "viewBeneficiaryDetailsById" +'", "data" : [{"dbUserId" : ' + dbUserId + '}]}');
        if(!isTokenValid()) 
           await regenerateToken();
       return fetch(serviceEndPoint.studentServiceEndPoint, {
          method: "POST",
          headers: {
           'Authorization': 'Bearer '+token
       }, 
          body: formData 
          }).then(response => response.json())
   }
   return null;
}

//Socio Details added ashish
export async function saveSocioDetails(action,data,token)
{
    if(isSessionValid()){
    let formData = new FormData();
    formData.append('data','{"token" : "'+ "1234" +'", "action" : "'+action+'", "data" :[ ' + JSON.stringify(data) + ']}');
    if(!isTokenValid()) 
        await regenerateToken();
     return fetch(serviceEndPoint.socioeconomicServiceEndPoint, {
     method: "POST",
     headers: {
        'Authorization': 'Bearer '+token
    }, 
     body: formData 
     }).then(response => response.json())
}
return null;
}

//fetching socio economic
export async function fetchSocioDetails(id, token)
{
    if(isSessionValid()){
     let formData = new FormData();
     formData.append('data','{"token" : "'+ "1234" +'", "action" : "'+  "viewSocioEconomicById" +'", "data" : [{"dbUserId" : ' + id + '}]}');
     if(!isTokenValid()) 
        await regenerateToken();
    return fetch(serviceEndPoint.socioeconomicServiceEndPoint, {
       method: "POST",
       headers: {
        'Authorization': 'Bearer '+token
    }, 
       body: formData 
       }).then(response => response.json())
}
return null;
}


export async function fetchExperienceDetails(id,token)
{
    if(isSessionValid()){
    let formData = new FormData();
          formData.append('data','{"token" : "'+ "1234" +'", "action" : "'+  "viewAllExperienceForUser" +'", "data" : [{"dbUserId" : ' + id + '}]}');
          if(!isTokenValid()) 
        await regenerateToken();
          return fetch(serviceEndPoint.experienceServiceEndPoint, {
          method: "POST",
          headers: {
            'Authorization': 'Bearer '+token
        }, 
          body: formData 
          }).then(response => response.json())
}
return null;
}

export async function saveExpDetails(action, data,token)
{
    if(isSessionValid()){
    let formData = new FormData();
    formData.append('data','{"token" : "'+ "1234" +'", "action" : "'+  action +'", "data" :[ ' + JSON.stringify(data) + ']}');
    if(!isTokenValid()) 
        await regenerateToken();
     return fetch(serviceEndPoint.experienceServiceEndPoint, {
 method: "POST",
     headers: {
        'Authorization': 'Bearer '+token
    }, 
     body: formData 
     }).then(response => response.json())
}
return null;
}

export async function uploadDocument(dbUserId,engagementId,documentType,typeOfDocument,documentName,document,createdBy,updatedBy,token) {
    if(isSessionValid()){
    let requestFormData = new FormData();
    requestFormData.append('data', '{"token" : "", "action" : "captureDocDetails", "data" : [{"dbUserId":'+dbUserId+',"engagementId":'+engagementId+',"documentType":"'+documentType+'","typeOfDocument":"'+typeOfDocument+'","documentName":"'+documentName+'","base64File":"'+document+'","createdBy":"'+createdBy+'","updatedBy":"'+updatedBy+'"}]}');
    if(!isTokenValid()) 
        await regenerateToken();
    return fetch(serviceEndPoint.documentServiceEndPoint, {
        method: "POST",
        headers: {
            'Authorization': 'Bearer '+token
        },
        body: requestFormData,
    }).then(response => response.json());
}
return null;
}
// delete documents
export async function deleteDocumentById(basicDocId,token) {
    if(isSessionValid()){
    let requestFormData = new FormData();
    requestFormData.append('data', '{"token" : "", "action" : "deleteDocument", "data" : [{"basicDocId":'+basicDocId+'}]}');
    if(!isTokenValid()) 
        await regenerateToken();
  return fetch(serviceEndPoint.documentServiceEndPoint, {
        method: "POST",
        headers: {
            'Authorization': 'Bearer '+token
        }, 
        body: requestFormData,
    }).then(response => response.json());
}
return null;
}
export async function fetchUserDocumentsByEngagementId(engagementId,token) {
    if(isSessionValid()){
    let requestFormData = new FormData();
    requestFormData.append('data', '{"token" : "", "action" : "fetchDocumentDetailsByEngagementId", "data" : [{"engagementId":'+engagementId+'}]}');
    if(!isTokenValid()) 
        await regenerateToken();
  return fetch(serviceEndPoint.documentServiceEndPoint, {
        method: "POST",
        headers: {
            'Authorization': 'Bearer '+token        }, 
        body: requestFormData,
    }).then(response => response.json());
}
return null;
}

// Fetch esiting data baised on Contact number
// viewAllBeneficiaryDetailsForContact


export async function fetchStduentDataBaisedOnContactNumberandDob(primaryContactNumber,dob,token) {
    if(isSessionValid()){
    let requestFormData = new FormData();
    requestFormData.append('data', '{"token" : "", "action" : "searchByDobAndPrimaryContactNumber", "data" : [{"primaryContactNumber":' + primaryContactNumber + ',"dob":"' + dob + '"}] }');
    if(!isTokenValid()) 
        await regenerateToken();
   return await fetch(serviceEndPoint.studentServiceEndPoint,{
     method: "POST",
     headers: {
        'Authorization': 'Bearer '+token
    }, 
     body: requestFormData,
     }).then(response => response.json());
    }
    return null;
}

// fetching studnet engagment data baised on dubuserId
export async function fetchStduentEngagementDataBaisedOnDBUserId(dbUserId,token) {
    if(isSessionValid()){
    let requestFormData = new FormData();
    requestFormData.append('data', '{"token" : "", "action" : "viewAllStudentEngagementForUser", "data" : [{"dbUserId":"' + dbUserId + '"}]}');
    if(!isTokenValid()) 
        await regenerateToken();
   return await fetch(serviceEndPoint.engagementServiceEndPoint,{
     method: "POST",
     headers: {
        'Authorization': 'Bearer '+token
    }, 
     body: requestFormData,
     }).then(response => response.json());
    }
    return null;
}


// fetch existing address if present
// viewAllAddressForEntity
export async function fetchExistingAddress(entityId,entityType,token) {

    if(isSessionValid()){
    let requestFormData = new FormData();
    requestFormData.append('data', '{"token" : "", "action" : "viewAllAddressForEntity", "data" : [{"entityId":"' + entityId + '", "entityType": "'+entityType+'"}]}');
    if(!isTokenValid()) 
        await regenerateToken();
   return await fetch(serviceEndPoint.addressServiceEndPoint,{
     method: "POST",
     headers: {
        'Authorization': 'Bearer '+token
    }, 
     body: requestFormData,
     }).then(response => response.json());
    }
    return null;
}

export async function fetchAllStudentDataByEngagementId(engagementId,token) {
    if(isSessionValid()){
    let requestFormData = new FormData();  
    requestFormData.append('data','{"token" : "'+ "1234" +'", "action" : "fetchAllStudentDataByEngagementId", "data" : [{"engagementId":"' + engagementId + '"}]}');
    if(!isTokenValid()) 
        await regenerateToken();
  return  fetch(serviceEndPoint.engagementServiceEndPoint,{
     method: "POST",
     headers: {
        'Authorization': 'Bearer '+token
    }, 
     body: requestFormData,
     }).then(response => response.json());
    }
    return null;   
}

//fetching Question set 

export async function fetchAllQestionSet(all,token) {
    if(isSessionValid()){
    if(!isTokenValid()) 
        await regenerateToken();  
        var url= serviceEndPoint.BusinessDetailsServiceEndPoint+"/"+all                                                                 
    return await fetch(url,{
        headers: {
            'Authorization': 'Bearer '+token
        },
        }).then(response => response.text()) // json.parse doesn't hanlde the null value
        .then((text)=>text.length?JSON.parse(text):{});
    }
    return null;
}

// fecthing question for innovator
export async function fetchAllQestionSetforInnovator(isActive,buisnessType,questionType,questionFor,token) {
    if(isSessionValid()){
    if(!isTokenValid()) 
        await regenerateToken();  
        var url= serviceEndPoint.BusinessDetailsServiceEndPoint+"/FetchByIsActiveAndBusinessTypeAndQuestionTypeAndQuestionFor"+"/"+isActive+"/"+buisnessType+"/"+questionType+"/"+questionFor                                                            
        return await fetch(url,{
        headers: {
            'Authorization': 'Bearer '+token
        },
        }).then(response => response.text()) // json.parse doesn't hanlde the null value
        .then((text)=>text.length?JSON.parse(text):{});
    }
    return null;
}

// Saving FieldVisits and Sessions data
export async function saveMsinsBusinessData(data,token) {
    if(isSessionValid()){
    if(!isTokenValid()) 
        await regenerateToken();  
        var responseBody = JSON.stringify({
        "questionId":data?.questionId,
        "answer":data?.answer,
        "businessType":data?.businessType,
        "dbUserId":data?.dbUserId,
        "createdBy":data?.createdBy,
        "updatedBy":data?.updatedBy,
        })
        var url= serviceEndPoint.BusinessDetailsServiceEndPoint+"/"+"save"                                                               
   return  await fetch(url,{
     method: "POST",
     headers: {
        'Authorization': 'Bearer '+token,
        'Content-Type': 'application/json'
    }, 
     body:responseBody,
     }).then(response => response.json());
    }
    return null;
}

// fetchinh saved answer
// fetching parent sme field visit data
export async function fetchSavedQuestionAnswer(dbUserId,token) {
    if(isSessionValid()){
    if(!isTokenValid()) 
        await regenerateToken();  
        var url=serviceEndPoint.BusinessDetailsServiceEndPoint +"/"+dbUserId                                                                   
    return await fetch(url,{
        headers: {
            'Authorization': 'Bearer '+token
        },
        }).then(response => response.text()) // json.parse doesn't hanlde the null value
        .then((text)=>text.length?JSON.parse(text):{});
    }
    return null;
}

//update the msins data

export async function updateMsinsBuisnessDetails(data,token) {
    if(isSessionValid()){
    if(!isTokenValid()) 
        await regenerateToken(); 
        var responseBody = JSON.stringify({ 
            "questionId":data?.questionId,
            "answer":data?.answer,
            "businessType":data?.businessType,
            "dbUserId":data?.dbUserId,
            "createdBy":data?.createdBy,
            "updatedBy":data?.updatedBy,
        })
        var url= serviceEndPoint.BusinessDetailsServiceEndPoint+"/"+"update/"+data?.id                                                                 
   return  await fetch(url,{
     method: "put",
     headers: {
        'Authorization': 'Bearer '+token,
        "Content-Type": "application/json"
    }, 
   body: responseBody
     }).then(response => response.json());
    }
    return null;
}