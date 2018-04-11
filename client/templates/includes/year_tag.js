// var global_prevYear = 0;

// Session.set('newYear', false);
var isn = false;

Template.yearTag.onCreated(function() {

    // this.autorun(function() {
        console.log("----------------------------------------");
        console.log("yearTag onCreated()");
    //     Iron.Location.get().path;

    //     console.log(this);
        // console.log(Template.currentData());
    //     // console.log(Router.current().route.path(this));
    //     // console.log(Iron.Location.get().path);

    // })






});


// Template.registerHelper("getYear", function(dateBegin){

//  });


Template.yearTag.helpers({
    isNewUrl: function() {
        console.log("isNewUrl()");
        if (global_url != Iron.Location.get().path) {
            console.log(global_url + " -> " + Iron.Location.get().path);
            console.log("NEW URL: true");
            // console.log(this);
            global_url = Iron.Location.get().path;
            global_prevYear = 0;
        } else {
            console.log(global_url + " -> " + Iron.Location.get().path);
            console.log("NEW URL: false");
            // console.log("FALSE");
            // console.log(global_url);
            // console.log(Iron.Location.get().path);
        }
    },
    year: function() {
        // console.log("year(): " + global_prevYear.toString());
        return global_prevYear.toString();
    },
    isNewYear: function(dateBegin) {
        var y = moment(dateBegin).year();
        console.log("isNewYear(" + y + ")");
             
        
        if (y != global_prevYear) {
            console.log("global_prevYear: " + global_prevYear);
            global_prevYear = y;
            console.log("isNewYear: true");
            console.log("TITLE: " + Template.currentData().title);

            // makeYearTag(y);
            // Session.set('newYear', true);
            isn = true;

            // return true;

        } else {
            console.log("isNewYear: false");
            console.log("TITLE: " + Template.currentData().title);
            // console.log(Template.currentData().title);
            // Session.set('newYear', false);
            isn = false;
            // return false;
        }
    },
});

var makeYearTag = function(year) {
    console.log("makeYearTag()");

    // if (Session.get('newYear') == true) {
        var yt = document.getElementById('yt');
        console.log(yt);
        var div = document.createElement("DIV");
        div.className = "post";
        var div_2 = document.createElement("DIV");
        div_2.className = "post-content";
        var a = document.createElement("A");
        a.id = "year-tag";
        var h3 = document.createElement("H3");
        var t = document.createTextNode(year);
        h3.appendChild(t);
        h3.append(a);
        div_2.appendChild(h3);
        div.appendChild(div_2);
        yt.appendChild(div);
    // }



    // var a = document.createElement("A");
    // a.href = "/posts/"+obj.id; // link on the slide image
    // a.style = "width:90%; height:100%";
    // // console.log(a.href);

    // // Title text
    // var p = document.createElement("P");
    // p.className = "swiper-title-text";
    // var t = document.createTextNode(obj.title);
    // p.appendChild(t);
    // // console.log(p);

    // a.appendChild(p);
    // div.appendChild(a);
    // mySwiper.appendSlide(div); // swiper js API



    //     <br><br>

    //     <div class="post">
    //         <div class="post-content">
    //             <h3><a id="year-tag" href="">{{year}}</a></h3>
    //         </div>
    //     </div>

    

}


Template.yearTag.onRendered(function() {
    console.log("yearTag ONRENDERED()");


    // clear previous tag links holder
    // if (tagLinkSpan) {
    //     tagLinkSpan.outerHTML = "";
    //     delete tagLinkSpan;
    // }

    // if (Session.get('newYear') == true) {
    if (isn == true) {

        var div = document.createElement("DIV");
        div.className = "post";
        var div_2 = document.createElement("DIV");
        div_2.className = "post-content";
        var a = document.createElement("A");
        a.id = "year-tag";
        var h3 = document.createElement("H3");
        var t = document.createTextNode(global_prevYear);
        h3.appendChild(t);
        h3.append(a);
        div_2.appendChild(h3);
        div.appendChild(div_2);
        // console.log("posts_list onRendered() make links");
        document.getElementById("yt").appendChild(div);
    }


});


Template.yearTag.events({
    'click #year-tag': function (e) {
        e.preventDefault();
        console.log("click year tag: " + e.target.textContent);
    }
});


