import { Box } from "@mui/material";
import "../assets/css/terms-and-conditions.css";

export default function TermsAndConditions() {
  return (
    <>
      <Box class="tacbox">
        <h5 style={{display: "inline-block"}}>Please read and confirm</h5> <br />
        <input type="checkbox" />I agree to these{" "}
        <a href="#">Terms and Conditions</a> and I hereby declare that all the
        information provided by me is true and best of my knowledge.
      </Box>
      <Box class="tacbox">
        <input type="checkbox" />I have submitted all the required documents and
        have gone through the process.
      </Box>
      {/* <label class="tacbox">
        <input type="checkbox" />
        I agree to these <a href="#">Terms and Conditions</a>.
      </label>

      <label for="taccheck" class="tacbox">
        <input id="taccheck" type="checkbox" />
        I agree to these <a href="#">Terms and Conditions</a>.
      </label> */}
    </>
  );
}
