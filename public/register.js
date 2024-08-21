const usernameDiv = document.getElementById('username_div')
const usernameError = document.getElementById('username_error')
const usernameInput = document.getElementById('username')
const emailInput = document.getElementById('email')
const passwordInput = document.getElementById('password')
const submitButton = document.querySelector('input[type="submit"]')



let usernameValidation = false
let emailValidation = false
let passwordValidation = false

async function getData(){
    const res = await fetch('http://localhost:3000/')
    return res.json()
}

function usernameErrorText(msg,color) {
    usernameError.innerHTML = msg
    usernameError.style.color = color
    usernameError.style.display = 'block'
}

// submitButton.style.backgroundColor = 'green'
// submitButton.style.cursor = 'pointer'

usernameInput.addEventListener('focusin', async()=>{
    usernameError.style.display = 'none'
})

usernameInput.addEventListener('focusout', async ()=>{
    const fetchData = await getData()
    const username_entered = usernameInput.value

    async function isEmpty(){
        if(username_entered){
            return true
        }
        else{
            usernameErrorText('Enter an username','crimson')
            return false
        }
    }

    async function isUnique() {
        for (let i of fetchData){
            if (i["username"] == username_entered){
                usernameErrorText('Username is Taken','crimson')
                return false
            }
        }
        return true
    }

    if ( await(isEmpty()) && await(isUnique()) ){
        usernameErrorText('Username is Available','green')
        usernameValidation = true
    }
    else {
        usernameValidation = false
    }
    console.log(usernameValidation)
})

submitButton.addEventListener('submit', (e)=>{
    e.preventDefault()
})


