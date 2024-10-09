import React, { useEffect, useState } from "react";
import { Box, Button, Card, IconButton, Modal, Stack, Typography } from "@mui/material";
import ModeIcon from '@mui/icons-material/Mode';
import DeleteIcon from '@mui/icons-material/Delete';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import { makeStyles } from '@mui/styles';
import { useNavigate } from 'react-router-dom';


const useStyles = makeStyles(() => ({
  cardContainer: {
    width: "100%",
  },
  mainContainer: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center"
  }
}))


export const List = () => {
  const [userList, setUserList] = useState([]);
  const classes = useStyles();
  const navigate = useNavigate()
  const [openModal, setOpenModal] = useState(false);

  const handleAdd = () => {
    navigate('/add')
  };

  useEffect(() => {
    const storedData = localStorage.getItem("data");
    if (storedData) {
      setUserList(JSON.parse(storedData))
    }
  }, [])

  const handleEdit = (id) => {
    console.log("id", id);
    navigate(`/add/${id}`)
  }

  const handleDelete = (userId) => {
    if (userId) {
      const newList = userList.filter(value => value.id !== userId);
      setUserList(newList);
    }
  }
  
  return (
    <Box position={"relative"}>
      <Typography variant="h2">Lista de empleados</Typography>
      <Box className={classes.mainContainer}>
        {userList.length > 0 && userList.map((data) => (
          <Card style={{ width: "50%", marginTop: "2%" }}>
            <Box className={classes.cardContainer}>
              <Box display={"flex"} alignItems={"center"} justifyContent={"center"}>
                <Typography variant="h3">{data.name}</Typography>
                <Typography variant="h3">{`| ${data.role}`}</Typography>
              </Box>
              <Box display={"flex"} alignItems={"center"} justifyContent={"flex-end"}>
                <Stack direction={"row"} spacing={1}>
                  <IconButton aria-label="edit" onClick={() => handleEdit(data.id)}>
                    <ModeIcon />
                  </IconButton>
                  <IconButton aria-label="delete"onClick={() => setOpenModal(prevState => !prevState)} >
                    <DeleteIcon />
                  </IconButton>
                </Stack>
              </Box>
            </Box>
          </Card>
        ))}
        {userList.length === 0 && (
          <Box>
            <Typography>No existen datos</Typography>
          </Box>
        )}
      </Box>
      <Stack direction={"row"} spacing={1} style={{ position: "absolute", right: 0, bottom: 0}}>
        <IconButton aria-label="add" size="large" onClick={handleAdd}>
          <AddCircleIcon />
        </IconButton>
      </Stack>
      <Modal
        open={openModal}
        onClose={() => setOpenModal(prevState => !prevState)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        >
        <Box backgroundColor="white">
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Delete
          </Typography>
          <Button onClick={handleDelete}>Yes</Button>
          <Button onClick={() => setOpenModal(prevState => !prevState)}>No</Button>
        </Box>
        </Modal>
    </Box>
  )
};