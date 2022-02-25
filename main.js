// ===== BUTTON GET TEXT =====
document.querySelector('#getText').addEventListener('click', getText)
document.querySelector('#getUsers').addEventListener('click', getUsers)
document.querySelector('#getPosts').addEventListener('click', getPosts)
document.querySelector('#addPost').addEventListener('submit', addPost)

// ===== Inner HTML =====
const showText = document.querySelector('#showText')
const listUsers = document.querySelector('.list_users')
const getAPIData = document.querySelector('.getAPI_Data')

let outputH2_One = document.getElementsByTagName('h2')[0]
let outputH2_Two = document.getElementsByTagName('h2')[1]

function getText() {
  fetch('sample.txt')
    .then(res => res.text())
    .then(data => showText.innerHTML = data)
    .catch(err => showText.innerHTML = err)
}

function getUsers() {
  let txtH2 = 'List Users'
  outputH2_One.innerHTML = txtH2

  fetch('users.json')
    .then(res => res.json())
    .then(data => {
      let users = ''
      data.forEach(user => {
        users += `
          <ul>
            <li>ID : ${user.id}</li>
            <li>Name : ${user.name}</li>
            <li>E-Mail : ${user.email}</li>
          </ul>`
      })
      listUsers.innerHTML = users
    })
}

function getPosts() {
  let txtH2 = 'Posts Data'
  outputH2_Two.innerHTML = txtH2

  fetch('https://jsonplaceholder.typicode.com/posts')
    .then(res => res.json())
    .then(data => {
      let users = ''
      data.forEach(user => {
        users += `
        <div class="main_postData">
          <h3>${user.title}</h3>
          <p>${user.body}</p>
        </div>`
      })
      getAPIData.innerHTML = users
    })

}

function addPost(e) {
  e.preventDefault()
  let title = document.querySelector('#title').value
  let body = document.querySelector('#body').value

  fetch('https://jsonplaceholder.typicode.com/posts', {
    method: 'POST',
    headers: {
      'Accept': 'application/json, text/plain, */*',
      'Content-type': 'application/json'
    },
    body: JSON.stringify({
      title: title,
      body: body
    })
  })
    .then(res => res.json())
    .then(data => console.log(data))

}