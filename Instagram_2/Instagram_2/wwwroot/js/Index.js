$("<span></span>").attr("id", "Gram").text("My Gram").appendTo("#MainContainerDiv");
$("<button></button>").attr("id", "LoginButton").text("Log In").appendTo("#MainContainerDiv");
$("<button></button>").attr("id", "SignupButton").text("Sign Up").appendTo("#MainContainerDiv");
$("</br>").appendTo("#MainContainerDiv");

var imageContainer = $("<div></div>").attr("id", "ImageContainer").appendTo("#MainContainerDiv");
var table = $("<table></table>").appendTo(imageContainer);
var tbody = $("<tbody></tbody>").attr("id", "ImageBodyContainer").appendTo(table);

$("</br>").appendTo("#MainContainerDiv");
$("<span></span>").attr("id", "About").text("About").appendTo("#MainContainerDiv");
$("<span></span>").attr("id", "Blog").text("Blog").appendTo("#MainContainerDiv");
$("<span></span>").attr("id", "Jobs").text("Jobs").appendTo("#MainContainerDiv");
$("<span></span>").attr("id", "Help").text("Help").appendTo("#MainContainerDiv");
$("</br>").appendTo("#MainContainerDiv");
$("<span></span>").attr("id", "English").text("English").appendTo("#MainContainerDiv");
$("<span></span>").attr("id", "2021").text("2021").appendTo("#MainContainerDiv");
$("<span></span>").attr("id", "MyGram").text("MyGram").appendTo("#MainContainerDiv");
$("</br>").appendTo("#MainContainerDiv");
$("#SignupButton").click(function () {
    $("#RegisterDialog").dialog("open");
});
$("#LoginButton").click(function () {
    alert("You have successfully logged in!");
});

$(document).ready(function () {
    $('form[name="UserInputForm"]').validate({
        rules: {
            User: "required",
            Password: "required"
        },
        messages: {
            User: "User is required",
            Password: "Password is required"
        },
        submitHandler: function (form) {
            var user = $("#User").val();
            var password = $("#Password").val();

            $.when($.ajax({
                url: "/Home/Register",
                type: "POST",
                data: {
                    User: user,
                    Password: password
                },
                datatype: "json"
            })).then(function (data) {
                if (data != null && data.registerMessage != "") {
                    $.toast({
                        heading: "Success",
                        text: data.registerMessage,
                        icon: "success",
                        loader: true,
                        loaderBg: "blue"
                    });
                }
            });
        }
    });

    $.when($.ajax({
        url: "/Home/GetAllImages",
        method: "GET"
    })).then(function (data) {
        var image = null;
        var tbody = $("#ImageBodyContainer");
        var tr = $("<tr></tr>");
        var td = null;
        var counter = 0;

        for (var element in data) {
            if (counter == 5) {
                tbody.append(tr);
                tr = $("<tr></tr>");
                counter = 0;
            }
            image = data[element];

            td = $("<td></td>");
            $("<span></span>").addClass("ImageClass").text(image.imageAlt).css("margin-right", "10px")
                .appendTo(td);
            tr.append(td);

            counter++;
        }

        tbody.append(tr);


        $(".ImageClass").click(function () {
            $.when($.ajax({
                url: "/Home/ImageIsLiked",
                type: "POST",
                datatype: "json"
            })).then(function (data) {
                if (data == true) {
                    $.toast({
                        heading: "Success",
                        text: "You liked the image",
                        icon: "success",
                        loader: true,
                        loaderBg: "blue"
                    });
                }
            });
        });
    });

    $("#RegisterDialog").dialog({
        autoOpen: false,
        modal: true
    });

});