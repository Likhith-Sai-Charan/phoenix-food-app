import { Box, Button, Modal, TextField } from "@mui/material";
import { DateTimePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { createEventAction } from "../../State/Restaurant/Action";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

const initialValues = {
  image: "",
  location: "",
  name: "",
  startedAt: null,
  endsAt: null,
};

const Events = () => {
  const dispatch = useDispatch();
  const jwt = localStorage.getItem("jwt");
  const { restaurant } = useSelector((store) => store);
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [formValues, setFormValues] = React.useState(initialValues);

  const handleSubmit = (e) => {
    {
      /* 
    const payload = {
      ...formValues,
      startedAt: formValues.startedAt?.format("MMMM DD, YYYY hh:mm A"),
      endsAt: formValues.endsAt?.format("MMMM DD, YYYY hh:mm A"),
    };
    console.log(payload); */
    }
    e.preventDefault();

    const data = {
      ...formValues,
      startedAt: formValues.startedAt?.format("MMMM DD, YYYY hh:mm A"),
      endsAt: formValues.endsAt?.format("MMMM DD, YYYY hh:mm A"),
    };

    console.log("Submit ", data);
    dispatch(
      createEventAction({
        data,
        restaurantId: restaurant.usersRestaurant?.id,
        jwt,
      })
    );
    setFormValues(initialValues);
  };

  const handleFormChange = (e) => {
    setFormValues({ ...formValues, [e.target.name]: e.target.value });
  };

  const handleDateChange = (date, dateType) => {
    setFormValues({ ...formValues, [dateType]: date });
  };

  return (
    <div>
      <div className="p-5">
        <Button variant="contained" onClick={handleOpen}>
          Create New Event
        </Button>
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            <form onSubmit={handleSubmit}>
              <div className="flex flex-wrap -mx-2">
                <div className="w-full px-2 mb-4">
                  {/* if item xs={12} is not working in Grid we have to use this sx={{ gridColumn: "span 12" }}*/}
                  <TextField
                    fullWidth
                    id="image"
                    name="image"
                    label="Image URL"
                    variant="outlined"
                    onChange={handleFormChange}
                    value={formValues.image}
                  ></TextField>
                </div>
                <div className="w-full px-2 mb-4">
                  {/* if item xs={12} is not working in Grid we have to use this sx={{ gridColumn: "span 12" }}*/}
                  <TextField
                    fullWidth
                    id="location"
                    name="location"
                    label="Location"
                    variant="outlined"
                    onChange={handleFormChange}
                    value={formValues.location}
                  ></TextField>
                </div>
                <div className="w-full px-2 mb-4">
                  {/* if item xs={12} is not working in Grid we have to use this sx={{ gridColumn: "span 12" }}*/}
                  <TextField
                    fullWidth
                    id="name"
                    name="name"
                    label="Event Name"
                    variant="outlined"
                    onChange={handleFormChange}
                    value={formValues.name}
                  ></TextField>
                </div>
                <div className="w-full px-2 mb-4">
                  {/* if item xs={12} is not working in Grid we have to use this sx={{ gridColumn: "span 12" }}*/}
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DateTimePicker
                      slots={{ textField: TextField }}
                      slotProps={{
                        textField: {
                          fullWidth: true,
                        },
                      }}
                      enableAccessibleFieldDOMStructure={false}
                      label="Start Date and Time"
                      value={formValues.startedAt}
                      onChange={(newValue) =>
                        handleDateChange(newValue, "startedAt")
                      }
                      inputFormat="MM/dd/yyyy hh:mm a"
                      className="w-full"
                      sx={{ width: "100%" }}
                    />
                  </LocalizationProvider>
                </div>
                <div className="w-full px-2 mb-4">
                  {/* if item xs={12} is not working in Grid we have to use this sx={{ gridColumn: "span 12" }}*/}
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DateTimePicker
                      slots={{ textField: TextField }}
                      slotProps={{
                        textField: {
                          fullWidth: true,
                        },
                      }}
                      enableAccessibleFieldDOMStructure={false}
                      label="End Date and Time"
                      value={formValues.endsAt}
                      onChange={(newValue) =>
                        handleDateChange(newValue, "endsAt")
                      }
                      inputFormat="MM/dd/yyyy hh:mm a"
                      className="w-full"
                      sx={{ width: "100%" }}
                    />
                  </LocalizationProvider>
                </div>
                <div className="w-full px-2 mb-4">
                  <Button variant="contained" color="primary" type="submit">
                    SUBMIT
                  </Button>
                </div>
              </div>
            </form>
          </Box>
        </Modal>
      </div>
    </div>
  );
};

export default Events;
