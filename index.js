"use strict";

const express = require("express");
const bodyParser = require("body-parser");

const restService = express();

var qoutePointer = 0;
var batmanQuotes = ["It's not who I am underneath, but what I do that defines me.", "I'm batman!!"
, "I won't kill you, but I don't have to save you"];

var batmanWaves = ["http://www.wavsource.com/snds_2018-01-14_3453803176249356/tv/batman/bat-time_x.wav",
"http://www.wavsource.com/snds_2018-01-14_3453803176249356/tv/batman/batman_music_sfx.wav",
"http://www.wavsource.com/snds_2018-01-14_3453803176249356/tv/batman/batman_theme_x.wav",
"http://www.wavsource.com/snds_2018-01-14_3453803176249356/tv/batman/batmobile_x.wav",
"http://www.wavsource.com/snds_2018-01-14_3453803176249356/tv/batman/believe_me.wav",
"http://www.wavsource.com/snds_2018-01-14_3453803176249356/tv/batman/can_batman_escape.wav",
"http://www.wavsource.com/snds_2018-01-14_3453803176249356/tv/batman/cat-time.wav",
"http://www.wavsource.com/snds_2018-01-14_3453803176249356/tv/batman/catwoman.wav",
"http://www.wavsource.com/snds_2018-01-14_3453803176249356/tv/batman/criminals.wav",
"http://www.wavsource.com/snds_2018-01-14_3453803176249356/tv/batman/didnt_tell_truth.wav",
"http://www.wavsource.com/snds_2018-01-14_3453803176249356/tv/batman/dime.wav",
"http://www.wavsource.com/snds_2018-01-14_3453803176249356/tv/batman/holy_alphabet.wav",
"http://www.wavsource.com/snds_2018-01-14_3453803176249356/tv/batman/holy_ball_and_chain.wav",
"http://www.wavsource.com/snds_2018-01-14_3453803176249356/tv/batman/holy_caffeine.wav",
"http://www.wavsource.com/snds_2018-01-14_3453803176249356/tv/batman/holy_fruit_salad.wav",
"http://www.wavsource.com/snds_2018-01-14_3453803176249356/tv/batman/holy_heart_failure.wav",
"http://www.wavsource.com/snds_2018-01-14_3453803176249356/tv/batman/holy_hole.wav",
"http://www.wavsource.com/snds_2018-01-14_3453803176249356/tv/batman/holy_las_vegas.wav",
"http://www.wavsource.com/snds_2018-01-14_3453803176249356/tv/batman/holy_mashed_potatoes.wav",
"http://www.wavsource.com/snds_2018-01-14_3453803176249356/tv/batman/holy_nightmare.wav",
"http://www.wavsource.com/snds_2018-01-14_3453803176249356/tv/batman/meet_the_joker.wav",
"http://www.wavsource.com/snds_2018-01-14_3453803176249356/tv/batman/ordinary.wav",
"http://www.wavsource.com/snds_2018-01-14_3453803176249356/tv/batman/riddler_laugh.wav",
"http://www.wavsource.com/snds_2018-01-14_3453803176249356/tv/batman/taken_in.wav",
"http://www.wavsource.com/snds_2018-01-14_3453803176249356/tv/batman/watch_out.wav"];

restService.use(
  bodyParser.urlencoded({
    extended: true
  })
);

restService.use(bodyParser.json());

restService.post("/echo", function(req, res) {
  var speech =
    req.body.result &&
    req.body.result.parameters &&
    req.body.result.parameters.echoText
      ? req.body.result.parameters.echoText
      : "Seems like some problem. Speak again.";

  var response = speech;
  switch (speech) {
    case "batman":

      if(qoutePointer>24)
      {
        qoutePointer = 0
      }
      //response = batmanQuotes[qoutePointer];
      response = '<speak><audio src="' + batmanWaves[qoutePointer] + '">did not get your audio file</audio></speak>';
      qoutePointer++;
      console.log("This is the speech : "+response);
      break;
    default:

  }
  return res.json({
    speech: response,
    displayText: response,
    source: "batman-quotes"
  });
});

restService.post("/audio", function(req, res) {
  var speech = "";
  switch (req.body.result.parameters.AudioSample.toLowerCase()) {
    //Speech Synthesis Markup Language
    case "music one":
      speech =
        '<speak><audio src="https://actions.google.com/sounds/v1/cartoon/slide_whistle.ogg">did not get your audio file</audio></speak>';
      break;
    case "music two":
      speech =
        '<speak><audio clipBegin="1s" clipEnd="3s" src="https://actions.google.com/sounds/v1/cartoon/slide_whistle.ogg">did not get your audio file</audio></speak>';
      break;
    case "music three":
      speech =
        '<speak><audio repeatCount="2" soundLevel="-15db" src="https://actions.google.com/sounds/v1/cartoon/slide_whistle.ogg">did not get your audio file</audio></speak>';
      break;
    case "music four":
      speech =
        '<speak><audio speed="200%" src="https://actions.google.com/sounds/v1/cartoon/slide_whistle.ogg">did not get your audio file</audio></speak>';
      break;
    case "music five":
      speech =
        '<audio src="https://actions.google.com/sounds/v1/cartoon/slide_whistle.ogg">did not get your audio file</audio>';
      break;
    case "delay":
      speech =
        '<speak>Let me take a break for 3 seconds. <break time="3s"/> I am back again.</speak>';
      break;
    //https://www.w3.org/TR/speech-synthesis/#S3.2.3
    case "cardinal":
      speech = '<speak><say-as interpret-as="cardinal">12345</say-as></speak>';
      break;
    case "ordinal":
      speech =
        '<speak>I stood <say-as interpret-as="ordinal">10</say-as> in the class exams.</speak>';
      break;
    case "characters":
      speech =
        '<speak>Hello is spelled as <say-as interpret-as="characters">Hello</say-as></speak>';
      break;
    case "fraction":
      speech =
        '<speak>Rather than saying 24+3/4, I should say <say-as interpret-as="fraction">24+3/4</say-as></speak>';
      break;
    case "bleep":
      speech =
        '<speak>I do not want to say <say-as interpret-as="bleep">F&%$#</say-as> word</speak>';
      break;
    case "unit":
      speech =
        '<speak>This road is <say-as interpret-as="unit">50 foot</say-as> wide</speak>';
      break;
    case "verbatim":
      speech =
        '<speak>You spell HELLO as <say-as interpret-as="verbatim">hello</say-as></speak>';
      break;
    case "date one":
      speech =
        '<speak>Today is <say-as interpret-as="date" format="yyyymmdd" detail="1">2017-12-16</say-as></speak>';
      break;
    case "date two":
      speech =
        '<speak>Today is <say-as interpret-as="date" format="dm" detail="1">16-12</say-as></speak>';
      break;
    case "date three":
      speech =
        '<speak>Today is <say-as interpret-as="date" format="dmy" detail="1">16-12-2017</say-as></speak>';
      break;
    case "time":
      speech =
        '<speak>It is <say-as interpret-as="time" format="hms12">2:30pm</say-as> now</speak>';
      break;
    case "telephone one":
      speech =
        '<speak><say-as interpret-as="telephone" format="91">09012345678</say-as> </speak>';
      break;
    case "telephone two":
      speech =
        '<speak><say-as interpret-as="telephone" format="1">(781) 771-7777</say-as> </speak>';
      break;
    // https://www.w3.org/TR/2005/NOTE-ssml-sayas-20050526/#S3.3
    case "alternate":
      speech =
        '<speak>IPL stands for <sub alias="indian premier league">IPL</sub></speak>';
      break;
  }
  return res.json({
    speech: speech,
    displayText: speech,
    source: "batman-quotes"
  });
});

restService.post("/video", function(req, res) {
  return res.json({
    speech:
      '<speak>  <audio src="https://www.youtube.com/watch?v=VX7SSnvpj-8">did not get your MP3 audio file</audio></speak>',
    displayText:
      '<speak>  <audio src="https://www.youtube.com/watch?v=VX7SSnvpj-8">did not get your MP3 audio file</audio></speak>',
    source: "batman-quotes"
  });
});

restService.post("/slack-test", function(req, res) {
  var slack_message = {
    text: "Details of JIRA board for Browse and Commerce",
    attachments: [
      {
        title: "JIRA Board",
        title_link: "http://www.google.com",
        color: "#36a64f",

        fields: [
          {
            title: "Epic Count",
            value: "50",
            short: "false"
          },
          {
            title: "Story Count",
            value: "40",
            short: "false"
          }
        ],

        thumb_url:
          "https://stiltsoft.com/blog/wp-content/uploads/2016/01/5.jira_.png"
      },
      {
        title: "Story status count",
        title_link: "http://www.google.com",
        color: "#f49e42",

        fields: [
          {
            title: "Not started",
            value: "50",
            short: "false"
          },
          {
            title: "Development",
            value: "40",
            short: "false"
          },
          {
            title: "Development",
            value: "40",
            short: "false"
          },
          {
            title: "Development",
            value: "40",
            short: "false"
          }
        ]
      }
    ]
  };
  return res.json({
    speech: "speech",
    displayText: "speech",
    source: "batman-quotes",
    data: {
      slack: slack_message
    }
  });
});

restService.listen(process.env.PORT || 8000, function() {
  console.log("Server up and listening");
});
