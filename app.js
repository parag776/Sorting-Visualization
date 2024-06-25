import { mergeSort, quickSort } from "./sortingAlgos.js";
import {swapSVGRect, appendChildren } from "./utilfuncs.js";


const body = document.querySelector("body");
const svgNS = "http://www.w3.org/2000/svg";

// basic functions requirement

// global variables:
let svg;
let height;
let width;
let barArray = [];

// svg creating and deletion

function addSVG(){

    svg = document.createElementNS(svgNS, "svg");

    height = 500;
    width = 500;

    svg.setAttribute("width", width);
    svg.setAttribute("height", height)
    body.append(svg);
}

function deleteSVG(){
    barArray = [];
    try{
        svg.remove()
    } catch{}
}

// selecting barCount, algochoose after play
const barCounterInput = document.querySelector("#barCounterInput");
const algorithmSelector = document.querySelector("#algorithmSelector");
const playButton = document.querySelector("#playButton");
const randomiseButton = document.querySelector("#randomiseButton")
const speedInput = document.querySelector("#speedInput");

randomiseButton.onclick = randomise;
// algorithms

//bars

// randomise
async function randomise(){
    deleteSVG();
    addSVG();

    const barCount = Number(barCounterInput.value || 30);
    let barWidth = width/barCount;
    for(let barSize=1;barSize<=barCount;barSize++){
        let barHeight = height/barCount*barSize;

        let bar = document.createElementNS(svgNS, "rect");
        bar.setAttribute("x", barWidth*(barSize-1));
        bar.setAttribute("y", height-barHeight);
        bar.setAttribute("width", barWidth);
        bar.setAttribute("height", barHeight);
        bar.setAttribute("fill", "pink");
        bar.setAttribute("stroke-width", 3);
        bar.setAttribute("stroke", "black")
        barArray.push(bar);
    }
    appendChildren(svg, barArray);
    for(let i=0;i<barCount;i++){
        const randNum = Math.floor(Math.random()*(barCount-i)) + i;
        await swapSVGRect(barArray, i, randNum, 0);
    }
}

playButton.onclick = ()=>{
    const speed = Number(speedInput.value || 5);
    const timeBWSwaps = 200/speed;

    playAlgo(algorithmSelector.value, timeBWSwaps);
}

async function playAlgo(algoType, timeBWSwaps){
    console.log("playing: ", algoType)
    if(algoType==="quickSort"){
        await quickSort(barArray, timeBWSwaps);
    } else if(algoType==="mergeSort"){
        await mergeSort(barArray, timeBWSwaps);
    }
}
randomise();