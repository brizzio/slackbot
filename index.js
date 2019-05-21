const SlackBot = require("slackbots");
const axios = require('axios');

const bot = new SlackBot({
    token:'xoxb-565315044403-641018819143-W04DmpnxWrOzcIlZ1FyBQyNg',
    name:'brizzio-bot'
});

//Start Handler

bot.on('start', ()=>{

    const params = {
        icon_emoji: ':smiley:'
    }

    bot.postMessageToChannel(
      "general",
      "Quero aprender a falar que nem gente....quem pode me ajudar?",
      params
    );


});

// Error Handler
bot.on("error", err => console.log(err));

//Message Handler
bot.on('message', (data)=>{
    if(data.type !== 'message'){
        return;
    }

    handleMessage(data.text);
})

// Respons to Data
function handleMessage(message) {
    if (message.includes('piada')) {
      chuckJoke();
    } else if (message.includes(' ajuda')) {
      runHelp();
    }
  }

// Tell a Chuck Norris Joke
function chuckJoke() {
    axios.get('http://api.icndb.com/jokes/random').then(res => {
      const joke = res.data.value.joke;
  
      const params = {
        icon_emoji: ':laughing:'
      };
  
      bot.postMessageToChannel('general', `Alter ego do Brizzio diz: ${joke}`, params);
    });
  }

  // Show Help Text
function runHelp() {
    const params = {
      icon_emoji: ':question:'
    };
  
    bot.postMessageToChannel(
      'general',
      `Mande uma mensagem para @brizzio-bot com 'piada', que eu te conto uma! (em ingles...por enquanto...)`,
      params
    );
  }