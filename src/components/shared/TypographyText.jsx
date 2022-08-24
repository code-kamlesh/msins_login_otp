import Typography from "@mui/material/Typography";

function TypographyText({ typoText, component, variant, align, gutterBottom }) {
  return (
    <Typography
      component={component}
      variant={variant}
      align={align}
      gutterBottom={gutterBottom}
    >
      {typoText}
    </Typography>
  );
}

export default TypographyText;
