var key ='1yqK2p_HGwxrLLixIxNShiwtVElpHySCC282M0S7Z_XA';
/*
var number=1;
$(function(){
$('#go').click(function(){
	 doajax({name:$("#name").val(), work:$("#work").val(),twitter:$("#twitter").val(),arts:$("#arts").val()});
	 $('#view').append($("#name").val()+' '+$("#work").val()+' '+$("#twitter").val()+' '+$("#arts").val()+'<br>'); 
	});
});

function doajax(option){
	console.log(option);
	number++;
	$.ajax({
	  url: "https://script.google.com/macros/s/AKfycbwd5TwwGgbe6FmgsJk1cUHrddGGYiz37h7jG8wabqC3haiH8Yo/exec",
	  data: {"num":number,"name":option.name, "twitter":option.twitter,"profile":'images/profile'+number+'.png',"work":option.work,arts:option.arts},
	  type: "POST"
	});
}
*/

var obj=new Object;
obj['name']='B';
obj['profile']='C';
obj['twitter']='D';
obj['work']='E';
obj['genre']='F';
obj['arts']='G';
var query;

$( document ).ready(function() {
	 query = new google.visualization.Query('http://spreadsheets.google.com/a/google.com/tq?key='+key+'&pub=1');
	 var t= $(location).attr('search').split('&');
	 var temp;
	 var temp2='';
	 console.log(t[0].indexOf('?'));
	 if(t[0].indexOf('?')!=-1) 
	 {
		t[0]=t[0].substr(1,t[0].length);
	 for(var i in t)
	 {
		temp=t[i].split('=');
		console.log(temp);
		temp2+=obj[temp[0]]+" like '%"+temp[1]+"%' "
		if(i!=t.length-1){
		temp2+='and ';
				}
		if(temp[0].indexOf('work')!=-1){
			$( "input" ).filter(function( ) {
				return $(this).val().indexOf(temp[1])!=-1;
			}).attr("checked", true);
			}
		}
		console.log(' WHERE '+temp2);
		set_Q(' WHERE '+temp2);
	}
	else{
		set_Q('');
	}
})
var selector=new Object();
$(function(){
	$("#choose input").click(function(event){
	var now_ck= $('#choose input[type=radio]:checked').val();
	set_Q(" WHERE E like '%"+now_ck+"%'");
	});
});
function set_Q(txt){
	$('#view').html('<img src="images/ajax-loader.gif">');
	query.setQuery("SELECT B, C, D, E"+txt);
	query.send(handleQueryResponse);
}
function handleQueryResponse(event){
	$('#view').empty();
	if (event.isError()) {
		alert('Error in query: ' + event.getMessage() + ' ' + event.getDetailedMessage());
		return;
	}
	var data = event.getDataTable();
	for (i=0; i<data.getNumberOfRows(); i++){ 
		$("#view").append('<ui>'+data.getValue(i,0)+'');
		$("#view").append('<li>'+data.getValue(i,1));
		$("#view").append(data.getValue(i,3));
		$("#view").append(data.getValue(i,2)+'</li></ui><br>');
	}
}



/*
var key_=new Object();
var arr=new Array();

$( document ).ready(function() {
 var t= $(location).attr('search').split('?');
	if(t[1]){
		do_ajax(t[1])
		console.log(t[1]);
	}
	else{
		$("body").append('nothing');
	}
});

function do_ajax(nme){
$.ajax({ 
	url: 'https://spreadsheets.google.com/feeds/list/'+key+'/1/public/basic?alt=json-in-script&sq='+nme,
    type: 'get',
    dataType: "jsonp",
    success: function(json){
    var entry = json.feed.entry;
	if(entry==null||entry.length==0){
	$("body").append('nothing');
	}
	else{
	for(var i in entry){
		var temp,temp2;
		temp=entry[i].content.$t.split(', ');
		temp2=temp[0].split(': ');
		key_[temp2[0]]=temp2[1];
		key_[temp2[2]]=temp2[3];
		arr.push(key_[temp2[0]]);
		arr.push(key_[temp2[2]]);
		$("body").append(entry[i].content.$t);
		$("body").append('<br>');
		
		}
	}
	}
});
}
*/