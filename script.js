let myLeads = []
let inputBtn = document.getElementById('input-btn')
let inputEl = document.getElementById('input-el')
const ulEl = document.getElementById('ul-el')
const deleteBtn = document.getElementById('delete-btn')
const tabBtn = document.getElementById('tab-btn')
const leadsFromLocalStorage = JSON.parse(localStorage.getItem("myLeads"))

if (leadsFromLocalStorage) {
    myLeads = leadsFromLocalStorage
    render(myLeads)
}


tabBtn.addEventListener('click',()=>{
    chrome.tabs.query({active: true, currentWindow: true}, function (tabs) {
        myLeads.push(tabs[0].url)
        localStorage.setItem("myLeads",JSON.stringify( myLeads ))
        render(myLeads)
    })
})

function render(leads) {
    let listitems = ''
for (let i = 0; i < leads.length; i++) {
    //    listitems += "<li><a target='_blank' href='" + myLeads[i] + "'>" + myLeads[i] + ' ' + "</a></li>"
       listitems += `<li>
       <a target='_blank' href='${leads[i]}'>
       ${leads[i]}
        </a>
       </li>`
}
ulEl.innerHTML = listitems
} 
 
deleteBtn.addEventListener("click",()=>{
   localStorage.clear()
   myLeads = []
   render(myLeads)
    
})
inputBtn.addEventListener('click',()=>{
    myLeads.push(inputEl.value)
    inputEl.value = ''
    localStorage.setItem("myLeads", JSON.stringify(myLeads))
    render(myLeads) 
})
