export function getQuickSortAnimations(array) {
    const animations = [];
    if (array.length <= 1) return array;
    const javaScriptSortedArray = array.slice().sort((a, b) => a - b);
    if (arraysAreEqual(javaScriptSortedArray, array)) return animations;
    const auxiliaryArray = array.slice();
    doQuickSort(animations, auxiliaryArray, 0, auxiliaryArray.length - 1);
    return animations;
  }
  function arraysAreEqual(arrayOne, arrayTwo) {
    if (arrayOne.length !== arrayTwo.length) return false;
    for (let i = 0; i < arrayOne.length; i++) {
      if (arrayOne[i] !== arrayTwo[i]) {
        return false;
      }
    }
    return true;
  }
  
  function swap(animations, items, leftIndex, rightIndex) {
    var temp = items[leftIndex];
    items[leftIndex] = items[rightIndex];
    items[rightIndex] = temp;
  }

  export function quickSortPartition(items, left, right, animations) {
    let pivotIndex = Math.floor((right + left) / 2)
    var pivot = items[pivotIndex], //middle element
      i = left, //left pointer
      j = right; //right pointer

    animations.push([pivotIndex, undefined, "setPivot"])
    animations.push([i, j, "setPointers", pivotIndex])    

    while (i <= j) {
      while (items[i] < pivot) {   
        i++;
        if(i!==j){
        animations.push([i, i-1, "setNextIndexi", pivotIndex])}
      }
      while (items[j] > pivot) {
        j--;
        if(j!==i){
        animations.push([j, j+1, "setNextIndexj", pivotIndex])}
      }
      if (i <= j) {
        if(i!==j){
        animations.push([i,j,"swapColor"])
        animations.push([i, j, "swap"])
        animations.push([i, j, "swapped"])}
        swap(animations, items, i, j); //sawpping two elements
        i++;
        j--;
        if(j>i){
        animations.push([i, j, "setPointers", pivotIndex])}  
      }
    }
    animations.push([undefined, undefined, "doneIteration"])
    return i;
  }
  
  export function doQuickSort(animations, items, left, right) {
    var index;
    if (items.length > 1) {
      index = quickSortPartition(items, left, right, animations); //index returned from partition
      if (left < index - 1) {
        //more elements on the left side of the pivot
        doQuickSort(animations, items, left, index - 1);
      }
      if (index < right) {
        //more elements on the right side of the pivot
        doQuickSort(animations, items, index, right);
      }
    }
    return items;
  }