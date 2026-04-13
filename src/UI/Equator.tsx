import { styled } from "@mui/material/styles";
import Switch, { switchClasses } from "@mui/material/Switch";
import type { ChangeEvent } from "react";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import useStore from "../state/store";

const EquatorSwitch = styled(Switch)({
  [`& .${switchClasses.track}`]: {
    backgroundColor: "yellow",
  },
});

const Equator = () => {
  const showEquator = useStore((state) => state.showEquator);
  const setShowEquator = useStore((state) => state.setShowEquator);

  const onToggle = (event: ChangeEvent<HTMLInputElement>) => {
    setShowEquator(event.target.checked);
  };

  return (
    <div id="equator" className="panel">
      <FormGroup>
        <FormControlLabel
          control={
            <EquatorSwitch checked={showEquator} onChange={onToggle} />
          }
          label="Equator"
          labelPlacement="start"
        />
      </FormGroup>
    </div>
  );
};

export default Equator;
