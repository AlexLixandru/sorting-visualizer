import React, { useEffect, useState } from "react";
import Header from "./Header"
import Visualization from "./Visualization"
import Footer from "./Footer"
import { getBubbleSortAnimations } from "../Algorithms/BubbleSort";
import { getMergeSortAnimations } from '../Algorithms/MergeSort';
import { getQuickSortAnimations } from '../Algorithms/QuickSort'
import { getHeapSortAnimations } from '../Algorithms/HeapSort'


function App() {

  const PRIMARY_COLOR = '#5CDB95';
  const SECONDARY_COLOR = "red"
  const THIRD_COLOR = "#2191FB"
  const DONE_COLOR = "#9213d1"

  const [ANIMATION_SPEED_MS, setAnimationSpeed] = useState(200);
  const [NUMBER_OF_ARRAY_BARS, setNumberBars] = useState(20);
  const [disabled, setDisabled] = useState(false);
  const [array, setArray] = useState(generateArray());


  useEffect(() => {
    handleNewArray();
  }, [NUMBER_OF_ARRAY_BARS]);


  function randomIntFromInterval(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
  }

  function generateArray() {
    let x = []
    for (let i = 0; i < NUMBER_OF_ARRAY_BARS; i++) {
      x.push(randomIntFromInterval(50, 500))
    }
    return x;
  }

  function handleNewArray() {
    let x = generateArray();
    setArray(x);
    setBarsColor(PRIMARY_COLOR)
  }

  function setBarsColor(color) {
    const arrayBars = document.getElementsByClassName("bar");
    var arrayLength = arrayBars.length;
    for (let j = 0; j < arrayLength; j++) {
      var jBarStyle = arrayBars[j].style;
      jBarStyle.backgroundColor = color;
    }
  }

  function doneAnimation(i, length){
    if (i === length - 1) {
      const arrayBars = document.getElementsByClassName("bar");
      var arrayLength = arrayBars.length;
      for (let j = 0; j < arrayLength; j++) {
        setTimeout(() => {
          var jBarStyle = arrayBars[j].style;
          jBarStyle.backgroundColor = THIRD_COLOR;
        }, (length - 1) * ANIMATION_SPEED_MS + 600 + j * 10)
      }
      setTimeout(() => {
        setBarsColor(DONE_COLOR)
        setDisabled(false);
      }, (length - 1) * ANIMATION_SPEED_MS + 1300 + NUMBER_OF_ARRAY_BARS * 10)
    }
   
  }

  async function bubbleSort() {
    setDisabled(true);
    const animations = await getBubbleSortAnimations(array);
    const arrayBars = document.getElementsByClassName('bar');
    for (let i = 0; i < animations.length; i++) {
      setTimeout(() => {
        const [barOneIdx, barTwoIdx, swapped, index, last] = animations[i];
        const barOneStyle = arrayBars[barOneIdx].style;
        const barTwoStyle = arrayBars[barTwoIdx].style;
        if (swapped && index === 1) {
          var aux = array[barOneIdx];
          array[barOneIdx] = array[barTwoIdx];
          array[barTwoIdx] = aux;
          barOneStyle.height = `${array[barOneIdx]}px`;
          barTwoStyle.height = `${array[barTwoIdx]}px`;
        }
        else if (swapped && index === 0) {
          barOneStyle.backgroundColor = SECONDARY_COLOR;
          barTwoStyle.backgroundColor = SECONDARY_COLOR;
        } else if ((swapped && index === 2) || !swapped) {
          barOneStyle.backgroundColor = THIRD_COLOR;
          barTwoStyle.backgroundColor = THIRD_COLOR;
        }
        if (last) {
          barOneStyle.backgroundColor = PRIMARY_COLOR;
          barTwoStyle.backgroundColor = DONE_COLOR;
        }

        var currentPosition = barOneIdx;
        for (let j = 0; j < currentPosition; j++) {
          var jBarStyle = arrayBars[j].style;
          jBarStyle.backgroundColor = PRIMARY_COLOR;
        }
      }, i * ANIMATION_SPEED_MS + 500);
      doneAnimation(i, animations.length);
    }
  }

  function mergeSort() {
    setDisabled(true);
    var placeholderArray = array.slice();
    const animations = getMergeSortAnimations(placeholderArray);
    for (let i = 0; i < animations.length; i++) {
      setTimeout(() => {

        const arrayBars = document.getElementsByClassName('bar');
        const [barOneIdx, barTwoIdx, action, done, message] = animations[i];
        if (action === "swap") {
          if (barTwoIdx < NUMBER_OF_ARRAY_BARS) {
            const aux = array[barTwoIdx]
            array.splice(barTwoIdx, 1);
            array.splice(barOneIdx, 0, aux);
            for (let j = done ? barOneIdx : 0; j < NUMBER_OF_ARRAY_BARS; j++) {
              const barThreeStyle = arrayBars[j].style;
              barThreeStyle.height = `${array[j]}px`;
              barThreeStyle.backgroundColor = PRIMARY_COLOR;
            }
            arrayBars[barOneIdx].style.backgroundColor = SECONDARY_COLOR
            arrayBars[barOneIdx + 1].style.backgroundColor = SECONDARY_COLOR

          }
        }
        if (action === "colorCompare") {
          if (barTwoIdx < NUMBER_OF_ARRAY_BARS && barOneIdx >= 0) {
            for (let j = done ? barOneIdx : 0; j < NUMBER_OF_ARRAY_BARS; j++) {
              const style = arrayBars[j].style;
              style.backgroundColor = PRIMARY_COLOR;
            }
            const barOneStyle = arrayBars[barOneIdx].style;
            const barTwoStyle = arrayBars[barTwoIdx].style;
            barOneStyle.backgroundColor = THIRD_COLOR;
            barTwoStyle.backgroundColor = THIRD_COLOR;
          }
        }

        if (action === "colorSwap") {
          const barOneStyle = arrayBars[barOneIdx].style;
          const barTwoStyle = arrayBars[barTwoIdx].style;
          barOneStyle.backgroundColor = SECONDARY_COLOR;
          barTwoStyle.backgroundColor = SECONDARY_COLOR;
        }

        if (action === "colorDone") {
          const barOneStyle = arrayBars[barOneIdx].style;
          barOneStyle.backgroundColor = DONE_COLOR;
          if (barOneIdx + 1 === array.length - 1) {
            setBarsColor(DONE_COLOR);
          }
        }

      }, i * ANIMATION_SPEED_MS + 500);
      doneAnimation(i, animations.length);
    }

  }

  async function quickSort() {
    setDisabled(true);
    const animations = await getQuickSortAnimations(array);
    const arrayBars = document.getElementsByClassName('bar');
    if (animations.length ===0){
      setDisabled(false);
    }
    for (let i = 0; i < animations.length; i++) {
      setTimeout(() => {
        const [barOneIdx, barTwoIdx, action, pivotIndex] = animations[i];
        if (action === "setPivot") {
          const barOneStyle = arrayBars[barOneIdx].style;
          barOneStyle.backgroundColor = "yellow";
        }

        if (action === "setPointers") {
          if (barOneIdx >= 0 && barOneIdx < NUMBER_OF_ARRAY_BARS) {
            const barOneStyle = arrayBars[barOneIdx].style;
            barOneStyle.backgroundColor = SECONDARY_COLOR;
          }
          if (barTwoIdx >= 0 && barTwoIdx < NUMBER_OF_ARRAY_BARS) {
            const barTwoStyle = arrayBars[barTwoIdx].style;
            barTwoStyle.backgroundColor = SECONDARY_COLOR;
          }
          if (barOneIdx !== 0) {
            const previousStyle = arrayBars[barOneIdx - 1].style;
            previousStyle.backgroundColor = (pivotIndex === barTwoIdx + 1) ? "yellow" : PRIMARY_COLOR;
          }
          if (barTwoIdx < NUMBER_OF_ARRAY_BARS - 1) {
            const previousStyle = arrayBars[barTwoIdx + 1].style;
            previousStyle.backgroundColor = (pivotIndex === barOneIdx - 1) ? "yellow" : PRIMARY_COLOR;
          }
        }



        if (action === "setNextIndexi") {
          const barOneStyle = arrayBars[barOneIdx].style;
          const barTwoStyle = arrayBars[barTwoIdx].style;
          barOneStyle.backgroundColor = SECONDARY_COLOR;
          barTwoStyle.backgroundColor = barTwoIdx !== pivotIndex ? PRIMARY_COLOR : "yellow"
        }

        if (action === "setNextIndexj") {
          const barOneStyle = arrayBars[barOneIdx].style;
          const barTwoStyle = arrayBars[barTwoIdx].style;
          barOneStyle.backgroundColor = SECONDARY_COLOR;
          barTwoStyle.backgroundColor = barTwoIdx !== pivotIndex ? PRIMARY_COLOR : "yellow";
        }

        if (action === "swapColor") {
          const barOneStyle = arrayBars[barOneIdx].style;
          const barTwoStyle = arrayBars[barTwoIdx].style;
          barOneStyle.backgroundColor = THIRD_COLOR;
          barTwoStyle.backgroundColor = THIRD_COLOR;
        }

        if (action === "swap") {
          const barOneStyle = arrayBars[barOneIdx].style;
          const barTwoStyle = arrayBars[barTwoIdx].style;
          var aux = array[barOneIdx];
          array[barOneIdx] = array[barTwoIdx];
          array[barTwoIdx] = aux;
          barOneStyle.height = `${array[barOneIdx]}px`;
          barTwoStyle.height = `${array[barTwoIdx]}px`;
        }

        if (action === "swapped") {
          const barOneStyle = arrayBars[barOneIdx].style;
          const barTwoStyle = arrayBars[barTwoIdx].style;
          barOneStyle.backgroundColor = SECONDARY_COLOR;
          barTwoStyle.backgroundColor = SECONDARY_COLOR;
        }

        if (action === "doneIteration") {
          for (let j = 0; j < NUMBER_OF_ARRAY_BARS; j++) {
            var jBarStyle = arrayBars[j].style;
            jBarStyle.backgroundColor = PRIMARY_COLOR;
          }
        }




      }, i * ANIMATION_SPEED_MS + 500);
      doneAnimation(i, animations.length);
    }
  }

  async function heapSort() {
    setDisabled(true);
    const animations = await getHeapSortAnimations(array);
    const arrayBars = document.getElementsByClassName('bar');
    if (animations.length ===0){
      setDisabled(false);
    }
    for (let i = 0; i < animations.length; i++) {
      setTimeout(() => {
        const [barOneIdx, barTwoIdx, action, barThreeIdx, length] = animations[i];
        if (action === "swap") {
          const barOneStyle = arrayBars[barOneIdx].style;
          const barTwoStyle = arrayBars[barTwoIdx].style;
          var aux = array[barOneIdx];
          array[barOneIdx] = array[barTwoIdx];
          array[barTwoIdx] = aux;
          barOneStyle.height = `${array[barOneIdx]}px`;
          barTwoStyle.height = `${array[barTwoIdx]}px`;
        }

        if (action === "swapColor") {

          for (let j = 0; j < length; j++) {
            var jBarStyle = arrayBars[j].style;
            jBarStyle.backgroundColor = PRIMARY_COLOR;
          }
          const barOneStyle = arrayBars[barOneIdx].style;
          const barTwoStyle = arrayBars[barTwoIdx].style;

          barOneStyle.backgroundColor = SECONDARY_COLOR;
          barTwoStyle.backgroundColor = SECONDARY_COLOR;
          if (barThreeIdx >= 0 && barThreeIdx < length) {
            const barThreeStyle = arrayBars[barThreeIdx].style;
            barThreeStyle.backgroundColor = THIRD_COLOR;
          }
        }

        if (action === "swapped") {
          const barOneStyle = arrayBars[barOneIdx].style;
          const barTwoStyle = arrayBars[barTwoIdx].style;
          barOneStyle.backgroundColor = "yellow";
          barTwoStyle.backgroundColor = THIRD_COLOR;
        }

        if (action === "color") {
          for (let j = 0; j < length; j++) {
            var jBarStyle = arrayBars[j].style;
            jBarStyle.backgroundColor = PRIMARY_COLOR;
          }
          if (barOneIdx >= 0 && barOneIdx < NUMBER_OF_ARRAY_BARS) {
            const barOneStyle = arrayBars[barOneIdx].style;
            barOneStyle.backgroundColor = THIRD_COLOR;
          }
          if (barTwoIdx >= 0 && barTwoIdx < NUMBER_OF_ARRAY_BARS) {
            const barTwoStyle = arrayBars[barTwoIdx].style;
            barTwoStyle.backgroundColor = THIRD_COLOR;
          }
          if (barThreeIdx >= 0 && barThreeIdx < NUMBER_OF_ARRAY_BARS) {
            const barThreeStyle = arrayBars[barThreeIdx].style;
            barThreeStyle.backgroundColor = "yellow";
          }

        }

        if (action === "finalSwap") {
          const barOneStyle = arrayBars[barOneIdx].style;
          const barTwoStyle = arrayBars[barTwoIdx].style;
          barOneStyle.backgroundColor = PRIMARY_COLOR;
          barTwoStyle.backgroundColor = DONE_COLOR;
        }
      }, i * ANIMATION_SPEED_MS + 500);

      doneAnimation(i, animations.length);
    }
  }

  


  return (
    <div>
      <Header
        disabled={disabled}
        newArray={handleNewArray}
        bubbleSort={bubbleSort}
        mergeSort={mergeSort}
        quickSort={quickSort}
        heapSort={heapSort}
        setDisabled={setDisabled}
      />
      <Visualization array={array} />
      <Footer
        setNumberBars={setNumberBars}
        setSpeed={setAnimationSpeed}
        speed={ANIMATION_SPEED_MS}
        nrBars={NUMBER_OF_ARRAY_BARS}
      />
    </div>
  )
};

export default App