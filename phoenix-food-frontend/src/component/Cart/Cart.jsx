import {
  Box,
  Button,
  Card,
  Divider,
  Grid,
  Modal,
  TextField,
} from "@mui/material";
import React, { useEffect } from "react";
import CartItem from "./CartItem";
import AddressCard from "./AddressCard";
import AddLocationAltIcon from "@mui/icons-material/AddLocationAlt";
import { ErrorMessage, Field, Form, Formik } from "formik";
import { useDispatch, useSelector } from "react-redux";
import { createOrder, getUsersOrders } from "../../State/Order/Action";
import { clearCartAction } from "../../State/Cart/Action";
//import * as Yup from "yup";

export const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  outline: "none",
  boxShadow: 24,
  p: 4,
};

const initialValues = {
  streetAddress: "",
  state: "",
  pincode: "",
  city: "",
};

//const validationSchema = Yup.object().shape({
//  streetAddress: Yup.string().required("Street Address is Required"),
//  state: Yup.string().required("State  is Required"),
//  pincode: Yup.number()
//    .typeError("Pincode must be a number")
//    .required("Pincode is Required"),
//  city: Yup.string().required("City is Required"),
//});

const Cart = () => {
  const handleOpenAddressModel = () => setOpen(true);
  const [open, setOpen] = React.useState(false);

  //const { cart, auth } = useSelector((store) => store);
  const cart = useSelector((store) => store.cart);
  const auth = useSelector((store) => store.auth);
  const orderState = useSelector((store) => store.order);
  const jwt = localStorage.getItem("jwt");

  const dispatch = useDispatch();

  useEffect(() => {
    if (auth.user?.id) {
      dispatch(getUsersOrders(jwt)); // fetch all user orders
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const userAddresses = orderState.orders
    ?.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
    ?.map((order) => order.deliveryAddress)
    ?.filter(Boolean)
    .filter(
      (value, index, self) =>
        index ===
        self.findIndex(
          (t) =>
            t.streetAddress === value.streetAddress &&
            t.city === value.city &&
            t.stateProvince === value.stateProvince &&
            t.postalCode === value.postalCode
        )
    )
    .slice(0, 5);

  const createOrderUsingSelectedAddress = (address) => {
    const data = {
      jwt: localStorage.getItem("jwt"),
      order: {
        restaurantId: cart.cartItems?.[0]?.food?.restaurant?.id,
        deliveryAddress: address,
      },
    };
    dispatch(createOrder(data)).then(() => {
      // Clear cart after successful order creation
      dispatch(clearCartAction());
    });
  };

  const handleClose = () => setOpen(false);
  const handleSubmit = (values) => {
    console.log("form value", values);
    const data = {
      jwt: localStorage.getItem("jwt"),
      order: {
        restaurantId: cart.cartItems?.[0]?.food?.restaurant?.id,
        deliveryAddress: {
          fullName: auth.user?.fullName,
          streetAddress: values.streetAddress,
          city: values.city,
          stateProvince: values.state,
          postalCode: values.pincode,
          country: "India",
        },
      },
    };
    dispatch(createOrder(data)).then(() => {
      // Clear cart after successful order creation
      dispatch(clearCartAction());
    });
  };

  return (
    <>
      <main className="lg:flex justify-between">
        <section className="lg:w-[30%] space-y-6 lg:min-h-screen pt-10">
          {cart.cartItems?.map((item, index) => (
            <CartItem key={index} item={item} />
          ))}
          <Divider />
          <div className="billDetails px-5 text-sm">
            <p className="font-extralight py-5">Bill Details</p>
            <div className="space-y-3">
              <div className="flex justify-between text-gray-400">
                <p>Item Total</p>
                <p>₹{cart.cart?.total}</p>
              </div>
              <div className="flex justify-between text-gray-400">
                <p>Deliver Fee</p>
                <p>₹21</p>
              </div>
              <div className="flex justify-between text-gray-400">
                <p>GST And Restaurant Charges</p>
                <p>₹33</p>
              </div>
              <Divider />
            </div>
            <div className="flex justify-between text-gray-400">
              <p>Total Pay</p>
              <p>₹{cart.cart?.total + 33 + 21}</p>
            </div>
          </div>
        </section>
        <Divider orientation="vertical" flexItem />
        <section className="lg:w-[70%] flex justify-center px-5 pb-10 lg:pb-0">
          <div>
            <h1 className="text-center font-semibold text-2xl py-10">
              Choose Delivery Address
            </h1>
            <div className="flex gap-5 flex-wrap justify-center">
              {userAddresses.map((address, index) => (
                <AddressCard
                  key={index}
                  handleSelectAddress={createOrderUsingSelectedAddress}
                  item={address}
                  showButton={true}
                />
              ))}
              <Card className="flex gap-5 w-64 p-5">
                <AddLocationAltIcon />
                <div className="space-y-3 text-gray-500">
                  <h1 className="font-semibold text-lg text-white">
                    Add New Address
                  </h1>

                  <Button
                    variant="outlined"
                    fullWidth
                    onClick={handleOpenAddressModel}
                  >
                    Add
                  </Button>
                </div>
              </Card>
            </div>
          </div>
        </section>
      </main>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Formik
            initialValues={initialValues}
            //validationSchema={validationSchema}
            onSubmit={handleSubmit}
          >
            <Form>
              <Grid container spacing={2}>
                <Grid sx={{ width: "100%" }}>
                  <Field
                    as={TextField}
                    name="streetAddress"
                    label="Street Address"
                    fullWidth
                    variant="outlined"
                    //error={!ErrorMessage("streetAddress")}
                    //helperText={
                    //  <ErrorMessage>
                    //    {(msg) => <span className="text-red-600">{msg}</span>}
                    //  </ErrorMessage>
                    //}
                  />
                </Grid>
                <Grid sx={{ width: "100%" }}>
                  <Field
                    as={TextField}
                    name="city"
                    label="city"
                    fullWidth
                    variant="outlined"
                    //error={!ErrorMessage("streetAddress")}
                    //helperText={
                    //  <ErrorMessage>
                    //    {(msg) => <span className="text-red-600">{msg}</span>}
                    //  </ErrorMessage>
                    //}
                  />
                </Grid>
                <Grid sx={{ width: "100%" }}>
                  <Field
                    as={TextField}
                    name="state"
                    label="state"
                    fullWidth
                    variant="outlined"
                    //error={!ErrorMessage("streetAddress")}
                    //helperText={
                    //  <ErrorMessage>
                    //    {(msg) => <span className="text-red-600">{msg}</span>}
                    //  </ErrorMessage>
                    //}
                  />
                </Grid>
                <Grid sx={{ width: "100%" }}>
                  <Field
                    as={TextField}
                    name="pincode"
                    label="pincode"
                    fullWidth
                    variant="outlined"
                    //error={!ErrorMessage("streetAddress")}
                    //helperText={
                    //  <ErrorMessage>
                    //    {(msg) => <span className="text-red-600">{msg}</span>}
                    //  </ErrorMessage>
                    //}
                  />
                </Grid>
                <Grid sx={{ width: "100%" }}>
                  <Button
                    fullWidth
                    variant="contained"
                    type="submit"
                    color="primary"
                  >
                    Deliver Here
                  </Button>
                </Grid>
              </Grid>
            </Form>
          </Formik>
        </Box>
      </Modal>
    </>
  );
};

export default Cart;
