import React, { useEffect, useState } from 'react';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid'
function Header(props) {
    console.log(props.disabled);

    function handleClickMergeSort() {
        props.mergeSort();
    }

    function handleClickQuickSort() {
        props.quickSort();
    }

    function handleClickHeapSort() {
        props.heapSort();
    }

    function handleClickBubbleSort() {
        props.bubbleSort();
    }

    return (
        <header>
            <Grid container justify="space-between" alignItems="center">
                <Grid item>
                    <h1>Sorting Visualizer</h1>
                </Grid>
                <Grid item>
                    <Button
                        className="buttonHeader"
                        size="large"
                        onClick={handleClickMergeSort}
                        style={{letterSpacing: "1.4px", fontSize: "16px",fontWeight:"bold", fontFamily: "McLaren, cursive", color: props.disabled?"#05386B":"white", marginLeft:"10px"}}
                        disabled={props.disabled}

                    >
                        Merge Sort
                    </Button>
                    <Button
                        className="buttonHeader"
                        size="large"
                        onClick={handleClickHeapSort}
                        style={{letterSpacing: "1.4px", fontSize: "16px",fontWeight:"bold", fontFamily: "McLaren, cursive", color: props.disabled?"#05386B":"white", marginLeft:"10px"}}
                        disabled={props.disabled}

                    >
                        Heap Sort
                    </Button>
                    <Button
                        className="buttonHeader"
                        size="large"
                        onClick={handleClickBubbleSort}
                        style={{letterSpacing: "1.4px", fontSize: "16px",fontWeight:"bold", fontFamily: "McLaren, cursive", color: props.disabled?"#05386B":"white", marginLeft:"10px"}}
                        disabled={props.disabled}
  
                    >
                        Bubble Sort
                        </Button>
                    <Button
                        className="buttonHeader"
                        size="large"
                        onClick={handleClickQuickSort}
                        style={{letterSpacing: "1.4px", fontSize: "16px",fontWeight:"bold", fontFamily: "McLaren, cursive", color: props.disabled?"#05386B":"white", marginLeft:"10px"}}
                        disabled={props.disabled}

                    >
                        Quick Sort
                    </Button>
                    <Button
                        style={{letterSpacing: "1.4px",fontSize: "15px",fontWeight:"bold", fontFamily: "McLaren, cursive", backgroundColor: !props.disabled?"#05386B":"grey", color: "white", marginLeft:"10px"}}
                        size="large"
                        onClick={props.newArray}
                        variant="contained"
                        disabled={props.disabled}
                    >
                        Generate new array
                    </Button>
                </Grid>
            </Grid>
        </header>
    )
}

export default Header