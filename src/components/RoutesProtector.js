import { useNavigate } from 'react-router-dom'
import React, { useEffect} from "react";

  function RoutesProtector(props){
    const history = useNavigate(); 
    let component = props.component;
    useEffect(() => {
        if(window.refreshJwtToken === "")
        history('/' ,{replace:true});
        }, []);
       
    return(
        <div>
            <component />
      </div>
    )
  }


  export default RoutesProtector;