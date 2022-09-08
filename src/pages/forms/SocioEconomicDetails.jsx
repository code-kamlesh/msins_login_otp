import SocioEconomicEntepreneurForm from "./SocioEconomicEntepreneurForm"
import SocioEconomicInnovatorForm from "./SocioEconomicInnovatorForm"

export default function socioeconomicdetails(){
    console.log(window.studentType)
    return(
        <>
            {
                window.studentType === "Innovator" ?

                <SocioEconomicInnovatorForm />
                :
                <SocioEconomicEntepreneurForm />
            }
           
        </>
    )
}