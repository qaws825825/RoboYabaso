var rply ={type : 'text'}; //type是必需的,但可以更改
var ReplyCount = 0; //跟上回話用全域變數_整數
var ReplyString;    //跟上回話用全域變數_字串

function IsNeedReply(trigger)
{
	if (trigger != ReplyString)
	{
		//console.log(trigger);
		//console.log(ReplyString);
		ReplyString = trigger;
		ReplyCount = 1;
	}
	else
	{
		//console.log(ReplyCount);
		ReplyCount++;
		if (ReplyCount >= 3) 
		{
			ReplyCount = 0;
			return true;
		}
			
	}
	return false;
}
//回話
function ReplyMsg(trigger) {
	rply.text = trigger;
return rply;
}

module.exports = {
	IsNeedReply,
	ReplyMsg	
};
