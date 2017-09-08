import { FilesCollection } from 'meteor/ostrio:files';

// this.Images = new FilesCollection({
//   collectionName: 'Images',
//   storagePath: '/Users/giy/homepage/server/images', // It need to be changed when deploy to real server.
//   allowClientCode: false, // Disallow remove files from Client
//   onBeforeUpload(file) {
//     // Allow upload files under 10MB, and only in png/jpg/jpeg formats
//     if (file.size <= 10485760 && /png|jpg|jpeg/i.test(file.extension)) {
//       return true;
//     } else {
//       return 'Please upload image, with size equal or less than 10MB';
//     }
//   }
// });


// if (Meteor.isClient) {
//   Meteor.subscribe('files.images.all');
// }

// if (Meteor.isServer) {
//   Meteor.publish('files.images.all', function () {
//     return Images.find().cursor;
//   });
// }


this.Images = new FilesCollection({collectionName: 'Images'});
this.Videos = new FilesCollection({collectionName: 'Videos'});

if (Meteor.isServer) {
  // Upload sample files on server's startup:
  Meteor.startup(() => {
    Images.load('https://raw.githubusercontent.com/VeliovGroup/Meteor-Files/master/logo.png', {
      fileName: 'logo.png'
    });
    Videos.load('http://www.sample-videos.com/video/mp4/240/big_buck_bunny_240p_5mb.mp4', {
      fileName: 'Big-Buck-Bunny.mp4'
    });
  });

  Meteor.publish('files.images.all', function () {
    return Images.find().cursor;
  });

  Meteor.publish('files.videos.all', function () {
    return Videos.find().cursor;
  });
} else {
  // Subscribe to file's collections on Client
  Meteor.subscribe('files.images.all');
  Meteor.subscribe('files.videos.all');
}