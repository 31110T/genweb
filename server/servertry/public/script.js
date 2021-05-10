function randomizeImage() {
    var rando = Math.floor(Math.random() * 400) + 1;
    var rando2 = Math.floor(Math.random() * 600) + 1;
    document.getElementById("one").style =
        "left:" + rando + "px; top:" + rando2 + "px;"
    console.log(rando)
}
randomizeImage()




// var i = 1;
// var append1Function = setInterval(function() {
//     var rando = Math.floor(Math.random() * 10) + 1;

//     var pic1 = `<div class="patternunit" style="
//     left:${rando*40}px;
//     top:${rando*30}px;
//     "><img src="pixel/1.png"></div>`;
//     document.getElementById("box1").insertAdjacentHTML("beforeend", pic1);

//     var pic2 = `<div class="patternunit" style="
//     left:${rando*50}px;
//     top:${rando*80}px;
//     "><img src="pixel/2.png"></div>`;
//     document.getElementById("box1").insertAdjacentHTML("beforeend", pic2);

//     var pic3 = `<div class="patternunit" style="
//     right:${rando*5}px;
//     top:${rando*6}px;
//     "><img src="pixel/3.png"></div>`;
//     document.getElementById("box1").insertAdjacentHTML("beforeend", pic3);

//     var pic4 = `<div class="patternunit" style="
//     right:${rando*80}px;
//     top:${rando*80}px;

//     "><img src="pixel/4.jpg"></div>`;
//     document.getElementById("box1").insertAdjacentHTML("beforeend", pic4);

//     var pic5 = `<div class="patternunit" style="
//     right:${rando*50}px;
//     top:${rando*100}px;

//     "><img src="pixel/5.png"></div>`;
//     document.getElementById("box1").insertAdjacentHTML("beforeend", pic5);

//     var pic6 =
//         `<div class="patternunit" style="
//     right:${rando*50}px;
//     top:${rando*100}px;

//     "><img src="pixel/10.png"></div>`;
//     document.getElementById("box1").insertAdjacentHTML("beforeend", pic6);

//     var pic7 =
//         `<div class="patternunit" style="
// right:${rando*50}px;
// top:${rando*100}px;

// "><img src="pixel/7.png"></div>`;
//     document.getElementById("box1").insertAdjacentHTML("beforeend", pic7);

//     var pic8 =
//         `<div class="patternunit" style="
// right:${rando*50}px;
// top:${rando*10}px;
// "><img src="pixel/6.png"></div>`;
//     document.getElementById("box1").insertAdjacentHTML("beforeend", pic8);



//     if (i >= 1) {
//         // defining the maximum amount of cycles
//         clearInterval(append1Function);
//     }
//     i++;
// }, 300);