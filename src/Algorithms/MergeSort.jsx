import { SystemUpdate } from "@material-ui/icons";

export function getMergeSortAnimations(array) {
  const animations = [];
  if (array.length <= 1) return array;
  const auxiliaryArray = array.slice();
  mergeSortHelper(array, 0, array.length - 1, auxiliaryArray, animations);
  return animations;
}

function mergeSortHelper(
  mainArray,
  startIdx,
  endIdx,
  auxiliaryArray,
  animations,
) {
  if (startIdx === endIdx) return;
  const middleIdx = Math.floor((startIdx + endIdx) / 2);
  mergeSortHelper(auxiliaryArray, startIdx, middleIdx, mainArray, animations);
  mergeSortHelper(auxiliaryArray, middleIdx + 1, endIdx, mainArray, animations);
  doMerge(mainArray, startIdx, middleIdx, endIdx, auxiliaryArray, animations);
}

function doMerge(
  mainArray,
  startIdx,
  middleIdx,
  endIdx,
  auxiliaryArray,
  animations,
) {
  let k = startIdx;
  let i = startIdx;
  let j = middleIdx + 1;
  let done = endIdx===mainArray.length-1 && startIdx===0
  while (i <= middleIdx && j <= endIdx) {

    if (i !== j) {
      animations.push([k, j, "colorCompare", done]);
    }

    if (auxiliaryArray[i] <= auxiliaryArray[j]) {
      if(done){
        animations.push([k, j, "colorDone"]);
      }
      mainArray[k++] = auxiliaryArray[i++];
      
    } else {
      animations.push([k,j, "colorSwap"])
      animations.push([k, j, "swap", done]);
      animations.push([k, k+1, "colorCompare",done]);
      if(done){
        animations.push([k, k+1, "colorDone"]);
      }
      mainArray[k++] = auxiliaryArray[j++];
    }

  }
  while (i <= middleIdx) {
    if (k !== middleIdx && k !==mainArray.length-1) {
      animations.push([k, middleIdx, "colorCompare", done]);
      if(done){
        animations.push([k, middleIdx, "colorDone"]);
      }
    }
    mainArray[k++] = auxiliaryArray[i++];
  }
  while (j <= endIdx) {
    if (k !== endIdx) {
      animations.push([k, endIdx, "colorCompare", done]);
      if(done){
        animations.push([k, endIdx, "colorDone"]);
      }
    }
    mainArray[k++] = auxiliaryArray[j++];
  }
}