module.exports = {
  servers: {
    one: {
      // TODO: set host address, username, and authentication method
      host: '119.205.235.22',
      username: 'root',
      // pem: './path/to/pem'
      password: 'rkffkvhrhtm+-77',
      opts: {"port": 4120}
      // or neither for authenticate from ssh-agent
    }
  },

  app: {
    // TODO: change app name and path
    name: 'GangilYi',
    path: '../',

    servers: {
      one: {},
    },

    buildOptions: {
      serverOnly: true,
    },

    env: {
      // TODO: Change to your app's url
      // If you are using ssl, it needs to start with https://
      ROOT_URL: 'https://gangilyi.xyz',
//      ROOT_URL: 'http://morfant.cafe24.com',
      // MONGO_URL: 'mongodb://localhost/meteor',
      MONGO_URL: 'mongodb://giy:akdyspwm+-77@ds141657.mlab.com:41657/giy_homepage',
    },

    ssl: { // (optional)
      // Enables let's encrypt (optional)
      autogenerate: {
        email: 'giy.hands@gmail.com',
        // comma separated list of domains
        domains: 'gangilyi.xyz,morfant.cafe24.com'
      }
    },

    docker: {
      // change to 'abernix/meteord:base' if your app is using Meteor 1.4 - 1.5
      image: 'abernix/meteord:node-8.4.0-base',
    },

    // Show progress bar while uploading bundle to server
    // You might need to disable it on CI servers
    enableUploadProgressBar: true
  },

  //mongo: {
  //  version: '3.4.1',
  //  servers: {
  //    one: {}
  //  }
  //}

};
