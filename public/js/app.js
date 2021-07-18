console.log("This is loading from client side of the application")



const weatherForm=document.querySelector('form')
const search=document.querySelector('input')
const messageOne=document.querySelector('#message-1')
const messageTwo=document.querySelector('#message-2')
const messageThree=document.querySelector('#message-3')

weatherForm.addEventListener('submit',(e)=>{
    e.preventDefault()

    const location=search.value;

    messageOne.textContent="loading..."
    messageTwo.textContent="";

    fetch('/weather?address='+location).then((response)=>{
    response.json().then((data)=>{
        if(data.error){
            messageOne.textContent=data.error;
        }
        else{
            messageOne.textContent='Location: ' + data.location;
            messageTwo.textContent='Forecast: ' + data.forecast;
            messageThree.textContent='Temperature: ' + data.temperature;
        }
    })
})

})