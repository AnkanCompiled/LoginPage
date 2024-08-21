
const usernameInput = document.getElementById('username')
const emailInput = document.getElementById('email')
const passwordInput = document.getElementById('password')
const submitButton = document.querySelector('input[type="submit"]')
// submitButton.style.backgroundColor = 'green'
// submitButton.style.cursor = 'pointer'

usernameInput.addEventListener('focusout', async ()=>{
    const res = await fetch('http://localhost:3000/')
})

submitButton.addEventListener('submit', (e)=>{
    e.preventDefault()
})


