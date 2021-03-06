var express = require('express');
var bodyParser = require('body-parser');
var app = express();
var jsonParser = bodyParser.json();
var channelAccessToken = process.env.LINE_CHANNEL_ACCESSTOKEN;
var channelSecret = process.env.LINE_CHANNEL_SECRET;
// Load `*.js` under modules directory as properties
//  i.e., `User.js` will become `exports['User']` or `exports.User`
require('fs').readdirSync(__dirname + '/modules/').forEach(function(file) {
  if (file.match(/\.js$/) !== null && file !== 'index.js') {
    var name = file.replace('.js', '');
    exports[name] = require('./modules/' + file);
  }
});

var rplyOptions = {
	host: 'api.line.me',
	port: 443,
	path: '/v2/bot/message/reply',
	method: 'POST',
	headers: {
	'Content-Type': 'application/json',
	'Authorization':'Bearer ' + channelAccessToken
	}
}
var sendOptions = {
	host: 'api.line.me',
	port: 443,
	path: '/v2/bot/message/push',
	method: 'POST',
	headers: {
	'Content-Type': 'application/json',
	'Authorization':'Bearer ' + channelAccessToken
	}
}
app.set('port', (process.env.PORT || 5000));
// views is directory for all template files
app.get('/', function(req, res) {
//	res.send(parseInput(req.query.input));
	res.send('Hello');
});
app.post('/', jsonParser, function(req, res) {
	let event = req.body.events[0];
	let type = event.type;
	let msgType = event.message.type;
	let msg = event.message.text;
	let rplyToken = event.replyToken;
	let rplyVal = {};
	console.log(event);
	console.log(msg);
	//訊息來到後, 會自動呼叫handleEvent 分類,然後跳到analytics.js進行骰組分析
	//如希望增加修改骰組,只要修改analytics.js的條件式 和ROLL內的骰組檔案即可,然後在HELP.JS 增加說明.
	try {
	rplyVal = handleEvent(event);
	} 
	catch(e) {
		console.log('catch error');
		console.log('Request error: ' + e.message);
	}
	//把回應的內容,掉到replyMsgToLine.js傳出去
	if (rplyVal) {
	exports.MsgToLine.replyMsgToLine(rplyToken, rplyVal, rplyOptions); 
	} else {
	//console.log('Do not trigger'); 
	}
	res.send('ok');
});
app.post('/cmd', jsonParser, function(req, res) {
	var cmdType = req.query.type,
		cmdUser = req.query.userId;
	console.log(req.query);
	if (!cmdUser) cmdUser = 'U08c1a7a2d49868a14f459e5a3b3854b8';
	if (!cmdType) cmdType = 'text';
	switch (cmdType) {
	case 'text':
		exports.MsgToLine.sendMsgToLine(cmdUser, {"type": cmdType,"text": req.query.msg}, sendOptions);
		break;
	case 'sticker':
		exports.MsgToLine.sendMsgToLine(cmdUser, {"type": cmdType, "stickerId": req.query.stickerId, "packageId": req.query.packageId}, sendOptions);
		break;
	case 'image':
		exports.MsgToLine.sendMsgToLine(cmdUser, {"type": cmdType, "originalContentUrl": req.query.originalContentUrl, "previewImageUrl": req.query.previewImageUrl}, sendOptions);
		break;
	}
	res.send('ok');
});
app.listen(app.get('port'), function() {
	console.log('Node app is running on port', app.get('port'));
});

function handleEvent(event) {
  switch (event.type) {
    case 'message':
      const message = event.message;
      switch (message.type) {
        case 'text':
          return exports.analytics.parseInput(event.rplyToken, event.message.text); 
        default:
           break;
      }
    case 'follow':
		break;
    case 'unfollow':
       break;
    case 'join':
break;
    case 'leave':
       break;
    case 'postback':
       break;
    case 'beacon':
      break;
    default:
       break;
  }
}
