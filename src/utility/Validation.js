import {serviceEndPoint} from './ServiceEndPoint'
let REQUIRED = "* Mandatory Field";
// if(lang === "bg") 
// REQUIRED = "* বাধ্যতামূলক" 
// else if (lang === "hn") 
// REQUIRED = "* अनिवार्य क्षेत्र"
// else  REQUIRED = "* Mandatory Field";
const errors = {};

// validate aadhar card
export function validateAadharNumber(aadharnumber,lang){
    if((aadharnumber.length === 0 || aadharnumber.length === 12) && aadharnumber.match(/^[0-9]+$|^$|^\s$/)){
        errors["aadharNumber"] = ""
        return errors;
    }
    if(aadharnumber.length>0 &&  aadharnumber.length<12 ){
        if(lang === "bg") 
            errors["aadharNumber"] =  "* প্রাক্তন 12 ডিজিট" 
            else if (lang === "hn") 
            errors["aadharNumber"] =  "* बिल्कुल 12 अंक"
            else   errors["aadharNumber"] =  "* Exactly 12 digits";
        return errors;
    } 
};

export function validateTextInput(key, value, lng) {
    if (value.match(/[0-9\b]+$/) || value.match(/^\s$/)) {
        lng === "bg" ? errors[key] = "* শুধুমাত্র অক্ষর" : (lng === "hn" ? errors[key] = "* केवल अक्षर" : errors[key] = "* Only Alphabets");
        return errors
    }
    if (value.match(/[`!@#$%^&*()_+\-=[\]{};':"\\|,<>/?~]/)) {
        lng === "bg" ? errors[key] = "* বিশেষ চিহ্ন-র প্রয়োজন নেই" : (lng === "hn" ? errors[key] = "* विशेष वर्ण शामिल नहीं होने चाहिए" : errors[key] = "* shouldnt include special characters");
        return errors;
    }
    // allow dot and character 
    if (value.match(/^[.&a-zA-Z\s]+$/)) {
        errors[key] = "";
        return errors;
    }
    errors[key] = REQUIRED
    return errors;
}
// validate text Input

export function validateTextInput1(key,value,lng){
    console.log(value)
    if(value.match(/^[A-Za-z0-9\s!@#$%^&*()_+=-`~\\\]\[{}|';:/.,?><]/)){
        errors[key]=""
        return errors;
    }
    // if(value.length==1){
    //     lng==="lng" ? errors[key]=REQUIRED:errors[key]=REQUIRED
    //     return errors;
    // }
   
    errors[key]=REQUIRED
    return errors;
}
// validate single select
export function validateSelectInput(key, value) {
   
    errors[key] = value === "" ?  REQUIRED :  "";
    
    return errors;
}
// validation pincode
export function validatePincode(value,pincode, lng) {
    
    if(pincode.length < 6)
    {
         // Commented to support more languages
      //  lng === "bg" ? errors["pincode"] = "* ৬ সংখ্যা" : errors["pincode"] = "* Exactly 6 digits";
        if(lng === "bg") 
        errors[value] =  "* ৬ সংখ্যা" 
        else if (lng === "hn") 
        errors[value] =  "* बिल्कुल 6 अंक"
        else   errors[value] =  "* Exactly 6 digits";        
        return errors;
    }
    if(!pincode.match(/^[0-9\b]+$/))
    {
      // lng === "bg" ? errors["pincode"] =  "* শুধুমাত্র সংখ্যা" : errors["pincode"] =  "* Only Numbers";

       if(lng === "bg") 
       errors[value] =  "* শুধুমাত্র সংখ্যা" 
       else if (lng === "hn") 
       errors[value] =  "* केवल नंबर"
       else   errors[value] =  "* Only Numbers";
        return errors
    }
    errors[value] = pincode === "" ?  REQUIRED : "";
    return errors;
}

// validation pincode
export function validatePassingYear(value,pincode, lng) {
    
    if(pincode.length < 4)
    {
         // Commented to support more languages
      //  lng === "bg" ? errors["pincode"] = "* ৬ সংখ্যা" : errors["pincode"] = "* Exactly 6 digits";
        if(lng === "bg") 
        errors[value] =  "* ৬ সংখ্যা" 
        else if (lng === "hn") 
        errors[value] =  "* बिल्कुल 4 अंक"
        else   errors[value] =  "* Exactly 4 digits";        
        return errors;
    }
    if(!pincode.match(/^[0-9\b]+$/))
    {
      // lng === "bg" ? errors["pincode"] =  "* শুধুমাত্র সংখ্যা" : errors["pincode"] =  "* Only Numbers";

       if(lng === "bg") 
       errors[value] =  "* শুধুমাত্র সংখ্যা" 
       else if (lng === "hn") 
       errors[value] =  "* केवल नंबर"
       else   errors[value] =  "* Only Numbers";
        return errors
    }
    errors[value] = pincode === "" ?  REQUIRED : "";
    return errors;
}

export function isNotEmpty(value){
    if(value==="" || value === null){value="";}
  return  value.length === 0 ? 'Please fill out this field!' : '';
}

export function isNotEmptyTest(name,value){
    if(value==null || value===""){value="";}
    errors[name] =  value.length === 0 ? 'Please fill out this field!' : '';
    return errors;
}
// validate contact number
export function validateContact(name , contact) {
    console.log(name)
    
    if((name === "secondaryContactNo" ||name === "primaryContactNo" ) && contact === "")
    {
         errors[name]="";
         return errors;
    }

    if(contact.match(/^\d{10}$/))
    {
         errors[name]="";
         return errors
    }
    else
    {
        errors[name]= "Must be exactly 10 digits";
        return errors
    }

}

// validate email

export function validateEmail(name , email) {

    if(name === "secondaryEmailId" && email === "")
    {
         errors[name]= "";
         return errors;
    }
    if(email.match(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/))
    {
        errors[name]= "";
        return errors;
    }
    else
    {
     errors[name]= "Not A valid email";
     return errors;
    }

}

// regenrate token
export function regenerateToken()
{
    let formData = new FormData();
        formData.append('data', '{"token" : "1234", "action" : "reactivate", "data" : [{"refreshToken":"'+window.refreshJwtToken+'","secret":"'+window.secretKey+'"}]}');
          return fetch(serviceEndPoint.loginService, {
            method: "POST",
            body: formData
            }).then(response => response.json()).then((jsondata)=>{
                if(jsondata.appError[0]==null){      
                    let jsonobjects = JSON.parse(jsondata.data);
                    window.userId = jsonobjects[0]?.id;
                    window.jwtTokenResult = jsonobjects[0]?.token;
                    window.refreshJwtToken = jsonobjects[0]?.token;
                    window.userId = jsonobjects[0]?.id; 
                    window.jwtTokenResult = jsonobjects[0].token;   
                    //window.refreshToken = jsonobjects[0].refreshToken;
                    var jwtTimeOut=new Date();
                    jwtTimeOut.setMinutes( jwtTimeOut.getMinutes() + 15);
                    window.jwtTimeOut = jwtTimeOut;
                } 
             })
}


// validate date differnece

export function validateDateDiff(key,value1,value2,lng){
    if(value1 > value2){
        errors[key] = "Date Should not be less than ExperienceFrom"
    }
    else{
        errors[key] = ""  
    }
    return errors
}