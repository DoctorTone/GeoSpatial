import { styled } from "@mui/material/styles";
import Switch, { switchClasses } from "@mui/material/Switch";
import type { ChangeEvent } from "react";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import useStore from "../state/store";

const AnimateSwitch = styled(Switch)({
  [`& .${switchClasses.track}`]: {
    backgroundColor: "yellow",
  },
});

const Animate = () => {
  const animate = useStore((state) => state.animatePoints);
  const setAnimatePoints = useStore((state) => state.setAnimatePoints);

  const onToggle = (event: ChangeEvent<HTMLInputElement>) => {
    setAnimatePoints(event.target.checked);
  };

  return (
    <div id="animate" className="panel">
      <FormGroup>
        <FormControlLabel
          control={
            <AnimateSwitch checked={animate} onChange={onToggle} />
          }
          label="Animate"
          labelPlacement="start"
        />
      </FormGroup>
    </div>
  );
};

export default Animate;
