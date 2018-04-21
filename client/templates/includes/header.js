

Template.header.onCreated(function() {

    // console.log("header created()");
    Session.set('selectedTag', 'Tags');

});


Template.header.events({
    'click .navbar-nav' : function (e) {
        $('#navigation').collapse('hide')
    },

    // set color of selected tag on desktop view
    'click #tag-links span a' : function(e) {
        // console.log(Session.get('selectedTag'));
        // console.log(e.target)
        // Session.set("selectedTag", e.target.textContent);

        // select element : children(a) of child(span) of #tag-links
        let tagLinks = document.getElementById('tag-links').childNodes[0].childNodes;
        // console.log(tagLinks)

        for (tag of tagLinks) {
            // console.log(tag);
            tag.style.color = 'grey';
            // tag.style.fontSize = '100%';
        }

        e.target.style.color = 'hotpink';
        // e.target.style.fontSize = '120%';
    },

    // set Button name as selected tag on mobile view
    // 'click .tag-links-a' : function(e) {
    //     // console.log(e.target);
    //     Session.set('selectedTag', e.target.textContent);
    // }

});


Template.header.helpers({
    buttonName: function() {
        return Session.get('selectedTag');
    }

});


Template.header.onRendered(function() {
    // console.log("header rendered()");

    this.autorun(() => {
        console.log("header rendered changed()");

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


        // Set color hotpink to selected tag
        let tagLinks = document.getElementById('tag-links').childNodes[0].childNodes;

        if (tagLinks.length) {
            // console.log("haha")
            for (tag of tagLinks) {
                let t = tag.textContent;
                let ses = Session.get('selectedTag');

                check(t, String);
                check(ses, String);

                if (t.split(' ')[1] === ses) {

                    // console.log("matched!!!!");
                    tag.style.color = 'hotpink';
                    return

                } else {
                    // console.log("not match");
                }
            }


        }

    });

  

});

