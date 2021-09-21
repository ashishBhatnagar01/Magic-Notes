showNotes();
let addBtn=document.getElementById('addBtn');
addBtn.addEventListener('click',function(e){
  var notesObj=new Array();
  let addTxt=document.getElementById('addTxt');
  if(addTxt.value==""){
    alert("Please fill the mandatory field");
    window.location('index.html');
  }
  let notes=localStorage.getItem('notes');
  localStorage.clear();
  if(notes==null){
    notesObj=[];
  }
  else{
    notesObj=JSON.parse(notes);
  }
  notesObj.push(addTxt.value);
  localStorage.setItem("notes",JSON.stringify(notesObj));
  addTxt.value="";
  console.log(notesObj);
  showNotes();
})
function showNotes(){
  let notes=localStorage.getItem("notes");
  if(notes==null){
    notesObj=[];
  }
  else{
    notesObj=JSON.parse(notes);
  }
  let html="";
  notesObj.forEach(function(element,index) {
    let date=new Date();
    let p=date.toLocaleDateString();
     html+=`
     <div class="noteCard my-2 mx-2 card bg-dark bg-gradient" style="width: 18rem;">
     <div class="card-body">
       <h5 class="card-title text-white">0${p}</h5>
       <p class="card-text text-white">${element}</p>
       <a href="#" class="btn btn-primary" id="${index}" onclick="delNote(this.id)">Delete Note</a>
     </div>
   </div>
        `;
  });
  let notesElm=document.getElementById('notes');
  if(notesObj.length!=0){
    notesElm.innerHTML=html;
  }
  else{
    notesElm.innerHTML=`<p class="text-center text-white" style="font-size:20px";>Nothing to show! Use "Add a Note" section </p>`;
  }
}
function delNote(index){
  console.log(`I am deleting ${index}`);
  let notes=localStorage.getItem("notes");
  if(notes==null){
    notesObj=[];
  }
  else{
    notesObj=JSON.parse(notes);
  }
  notesObj.splice(index,1);
  localStorage.setItem("notes",JSON.stringify(notesObj));
  showNotes();
}
let search=document.getElementById('searchTxt');
search.addEventListener("input",function(){
  let inputVal=search.value.toLowerCase();
  // console.log("Input Event Fired",inputVal);
  let noteCards=document.getElementsByClassName('noteCard');
  Array.from(noteCards).forEach(function(element){
    let cardTxt=element.getElementsByTagName('p')[0].innerText;
    // console.log(cardTxt);
    if(cardTxt.includes(inputVal))
    {
      element.style.display="block";
    }
    else{
      element.style.display="none";
    }
  })
})
