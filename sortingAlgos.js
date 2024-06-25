import {swapSVGRect, getRectHeight, pause } from "./utilfuncs.js";

// ---------------------------------------------------XXXXXXXX       MERGE SORT       XXXXXXXX-----------------------------------------------------


async function merge(arr, l, mid, r, timeBWSwaps){

    let l1 = l;
    let r1 = mid;
    let l2 = r1+1;
    let r2 = r;

    while(l1<=r1 && l2<=r2){
        const v1 = Number(arr[l1].getAttribute("height"));
        const v2 = Number(arr[l2].getAttribute("height"));
        if(v1>v2){
            let templ2 = l2;
            while(templ2>l1){
                await swapSVGRect(arr, templ2, templ2-1, timeBWSwaps);
                templ2--;
            }
            l2++;
            l1++;
            r1++;
        } else {
            l1++;
        }
    }

}

async function mergeSortHelper(arr, l, r, timeBWSwaps){
    if(l>=r) return;
    let mid = Math.floor((l+r)/2);
    await mergeSortHelper(arr, l, mid, timeBWSwaps);
    await mergeSortHelper(arr, mid+1, r, timeBWSwaps);

    await merge(arr, l, mid, r, timeBWSwaps);
}

export async function mergeSort(arr, timeBWSwaps){
    await mergeSortHelper(arr, 0, arr.length-1, timeBWSwaps);
}

// ---------------------------------------------------XXXXXXXX       QUICK SORT       XXXXXXXX-----------------------------------------------------



async function quickSortHelper(arr, l, r, timeBWSwaps){
    if(l>=r) return;
    let start = l;
    let end = r;
    l++;
    while(l<=r){
        while(l<=end && getRectHeight(arr[l])<getRectHeight(arr[start])) l++;
        while(r>=start && getRectHeight(arr[r])>getRectHeight(arr[start])) r--;
        if(l>r) break;
        await swapSVGRect(arr, l, r, timeBWSwaps);
    }
    await swapSVGRect(arr, start, r, timeBWSwaps);
    await quickSortHelper(arr, start, r-1, timeBWSwaps);
    await quickSortHelper(arr, l, end, timeBWSwaps);
}

export async function quickSort(arr, timeBWSwaps){
    await quickSortHelper(arr, 0, arr.length-1, timeBWSwaps);
}