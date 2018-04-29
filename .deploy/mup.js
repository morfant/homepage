var _pass = require('./ps.js').password;
var _port = require('./ps.js').port;
var _mongo_account = require('./ps.js').mongo_account;

module.exports = {
  servers: {
    one: {
      // TODO: set host address, username, and authentication method
      host: '119.205.235.22',
      username: 'root',
      password: _pass,
      opts: {"port": _port}
      // or neither for authenticate from ssh-agent
    }
  },

  proxy: {
    // domains: 'website.com,www.website.com',
    domains: 'gangilyi.xyz,morfant.cafe24.com',
    ssl: {
      // Enable let's encrypt to create free certificates.
      // The email is used by Let's Encrypt to notify you when the
      // certificates are close to expiring.
      letsEncryptEmail: 'giy.hands@gmail.com',
    }
  },

  app: {
    // TODO: change app name and path
    name: 'Gangil_Yi',
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
//      ROOT_URL: 'https://morfant.cafe24.com',
      // MONGO_URL: 'mongodb://localhost/meteor',
      MONGO_URL: _mongo_account,
    },

    volumes: {
      'host_Uploads': '/host_Uploads'
    },

    // ssl: { // (optional)
    //   // Enables let's encrypt (optional)
    //   autogenerate: {
    //     email: 'giy.hands@gmail.com',
    //     // comma separated list of domains
    //     domains: 'gangilyi.xyz,morfant.cafe24.com'
    //   }
    // },

    docker: {
      // change to 'abernix/meteord:base' if your app is using Meteor 1.4 - 1.5
      image: 'abernix/meteord:node-8.9.4-base',
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
