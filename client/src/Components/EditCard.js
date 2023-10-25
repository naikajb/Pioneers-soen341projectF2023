import React, {Component} from 'react';

const data = require('./dummyData');

function  EditCard(){
    return(
        <div className="container">
            <Grid container spacing={2}>
                {cardData.map((data, index) => (
                    <CardItem key={index} data={data} />
                ))}
            </Grid>
        </div>
    )
}

export default EditCard;