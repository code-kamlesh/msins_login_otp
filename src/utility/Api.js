import { serviceEndPoint } from './ServiceEndPoint';
// const token = window?.jwtTokenResult;
const token ="eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJrYW1sZXNoX3NpbmdoIiwiaWF0IjoxNjYyMTA4OTYzLCJleHAiOjE2NjIxOTUzNjN9.bAgl4bVh3vb4TkGbc-bJrfEWxuHBOKwRHzuWrd6012aQd8zkjaPaxWT2OiX0Tti5yWD6LkIRjaMP_r41TFThLw"

export async function login() {
    let requestFormData = new FormData();  
    requestFormData.append('data', '{"token" : "", "action" : "login", "data" : [{"userName":"rahul@CL","password":"Pass@123"}]}');
    return  fetch(serviceEndPoint.loginService,{
    method: "POST",
    body: requestFormData,
    }).then(response => response.json()); 
}

// export async function saveBasicData(action,aadharNo, gender, firstName, middleName, lastName,dob,highestQualification,religion, bloodGroup,incomeStatus,category,passingYear, primaryContactNumber, secondaryContactNumber,primaryEmailId, secondaryEmailId,remarks) {
    export async function saveBasicData(action,data) {
    // if(isSessionValid()){
    let requestFormData = new FormData();  
    requestFormData.append('data', '{"token" : "1234", "action" : "'+action+'", "data" : [' + JSON.stringify(data) + ']}');
    // if(!isTokenValid()) 
        // await regenerateToken();
   return await fetch(serviceEndPoint.studentServiceEndPoint,{
     method: "POST",
     headers: {
        'Authorization': 'Bearer '+token
    }, 
     body: requestFormData,
     }).then(response => response.json());
    // }
    // return null;
}

export async function fetchAddressDetailsBasedOnPincode(pincode) {
    // if(isSessionValid()){
    let requestFormData = new FormData();  
    requestFormData.append('data', '{"token" : "", "action" : "findpincode", "data" : [{"pincode":'+pincode+'}]}');
    // if(!isTokenValid()) 
        // await regenerateToken();
   return await fetch(serviceEndPoint.cityVillageServiceEndPoint,{
     method: "POST",
     body: requestFormData,
     }).then(response => response.json());
    // }
    // return null;    
}
// saving aaddress data
// export async function submitAddressData(action,entityId,entityType,addressLine1,addressLine2,pincode,villageName,cityName,district,createdBy,type,isActive)
export async function submitAddressData(action,data)
{
    // {"entityId":'+entityId+', "entityType":"'+entityType+'","addressLine1":"'+addressLine1+'","addressLine2":"'+addressLine2+'","pincode":'+pincode+',"state":"Maharashtra","villageName":"'+villageName+'","cityName":"'+cityName+'","district":"'+district+'","createdBy":'+createdBy+',"type":"'+type+'","isActive":"'+isActive+'"}]
    // if(isSessionValid()){
    let formData = new FormData();
       formData.append('data','{"token" : "'+ "1234" +'", "action" : "'+  action +'", "data" :[' + JSON.stringify(data) + ']}');
    //    if(!isTokenValid()) 
        // await regenerateToken();
         return await fetch(serviceEndPoint.addressServiceEndPoint, {
         method: "POST",
         headers: {
           'Authorization': 'Bearer '+token
       },  
         body: formData 
         }).then(response => response.json())
// }
// return null;
}
// export async function captureStudentEngagementDetails(dbUserId,centerId,userId,ideaType,status) {
    export async function captureStudentEngagementDetails(dbUserId,centerId,userId, studentType) {
    // if(isSessionValid()){
    let requestFormData = new FormData();  
    requestFormData.append('data','{"token" : "'+ "1234" +'", "action" : "captureStudentEngagement", "data" :[{"dbUserId"  : ' + dbUserId + ' , "centerId" : ' + centerId + ', "createdBy" : ' + userId + ', "ideaType": "'+studentType+'", "remarks" : "","status" : "Draft"}]}');
    
    // if(!isTokenValid()) 
        // await regenerateToken();
 return await fetch(serviceEndPoint.engagementServiceEndPoint,{
     method: "POST",
     headers: {
        'Authorization': 'Bearer '+token
    }, 
     body: requestFormData,
     }).then(response => response.json());
    // }
    // return null;    "ideaType": "'+ideaType+'",
}



//Socio Details added ashish
export async function saveSocioDetails(action,data)
{
    // if(isSessionValid()){
    let formData = new FormData();
    formData.append('data','{"token" : "'+ "1234" +'", "action" : "'+action+'", "data" :[ ' + JSON.stringify(data) + ']}');
    // if(!isTokenValid()) 
        // await regenerateToken();
     return fetch(serviceEndPoint.socioeconomicServiceEndPoint, {
     method: "POST",
     headers: {
        'Authorization': 'Bearer '+token
    }, 
     body: formData 
     }).then(response => response.json())
// }
// return null;
}

//fetching socio economic
export async function fetchSocioDetails(id)
{
    // if(isSessionValid()){
     let formData = new FormData();
     formData.append('data','{"token" : "'+ "1234" +'", "action" : "'+  "viewSocioEconomicById" +'", "data" : [{"dbUserId" : ' + id + '}]}');
    //  if(!isTokenValid()) 
    //     await regenerateToken();
    return fetch(serviceEndPoint.socioeconomicServiceEndPoint, {
       method: "POST",
       headers: {
        'Authorization': 'Bearer '+token
    }, 
       body: formData 
       }).then(response => response.json())
// }
// return null;
}


export async function fetchExperienceDetails(id)
{
    // if(isSessionValid()){
    let formData = new FormData();
          formData.append('data','{"token" : "'+ "1234" +'", "action" : "'+  "viewAllExperienceForUser" +'", "data" : [{"dbUserId" : ' + id + '}]}');
        //   if(!isTokenValid()) 
        // await regenerateToken();
          return fetch(serviceEndPoint.experienceServiceEndPoint, {
          method: "POST",
          headers: {
            'Authorization': 'Bearer '+token
        }, 
          body: formData 
          }).then(response => response.json())
// }
// return null;
}

export async function saveExpDetails(action, data)
{
    // if(isSessionValid()){
    let formData = new FormData();
    formData.append('data','{"token" : "'+ "1234" +'", "action" : "'+  action +'", "data" :[ ' + JSON.stringify(data) + ']}');
    // if(!isTokenValid()) 
    //     await regenerateToken();
     return fetch(serviceEndPoint.experienceServiceEndPoint, {
 method: "POST",
     headers: {
        'Authorization': 'Bearer '+token
    }, 
     body: formData 
     }).then(response => response.json())
// }
// return null;
}

export async function uploadDocument(dbUserId,engagementId,documentType,typeOfDocument,documentName,document,documentNumber,createdBy,updatedBy) {
    // if(isSessionValid()){
    let requestFormData = new FormData();
    requestFormData.append('data', '{"token" : "", "action" : "captureDocDetails", "data" : [{"dbUserId":'+dbUserId+',"engagementId":'+engagementId+',"documentType":"'+documentType+'","typeOfDocument":"'+typeOfDocument+'","documentName":"'+documentName+'","base64File":"'+document+'","documentNo":"'+documentNumber+'","createdBy":"'+createdBy+'","updatedBy":"'+updatedBy+'"}]}');
    // if(!isTokenValid()) 
    //     await regenerateToken();
    return fetch(serviceEndPoint.documentServiceEndPoint, {
        method: "POST",
        headers: {
            'Authorization': 'Bearer '+token
        },
        body: requestFormData,
    }).then(response => response.json());
// }
// return null;
}

export async function fetchUserDocumentsByEngagementId(engagementId) {
    // if(isSessionValid()){
    let requestFormData = new FormData();
    requestFormData.append('data', '{"token" : "", "action" : "fetchDocumentDetailsByEngagementId", "data" : [{"engagementId":'+engagementId+'}]}');
    // if(!isTokenValid()) 
    //     await regenerateToken();
  return fetch(serviceEndPoint.documentServiceEndPoint, {
        method: "POST",
        headers: {
            'Authorization': 'Bearer '+token
        }, 
        body: requestFormData,
    }).then(response => response.json());
// }
// return null;
}

// Fetch esiting data baised on Contact number
// viewAllBeneficiaryDetailsForContact


export async function fetchStduentDataBaisedOnContactNumber(primaryContactNumber) {
    // if(isSessionValid()){
    let requestFormData = new FormData();
    requestFormData.append('data', '{"token" : "", "action" : "viewAllBeneficiaryDetailsForContact", "data" : [{"primaryContactNumber":' + primaryContactNumber + '}] }');
    // if(!isTokenValid()) 
        // await regenerateToken();
   return await fetch(serviceEndPoint.studentServiceEndPoint,{
     method: "POST",
     headers: {
        'Authorization': 'Bearer '+token
    }, 
     body: requestFormData,
     }).then(response => response.json());
    // }
    // return null;
}

// fetching studnet engagment data baised on dubuserId
export async function fetchStduentEngagementDataBaisedOnDBUserId(dbUserId) {
    // if(isSessionValid()){
    let requestFormData = new FormData();
    requestFormData.append('data', '{"token" : "", "action" : "viewAllStudentEngagementForUser", "data" : [{"dbUserId":"' + dbUserId + '"}]}');
    // if(!isTokenValid()) 
        // await regenerateToken();
   return await fetch(serviceEndPoint.engagementServiceEndPoint,{
     method: "POST",
     headers: {
        'Authorization': 'Bearer '+token
    }, 
     body: requestFormData,
     }).then(response => response.json());
    // }
    // return null;
}


// fetch existing address if present
// viewAllAddressForEntity
export async function fetchExistingAddress(entityId,entityType) {
    // if(isSessionValid()){
    let requestFormData = new FormData();
    requestFormData.append('data', '{"token" : "", "action" : "viewAllAddressForEntity", "data" : [{"entityId":"' + entityId + '", "entityType": "'+entityType+'"}]}');
    // if(!isTokenValid()) 
        // await regenerateToken();
   return await fetch(serviceEndPoint.addressServiceEndPoint,{
     method: "POST",
     headers: {
        'Authorization': 'Bearer '+token
    }, 
     body: requestFormData,
     }).then(response => response.json());
    // }
    // return null;
}