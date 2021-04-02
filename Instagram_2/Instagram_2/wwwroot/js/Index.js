var div = document.getElementById("MainContent");

var newSpan = $("<span></span>").text("Hello 2");
$("#MainContent").append(newSpan);


$("#MainContent").on("click", ".ButtonClass", ClickButton);

$("<span>Test</span>").append(".ParaClass"); 