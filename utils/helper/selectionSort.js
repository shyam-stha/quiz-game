const swap = (arr, xp, yp) => {
    let temp = arr[xp];
    arr[xp] = arr[yp];
    arr[yp] = temp;
};

const selectionSort = (arr, property, type = "string") => {
    const n = arr.length;
    let i, j, min_idx;

    for (i = 0; i < n - 1; i++) {
        //assume that first element of array is the smallest
        min_idx = i;
        //loop and find smallest element index
        if (type == "number") {
            for (j = i + 1; j < n; j++)
                if (Number(arr[j][property]) < Number(arr[min_idx][property])) min_idx = j;
        } else {
            for (j = i + 1; j < n; j++) if (arr[j][property] < arr[min_idx][property]) min_idx = j;
        }
        //swap first elememt with minimun element
        swap(arr, min_idx, i);
    }

    return arr;
};
