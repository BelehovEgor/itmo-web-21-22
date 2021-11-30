const POST_DIV_ID = "post_from_api";


var baseUrl = "https://jsonplaceholder.typicode.com/posts/"
var container = document.getElementById("posts_container")
var PostId = 1


async function getPosts(post_id) {
	document.body.classList.remove('loaded')
	document.body.classList.add('loading')
	
	let response = await fetch(baseUrl + post_id)
	
	let post = null
	let comments = null
	
	if (response.ok) {
		post = await response.json()
		
		response = await fetch(baseUrl + post_id + "/comments")
		
		if (response.ok) {
			comments = await response.json()
		}
	} else {
		showError()
	}	
	
	document.body.classList.add('loaded');
	document.body.classList.remove('loading')
	
	return [post, comments]
}

function updatePostContainer() {
	let prevItem = document.getElementById(POST_DIV_ID)
	if (prevItem != null)
		prevItem.remove()

	let item = document.createElement("div")
	item.setAttribute("id", POST_DIV_ID);
	item.className = "post"
	
	return item
}

function showError() {
	let item = updatePostContainer()
	
	let img = document.createElement("img")
	img.setAttribute("src", "../Resources/error.png")
	img.setAttribute("width", "300")
	
	let p = document.createElement("p")
	p.appendChild(document.createTextNode("Все очень плохо и не работает((("))
	
	item.appendChild(img)
	item.appendChild(p)
	
	container.appendChild(item)
}

function createPost(post, comments) {
	if (post == null) return
	
	let item = updatePostContainer()
	
	let id = document.createElement("div")
	id.appendChild(document.createTextNode("post id:" + post.id))
	id.className = "post__id"
	
	let title = document.createElement("div")
	title.appendChild(document.createTextNode(post.title))
	title.className = "post__title"
	
	let body = document.createElement("div")
	body.appendChild(document.createTextNode(post.body))
	body.className = "post__body"
	
	let comments_block = document.createElement("div")
	
	let comment_title = document.createElement("div")
	comment_title.appendChild(document.createTextNode("Comments:"))
	comment_title.className = "comments__title"
	comments_block.appendChild(comment_title)
	
	if (comments != null) {
		for (var i = 0; i < comments.length; i++) {
			let comment = comments[i]
			
			let comment_block = document.createElement("div")
			comment_block.className = "comments";
			
			let comment_name = document.createElement("div")
			comment_name.appendChild(document.createTextNode(comment.name))
			comment_name.className = "comments__name";
			
			let comment_body = document.createElement("div")
			comment_body.appendChild(document.createTextNode(comment.body))
			comment_body.className = "comments__body";
			
			comment_block.appendChild(comment_name)
			comment_block.appendChild(comment_body)
			
			comments_block.appendChild(comment_block)
		}
	}
	
	item.appendChild(id)
	item.appendChild(title)
	item.appendChild(body)
	item.appendChild(comments_block)
	
	container.appendChild(item)
}


async function showPost() {
	let buttons = document.getElementById("buttons")
	buttons.style.visibility = "hidden"
	let json = await getPosts(PostId)
	
	if (json == null) return
	buttons.style.visibility = "visible"
	
	createPost(json[0], json[1])
}

async function prevPost() {
	PostId--
	await showPost()
}

async function nextPost() {
	PostId++
	await showPost()
}

showPost()