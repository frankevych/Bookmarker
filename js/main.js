//listen for form submit
document.getElementById("myForm").addEventListener("submit", saveBookmark);
//array of bookmarks;
let bookmarks;
//get item by key from local storage and parse it to string
function getLocalStorage(itemKey){
	return JSON.parse(localStorage.getItem(itemKey));
}
//set stringifyed item to local storage
function setLocalStorage(itemKey, item){
	localStorage.setItem(itemKey, JSON.stringify(item));
}

//save bookmark
function saveBookmark() {
	//get form values
	let siteName = document.getElementById("siteName").value;
	let siteUrl = document.getElementById("siteUrl").value;
	//check if http protocol is added, to prevent browser reading url as local files
	if(siteUrl.search(/http:/i) === -1){
		siteUrl = "http://" + siteUrl;
	}
	//create bookmark obj
	    bookmark = {
		name: siteName,
		url: siteUrl
	}

 	//test if bookmarks is null
	if (localStorage.getItem("bookmarks") === null) {
		//init array
		bookmarks = [];
		//push item in array
		bookmarks.push(bookmark);
		//set array of bookmarks in local storage
		//localStorage.setItem("bookmarks", JSON.stringify(bookmarks));
		setLocalStorage("bookmarks", bookmarks);

	} else {
		//get array of bookmarks from local storage with key "bookmarks"
		bookmarks = getLocalStorage("bookmarks");
		//add element to array
		bookmarks.push(bookmark);
		//set refreshed array of bookmarks back to local storage
		setLocalStorage("bookmarks", bookmarks);
	}
	//re-fetch so shown data is actual
	fetchBookmarks();
	//to clear fields after submit btn
	document.getElementById("siteName").value = "";
	document.getElementById("siteUrl").value = "";
};

//delete boookmarks function
function deleteBookmark(url){
	//get element by key (array of bookmarks)
	bookmarks = getLocalStorage("bookmarks");
	//loop through every single item in arr
	let i;
	for (i = 0; i < bookmarks.length; i++) {
		// if url property of any element will match url passed as a parameter
		if(bookmarks[i].url === url){
			//remove one element under 'i' index
			bookmarks.splice(i, 1);
		}
	}
	//update changes in local storage
	setLocalStorage("bookmarks", bookmarks);
	//re-fetch list so shown data is relevant
	fetchBookmarks();
}

//fetch bookmarks
function fetchBookmarks(){
	//get bookmarks from local storage
	bookmarks = getLocalStorage("bookmarks");
	//get output id
	let bookmarksResults = document.getElementById("bookmarksResults");
	//default output
	bookmarksResults.innerHTML = "";
	//check if bookmarks arr isnt null
	if(bookmarks != null){
		//looping through list of bookmarks
		let i;
		for(i = 0; i < bookmarks.length; i++){
			let name = bookmarks[i].name;
			let url = bookmarks[i].url;
			//bind the output
			bookmarksResults.innerHTML += '<div class="card bg-light text-dark card-body">' +
											'<h3>' + name + ": " + 
											'<a class="btn btn-secondary" target="_blank" href="'+url+'">' + "Visit" + '</a>' + 
											'<a onclick="deleteBookmark(\''+url+'\')" class="btn btn-danger" href="#">'+"Delete"+'</a>'
											'</h3>' + 
											'</div>';
		}
	}
};