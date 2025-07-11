const postList = []

const newPostForm = document.getElementById('new-post-form')

const postTitle = document.getElementById('blog-post-title')
const postTitleError = document.getElementById('title-error-message')

let postContent = document.getElementById('blog-post-content')
const postContentError = document.getElementById('content-error-message')

const addPostBtn = document.getElementById('add-post-button')

let postDisplay = document.getElementById('blog-post-list')
let postId = 1

window.addEventListener('load', () => {

    let savedBlogList

    try {
        savedBlogList = JSON.parse(localStorage.getItem('postList'))
    } catch (e) {
        console.error('Error parsing blog post from localStorage:', e)
        savedBlogList = null
    }

    if (savedBlogList) {
        postList.push(...savedBlogList)
        renderPostList()
    }
})

postTitle.addEventListener('blur', () => {

    if (postTitle.validity.valueMissing) {
        postTitle.setCustomValidity('Blank titles not accepted, please enter a title of at least 10 characters.')
    }
    else {
        postTitle.setCustomValidity('')
    }
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

    if (!postTitle.validity.valid) {
        alert('Please enter a valid post title.')
        postTitle.focus()
        return
    }

    if (!postContent.validity.valid) {
        alert('Please enter a valid post.')
        postContent.focus()
        return
    }

    let postItem = {
        postItemId: postId,
        postItemTitle: postTitle.value,
        postItemContent: postContent.value
    }

    postList.push(postItem)

    localStorage.setItem('postList', JSON.stringify(postList))

    postId++
    newPostForm.reset()
    renderPostList()
})

function renderPostList() {

    postDisplay.innerHTML = ''
    postList.forEach((post) => {
        const postDisplayItem = document.createElement('li')
        postDisplayItem.dataset.id = post.postItemId
        postDisplayItem.innerHTML =
            `<h5 class="dynamic-post-title">${post.postItemTitle}</h5>
            <p class='dynamic-post-content'>${post.postItemContent}</p><br>
            <button class='delete-post'>Delete Post</button><br><br>
            <button class='edit-post'>Edit Post</button>`
        postDisplay.appendChild(postDisplayItem)
    })
}

postDisplay.addEventListener('click', (e) => {

    if (e.target.matches('.delete-post')) {
        const postToDelete = e.target.closest('li')
        const postIdToDelete = Number(postToDelete.dataset.id)
        const indexToDelete = postList.findIndex((post) => post.postItemId === postIdToDelete)
        postList.splice(indexToDelete, 1)
        localStorage.setItem('postList', JSON.stringify(postList))
        renderPostList()
    }
    else if (e.target.matches('.edit-post')) {

        const postToEdit = e.target.closest('li')
        if (!postToEdit) {
            console.log('your getting a null value')
            return
        }
        const postIdToEdit = Number(postToEdit.dataset.id)
        const indexToEdit = postList.findIndex((post) => post.postItemId === postIdToEdit)
        if (indexToEdit === -1) return

        const editedContent = postToEdit.querySelector('textarea')

        if (editedContent) {
            postList[indexToEdit].postItemContent = editedContent.value
            localStorage.setItem('postList', JSON.stringify(postList))
            renderPostList()
            return
        }
        else {
            postToEdit.innerHTML = `<h5 class="dynamic-post-title-edit">${postList[indexToEdit].postItemTitle}</h5>
            <textarea class='dynamic-post-content-edit' name='edited-post-content'>${postList[indexToEdit].postItemContent}</textarea><br>
            <button class='delete-post'>Delete Post</button><br><br>
            <button class='edit-post'>Save Post</button>`
        }
    }
})


