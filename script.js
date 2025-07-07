const blogList = []

const newPostForm = document.getElementById('new-post-form')

const postTitle = document.getElementById('blog-post-title')
const postTitleError = document.getElementById('title-error-message')

let postContent = document.getElementById('blog-post-content')
const postContentError = document.getElementById('content-error-message')

const addPostBtn = document.getElementById('add-post-button')

let postDisplay = document.getElementById('blog-post-list')
let postId = 1

postTitle.addEventListener('blur', () => {
    if (postTitle.validity.valueMissing) {
        postTitle.setCustomValidity('Blank titles not accepted, please enter a title of at least 10 characters.')
    }
    else {
        postTitle.setCustomValidity('')
    }
    //console.log('blur is happening')
    postTitleError.textContent = postTitle.validationMessage
})

postContent.addEventListener('blur', () => {
    if (postContent.validity.valueMissing) {
        postContent.setCustomValidity('You gotta write soemthing, if we wanted to see nothing we wouldve jumped on X 🤷🏼‍♂️.')
    }
    else {
        postContent.setCustomValidity('')
    }
    postContentError.textContent = postContent.validationMessage
})


newPostForm.addEventListener('submit', (e) => {
    e.preventDefault()
})