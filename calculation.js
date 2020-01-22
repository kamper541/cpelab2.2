// let x = document.getElementsByClassName("form-control");
// //var y = parseInt("x");

// console.log(x);
var ans = Math.floor(Math.random() * 100) + 1;
var reset ;
var temp = 0;
//document.getElementsByClassName("row").appendChild(x)
document.forms["calculation"].onsubmit = function(){
    console.log(ans);
    var c = document.getElementById("want").value;
    let a = document.querySelector("#reset");
    a.addEventListener('click' , () => {
    reset = "reset"
    });
    if(reset === "reset"){
        var para = document.createElement("p"); 
        // Create a <p> element
        para.innerHTML = "reset!!!! ...Staring new Game";                // Insert text
        temp = 0;
        ans = Math.floor(Math.random() * 100) + 1;
        document.getElementById("new").appendChild(para);     // Append <p> to <div> with id="myDIV"
        reset = " ";
    }
    else if(temp == 10){
        var para = document.createElement("p"); 
                        // Create a <p> element
        para.innerHTML = "You Lose!!!! ...Staring new Game";                // Insert text
        temp = 0;
        ans = Math.floor(Math.random() * 100) + 1;
        document.getElementById("new").appendChild(para);     // Append <p> to <div> with id="myDIV"
    }
    else if(c == ans){
    
        var para = document.createElement("p"); 
                        // Create a <p> element
        para.innerHTML = "Congratulation You Win!!!!!! ...Starting new Game";             // Insert text
        temp = 0;
        ans = Math.floor(Math.random() * 100) + 1;
        document.getElementById("new").appendChild(para);     // Append <p> to <div> with id="myDIV"

    }else if(c < ans){
        var para = document.createElement("p"); 
        // Create a <p> element
        para.innerHTML = "Your Number is less than the answer. Your current number is " + c;                // Insert text
        document.getElementById("new").appendChild(para);     // Append <p> to <div> with id="myDIV"
        temp ++;
    }else if(c > ans){
        var para = document.createElement("p"); 
        // Create a <p> element
        para.innerHTML = "Your Number is greater than the answer. Your current number is " + c;             // Insert text
        document.getElementById("new").appendChild(para);     // Append <p> to <div> with id="myDIV"
        temp ++;
    }


    return false;
}