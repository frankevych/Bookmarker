//listen if form is submited
document.getElementById("myForm").addEventListener("submit", saveBookmark);
//create array of bokmarks;
let bookmarks = [];
//get item by the key from local storage and parse it to string
function getLocalStorage(itemKey){
	return JSON.parse(localStorage.getItem(itemKey));
}
//set stringifyed item to local storage by the key
function setLocalStorage(itemKey, item){
	localStorage.setItem(itemKey, JSON.stringify(item));
}
//function for saving bookmarks 
function saveBookmark(e) {
	//get users input values
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

 	//test if bookmarks arr is null
	if (localStorage.getItem("bookmarks") === null) {
		//init array
		bookmarks = [];
		//push item in array
		bookmarks.push(bookmark);
		//set array of bookmarks to local storage
		setLocalStorage("bookmarks", bookmarks);

	} else {
		//get array of bookmarks from local storage with key "bookmarks"
		bookmarks = getLocalStorage("bookmarks");
		//add element to array
		bookmarks.push(bookmark);
		//set refreshed array of bookmarks back to local storage
		setLocalStorage("bookmarks", bookmarks);
	}
	//re-fetch so shown data is actual without reloading the page
	fetchBookmarks();
	//to clear input fields after user created bookmark
	document.getElementById("siteName").value = "";
	document.getElementById("siteUrl").value = "";

	//uncomment function below to use console.log() as debugger
	//e.preventDefault(e);
};

//delete boookmarks function
function deleteBookmark(url){
	//get element by key with the passed argument url
	bookmarks = getLocalStorage("bookmarks");
	//loop through every single item in arr
	let i;
	for (i = 0; i < bookmarks.length; i++) {
		// if url value of any element will match url passed as a parameter
		if(bookmarks[i].url === url){
			//remove one element
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
			//build an output
			bookmarksResults.innerHTML += '<div class="card bg-light text-dark card-body">' +
											'<h3>' + name + ": " + 
											'<a class="btn btn-secondary" target="_blank" href="'+url+'">' + "Visit" + '</a>' + 
											'<a onclick="deleteBookmark(\''+url+'\')" class="btn btn-danger" href="#">'+"Delete"+'</a>'
											'</h3>' + 
											'</div>';
		}
	}
};