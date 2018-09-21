var rply ={type : 'text'}; //type是必需的,但可以更改
var ReplyCount = 0; //跟上回話用全域變數_整數
var ReplyString;    //跟上回話用全域變數_字串

function BaKaLanguage()
{
		let rplyArr = ['\
	「欣賞一個人, 始於顏值, 敬於才華, 合於性格, 久於善良, 終於人品」節錄自 八嘎語錄', '\
	「對方大了的話, 我會要她夾娃娃. 這就是負責的衣種方式好嗎」節錄自 八嘎語錄', '\
	「你家人知道你是個甲甲嗎? (知道/不知道)」節錄自 八嘎語錄', '\
	「存番號都來不及了, 哪有時間保存那玩意」節錄自 八嘎語錄', '\
	「是男人就勇於承認, 別老把過錯退給別人」節錄自 八嘎語錄', '\
	「我也要開始無課了」節錄自 八嘎語錄', '\
	「我真的不再課了」節錄自 八嘎語錄', '\
	「課金都是智障」節錄自 八嘎語錄', '\
	「小孩子說的話能信, 我煮的泡麵就會變拉麵了」節錄自 八嘎語錄', '\
	「我不看本子, 只看奶…」節錄自 羹莉語錄', '\
	「我只想上台女」節錄自 白黏語錄', '\
	「不討厭就可以舔爆」節錄自 世界樹語錄', '\
	「找丁丁少女」節錄自 教主語錄'];
	rply.text = rplyArr[Math.floor((Math.random() * (rplyArr.length)) + 0)];
	return rply;
}


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
	BaKaLanguage,
	IsNeedReply,
	ReplyMsg	
};
