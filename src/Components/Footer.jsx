import React from 'react';
import Slider from '@material-ui/core/Slider';
import Grid from '@material-ui/core/Grid';

function Footer(props) {

    function handleChangeBars(event, newValue) {
        props.setNumberBars(newValue);
    };

    function handleChangeSpeed(event, newValue) {
        props.setSpeed(newValue);
    }

    return (
        <footer>
            <Grid container spacing = {0} justify="center">
                <Grid item xs={6}>
                    <h1>Number of element: {props.nrBars}</h1>
                    <Slider
                        className="rail"
                        style={{ width: "230px", color:"white", marginTop:"10px"}}
                        min={4}
                        max={160}
                        defaultValue={20}
                        onChange={handleChangeBars}
                        disabled={props.disabled} />
                </Grid>
                <Grid item xs = {6}>
                    <h1>Animation speed: {props.speed}ms</h1>
                        <Slider
                        style={{ height:"5", width: "230px", color:"white", marginTop:"10px"}}
                        min={2}
                        max={1000}
                        defaultValue={200}
                        onChange={handleChangeSpeed} 
                        disabled={props.disabled}
                        />
                </Grid>
            </Grid>
        </footer>
    )
}

export default Footer; 