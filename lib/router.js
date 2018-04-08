lastRoute = "";

Router.configure({
    layoutTemplate: 'layout',
    loadingTemplate: 'loading',
    notFoundTemplate: 'notFound',
    waitOn: function () {
        // return [Meteor.subscribe('posts'), Meteor.subscribe('comments')];
        return Meteor.subscribe('posts');
    }
});

Router.route('/:tag?', {
    name: 'postsList',
    data: function () {
        if (this.params.tag) {
            var tagHolder = new Object();
            tagHolder.tag = this.params.tag;
            // console.log(tagHolder.tag);
            return tagHolder;
        }
    },
 

});

Router.route('/posts/:_id', {
    name: 'postPage',
    data: function () {
        var r = Posts.findOne(this.params._id);
        // console.log(r);
        return r;
    }
});

Router.route('/posts/category/:tag', {
    name: 'postsList_tag',
    data: function () {
        var tagHolder = new Object();
        tagHolder.tag = this.params.tag;
        // console.log(tagHolder);
        return tagHolder;
    },
});


Router.route('/posts/:_id/edit', {
    name: 'postEdit',
    data: function () {
        return Posts.findOne(this.params._id);
    }
});

Router.route('/submit', {
    name: 'postSubmit'
});

Router.route('/adminSetup', {
    name: 'adminSetup'
});


var requireLogin = function () {
    if (!Meteor.user()) {
        if (Meteor.loggingIn()) {
            this.render(this.loadingTemplate);
        } else {
            this.render('accessDenied');
        }
    } else {
        this.next();
    }
}

var resetScrollPosition = function () {

    // reset scroll position for viewing each page
    $(document).scrollTop(0);
    $(document).scrollLeft(0);
    this.next();
}

var resetSwiperTag = function () {
    console.log("resetSwiperTag");
    BlazeLayout.render("swiper");
    // BlazeLayout.reset();
    // BlazeLayout.render('postsListTag');
    global_arr = null;
    this.next();
}

var resetSwiperTagFirstTime = function () {
    console.log("resetSwiperTagFirstTime");
    BlazeLayout.render("swiper");
    // BlazeLayout.reset();
    // BlazeLayout.render('postsListTag');
    global_arr = null;
    // this.next();
}

var reRenderSwiper = function () {

    global_arr = null;
    console.log("reRenderSwiper()");
    // var current = Router.current().route.getName();
    // var current = Session.get("lastRoute");
    var current = lastRoute;
    console.log(current);
    if (current == "postsList_tag"){
        console.log("rerender!!");
        // BlazeLayout.render('slideImages');
        this.next();
    } else {
        console.log("just next");
        this.next();
    }
    // Blaze.render(Template.postsList, document.getElementById('main'));
}

var setLastRoute = function () {
    var r = Router.current().route.getName();
    lastRoute = r;
    console.log("set lastRoute: " + lastRoute);
    // Session.set("lastRoute", r);
}

Router.onBeforeAction(requireLogin, {
    only: 'postSubmit'
});
// Router.onBeforeAction('dataNotFound', {
//     only: 'postPage'
// });
Router.onBeforeAction(resetScrollPosition, {
    only: 'postPage'
});

// Router.onRerun(resetSwiperTag, {
//     only: 'postsList_tag',
// });

// Router.onBeforeAction(reRenderSwiper, {
//     only: 'postsList_tag',
// });

// Router.onBeforeAction(resetSwiperTag, {
//     only: 'postsList',
// });

// Router.onAfterAction(setLastRoute, {
//     only: 'postsList_tag'
// });
