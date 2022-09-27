import { regenerateToken } from './Validation';
export function isSessionValid() 
{
    var currentDateTime=new Date();
    if(window.sessionTime.getTime() >= currentDateTime.getTime()){
        regenerateToken();
        var sessionTimeOut=new Date();
        sessionTimeOut.setMinutes( sessionTimeOut.getMinutes() + 15);    
        window.sessionTime=sessionTimeOut;
        return true;  
      }
      if(window.sessionTime.getTime() <= currentDateTime.getTime()){  
       window.sessionTime="";window.userid="";
       window.dbUserId="";window.token="";
       window.userName="";window.refreshToken=""
       window.location.pathname="/";
       return false; 
      }   
}
export function isTokenValid()
{
  var currentDateTime=new Date();
  if(window.jwtTimeOut.getTime() < currentDateTime.getTime()){
    return false;
  }
  else
  {
    return true;
  }
}

export function clearAppData()
{
       window.sessionTime="";window.userid="";
       window.firstName="";window.lastName="";
       window.roleid="";window.roleName="";
       window.centerId="";window.centerName="";
       window.dbUserId="";window.token="";
       window.userName="";window.defaultRoleId="";window.refreshToken=""
       window.location.pathname="/";
}