var years_arr = [];
var posts = [];

Session.set('postLength', 0);
Session.set('postItemAllRendered', false);

var getScrollPosition = function () {
    scroll_t = $(document).scrollTop();
    scroll_l = $(document).scrollLeft();
    // console.log(scroll_t);
    // console.log(scroll_l);
}

Template.postsList.onCreated(function() {

    // console.log("postsList.onCreate()");

    // attach handler
    $(document).on("scroll", getScrollPosition);
});


Template.postsList.helpers({
    getLength: function () {
        // console.log("getLength");
        let len = this.length;
        // console.log(len)
        Session.set('postLength', len);
    },
    prepareYearTag: function(data){
        // console.log("prepareYearTag()")

        for (var i of data) {
            let y = moment(i.dateBegin).year();
            if (years_arr.indexOf(y) <= -1) {
                years_arr.push(y);
            }
        }

        // console.log(years_arr);
    },
    posts: function (_tag) {
        // console.log(_tag);

        // posts is global on this file

        if (_tag == undefined) {
            posts = Posts.find({}, {
                    sort: {
                        dateBegin : -1
                    }
                }).fetch();
        } else {
            posts = Posts.find({tag: _tag}, {
                sort: {
                    dateBegin : -1 //newer one will display on top.
                    // dateBegin : 1 //newer one will display on top.
                }
            }).fetch();
        }
        // console.log(posts);
    },
});


Template.postsList.onRendered(function() {
    // console.log("posts_list rendered()");

    // attach year tag before first post for each year 
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

Template.postsList.events({
    // console.log(Session.get('postsListDone'))
    'click .tag-links-a': function (e) {
        if (Session.get('postsListDone') == true) {
            e.preventDefault();
            console.log("click tag links: " + e.target);
        }
    }


});


Template.postsList.onDestroyed(function() {
    // console.log("ON DESTROYED");

    // detach handler
    $(document).off("scroll");

    // var collapsedButton = document.getElementById("navigation");
});
