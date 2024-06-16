const inputBox = document.getElementById("inputbox");
const containers = document.getElementsByClassName("todo");

const temp = function(b){
    // If you click on something inactive
    if (!b.classList.contains("active")){
        const sibs = b.parentNode.childNodes;
        for (let index = 0; index < sibs.length; index++) {
            const element = sibs[index];
            if(element.nodeName === "BUTTON" && element.classList.contains("active")){
                element.classList.remove("active");
                switch(element.id){
                    case "today-tab":
                        const first = document.getElementById("today_tasks");
                        first.classList.remove("show");
                        break;
                    case "hereafter-tab":
                        const second = document.getElementById("hereafter_tasks");
                        second.classList.remove("show");
                        break;
                    default:
                        break;
                }
            }
            
        }
        b.classList.add("active");
        switch(b.id){
            case "today-tab":
                const first = document.getElementById("today_tasks");
                first.classList.add("show");
                break;
            case "hereafter-tab":
                const second = document.getElementById("hereafter_tasks");
                second.classList.add("show");
                console.log("hereafter clicked");
                break;
            default:
                break;
        }
    }
}
var buttons = document.getElementsByClassName('when'); // select todo list by time
//Add event listeners to the buttons
for (let index = 0; index < buttons.length; index++) {
    const a = buttons[index]
    a.addEventListener('click', function(){temp(a);});
}

///////////////////Add Button/////////////////////////////
function addTask(){
    console.log("yhyhy");
    if(inputBox.value ==''){
        alert("Write your task!");
    }else{
        let li = document.createElement('li');
        // Whatever text we add in input field (inputbox.Value) will be added to the li
        li.innerHTML = inputBox.value;
        // li will be displayed in the listContainer ID
        for (let index = 0; index < containers.length; index++) {
            var a = containers[index]
            if(a.classList.contains("show")){
                listContainer = a
                break;
            }
        }
        li.addEventListener("click", addElementFunc, false);
        listContainer.appendChild(li);
        let span = document.createElement("span");
        // this code means cross icon
        span.innerHTML = "\u00d7";
        li.appendChild(span);
    }
    inputBox.value = '';
    saveData();
}

// ///////////////Check or Remove///////////////////////


const addElementFunc = e => {
    if(e.target.tagName === 'LI'){
        // toggle removes/adds checked status depending on what was there before
        e.target.classList.toggle("checked");
        console.log("checked");
    }else if(e.target.tagName === 'SPAN'){
        // delete parent Element, and that parent element is LI
        e.target.parentElement.remove();
    }
    saveData();
}

// var ged = document.querySelectorAll("ul")[index].children;
// console.log();


// for (let index = 0; index < document.querySelectorAll("ul").length; index++) {
//     const element = document.querySelectorAll("ul")[index];
//     console.log(element.length);
//     element.forEach(el => {
//         el.addEventListener("click", addElementFunc, false);
//     });

//     console.log(element.children);
// }
// for (let index = 0; index < elem.length; index++) {
//     var listContainer = elem[index];
//     console.log(listContainer);
//     listContainer.addEventListener("click", addElementFunc(e), false);
// }

// // call saveData whenever we make any changes
let todos = ["",""];
function saveData(){
    // set name to data * whatever is contained within listContainer will be saved. 
    localStorage.setItem("now", containers[0].innerHTML);
    localStorage.setItem("later", containers[1].innerHTML);
    // for (let index = 0; index < containers.length; index++) {
    //     var element = containers[index];
    //     todos.push(element.innerHTML);
    // }
    // console.log(todos);
    // // localStorage.setItem("class", JSON.stringify(containers));
}

function showTasks(){
    document.getElementById("today_tasks").innerHTML = localStorage.getItem("now");
    var addto_today = document.getElementById("today_tasks").children;
    for (let index = 0; index < addto_today.length; index++) {
        const element = addto_today[index];
        element.addEventListener("click", addElementFunc, false);
    }

    document.getElementById("hereafter_tasks").innerHTML = localStorage.getItem("later");
    var addto_later = document.getElementById("hereafter_tasks").children;
    for (let index = 0; index < addto_later.length; index++) {
        const element = addto_later[index];
        element.addEventListener("click", addElementFunc, false);
    }
    // document.getElementById("today_tasks").innerHTML = todos[0];
    // document.getElementById("hereafter_tasks").innerHTML = todos[1];
    
}

showTasks();
