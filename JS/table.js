const WEEK = ["Понедельник", "Вторник", "Среда", "Четверг", "Пятница", "Суббота"];
const MAX_ROWS_COUNT = 10;
const DEFAULT_ROWS_COUNT = 5;
const MAX_COLUMNS_COUNT = 6;
const DEFAULT_COLUMN_COUNT = 5;


(function() {
	restoreMatrix()
	rebuildTable()
	fillFields()
})()


function createMatrix() {
	var matrix = [];

	for(var i = 0; i < MAX_ROWS_COUNT; i++) {
		matrix.push([])
		for(var j = 0; j < MAX_COLUMNS_COUNT; j++) {
			matrix[i].push('')
		}
	}

	localStorage.setItem('items', JSON.stringify(matrix))
}


function restoreMatrix() {
	var rows = localStorage.getItem('rows')
	var columns = localStorage.getItem('columns')
	
	if (rows == null) {
		rows = DEFAULT_ROWS_COUNT
	}
	
	if (columns == null) {
		columns = DEFAULT_COLUMN_COUNT
	}
	
	if(localStorage.getItem('items') == null) {
		createMatrix()
	}
	
	var radioButtons = document.getElementsByName("days")
	for(var i = 0; i < radioButtons.length; i++) {
		if(radioButtons[i].value == columns) {
			radioButtons[i].checked = true
			break
		}
	}
	
	document.getElementById("max_subjects").value = rows
}


function fillFields() {
	var columns = document.querySelector('input[name="days"]:checked').value
	var rows = document.getElementById("max_subjects").value
	
	var matrix = JSON.parse(localStorage.getItem("items"))
	
	var table = document.getElementById("result").firstChild
	
	for(var i = 0; i < rows; i++) {
		for(var j = 0; j < columns; j++) {
			table.childNodes[i + 1].childNodes[j].appendChild(document.createTextNode(matrix[i][j]))
		}
	}
	
	console.log(matrix)
}


function createEmptyTable(rows, columns) {
	var result = document.getElementById("result")
	result.innerHTML = ''
	
	var table = document.createElement("table")

	var titles = document.createElement("tr")
	for(var i = 0; i < columns; i++) {
		var th = document.createElement("th")
		th.appendChild(document.createTextNode(WEEK[i]))
		titles.appendChild(th)
	}
	table.appendChild(titles)
	
	for(var i = 0; i < rows; i++) {
		var tr = document.createElement("tr")
		for(var j = 0; j < columns; j++) {
			tr.appendChild(document.createElement("td"))
		}
		table.appendChild(tr)
	}
	
	result.appendChild(table)
}


function reduceCountRows(table, rows, columns) {
	var curRows = table.childNodes.length - 1
	var curColumns = table.firstChild.childNodes.length
	
	while(curRows > rows) {
		table.removeChild(table.lastChild)
		curRows--
	}
	
	while(curColumns > columns) {
		for(var i = 0; i < table.childNodes.length; i++) {
			table.childNodes[i].removeChild(table.childNodes[i].lastChild)
		}
		curColumns--
	}
}


function enlargeTable(table, rows, columns) {
	var curRows = table.childNodes.length - 1
	var curColumns = table.firstChild.childNodes.length
	
	for(var i = curRows; i < rows; i++) {
		var tr = document.createElement("tr")
		for(var j = 0; j < curColumns; j++) {
			tr.appendChild(document.createElement("td"))
		}
		table.appendChild(tr)
	}

	let titles = table.firstChild
	for(var i = curColumns; i < columns; i++) {
		let th = document.createElement("th")
		th.appendChild(document.createTextNode(week[i]))
		titles.appendChild(th)
		for(var j = 1; j <= rows; j++) {
			table.childNodes[j].appendChild(document.createElement("td"))
		}
	}
}


function addSelectOptions(columns, rows, prefix) {
	let day_select = document.getElementById(prefix + "_day")
	let pos_select = document.getElementById(prefix + "_position")
	day_select.innerHTML = ''
	pos_select.innerHTML = ''
	for(var i = 0; i < columns; i++) {
		let opt = document.createElement("option")
		opt.appendChild(document.createTextNode(WEEK[i]))
		day_select.appendChild(opt)
	}
	
	for(var i = 0; i < rows; i++) {
		let opt = document.createElement("option")
		opt.appendChild(document.createTextNode(i + 1))
		pos_select.appendChild(opt)
	}
}


function rebuildTable() {
	var columns = document.querySelector('input[name="days"]:checked').value
	var rows = document.getElementById("max_subjects").value
	
	localStorage.setItem('rows', rows)
	localStorage.setItem('columns', columns)
	
	var result = document.getElementById("result")
	
	if(result.firstChild == null) {
		createEmptyTable(rows, columns)
	} 
	else {
		var table = result.firstChild
		reduceCountRows(table, rows, columns)
		enlargeTable(table, rows, columns)
	}
	
	addSelectOptions(columns, rows, "add")
	addSelectOptions(columns, rows, "del")
}


function addItem() {
	var day = document.getElementById("add_day").value
	var position = document.getElementById("add_position").value
	var item = document.getElementById("item").value
	
	if(item == '') {
		alert("You have an empty item!")
	} 
	else {
		var ind = WEEK.indexOf(day)
		var children = document.getElementById("result").firstChild.childNodes
		
		children[position].childNodes[ind].innerHTML = ''
		children[position].childNodes[ind].appendChild(document.createTextNode(item))
		
		var matrix = JSON.parse(localStorage.getItem("items"))
		matrix[position - 1][ind] = item
		localStorage.setItem('items', JSON.stringify(matrix))
	}
}

function deleteItem() {
	var day = document.getElementById("del_day").value
	var position = document.getElementById("del_position").value
	
	var ind = WEEK.indexOf(day)
	var children = document.getElementById("result").firstChild.childNodes
	
	children[position].childNodes[ind].innerHTML = ''
	
	var matrix = JSON.parse(localStorage.getItem("items"))
	matrix[position - 1][ind] = ''
	localStorage.setItem('items', JSON.stringify(matrix))
}

function clearTable() {
	var columns = document.querySelector('input[name="days"]:checked').value
	var rows = document.getElementById("max_subjects").value
	
	localStorage.setItem('rows', rows)
	localStorage.setItem('columns', columns)
	
	createEmptyTable(rows, columns)
	createMatrix(rows, columns)
}