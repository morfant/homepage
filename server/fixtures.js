if (Posts.find().count() === 0) {

  for (var i = 0; i < 10; i++) {
    Posts.insert({
      title: 'Test post #' + i,
      desc: 'description..',
      role: 'role',
      date: '2017.02.26',
      venue: 'mullae art space',
      tag: 'performance',
      text: 'This performance...'
    });
  }

}