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
		query.setQuery("SELECT B, C, D, E, F, G WHERE A LIKE "+now_);
		query.send(handleQueryResponse);
	}
})
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
		$('#userprof').attr('data-content','<img style="margin-left:auto;margin-right:auto; width:100%" src="'+data.getValue(0,1)+'">');
		$('#username').html(data.getValue(0,0));
		$('title').html(data.getValue(0,0));
		for(var i in test){
			if(data.getValue(0,4)!=null&&data.getValue(0,4).indexOf(test[i])!=-1){
			$('#genres').append('<a href="matome.html?option'+(i*1+1)+'"><button class="btn btn-default  btn-sm" style="margin:3px;">'+test2[i]+'</button></a>');
			}
		}
		$('#usertwitter').html(data.getValue(0,2));
		if(data.getValue(0,5)!=null&&data.getValue(0,5).indexOf(',')==-1&&data.getValue(0,5).indexOf('html')==-1){
			console.log('this');

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
		else if(data.getValue(0,5).indexOf(',')!=-1){			
		}
		else if(data.getValue(0,5).indexOf('html')!=-1){
			console.log('this');
				var jqxhr = $.ajax( data.getValue(0,5) )
				.done(function(htl){$('#home').html(htl);
				$('body').fadeIn();})
				.error(function(){console.log('err');});
				
		}
		if(now_>1){$('.previous').wrap('<a href="gallery.html?aid='+(now_*1-1)+'"></a>');}
		else{$('.previous').hide()};		
		if(now_<27){$('.next').wrap('<a href="gallery.html?aid='+(now_*1+1)+'"></a>');}
		else{$('.next').hide()};
		$('#userprof').popover('show');
		$('#userprof').popover('hide');
	}
	else{
		console.log('NONE');
	}
	}
	nowimage=false;
}
var togg=false;
$(function(){

		var isMobile = {
			Android: function() {
				return navigator.userAgent.match(/Android/i);
			},
			BlackBerry: function() {
				return navigator.userAgent.match(/BlackBerry/i);
			},
			iOS: function() {
				return navigator.userAgent.match(/iPhone|iPad|iPod/i);
			},
			Opera: function() {
				return navigator.userAgent.match(/Opera Mini/i);
			},
			Windows: function() {
				return navigator.userAgent.match(/IEMobile/i);
			},
			any: function() {
				return (isMobile.Android() || isMobile.BlackBerry() || isMobile.iOS() || isMobile.Opera() || isMobile.Windows());
			}
		};

		if(isMobile.any()) {
			$('#back_').css({
			'margin-left':'auto',
			'margin-right':'auto'
			})
			.after('<p>');
			$('#userprof').css({
			'margin-left':'auto',
			'margin-right':'auto'
			});
			$('#genres').css({
			'text-align':'center',
			});
		}
	
	
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