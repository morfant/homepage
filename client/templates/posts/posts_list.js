var tagLinkSpan;
var years_arr = [];

Session.set('postLength', 0);
Session.set('postItemAllRendered', false);

var getScrollPosition = function () {
    scroll_t = $(document).scrollTop();
    scroll_l = $(document).scrollLeft();
    // console.log(scroll_t);
    // console.log(scroll_l);
}

Template.postsList.onCreated(function() {

    console.log("postsList.onCreate()");
    // reset slideImages - will be made by post_item.js
    // console.log("postsList.onCreate() reset slideImages");
    // Session.set("slideImages", null);
    // global_arr = null;
    // console.log("session slideimages: " + Session.get("slideImages"));


    // attach handler
    $(document).on("scroll", getScrollPosition);
});


Template.postsList.helpers({
    getLength: function (data) {
        // console.log(data)
        let len = data.length;
        Session.set('postLength', len);
    },
    prepareYearTag: function(data){
        console.log("prepareYearTag()")
        // console.log(data)

        for (var i of data) {
            // console.log(i);
            // console.log(i.dateBegin);
            // console.log(moment(i.dateBegin).year());
            let y = moment(i.dateBegin).year();
            if (years_arr.indexOf(y) <= -1) {
                years_arr.push(y);
            }
        }

        console.log(years_arr);
    },
    sorted: function(d){
        console.log("sorted()");
        console.log(d);
        // return _.sortBy(todo.tags, function(tag) {
        //     return tag;
        //   });

        return d
    },
    d: function(data) {
        console.log(data);

    },
    posts: function (_tag) {

        var posts = [];

        if (_tag == undefined) {
            posts = Posts.find({}, {
                    sort: {
                        dateBegin : -1
                    }
                });
        } else {
            posts = Posts.find({tag: _tag}, {
                sort: {
                    dateBegin : -1 //newer one will display on top.
                    // dateBegin : 1 //newer one will display on top.
                }
            });
        }
        console.log(posts.fetch());
        return posts;
    },

});


Template.postsList.onRendered(function() {
    // console.log("posts_list rendered()");

    // made from mind_map.js
    var tagsObj = Session.get("all_tags");

    // clear previous tag links holder
    if (tagLinkSpan) {
        tagLinkSpan.outerHTML = "";
        delete tagLinkSpan;
    }

    // Make new tag links holder
    tagLinkSpan = document.createElement("SPAN");
    
    // for desktop view
    for (k in tagsObj) {
        // console.log(k); // key
        // console.log(tagsObj[k]); // value

        // Tag links on navbar (header.html)
        var linkText = document.createTextNode(" " + k);
        var a = document.createElement("A");
        a.href = PATH_postList + k; // link on the tag links (on header bar)
        a.appendChild(linkText);
        tagLinkSpan.appendChild(a); // attach to holder
    }

    // <ul class="nav navbar-nav"> <li><a href="mailto:giy.hands@gmail.com">giy.hands@gmail.com</a> </li></ul>

    // for mobile view
    var collapsedButton = document.getElementById("navigation");

    for (k in tagsObj) {
        var ul = document.createElement('ul');
        ul.className = "nav navbar-nav";
        var li = document.createElement('li');
        var a = document.createElement('a');
        a.href = PATH_postList + k; // link on the tag links (on header bar)
        var linkText = document.createTextNode(" " + k);
        a.appendChild(linkText);
        li.appendChild(a);
        ul.appendChild(li);
        collapsedButton.appendChild(ul);
    }




    // console.log("posts_list onRendered() make links");
    document.getElementById("tag-links").appendChild(tagLinkSpan);



    ///////////////
    // attach year tag on before first post each year 
    this.autorun(() => {

        let dateOrder = [];

        // console.log(this.data);
        for (p of Template.currentData()){ // reactive
        // for (p of this.data){

            let d = moment(p.dateBegin).format('YYYYMMDD');
            dateOrder.push(d)

        }

        dateOrder.sort(function(a,b){
            return a < b;
        })
        // console.log(dateOrder)


        if (Session.get('postItemAllRendered') == true) {
            // console.log("ATTACH YEAR TAGS!!!!!!!!!!!!")

            // remove previous year tags
            $('.year-tag').remove();
            $('.before-year-tag').remove();


            for(date of dateOrder) {

                let currentYear = date.slice(0, 4);
                // console.log(currentYear)

                if (global_prevYear != currentYear) {
                    var yearTag = document.createElement("DIV");
                    yearTag.className = "post year-tag " + currentYear;
                    var yearTag_content = document.createElement("DIV");
                    yearTag_content.className = "post-content";
                    var h3 = document.createElement("H3");
                    var a = document.createElement("A");
                    a.id = 'year-tag';
                    a.href = ""; // link on the tag links (on header bar)
                    var linkText = document.createTextNode(" " + currentYear);

                    a.appendChild(linkText);
                    h3.appendChild(a);
                    yearTag_content.appendChild(h3);
                    yearTag.appendChild(yearTag_content);

                    var holder = $('.posts')[0];
                    var targetToBefore = $('.'+date)[0];
                    // console.log(targetToBefore)
                    // console.log(holder);
                    // console.log(yearTag)
                    var br = document.createElement('br'); // divide pages
                    br.className = 'before-year-tag';
                    holder.insertBefore(br, targetToBefore);
                    holder.insertBefore(yearTag, targetToBefore);
                    // console.log(holder)

                    global_prevYear = currentYear;
                }
            }

        };
        Session.set('postItemAllRendered', false);
        // console.log(Session.get('postItemAllRendered'))
    });


    // restore previous scroll position
    $(document).scrollTop(scroll_t);
    $(document).scrollLeft(scroll_l);

});


Template.postsList.onDestroyed(function() {
    // console.log("ON DESTROYED");

    // detach handler
    $(document).off("scroll");

    // var collapsedButton = document.getElementById("navigation");
    
    $('.nav.navbar-nav').remove();
});
