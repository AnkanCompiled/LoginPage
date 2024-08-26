const SERVER = 'http://localhost:3000/login'

const usernameInput = document.getElementById('username'),
    usernameError = document.getElementById('username_error')

const passwordInput = document.getElementById('password'),
    passwordError = document.getElementById('password_error')

const submitButton = document.querySelector('input[type="submit"]'),
    submitButtonAction = document.getElementById('input_form')

const validateMsg = document.getElementById('validate')

const dataDiv = document.querySelector('.data_grp')

const dataTable = document.createElement('table')

async function getData(){
    const res = await fetch(SERVER)
    return res.json()
}

function usernameErrorText(msg) {
    usernameError.innerHTML = msg
    usernameError.style.color = 'red'
    usernameError.style.display = 'block'
}

function passwordErrorText(msg) {
    passwordError.innerHTML = msg
    passwordError.style.color = 'red'
    passwordError.style.display = 'block'
}


function validateText(visible, msg = "Login Successfully"){
    validateMsg.innerHTML = msg
    validateMsg.style.display = visible
}

function validationButtonCheck(){
    if (usernameInput.value.length > 0 && passwordInput.value.length > 0){
        submitButton.style.backgroundColor = 'green'
        submitButton.style.cursor = 'pointer'
        submitButton.disabled = false
    }
    else{
        submitButton.style.backgroundColor = 'grey'
        submitButton.style.cursor = 'auto'
        submitButton.disabled = true
    }
}

async function checkDetails(){
    const fetchData = await getData()
    for (let i of fetchData){
        if (i["username"] == usernameInput.value){
            return matchPassword(i)
        }
    }
    usernameErrorText('Username not found')
    return
}

async function matchPassword(i){
    if (i["password"] == passwordInput.value){
        if(i["admin"]){
            console.log('admin')
            return 'admin'
        }
        return 'valid'
    }
    passwordErrorText('Password does not match')
    return
}

async function showData() {
    const fetchData = await getData()
    dataDiv.append(dataTable)
    let headerRow = document.createElement('tr'),
    headerColumns = ["USERNAME", "EMAIL", "PASSWORD"]
    for(i of headerColumns){
        let th = document.createElement('th')
        th.textContent = i
        headerRow.append(th)
    }
    dataTable.appendChild(headerRow)
    for(i of fetchData){
        let row = document.createElement('tr')
        let username_td = document.createElement('td')
        username_td.textContent = i["username"]
        let email_td = document.createElement('td')
        email_td.textContent = i["email"]
        let password_td = document.createElement('td')
        password_td.textContent = i["password"]
        row.append(username_td,email_td,password_td)
        dataTable.appendChild(row)
    }
}

usernameInput.addEventListener('keyup', ()=>{
    usernameError.style.display = 'none'
    validationButtonCheck()
})

passwordInput.addEventListener('keyup', ()=>{
    passwordError.style.display = 'none'
    validationButtonCheck()
})

submitButtonAction.addEventListener('submit', async(e)=>{
    e.preventDefault()
    validateText('none')
    dataDiv.innerHTML = '', dataTable.innerHTML = ''
    let details = await checkDetails()
    switch(details){
        case 'valid':
            validateText('block')
            break
        case 'admin':
            validateText('block','Admin Access')
            showData()
            break
    }
})