export function getBubbleSortAnimations(array) {
    const animations = [];
    if (array.length <= 1) return array;
    const auxiliaryArray = array.slice();
    doBubbleSort(animations, auxiliaryArray);
    return animations;
  };


export function doBubbleSort(animations, inputArr) {
    var swapped;
    var change = false;
    var n = inputArr.length;
    do {
        n--
        swapped = false;
        for (let i = 0; i <n; i++) {
            change=false;
            if(i!==inputArr.length-1){
                animations.push([i,i+1,change])}
            if (inputArr[i] > inputArr[i + 1]) {
                let tmp = inputArr[i];
                inputArr[i] = inputArr[i + 1];
                inputArr[i + 1] = tmp;
                change=true;
                swapped = true;
                animations.push([i,i+1,change, 0])
                animations.push([i,i+1,change, 1])
                animations.push([i,i+1,change, 2])
            }
            if(i===n-1){
                animations.push([i, i+1, undefined, undefined, true])
            }
            
        }
        
    } while (swapped);
    //animations.push([undefined, undefined, undefined, undefined, undefined, 1])
    //animations.push([undefined, undefined, undefined, undefined, undefined, 2])
    return inputArr;
};

