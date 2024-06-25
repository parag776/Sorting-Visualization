

export async function pause(ms){
    await new Promise(r => setTimeout(r, ms));
}
 
export function printArray(arr){
    for(let item of arr){
        console.log(item.getAttribute("height"));
    }
}

export function appendChildren(parent, childrenArray){
    for(let child of childrenArray){
        parent.append(child);
    }
}


export async function swapSVGRect(children, i, j, ms) {

    const x1 = children[i].getAttribute("x");
    const x2 = children[j].getAttribute("x");
    children[i].setAttribute("x", x2);
    children[j].setAttribute("x", x1);
    swapArray(children, i, j)
    await pause(ms);
}
function swapArray(arr, i, j){
    let temp = arr[i];
    arr[i] = arr[j];
    arr[j] = temp;
}
export function getRectHeight(rect){
    return Number(rect.getAttribute("height"));
}