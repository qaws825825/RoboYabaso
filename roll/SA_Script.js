var rply ={type : 'text'}; //type是必需的,但可以更改


//回話
function ReplyMsg(trigger) {
	rply.text = trigger;
return rply;
}

module.exports = {
	ReplyMsg	
};