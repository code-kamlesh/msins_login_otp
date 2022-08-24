import Button from "@mui/material/Button";

export default function Buttons({ type,text, onChange, fullWidth, onClick, onSubmit, color, variant, style, size, startIcon, endIcon, sx, disabled }) {
  return (
    <>
      <Button
        type={type}
        fullWidth={fullWidth}
        variant={variant}
        // sx={{ mt: 3, mb: 3.5 }}
        disabled={disabled}
        sx={sx}
        style={style}
        onChange={onChange}
        onClick={onClick}
        onSubmit={onSubmit}
        color={color}
        size={size}
        startIcon={startIcon}
        endIcon={endIcon}
        onKeyDown={(e) => e.preventDefault()}
      >
        {text}
      </Button>
    </>
  );
}
