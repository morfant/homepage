
Router.configure({
    layoutTemplate: 'layout',
    loadingTemplate: 'loading',
    notFoundTemplate: 'notFound',
    waitOn: function () {
        // return [Meteor.subscribe('posts'), Meteor.subscribe('comments')];
        return Meteor.subscribe('posts');
    }
});

Router.route('/', {
    name: 'postsList'
});

Router.route('/posts/:_id', {
    name: 'postPage',
    data: function () {
        var r = Posts.findOne(this.params._id);
        console.log(r);
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
    }
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
    BlazeLayout.reset();
    BlazeLayout.render('postsListTag');
    global_arr = null;
    this.next();
}

var resetSwiperTagFirstTime = function () {
    console.log("resetSwiperTagFirstTime");
    BlazeLayout.reset();
    BlazeLayout.render('postsListTag');
    global_arr = null;
    this.next();
}

// var resetSwiper = function () {

//     console.log("resetSwiper");
//     // Blaze.render(Template.postsList, document.getElementById('main'));
//     // isSwiperCreated = false;
//     // Session.set("slideImages", null);
//     // Session.set("isSlideImagesSet", false);
//     global_arr = null;
//     this.next();
// }

Router.onBeforeAction(requireLogin, {
    only: 'postSubmit'
});
Router.onBeforeAction('dataNotFound', {
    only: 'postPage'
});
Router.onBeforeAction(resetScrollPosition, {
    only: 'postPage'
});
Router.onRerun(resetSwiperTag, {
    only: 'postsList_tag',
});

Router.onRun(resetSwiperTagFirstTime, {
    only: 'postsList_tag',
});
// Router.onBeforeAction(resetSwiper, {
//     only: 'postsList',
// });
