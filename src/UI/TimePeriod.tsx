import Typography from "@mui/material/Typography";
import useStore from "../state/store";

const TimePeriod = () => {
  const currentMonth = useStore((state) => state.currentMonth);

  return (
    <div id="time" className="panel">
      <Typography variant="h4">{currentMonth}</Typography>
    </div>
  );
};

export default TimePeriod;
