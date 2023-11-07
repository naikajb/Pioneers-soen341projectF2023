import React, { Component } from 'react';
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Popup from 'reactjs-popup';
import { width } from '@mui/system';
import Dialog from '@mui/material/Dialog';
import { DialogContent } from '@mui/material';
import { DialogTitle } from '@mui/material';
import { DialogActions } from '@mui/material';
import { TextField } from '@mui/material';
import { useState } from 'react';

function Edit({ data }) {
    return (
        <Popup>
            <div className="info-container">
                <div className="left-content">
                    <div className="info">
                        <h1 className="Title">Property address</h1>
                        <h2 className="Section-detail">Property Details</h2>
                        <p className="detail">Description: </p>
                        <p className="detail">Price: </p>
                        <p className="detail">Bedrooms: </p>
                        <p className="detail">Bathrooms: </p>

                        <h2 className="Section-detail">Amenities</h2>
                        <ul className="amenities-list"></ul>
                    </div>
                </div>
            </div>
        </Popup>
    )

}

// Parent component
function ParentComponent() {
    const [data, setData] = useState({
        price: 1000,
        address: "123 Main St",
        bedroom: 3,
        bathroom: 2,
        description: "This is a description of the property",
        amenities: ["amenity1", "amenity2", "amenity3"]
    });

    function handleEditProperty(newData) {
        setData(newData);
    }

    return (
        <EditCard data={data} onEditProperty={handleEditProperty} />
    );
}

// EditCard component
function EditCard(props) {
    const [open, setOpen] = useState(false);
    const [newData, setNewData] = useState(props.data);

    function handleClickOpen() {
        setOpen(true);
    }

    function handleClose() {
        setNewData(props.data);
        setOpen(false);
    }

    function handleSubmit() {

        setOpen(false);
    }

    function handleInputChange(event) {
        const { name, value } = event.target;
        setNewData(prevData => ({
            ...prevData,
            [name]: value
        }));
    }

    return (
        <Grid item xs={12} sm={6} md={4}>
        <Card>
            <CardContent className="square">
                <CardMedia
                    className='card-image'
                    component="img"
                    width={width}
                    image={newData.img}
                    alt="property image"
                />
                <Typography
                    variant="h5"
                    component="div"
                    fontWeight="bold"
                >
                    {newData.price}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    {newData.address}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    {newData.bedroom} Bedrooms
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    {newData.bathroom} Bathrooms
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    {newData.description}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                <h2 className="Section-detail">Amenities</h2>
                <ul className="amenities-list">
                    {newData.amenities.map((amenity, index) => (
                        <li key={index}>{amenity}</li>
                    ))}
                </ul>
                </Typography>
                <div>
                    <Button onClick={handleClickOpen} className="edit-button">
                        Edit This property
                    </Button>
                    <Dialog className="" open={open} onClose={handleClose}>
                        <DialogTitle>Edit Property</DialogTitle>
                        <DialogContent>
                            <TextField
                                label="Price"
                                name="price"
                                value={newData.price}
                                onChange={handleInputChange}
                            />
                            <TextField
                                label="Address"
                                name="address"
                                value={newData.address}
                                onChange={handleInputChange}
                            />
                            <TextField
                                label="Bedroom"
                                name="bedroom"
                                value={newData.bedroom}
                                onChange={handleInputChange}
                            />
                            <TextField
                                label="Bathroom"
                                name="bathroom"
                                value={newData.bathroom}
                                onChange={handleInputChange}
                            />
                            <TextField
                                label="Description"
                                name="description"
                                value={newData.description}
                                onChange={handleInputChange}
                            />
                        

                        </DialogContent>
                        <DialogActions>
                            <Button onClick={handleClose}>Cancel</Button>
                            <Button onClick={handleSubmit}>Save</Button>
                        </DialogActions>
                    </Dialog>
                </div>
            </CardContent>
        </Card>
    </Grid>
    );
}

export default EditCard;