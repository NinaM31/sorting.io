/*
    Visualizing different sorting algorithms:
        I.   Bubble sort
        II.  insertion sort
        III. Quick sort
*/

//Arrays for storage
let visuals = [];
let colors = ['rainbow', 'cotton candy', 'ocean_lime'];
let sort = ['bubble', 'insertion', 'quick'];


//Values for the statistics of the algorithm
let numberOfCompersion = 0;
let numO = 0;

//Pointers to keep track of different arrays 
let iCompare = 1;
let colorpointer = Math.round(Math.random(2));
let index = Math.round(Math.random()*2);

class visual{
    constructor(r, g, b, v){
        this.R = r;
        this.G = g;
        this.B = b;
        this.value = Math.ceil(v);
    }
}

function setup() {
    createCanvas(windowWidth,windowHeight);
    numO = windowWidth/2;
    play(); 
}

//creating the objects values
function play(){
    for(var i = 0; i < numO; i++){
        
        //giving a height that is a fraction of 0 to 1
        var h = random(height);
        var mh = h/height;
        
       //To create the rainbow color effect multiply by 255 
        var color = myColor(mh);
        var r = (color[0]) *255;
        var g = (color[1]) *255;
        var b = (color[2]) *255;
        
        //storing the object
        visuals[i] = new visual(r,g , b , h);
    } 
}

//color functions derived from newtons divided difference interpolating method using points graphed on desmos
function myColor(mh){
    var rgb = [];
    var r ;
    var g ;
    var b ;
    
    //colors will be a fraction between 1 and 0
    if(colors[colorpointer] == 'rainbow'){
        r = ( -162.10721*Math.pow(mh,5)+398.95811*Math.pow(mh,4)-339.61223*Math.pow(mh,3)+117.79266*Math.pow(mh,2)-14.33134*mh+0.3 );
        g = ( -60.6966*Math.pow(mh,5)+148.65178*Math.pow(mh,4)-130.56416*Math.pow(mh,3)+45.49546*Math.pow(mh,2)-2.88649*mh) ;
        b = ( 370.14737*Math.pow(mh, 5)-704.17569*Math.pow(mh, 4)+432.44067*Math.pow(mh, 3)-108.81987*Math.pow(mh, 2)+9.40752*mh+1 );    
    }else if(colors[colorpointer] == 'cotton candy'){
        r = -6.44267*Math.pow(mh,4)+12.66133*Math.pow(mh,3)-6.59733*Math.pow(mh,2)+0.99867*mh+0.36;
        g = -5.12*Math.pow(mh,4)+10.24*Math.pow(mh,3)-5.28*Math.pow(mh,2)-0.48*mh+1 ;
        b = 1.28*Math.pow(mh,4)-2.24*Math.pow(mh,3)+0.88*Math.pow(mh,2)+0.02*mh+0.97 ;
    }else{
        r = -16.74667*Math.pow(mh,4)+35.52*Math.pow(mh,3)-22.43333*Math.pow(mh,2)+2.87*mh+0.9 ;
        g = 0.32*Math.pow(mh,4)-0.8*Math.pow(mh,3)+0.62*Math.pow(mh,2)-0.15*mh+0.98;
        b = -14.82667*Math.pow(mh,4)+28.21333*Math.pow(mh,3)-14.75333*Math.pow(mh,2)+2.19667*mh+0.12 ;
    }
    
    rgb[0]=r;
    rgb[1]=g;
    rgb[2]=b;
    return rgb;
}

function draw() {
    background(0);
    stats();
    show();
    
    //Loops over all the sorting algorithms
    sorting();

}

//creating a visual of the objects values stored in the array
function show(){
    for(var i = 0; i < visuals.length; i++){
        var r = visuals[i].R;
        var g = visuals[i].G;
        var b = visuals[i].B;
        var v = visuals[i].value;  
        
        //Creating a rectangle that represents the objects values
        fill(r, g, b, 230);
        rect( (i*2), (height-v), 3, v, width);
    }
}
function stats(){
    var x = 0;
    noStroke();
    fill(30, 255, 0);
    textSize(20);
    text(sort[index] +' Sort' , 10, 40+x);
    textSize(16);
    strokeWeight(0);
    fill(255);
    text('Elements ' + numO, 10, 60+x);
    text('comparisons ' + numberOfCompersion, 10, 80+x);
    fill(255);
    text('Color: '+colors[colorpointer], 10, 100+x);
}

function sorting(){
    if(sort[index] == 'bubble'){
       bubbleSort();
    }else if(sort[index] == 'insertion'){
        InsertionSort();
    }else{
        quickSort(0, visuals.length-1 );
    }
}

function update(){
    iCompare = 0;
    numberOfCompersion = 0;
    
    colorpointer= (++colorpointer)%colors.length;
    index = (++index)%3;
    play(); 
}

//The algorithms BubbleSort, InsertionSort, QuickSort-----------------------------------------------------------------------------------------------------
function InsertionSort(){
    if(sorted())
        update();       
    let temp = visuals[iCompare];

    for(var j = iCompare - 1; j >= 0; j--){
        numberOfCompersion++;
        if(visuals[j].value < temp.value){
            visuals[j+1] = temp;
            break;
        }else{
            visuals[j+1] = visuals[j];
            visuals[j] = temp;
        }
        if(sorted())
            update();
    }    
    iCompare++;   
}
function bubbleSort(){
    if(sorted())
        update();
    for(let j = 0; j < visuals.length- iCompare-1; j++){
        numberOfCompersion++; 

        let jv = visuals[j].value;            
        let Jv = visuals[j+1].value;

        if( (jv > Jv) ){
            var temp = visuals[j];
            visuals[j] = visuals[j+1]
            visuals[j+1] = temp;              
        }

    }
    iCompare++;
} 

function quickSort(low, high){
   
        if(low < high){
            var p = partition(visuals, low, high);

            quickSort(low, p -1);
            quickSort(p+1, high); 
            if(sorted())
                update();
            
            numberOfCompersion++;
        }    
}
function partition(arr, low, high){
    var pivot = visuals[low].value;
    var i = low + 1;
    var j = high;

    if(i < j){
        while(visuals[i].value <= pivot && i < j){
            i++; 
            
        }
        while(visuals[j].value > pivot && i < j){
            j--;
        }
        var temp = visuals[i];
        visuals[i] = visuals[j]
        visuals[j] = temp; 
        
   }
    var s ;
    if(visuals[i].value <= pivot){
        s = i;
    }
    else{
        s= i -1;
    }
    
    var temp = visuals[low];
    visuals[low] = visuals[s]
    visuals[s] = temp; 
    return s;
}

function sorted(){
    for(var i = visuals.length -1; i > 0 ; i--){
        if(visuals[i].value < visuals[i -1].value ){
            return false;
        }
    }
    return true;
}
