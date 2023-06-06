const itemform = document.getElementById('item-form');
const iteminput = document.getElementById('item-input');
const itemlist= document.getElementById('item-list');
const allclear = document.getElementById('clear')
const filter = document.getElementById('filter')


function displayitems(){
    const itemsfromstorage=getitemsfromstorage();
    itemsfromstorage.forEach(item=>{
        additemtodom(item);
    })
    checkUI();
}

function onadditemsubmit(e){
    e.preventDefault();
    const newitem= iteminput.value;
    if(iteminput.value ===''){
        alert('Please add item')
        return;
    }

    additemtodom(newitem);
    additemlocalstorage(newitem);
    checkUI();

    iteminput.value='';
}
function additemtodom(item){
    const li=document.createElement('li');
    li.textContent=item ;
    const button = createbutton('remove-item btn-link text-red');
    const icon = createicon('fa-solid fa-xmark');
    button.appendChild(icon);
    li.appendChild(button);
    
    itemlist.appendChild(li);
}


function createbutton(classes){
    const btn=document.createElement('button');
    btn.className=classes;
    return btn;
}
function createicon(classes){
    const icon=document.createElement('i');
    icon.className=classes;
    return icon;
}
function additemlocalstorage(item) {
    const itemsfromstorage = getitemsfromstorage();
   

    itemsfromstorage.push(item);

    localStorage.setItem('items',JSON.stringify(itemsfromstorage));

}
function getitemsfromstorage(item){
    let itemsfromstorage;
    if(localStorage.getItem('items')===null){
        itemsfromstorage=[];
    }
    else{
        itemsfromstorage= JSON.parse(localStorage.getItem('items'));
    }
    return itemsfromstorage
}


function removeitem(e){
    if(e.target.parentElement.classList.contains('remove-item')){
        if(confirm('Are you sure ?')){
            e.target.parentElement.parentElement.remove();
        }
    }
    removeitemsfromstorage(e.target.parentElement.parentElement.textContent);
    checkUI();
}
function removeitemsfromstorage(item){
    let itemsfromstorage=getitemsfromstorage();
    itemsfromstorage = itemsfromstorage.filter(i=>i!== item);
    localStorage.setItem('items',JSON.stringify(itemsfromstorage))
}
 function removeall(){
    itemlist.innerHTML='';
    localStorage.removeItem('items');
    
    checkUI();
 }
 function checkUI(){
    const items = itemlist.querySelectorAll('li');
    if(items.length===0){
        allclear.style.display = 'none';
        filter.style.display = 'none';
    }
    else{
        allclear.style.display = 'block';
        filter.style.display = 'block';
    }
 }
 function filteritems(e){
    const text = e.target.value.toLowerCase();
    const items = itemlist.querySelectorAll('li');
    items.forEach((item) =>{
        const itemname=item.firstChild.textContent.toLowerCase();


        if(itemname.indexOf(text)!==-1){
            item.style.display='flex'
        }
        else{
            item.style.display='none'
        }
        
        
    })
    

 }
itemform.addEventListener('submit',onadditemsubmit);
itemlist.addEventListener('click', removeitem);
allclear.addEventListener('click',removeall);
filter.addEventListener('input',filteritems);
document.addEventListener('DOMContentLoaded',displayitems)
checkUI();