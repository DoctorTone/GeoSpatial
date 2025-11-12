import { styled } from "@mui/material/styles";
import Switch, { switchClasses } from "@mui/material/Switch";
import type { ChangeEvent } from "react";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import useStore from "../state/store";

const RotateSwitch = styled(Switch)({
  [`& .${switchClasses.track}`]: {
    backgroundColor: "yellow",
  },
});

const Rotate = () => {
  const rotate = useStore((state) => state.autoRotate);
  const setAutoRotate = useStore((state) => state.setAutoRotate);

  const onToggle = (event: ChangeEvent<HTMLInputElement>) => {
    setAutoRotate(event.target.checked);
  };

  return (
    <div id="rotate" className="panel">
      <FormGroup>
        <FormControlLabel
          control={<RotateSwitch checked={rotate} onChange={onToggle} />}
          label="Rotate"
        />
      </FormGroup>
    </div>
  );
};

export default Rotate;
