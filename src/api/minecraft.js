module.exports = {
  start: function (credentials, callback, onError) {

    var mineflayer = require('mineflayer');
    mineflayer.vec3 = require('vec3');
    var navigatePlugin = require('mineflayer-navigate')(mineflayer);
    var scaffoldPlugin = require('mineflayer-scaffold')(mineflayer);

    var bot = mineflayer.createBot(credentials);
    bot.on('error', onError);

    navigatePlugin(bot);
    scaffoldPlugin(bot);

    bot.once('login', function () {
      console.log('logged in');
    });

    bot.on('chat', function (username, message) {
      if (username === bot.username) return;
      bot.chat(message);

      var target = bot.players[username].entity;
      if (message === 'come') {
        console.log("goto : ", target.position);
        bot.scaffold.to(target.position, function (err) {
          if (err) {
            bot.chat("didn't make it: " + err.code);
          } else {
            bot.chat("made it!");
          }
        });
      }
      goToSleep();
    });

    bot.on('sleep', () => {
      bot.chat('Good night!')
    })
    bot.on('wake', () => {
      bot.chat('Good morning!')
    })

    var goToSleep = function () {
      const bed = bot.findBlock({
        matching: 26
      })
      if (bed) {
        bot.sleep(bed, (err) => {
          if (err) {
            bot.chat(`I can't get no sleep: ${err.message}`)
          } else {
            bot.chat("I'm sleeping")
          }
        })
      } else {
        bot.chat('No nearby bed')
      }
    };

  }
};
