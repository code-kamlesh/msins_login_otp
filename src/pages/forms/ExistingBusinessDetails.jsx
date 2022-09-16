import ExistingBusinessEntrepreneurshipForm from "./ExistingBusinessEnterpreneurForm"
import ExistingBusinessInnovator from "./ExistingBusinessInnovatorForm"

export default function existingBusinessDetails(){
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