////$(document).ready(function () {
////    $(function () {


////    });

////});

function showLoader(isRemove = false) {
    $(".cst-loader").addClass("d-inline-block")
    $(".cst-loader").removeClass("d-none")
    if (isRemove) {
        setTimeout(function () { hideLoader() }, 10000);
    }
}
function hideLoader() {
    $(".cst-loader").addClass("d-none")
    $(".cst-loader").removeClass("d-inline-block")
}
window.addEventListener("beforeunload", function() {
    const expiresIn = localStorage.getItem("expiresIn");
    if (expiresIn && new Date().getTime() >= expiresIn) {
      localStorage.removeItem("contentid");
    }
});
function submitcontnetrating(contentid, contentname, url, stars, culture, ipAddress, isSubmitted) {
    for (var i = 1; i < 6; i++) {
        $("#" + contentid + "-sL-star-" + i).attr('disabled', 'disabled');
    }

    const expiresIn = new Date();
    expiresIn.setTime(expiresIn.getTime() + (30 * 24 * 60 * 60 * 1000));

    localStorage.setItem("expiresIn", expiresIn);

    if (JSON.parse(localStorage.getItem(contentid))) {
        return;
    }

    if (isSubmitted === "false" || isSubmitted === false) {
        var $ContentRatingForm = $('#content-rating-form');
        var $contentNameField = $('#a7f59d62-d14c-4fc2-85a6-25189270d05f');
        var $contentUrlField = $('#18a2618d-5856-49c7-a38c-9e6c91bf911c');
        var $contentStarField = $('#d0fd4cd8-f413-45a1-974e-1d9f1d3e9ea9');
        var $contentCultureField = $('#15b369ae-71c9-4154-afa0-25f540778f84');
        var $contentContentIdField = $('#80006d85-b030-4caf-9c9b-9ed9fae593b5');
        var $contentIpAddressField = $('#93bb08e2-8bee-4f71-f4fc-33f94966471e');

        $contentNameField.val(contentname);
        $contentUrlField.val(url);
        $contentCultureField.val(culture);
        $contentContentIdField.val(contentid);
        $contentStarField.val(stars);
        $contentIpAddressField.val(ipAddress);

        localStorage.setItem('contentid', contentid);
        //$.ajax({
        //    url: $ContentRatingForm.attr('action'),
        //    type: 'POST',
        //    cache: false,
        //    data: $ContentRatingForm.serialize(),
        //    success: function (result) {
        //        console.log("success YES")
        //    }
        //});

        const obj = {
            Key: contentid,
            Name: contentname,
            Culture: culture,
            Rating: stars
        //    Type: contentType,
         //   Url: window.location.href
        }

        $.ajax({
            url: "/umbraco/surface/rating/SaveRating",
            type: 'POST',
            contentType: 'application/json',
            data: JSON.stringify(obj),
            success: function (result) {
                console.log("success YES")
            }
        });
    }
}

$(".stars--input .star").on('click', function(){
    var thisThanksMessage = $(this).closest(('.stars--input')).find('.thank-msg');
    var thisThanksMessageP = $(this).closest(('.stars--input')).find('.thank-msg p');
    var parentEl = $(this).closest('.ratin-block').attr('id');

    $('input[name=star]:checked').each(function(){
        if(!$(this).is(':enabled') || parentEl == localStorage.getItem('contentid')) {
            $(thisThanksMessageP).text('You can\'t rate again');
        } else {
            $(thisThanksMessageP).text('Thanks for rating'); 
        }

        thisThanksMessage.addClass('d-flex');
        thisThanksMessage.removeClass('d-none');

        setTimeout(function () {
            thisThanksMessage.addClass('d-none');
            thisThanksMessage.removeClass('d-flex');

        }, 3000);
    });
});

function submitcontnetlike_dislike(contentid, contentname, url, islike, culture, ipAddress, isSubmitted, contentType) {
    if (isSubmitted === "false" || isSubmitted === false) {
        $(".cst-loader").addClass('d-inline-block');
        var $ContentlikeDislikeForm = $('#content-likedislike-form');
        var $contentNameField = $('#cdc3e1ad-7876-4ded-9ed2-9e70c184cf52');
        var $contentUrlField = $('#4a849f88-9c43-47d6-8b7d-41deb56a2930');
        var $contentLikeDislikeField = $('#fedf37e8-95bd-4d17-8a26-dae31c4c8958');
        var $contentCultureField = $('#2e789f71-f945-4588-b6d9-7377bada9777');
        var $contentContentIdField = $('#10ea33ed-bee6-4ef0-b514-b758ce3d3bf7');
        var $contentIpAddressField = $('#423abcd4-885c-421b-90b8-ce9d4d7bff3a');
       
      

        
      


        if (islike === "true") {
            var likePObject = $("#p-like-" + contentid);
            var likeP = $("#p-like-" + contentid).text();
            $("#p-like-" + contentid).text(parseInt(likeP) + 1);
            var nextIcon = likePObject.closest('a').find('.fa-thumbs-up');


            nextIcon.removeClass("far");
            nextIcon.addClass("fa");
        }
        else {
            var dislikePObject = $("#p-dislike-" + contentid)
            var dislikeP = $("#p-dislike-" + contentid).text();
            $("#p-dislike-" + contentid).text(parseInt(dislikeP) + 1);
            var nextIcon = dislikePObject.closest('a').find('.fa-thumbs-down');


            nextIcon.removeClass("far");
            nextIcon.addClass("fa");
        }
        //var buttons = event.target.parentNode.parentNode.querySelectorAll("a");
        //buttons.forEach((item) => {
        //    item.onclick = "";
        //});

        $contentNameField.val(contentname);
        $contentUrlField.val(url);
        $contentUrlField.val(url);
        $contentCultureField.val(culture);
        $contentContentIdField.val(contentid);
        $contentLikeDislikeField.val(islike);
        $contentIpAddressField.val(ipAddress);

        const obj = {
            Key: contentid,
            Name: contentname,
            Culture: culture,
            IsLike: islike === "true" ? true : false
        //    Type: contentType,
        //    Url: window.location.href
        }
//console.log(JSON.stringify(obj));
        $.ajax({
            url: "/umbraco/surface/rating/SaveReaction",
            type: 'POST',
            contentType: 'application/json',
            data: JSON.stringify(obj),
            success: function (result) {
                console.log("success YES")
            }
        });

        //$.ajax({
        //    url: $ContentlikeDislikeForm.attr('action'),
        //    type: 'POST',
        //    cache: false,
        //    data: $ContentlikeDislikeForm.serialize(),
        //    success: function (result) {
                
        //        console.log("success like/dislike YES")

        //    }
        //});
        $(".cst-loader").removeClass('d-inline-block');
    }
}

// Changing the state of Like and Dislike icons
$(".fa-thumbs-up").change(function () {
    let nextIcon = $(this).closest('div').find('.fa-thumbs-down');

    $(this).removeClass("far").addClass("fa");
    $(nextIcon).removeClass("fa").addClass("far");
    $(nextIcon).off();
    $(this).off();
});
$(".fa-thumbs-down").change(function () {
   let nextIcon = $(this).closest('div').find('.fa-thumbs-up');
    
    $(this).removeClass("far").addClass("fa");
    $(nextIcon).removeClass("fa").addClass("far");
    $(nextIcon).off();
    $(this).off();
});

//$(document).ready(function () {
//    $(".fa-thumbs-up").click(function () {
//        alert("COMPANY");
//        $(this).removeClass("far").addClass("fa"); //console.log("liked");
//    });

//    $(".fa-thumbs-down").click(function () {
//        alert("COMPANY 2");
//        $(this).removeClass("far").addClass("fa"); //console.log("disliked");
//    });
//});

function showNotifications(txt, name, copyToClipboardTxt, isSamePage = false) {
  
    showNotification = true;
    notificationText = copyToClipboardTxt;
    var copyElement = document.createElement("textarea");
    copyElement.style.position = 'fixed';
    copyElement.style.opacity = '0';
  
    if (isSamePage) {

        copyElement.textContent = window.location.href.split("?")[0] + "?Search=" + name;

    }
    else {


        copyElement.textContent = window.location.origin + "/" + window.location.pathname.split('/')[1] + "/search?Search=" + name;
    }
    var body = document.getElementsByTagName('body')[0];
    body.appendChild(copyElement);
    copyElement.select();
    document.execCommand('copy');
    body.removeChild(copyElement);

    if (typeof showNotification === 'undefined') {
        showNotification = true;
    }
    if (typeof notificationText === 'undefined') {
        notificationText = "Copied to clipboard";
    }

    var notificationTag = $("div.copy-notification");
    if (showNotification && notificationTag.length == 0) {
        notificationTag = $("<div/>", { "class": "copy-notification", text: notificationText });
        $("body").append(notificationTag);

        notificationTag.fadeIn("slow", function () {
            setTimeout(function () {
                notificationTag.fadeOut("slow", function () {
                    notificationTag.remove();
                });
            }, 1000);
        });
    }
}


function commentFormTitla(txt) {
    $('#c2f7b68a-3ed6-4a46-b269-8d63d798f1fe').val(txt);
    $('#doctexttitle1').text(txt);

    $('.commentFormThanks').hide()
    $('.commentFormContent').show()
}