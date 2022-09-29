import BusinessCaseEntrepreneurForm from './BusinessCaseEntrepreneurForm'
import BusinessCaseInnovator from './BusinessCaseInnovator'
export default function businesscasebrief(){
    return(
        <>
            {
                window.studentType === "Innovator" ?

                <BusinessCaseInnovator />
                :
                <BusinessCaseEntrepreneurForm />
            }
           
        </>
    )
}