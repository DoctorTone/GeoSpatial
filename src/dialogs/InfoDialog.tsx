import { useState, useEffect } from "react";
import Typography from "@mui/material/Typography";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import Button from "@mui/material/Button";
import Link from "@mui/material/Link";
import useStore from "../state/store";

const InfoDialog = () => {
  const [dialogOpen, setDialogOpen] = useState(false);
  const infoDialogOpen = useStore((state) => state.infoDialogOpen);
  const setShowInfoDialog = useStore((state) => state.setShowInfoDialog);

  const handleClose = () => {
    setDialogOpen(false);
    setShowInfoDialog(false);
  };

  useEffect(() => {
    setDialogOpen(infoDialogOpen ? true : false);
  }, [infoDialogOpen]);

  return (
    <>
      <Dialog
        onClose={handleClose}
        open={dialogOpen}
        maxWidth={"md"}
        fullWidth={true}
        slotProps={{
          paper: {
            sx: {
              opacity: 0.75,
              backgroundColor: "#222222",
              color: "#cccccc",
              borderRadius: "30px",
              border: "1px solid rgba(255, 255, 255, 0.3)",
            },
          },
        }}
      >
        <DialogTitle>Lightning Visualisation</DialogTitle>
        <DialogContent dividers>
          <Typography variant="h6">
            Earth map from{" "}
            <Link
              variant="h6"
              underline="none"
              href="https://visibleearth.nasa.gov/collection/1484/blue-marble"
              target="_blank"
              rel="noopener"
            >
              NASA blue marble
            </Link>
            . Lightning data from{" "}
            <Link
              variant="h6"
              underline="none"
              href="https://lightning.nsstc.nasa.gov/data/"
              target="_blank"
              rel="noopener"
            >
              NASA Earth Data
            </Link>
            {"."}
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button
            variant="contained"
            onClick={handleClose}
            sx={{ mr: 1, mb: 1 }}
          >
            OK
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default InfoDialog;
