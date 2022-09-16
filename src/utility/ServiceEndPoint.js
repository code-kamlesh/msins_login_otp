export const serviceEndPoint = {
    studentServiceEndPoint:process.env.REACT_APP_API_ENDPOINT+"ssservices-v1/sservices-v1/student",
    // studentServiceEndPoint:"http://localhost:8083/student",
    loginService : process.env.REACT_APP_API_ENDPOINT+"ssservices-v1/login",
    cityVillageServiceEndPoint:process.env.REACT_APP_API_ENDPOINT+"services-v1/cityvillageservice",
    addressServiceEndPoint:process.env.REACT_APP_API_ENDPOINT+"ssservices-v1/sservices-v1/address",
    engagementServiceEndPoint:process.env.REACT_APP_API_ENDPOINT+"ssservices-v1/sservices-v1/engagement",
    // engagementServiceEndPoint:"http://localhost:8083/engagement",
    socioeconomicServiceEndPoint:process.env.REACT_APP_API_ENDPOINT+"ssservices-v1/sservices-v1/socioEconomic",
    experienceServiceEndPoint:process.env.REACT_APP_API_ENDPOINT+"ssservices-v1/sservices-v1/experience",
    documentServiceEndPoint:process.env.REACT_APP_API_ENDPOINT+"ssservices-v1/sservices-v1/documents",
    downloadDocument : process.env.REACT_APP_API_ENDPOINT+"Downloads/",
    //BusinessDetails
    BusinessDetailsServiceEndPoint:"http://localhost:8080/businessdetails",
    }