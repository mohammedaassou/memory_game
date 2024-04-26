

// cartes  

// random order

// comparer 


// parent carte imgaes 

let parentGame = document.getElementById("game");

// url imgs

let Images = ["whatsap.png", "dog.png"  , "youtube.png" , "animal.png" , "foot1.png" , "foot2.png" , "foot3.png" , "messi.png"];

// order 

let indexs = [];


// create tages of images 

for (let index = 0; index < Images.length; index++) {
    for (let i = 0; i < 2; i++) {
        let carte = document.createElement("div");

        carte.className = "carteImage"

        
        let front = document.createElement("div");
        let back = document.createElement("div");
        front.className = "front ";
        back.className = "back indice";
        back.setAttribute("data-index" , index);

        let backImg = document.createElement("img");
        back.appendChild(backImg);

        carte.appendChild(back);
        carte.appendChild(front);
        let img = document.createElement("img");
        front.appendChild(img);

        backImg.src = "image/question.png" ;

        img.src = "image/" + Images[index];
       
        parentGame.appendChild(carte);
   }
}

let cartes = document.querySelectorAll("#game .carteImage");
let backs = document.querySelectorAll("#game div .indice");

function randomOrder(){
    let indice = false;
    indexs = [];

 for (let i = 0; i < Images.length * 2;) {
    let random = Math.floor(Math.random() * Images.length *2 )

    for (let j = 0; j < indexs.length; j++) 
        if(indexs[j] == random) indice = true;

    if(!indice) {
        indexs[i] = random; i++;
    }
    indice = false;
    }
    
    cartes.forEach((carte , i)=>{
          console.log(carte);
          carte.style.order = indexs[i];
    })

}

window.onload = randomOrder

let comparerId = -1;
let firstElement;
let click = 0;
let failCout = 0;
let restart = false;
let indice = true;
let dure = parseInt(localStorage.getItem("dure"));
function clickImg(target ,classAdd ){

    target.forEach(function(ele){
        ele.addEventListener("click" , (e)=>{
        
            if(click < 2){
                click++;
                ele.classList.add(classAdd);
            }

            comparerId = click == 1 ? parseInt(ele.getAttribute("data-index")) : comparerId;
            firstElement = click == 1 ? ele : firstElement;


              if(click === 2){
                
                if(parseInt(ele.getAttribute("data-index")) === comparerId ){
                    ele.classList.add("rotate");
                    firstElement.classList.add("rotate");
                    console.log("YES THEY ARE SAME");
                }else if(indice){
                  failCout++;
                  indice = false;
                }

                setTimeout(()=> {
                document.getElementById("fail").innerHTML = failCout     
                removeAllClass(target , classAdd) ;
                click = 0 ;
                indice = true;
                } , dure)
            
              }

            restart = true;
            for(const e of target)
          if(!e.classList.contains("rotate")){
            restart = false;
            break;
          }
      
           if(restart){
            
            document.getElementById("restart").id = "restart__";
            document.getElementById("restart__").classList.add("restartStyle")
           }
          
            
          
          

        })
    })
}

// clickImg(fronts , "rotatePositive");
clickImg(backs , "rotateNegative");


// console.log(document.getElementById("restart"))

document.getElementById("restart").onclick = function(){
    if(restart){
        randomOrder();
        removeAllClass(backs , "rotateNegative");
        removeAllClass(backs , "rotate");
        failCout = 0;
        document.getElementById("fail").innerHTML = failCout    
        this.classList.remove("restartStyle")
        document.getElementById("restart__").id = "restart";
        
    }
}

function removeAllClass(arr = [] , clas){
    arr.forEach((el) =>{
        el.classList.remove(clas); })
}