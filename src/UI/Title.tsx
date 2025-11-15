import Typography from "@mui/material/Typography";
import BoltIcon from "@mui/icons-material/Bolt";

const Title = () => {
  return (
    <div id="title" className="panel">
      <Typography variant="h3" sx={{ color: "orange" }}>
        <BoltIcon fontSize="large" />
        Lightning
        <BoltIcon fontSize="large" />
      </Typography>
    </div>
  );
};

export default Title;
