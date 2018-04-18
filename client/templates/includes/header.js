Template.header.onCreated(function() {

    // console.log("header created()");

});


Template.header.events({
    'click .navbar-nav' : function (e) {
        $('#navigation').collapse('hide')
    },

});



Template.header.onRendered(function() {
    console.log("header rendered()");


    this.autorun(() => {
        // console.log("header onRendered()");

        // made from mind_map.js
        var tagsObj = Session.get("all_tags");
        // console.log(tagsObj);

        var tagLinkSpan = $('#tag-links span');

        // clear previous tag links holder
        if (tagLinkSpan) {
            tagLinkSpan.remove();
        }

        // clear previous tags on collapsed 
        var collapsed = $('.nav.navbar-nav.tags');
        if (collapsed) {
            $('.nav.navbar-nav.tags').remove();
        }

        // Make new tag links holder
        tagLinkSpan = document.createElement("SPAN");
        
        // --for desktop view
        for (k in tagsObj) {
            // console.log(k); // key
            // console.log(tagsObj[k]); // value

            if (k) { // ignore if it has no tag
                // console.log("tag: " + k); // key
                // Tag links on navbar (header.html)
                var linkText = document.createTextNode(" " + k);
                var a = document.createElement("A");
                a.href = PATH_postList + k; // link on the tag links (on header bar)
                a.appendChild(linkText);
                tagLinkSpan.appendChild(a); // attach to holder
            }

        }

        // console.log("posts_list onRendered() make links");
        document.getElementById("tag-links").appendChild(tagLinkSpan);


        // --for mobile view
        var collapsedButton = document.getElementById("navigation");

        for (k in tagsObj) {

            if (k) { // ignore if it has no tag
                var ul = document.createElement('ul');
                ul.className = "nav navbar-nav tags";
                var li = document.createElement('li');
                var a = document.createElement('a');
                a.href = PATH_postList + k; // link on the tag links (on header bar)
                a.className = "tag-links-a";
                var linkText = document.createTextNode(" " + k);
                a.appendChild(linkText);
                li.appendChild(a);
                ul.appendChild(li);
                collapsedButton.appendChild(ul);
            }
        }

    });

});

