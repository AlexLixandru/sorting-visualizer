export function getHeapSortAnimations(array) {
    const animations = [];
    if (array.length <= 1) return array;
    const javaScriptSortedArray = array.slice().sort((a, b) => a - b);
    if (arraysAreEqual(javaScriptSortedArray, array)) return animations;
    const auxiliaryArray = array.slice();
    doHeapSort(animations, auxiliaryArray)
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

  export function heapify(arr,length, i, animations){
      let largest = i
      let left = i*2 + 1
      let right = left +1
    if(left>=0 && left< length && right >=0 && right<length){
      animations.push([left, right, "color", i,length])}
      
      if(left < length && arr[left]>arr[largest]){
          largest = left
      }

      if(right < length && arr[right]>arr[largest]){
          largest = right
      }
      if(largest !=i){
          animations.push([i, largest, "swapColor", right===largest?left:right, length]);
          animations.push([i, largest, "swap"]);
          animations.push([i, largest, "swapped"]);
          if(left>=0 && left< length ){
         // animations.push([i, left, "uncolor", right, length]);
        }
          [arr[i], arr[largest]] = [arr[largest], arr[i]]
          heapify(arr, length, largest, animations)
      }else{

        if(left>=0 && left< length){
          //animations.push([i, left, "uncolor", right, length]);
        }
      }
     
      return arr
  }

  function doHeapSort(animations, arr){
      let length = arr.length
      let i = Math.floor(length/2 - 1)
      let k = length - 1

      while (i>=0){
          heapify(arr, length, i, animations)
          i--
      }

      while (k>=0){
        animations.push([0, k, "swapColor", undefined, k]);
        animations.push([0, k, "swap"]);
        animations.push([0, k, "swapped"]);
        animations.push([0, k, "finalSwap"]);
        [arr[0], arr[k]] = [arr[k], arr[0]]
        heapify(arr,k,0, animations)
        k--
      }
      return arr
  }