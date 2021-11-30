window.addEventListener('load', () => 
{
	var loadTime = window.performance.timing.domContentLoadedEventEnd - window.performance.timing.navigationStart;
	document.getElementById("task4-2").innerText = `Время: ${loadTime}`;
});

var local = document.location.href.split('/'); 
switch (local[local.length - 1]) {
	case "index.html":
		document.getElementById("main").classList.add("navigation__tag_selected");
		break;
	case "knowledge_page.html":
		document.getElementById("knowledge").classList.add("navigation__tag_selected");
		break;
	case "experience_page.html":
		document.getElementById("experience").classList.add("navigation__tag_selected");
		break;
	case "schedule.html":
		document.getElementById("schedule").classList.add("navigation__tag_selected");
		break;
	case "data.html":
		document.getElementById("data").classList.add("navigation__tag_selected");
		break;
}
	