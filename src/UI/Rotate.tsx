import { styled } from "@mui/material/styles";
import Switch, { switchClasses } from "@mui/material/Switch";

const RotateSwitch = styled(Switch)({
  [`& .${switchClasses.track}`]: {
    backgroundColor: "yellow",
  },
});

const Rotate = () => {
  return (
    <div id="rotate" className="panel">
      <RotateSwitch />
    </div>
  );
};

export default Rotate;
