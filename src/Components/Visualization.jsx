import React, { useState } from 'react';

function Visualization(props) {

    const array = props.array
    const width = array.length < 6 ?
        9 : array.length < 10 ?
            4.7 : array.length < 15 ?
                3.5 : array.length < 20 ?
                    2.3 : array.length < 30 ?
                        1.3 : array.length < 50 ?
                            1 : array.length < 65 ?
                                0.8 : array.length < 80 ?
                                    0.7 : array.length < 110 ?
                                        0.5 : array.length < 140 ?
                                            0.4 : 0.3;
    const margin = array.length < 6 ?
        5 : array.length < 10 ?
            4 : array.length < 15 ?
                3 : array.length < 20 ?
                    1.8 : array.length < 30 ?
                        1.5 : array.length < 50 ?
                            1 : array.length < 65 ?
                                0.9 : array.length < 80 ?
                                    0.8 : array.length < 110 ?
                                        0.7 : array.length < 140 ?
                                            0.6 : 0.5;

    return (
        <div className="visualizationContainer">
            <div className="arrayContainer">
                {console.log(array.length)}
                {props.array.map((item, index) => (
                    <div style={{
                        width: `${width}%`,
                        marginLeft: `${margin}px`,
                        marginRight: `${margin}px`,
                        height: `${item}px`
                    }}
                        className="bar"
                        key={index}>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default Visualization