import ExistingBusinessEntrepreneurshipForm from "./ExistingBusinessEnterpreneurForm"
import ExistingBusinessInnovator from "./ExistingBusinessInnovatorForm"

export default function existingBusinessDetails(){
    console.log(window.studentType)
    return(
        <>
            {
                window.studentType === "Innovator" ?

                <ExistingBusinessInnovator />
                :
                <ExistingBusinessEntrepreneurshipForm />
            }
           
        </>
    )
}