
const modal=document.querySelector(".modal");

const login=document.querySelector(".login");
const signup=document.querySelector(".signup");
const logout=document.querySelector(".logout");
const info=document.querySelector(".info");
const notesArea=document.querySelector('#notesArea');
const details=document.querySelector('.details');
const url=new URL(window.location.href);

function showLogin(){
    if(modal.classList.contains('show')){
        Array.from(modal.children[0].children).forEach((child)=>{
            child.classList.remove('show');
        })
    }
    else{
        modal.classList.add('show');
    }
    login.classList.add('show');
}
function showSignup(){
    if(modal.classList.contains('show')){
        Array.from(modal.children[0].children).forEach((child)=>{
            child.classList.remove('show');
        })
    }
    else{
        modal.classList.add('show');
    }
    signup.classList.add('show');
}
function showLogout(){
    if(modal.classList.contains('show')){
        Array.from(modal.children[0].children).forEach((child)=>{
            child.classList.remove('show');
        })
    }
    else{
        modal.classList.add('show');
    }
    logout.classList.add('show');
}
function showInfo(){
    if(modal.classList.contains('show')){
        Array.from(modal.children[0].children).forEach((child)=>{
            child.classList.remove('show');
        })
    }
    else{
        modal.classList.add('show');
    }
    info.classList.add('show');
}
function closeModal(){
    modal.classList.remove('show');
    Array.from(modal.children[0].children).forEach((child)=>{
        child.classList.remove('show');
    });
}
modal.addEventListener('click',(e)=>{
    if(modal.children[0].contains(e.target)){}
    else{
        closeModal();
    }
});

async function loginFunction(e){
    let email=e.parentElement.children[1].value,password=e.parentElement.children[3].value;
    console.log(email,password);
    let rs=await fetch(`${url.origin}/users/login`,{
        method:'POST',
        headers:{
            'Content-Type':'application/json'
        },
        body:JSON.stringify({email,password})
    })
    .then(res=>res.json());
    if(rs.error){
        e.parentElement.innerHTML+=`<div class="error">${rs.error}</div>`;
        console.log(rs.error);
        return;
    }
    closeModal();

} 
async function signupFunction(e){
    let name=e.parentElement.children[1].value,email=e.parentElement.children[3].value,password=e.parentElement.children[5].value;
    let rs=await fetch(`${url.origin}/users/create`,{
        method:'POST',
        headers:{
            'Content-Type':'application/json'
        },
        body:JSON.stringify({name,email,password})
    })
    .then(res=>res.json());
    if(rs.error){
        e.parentElement.innerHTML+=`<div class="error">${rs.error}</div>`;
        console.log(rs.error);
        return;
    }
    if(rs.error){
        e.parentElement.innerHTML+=`<div class="error">${rs.error}</div>`;
        console.log(rs.error);
        return;
    }
    closeModal();
}


let {name,id}=JSON.parse(details.dataset.details);

async function createNotes(e){
    let title=e.parentElement.children[1].value,description=e.parentElement.children[3].value;
    if(!id){
        e.parentElement.innerHTML+=`<div class="error">please login first</div>`;
        console.log('please login first');
        return;
    }
    let rs=await fetch(`${url.origin}/notes/create`,{
        method:'POST',
        headers:{
            'Content-Type':'application/json'
        },
        body:JSON.stringify({title,description,Userid:id})
    })
    .then(res=>res.json());
    if(rs){
        e.parentElement.children[1].value='';
        e.parentElement.children[3].value='';
        console.log('notes added');
    }
}

async function showNotes(e){
    if(!id){
        console.log('please login first');
        return;
    }
    window.location.href=`${url.origin}/showNotes?id=${id}&name=${name}`;
}