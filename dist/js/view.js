var key ='1yqK2p_HGwxrLLixIxNShiwtVElpHySCC282M0S7Z_XA';

var obj=new Object;
obj['name']='B';
obj['profile']='C';
obj['twitter']='D';
obj['work']='E';
obj['genre']='F';
obj['arts']='G';

var query;
var now_;
$( document ).ready(function() {
$('body').hide();
	 query = new google.visualization.Query('http://spreadsheets.google.com/a/google.com/tq?key='+key+'&pub=1');
	 var t= $(location).attr('search').split('&')[0];
	 if(t.indexOf('?')!=-1){
		 t=t.split('?aid=')[1];
		 now_=t;
		 set_Q(t);
	 }
})
function set_Q(txt)
{
	console.log(txt);
	query.setQuery("SELECT B, C, D, E, F, G WHERE A LIKE "+txt+"");
	query.send(handleQueryResponse);
}

var test=new Array('blue','red','black','white','purple','yellow','gray'); //have to change vector
var test2=new Array('セレナリア','インガノック','シャルノス','ヴァルーシア','ソナーニル','ガクトゥーン','カルシェール'); //have to change vector

function handleQueryResponse(event){
	if (event.isError()) {
		$(location).attr('href','matome.html');
		return;
	}
	else{
	var data = event.getDataTable();
	if(data.getNumberOfRows()!=0){
		$('#userprof').attr('data-content','<img style="margin-left:auto;margin-right:auto; width:auto" src="'+data.getValue(0,1)+'">');
		$('#username').html(data.getValue(0,0));
		$('title').html(data.getValue(0,0));
		for(var i in test){
			if(data.getValue(0,4)!=null&&data.getValue(0,4).indexOf(test[i])!=-1){
			$('#genres').append('<a href="matome.html?option'+(i*1+1)+'"><button class="btn btn-default  btn-sm" style="margin-right:5px;">'+test2[i]+'</button></a>');
			}
		}
		$('#usertwitter').html(data.getValue(0,2));
		if(data.getValue(0,5)!=null&&data.getValue(0,5).indexOf('html')==-1){
			var img = new Image();
			img.onload = function() {
			var $imgs=$('<img id="arts" src='+img.src+' style="margin-right:auto;margin-left:auto;width:100%">');
			if($(window).width()<800||this.width>800){
					$('#tabbs').prepend('<h6>(画像クリックで 拡大表示します）</h6>');
					$imgs=$('<a href="'+data.getValue(0,5)+'"rel="lightbox"></a>').append($imgs);
				}
				$('#home').append($imgs);
				$('body').fadeIn();
			}
			img.src = data.getValue(0,5);
		}
		
		if(now_>1){$('.previous').wrap('<a href="gallery.html?aid='+(now_*1-1)+'"></a>');}
		else{$('.previous').hide()};		
		if(now_<27){$('.next').wrap('<a href="gallery.html?aid='+(now_*1+1)+'"></a>');}
		else{$('.next').hide()};
		$('#userprof').popover('show');
		$('#userprof').popover('hide');
		
	}
	}
	nowimage=false;
}
var togg=false;
$(function(){

	$('#userprof').click(function(){
		if(togg==false){
			$('#userprof').html('プロフィールを閉じる');
			togg=true;
		}
		else{
			$('#userprof').html('プロフィールを見る');
			togg=false;
		}
	});
})