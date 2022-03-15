import * as React from "react";
import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { TextField } from "@mui/material";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 550,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

/*
id : array
column : array of object as {
  name,
  type: [field,select]
  selectOption:array
}
*/

export default function EditModal(props) {
  const [open, setOpen] = React.useState(false);
  const [selectId, setSelectId] = React.useState(props.userIdList[0]);
  const [selectColumn, setSelectColumn] = React.useState(
    props.editableColumn[0]
  );
  const [value, setValue] = React.useState("");
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <div>
      <Button onClick={handleOpen} variant="contained">
        แก้ไขข้อมูล
      </Button>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={open}>
          <Box sx={style}>
            <div className="font-kanit text-2xl">แก้ไขข้อมูล</div>
            <div className="mt-5">
              <div className="w-20 inline-block mr-5">
                <FormControl fullWidth>
                  <InputLabel id="demo-simple-select-label">ID</InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    label="ID"
                    value={selectId}
                    onChange={(event) => {
                      setSelectId(event.target.value);
                    }}
                  >
                    {props.userIdList.map((id, index) => (
                      <MenuItem key={index} value={id}>
                        {id}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </div>
              <div className="w-30 inline-block mr-5">
                <FormControl fullWidth>
                  <InputLabel id="demo-simple-select-label">Column</InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    label="Column"
                    value={selectColumn}
                    onChange={(event) => {
                      setSelectColumn(event.target.value);
                      if (event.target.value.type === "select") {
                        setValue(event.target.value.selectOption[0]);
                      }
                    }}
                  >
                    {props.editableColumn.map((column, index) => (
                      <MenuItem key={index} value={column}>
                        {column.title}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </div>
              {selectColumn.type === "select" && (
                <div className="w-30 inline-block mr-5">
                  <FormControl fullWidth>
                    <InputLabel id="demo-simple-select-label">
                      {selectColumn.title}
                    </InputLabel>
                    <Select
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      label={selectColumn.title}
                      value={value}
                      onChange={(event) => {
                        setValue(event.target.value);
                      }}
                    >
                      {selectColumn.selectOption.map((value, index) => (
                        <MenuItem key={index} value={value}>
                          {value}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </div>
              )}
              {selectColumn.type === "field" && (
                <div className="w-30 inline-block mr-5">
                  <TextField
                    id="outlined-basic"
                    label={selectColumn.title}
                    variant="outlined"
                    value={value}
                    onChange={(event) => {
                      setValue(event.target.value);
                    }}
                  />
                </div>
              )}
            </div>
            <div className="mt-5">
              <div className="mr-5 inline-block">
                <Button
                  onClick={async () => {
                    await props.callback({
                      id: selectId,
                      property: selectColumn.value,
                      value: value,
                    });
                    setOpen(false);
                  }}
                  variant="contained"
                >
                  ยืนยันการแก้ไข
                </Button>
              </div>
              <div className="inline-block mr-5">
                <Button onClick={handleClose} variant="contained" color="error">
                  ยกเลิก
                </Button>
              </div>
              <div className="inline-block">
                <Button
                  onClick={async () => {
                    await props.callback({
                      id: selectId,
                      property: selectColumn.value,
                      value: value,
                      isDeleting: true,
                    });
                    setOpen(false);
                  }}
                  color="error"
                >
                  ลบข้อมูลทั้งแถว
                </Button>
              </div>
            </div>
          </Box>
        </Fade>
      </Modal>
    </div>
  );
}
