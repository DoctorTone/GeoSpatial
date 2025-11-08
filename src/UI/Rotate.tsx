import { styled } from "@mui/material/styles";
import Switch, { switchClasses } from "@mui/material/Switch";
import type { ChangeEvent } from "react";
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
      <RotateSwitch checked={rotate} onChange={onToggle} />
    </div>
  );
};

export default Rotate;
