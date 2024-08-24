const SERVER = 'http://localhost:3000/register'

const usernameInput = document.getElementById('username'),
    usernameError = document.getElementById('username_error')

const emailInput = document.getElementById('email'),
    emailError = document.getElementById('email_error')

const passwordInput = document.getElementById('password'),
    passwordError = document.getElementById('password_error')

const submitButton = document.querySelector('input[type="submit"]'),
    submitButtonAction = document.getElementById('input_form')

const validateMsg = document.getElementById('validate')

let usernameValidation = false,
    emailValidation = false,
    passwordValidation = false

let usernameWriteTimeout,
    emailWriteTimeout,
    passwordWriteTimeout
    
async function getData(){
    const res = await fetch(SERVER)
    return res.json()
}

async function postData(username,email,password) {
    await fetch(SERVER, {
        headers: {
            'Content-Type': 'application/json'
        },
        method : 'POST',
        body : JSON.stringify({"username" : username,"email" : email,"password" : password })
    })
    return
}

function validationButtonCheck(){
    if (usernameValidation === true && emailValidation === true && passwordValidation === true){
        submitButton.style.backgroundColor = 'green'
        submitButton.style.cursor = 'pointer'
        submitButton.disabled = false
    }
}

function usernameErrorText(msg,color) {
    usernameError.innerHTML = msg
    usernameError.style.color = color
    usernameError.style.display = 'block'
}

function emailErrorText(msg) {
    emailError.style.width = '220px'
    emailError.innerHTML = msg
    emailError.style.color = 'red'
    emailError.style.display = 'block'
}

function passwordErrorText(msg) {
    passwordError.style.width = '220px'
    passwordError.innerHTML = msg
    passwordError.style.color = 'red'
    passwordError.style.display = 'block'
}

function validateText(){
    validateMsg.innerHTML = "Account Created Successfully"
    validateMsg.style.display = 'block'
}

usernameInput.addEventListener('keyup', ()=>{
    clearTimeout(usernameWriteTimeout);
    usernameWriteTimeout = setTimeout( async() => {
        usernameError.style.display = 'none'
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
            validationButtonCheck()
        }
        else {
            usernameValidation = false
        }
    }, 500)
    
})

emailInput.addEventListener('keyup', async()=>{
    clearTimeout(emailWriteTimeout)
    emailWriteTimeout = setTimeout(async()=>{
        const fetchData = await getData()
        const emailRegex = /^[^\s@]+@[^\s@]+\.com+$/
        const email_entered = emailInput.value
        function isValid(){
            if (emailRegex.test(email_entered)){
                return true
            }
            emailErrorText('Enter correct email')
            return false
        }
        function isUnique() {
            for (let i of fetchData){
                if (i["email"] == email_entered){
                    emailErrorText('Email is Taken')
                    return false
                }
            }
            return true
        }
        if (isValid() && isUnique()){
            emailError.style.display = 'none'
            emailValidation = true
            validationButtonCheck()
        }
        else {
            
        }
    },500)
})

passwordInput.addEventListener('keyup',()=>{
    clearTimeout(passwordWriteTimeout)
    passwordWriteTimeout = setTimeout(()=>{
        const upperCaseRegex = /[A-Z]/
        const lowerCaseRegex = /[a-z]/
        const numberRegex = /[0-9]/
        const specialCharRegex = /[!@#$%&]/
        const password_entered = passwordInput.value
        function passLength(){
            if(password_entered.length >= 6){
                passwordError.style.display = 'none'
                return true
            }
            else{
                passwordErrorText('Must be atleast 6 charector long')
                return false
            }  
        }
        function checkLower(){
            if (lowerCaseRegex.test(password_entered)){
                passwordError.style.display = 'none'
                return true
            }
            else{
                passwordErrorText('Include lowercase charector')
                return false
            }  
        }
        function checkNumber(){
            if (numberRegex.test(password_entered)){
                passwordError.style.display = 'none'
                return true
            }
            else{
                passwordErrorText('Include number')
                return false
            }  
        }
        function checkUpper(){
            if (upperCaseRegex.test(password_entered)){
                passwordError.style.display = 'none'
                return true
            }
            else{
                passwordErrorText('Include uppercase charector')
                return false
            }  
        }
        function checkSpecial(){
            if (specialCharRegex.test(password_entered)){
                passwordError.style.display = 'none'
                return true
            }
            else{
                passwordErrorText('Include special charector(!@#$%&)')
                return false
            }  
        }
        if (passLength() && checkLower() && checkUpper() && checkNumber()  && checkSpecial()){
            passwordValidation = true
            validationButtonCheck()
        }
    },500)
})

submitButtonAction.addEventListener('submit', (e)=>{
    submitButton.style.backgroundColor = 'gray'
    submitButton.disabled = true
    postData(usernameInput.value, emailInput.value, passwordInput.value)
    validateText()
})


