# README

### How I made this:

1. basic app setup - create new app using express generator, and make initial commit
  * $ express shows
  * $ cd shows
  * $ git init
  * $ git add -A
  * $ git commit
1. npm install - install but do not commit to git
  * $ npm install
  * $ vim .gitignore
    * content: `node_modules/**`
  * open project in text editor
  * add README.md and outline all steps, and continue updating
  * $ git add -N .gitignore README.md
  * $ git add -p
  * $ git commit
1. User can see list of shows on index page - add mongoose, model for shows, insert one show into database using console
  * start server (and stop and restart with each code change and browser check)
    * `DEBUG=herb:* npm start`
    * no need to restart if you just change `.jade` files?
  * Express created a users route we will not use. In `app.js`, change:
    * `var users = require('./routes/users');` to `var herbRoutes = require('./routes/herbs');`
    * `app.use('/users', users);` to `app.use('/herbs', herbRoutes);`
  * rename `routes/users.js` to `routes/herbs.js`
  * add mongoose, model for herbs
    * to `package.json` add to dependencies `"mongoose": "~4.0.3",`
    * $ npm install
    * in `app.js` add above `view engine setup`:

      ```
      var mongoConnection = function () {
        var options = {server: {socketOptions: {keepAlive: 1}}};
        mongoose.connect('mongodb://localhost/herbs', options);
      };
      mongoConnection();

      mongoose.connection.on('error', console.log);
      mongoose.connection.on('disconnected', mongoConnection);
      ```

    * in same file under the top requires, add `var mongoose = require('mongoose');`
    * in the same file, above routes add `var herb = require('./app/models/herb');`
    * add file `/app/models/herb.js` with the content:

      ```
      var mongoose = require('mongoose');

      var Schema = mongoose.Schema;

      var HerbSchema = new Schema({
        name: {type: String, default: ''},
        oz: {type: Number, default: 0},
        inStock: {type: Boolean, default: false}
      });

      mongoose.model('Herb', HerbSchema);
      ```
  * Access this model in the index and pass objects to the view
    * in `routes/herbs.js`:
      * add `var mongoose = require('mongoose');` under other require
      * add access to the model under router declaration: `var Herb = mongoose.model('Herb');`
    * find all herbs in the database and pass them into the view

      ```
      router.get('/', function(req, res, next) {
        Herb.find({}, function(err, herbs) {
          if (err) return console.log(err);
          res.render('herbs/index', {herbs: herbs})
        });
      });
      ```
  * Use the herbs variable passed into the view to list all herbs on the index
    * add `view/herbs/index.jade` with the following content:

      ```
      extends ../layout

      block content

        h1  My Herbs

        ul
          each herb in herbs
            if herb.inStock
              li #{herb.name} (#{herb.oz} oz) - available
            else
              li #{herb.name} (#{herb.oz} oz) - unavailable
      ```

      * The lines `extends ../layout` and `block content` allow you to use the layout file to bring in css and standard navs and footers in only one file when necessary.

  * Add a link from root page to herb index
    * `a(href='/herbs') Check out these herbs!`
  * create the mongo database and add one herb:

    ```
    $ mongo
    MongoDB shell version: 3.0.3
    connecting to: test
    > use herbs
    switched to db herbs
    > db.herbs
    herb.herbs
    > db.herbs.insert({name: "Elderflower", oz: 2, inStock: false})
    WriteResult({ "nInserted" : 1 })
    ```
