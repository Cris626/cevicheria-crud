import React, { useEffect, useState } from "react";
import { Box, Button, Card, InputLabel, MenuItem, Select, TextField, Typography } from "@mui/material";
import { makeStyles } from '@mui/styles';
import { useNavigate, useParams } from 'react-router-dom';

import { Formik } from "formik";
import * as Yup from 'yup';
import Snackbar from '@mui/material/Snackbar';

const useStyles = makeStyles(() => ({
  mainContainer: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    width: "50%",
    marginTop: "2%",
  }
}))


export const Add = () => {
  const { orderId } = useParams();
  const classes = useStyles();
  const navigate = useNavigate()
  const [role, setRole] = React.useState('Seleccionar');
  const [currentList, setCurrentList] = useState([]);
  const [open, setOpen] = useState(false);
  const [initialState, setInitialState] = useState({
    name: "",
    email: "",
    message: "",
  })

  const handleChangeSelect = (event) => {
    setRole(event.target.value);
  };

  const handleClose = () => {
    setOpen(prevState => !prevState);
  }

  useEffect(() => {
    const storedData = localStorage.getItem("data");
    if (storedData) {
      setCurrentList(JSON.parse(storedData))
    }
  }, [])

  useEffect(() => {
    if (orderId && currentList.length > 0) {
      const [selectedUser] = currentList.filter(values => values.id === orderId);
      setInitialState({ ...selectedUser });
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentList])

  return (
    <Box display={"flex"} flexDirection={"column"} alignItems={"center"}>
      <Typography variant="h2">Agregar nuevo usuario</Typography>
      <Card className={classes.mainContainer}>
        <Formik
        initialValues={initialState}
        validationSchema={Yup.object().shape({
          name: Yup.string().required("Nombre requerido"),
          email: Yup.string()
            .email("Email Invalido")
            .required("Email requerido"),
          message: Yup.string().max(255).required("Mensaje requerido"),
        })}
        onSubmit={(values, { setErrors, setSubmitting }) => {
          try {
            if (role === "Seleccionar") {
              setErrors({ submit: "Role no seleccionado" })
              setSubmitting(false)
            }
            const newList = currentList;
            newList.push({ ...values, role, id: `${values.name}${values.email}` })
            localStorage.setItem('data', JSON.stringify(newList));
            setOpen(true);
            navigate("/")
          } catch (error) {
            console.log("error", error)
          }
        }}
      >
        {({ handleSubmit, touched, errors, handleBlur, handleChange, values, isSubmitting }) => (
          <form onSubmit={handleSubmit}>
            <Box>
              <InputLabel>Name</InputLabel>
              <TextField
                error={Boolean(touched.name && errors.name)}
                fullWidth
                helperText={touched.name && errors.name}
                label="Name"
                name="name"
                onBlur={handleBlur}
                onChange={handleChange}
                type="text"
                variant="outlined"
                value={values.name}
              />
            </Box>
            <Box>
              <InputLabel>Email</InputLabel>
              <TextField
                error={Boolean(touched.email && errors.email)}
                fullWidth
                helperText={touched.email && errors.email}
                label="Email"
                name="email"
                onBlur={handleBlur}
                onChange={handleChange}
                type="email"
                variant="outlined"
                value={values.email}
              />
            </Box>
            <Box>
              <InputLabel id="demo-simple-select-label">Role</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={role}
                label="Role"
                onChange={handleChangeSelect}
                name="role"
                fullWidth
              >
                <MenuItem value={"designer"}>Designer</MenuItem>
                <MenuItem value={"qa"}>QA</MenuItem>
              </Select>
            </Box>
            <Box>
              <InputLabel>Message</InputLabel>
              <TextField
                error={Boolean(touched.message && errors.message)}
                fullWidth
                helperText={touched.message && errors.message}
                label="Message"
                name="message"
                onBlur={handleBlur}
                onChange={handleChange}
                type="text"
                variant="outlined"
                value={values.message}
              />
            </Box>
            <Button type="submit" size="large" fullWidth disabled={isSubmitting}>
              Submit
            </Button>
          </form>
        )}
      </Formik>
      </Card>
      
      <Snackbar
        open={open}
        autoHideDuration={2000}
        onClose={handleClose}
        message="Se registro nuevo usuario"
      />
    </Box>
  )
};