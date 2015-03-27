var key ='1yqK2p_HGwxrLLixIxNShiwtVElpHySCC282M0S7Z_XA';

var obj=new Object;
obj['blue']=1;
obj['red']=2;
obj['black']=3;
obj['white']=4;
obj['purple']=5;
obj['yellow']=6;
obj['gray']=7;
var query;
var now_;
var now_pg=0;

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
	$('#userprof')
	.on('click',function(){
		if(!$('#userprof').hasClass('active')){
			$('#userprof').html('プロフィールを閉じる');
		}
		else{
			$('#userprof').html('プロフィールを見る');
		}
	})
	if(now_>1){$('.previous').wrap('<a href="gallery.html?aid='+(now_*1-1)+'"></a>');}
	else{$('.previous').hide()};		
	if(now_<27){$('.next').wrap('<a href="gallery.html?aid='+(now_*1+1)+'"></a>');}
	else{$('.next').hide()};
})

$(window).load(function(){
/*		if($('#myTab').css('display')!='none'&&isMobile.any()){
			$('#myTab').hide();
			$('#keying').html('スライドしてページ移動<br/>'+(now_pg+1)+'/'+$('#myTab a').length);
			$('#home').draggable({
				stop:function(){
					if($(this).css('left').split('px')[0]*1<-100)
					{
						$('#myTab a:eq('+(now_pg+1)+')').click();
					}
					else if($(this).css('left').split('px')[0]*1>100)
					{
						$('#myTab a:eq('+(now_pg-1)+')').click();
					}
					$(this).css('left',0);
					$('#keying').html('スライドしてページ移動<br/>'+(now_pg+1)+'/'+$('#myTab a').length);
				}
			});
		}
		else if($('#myTab').css('display')!='none'){
			$('#keying').html('←→キーでページ移動');		
		} */
});

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
var test2=new Array('セレナリア','インガノック','シャルノス','ヴァルーシア','ソナーニル','ガクトゥーン','カルシェール'); //have to change vector
function handleQueryResponse(event){
	if (event.isError()) {
		$(location).attr('href','matome.html');
		return;
	}
	else{
	nowimage=false;
	var data = event.getDataTable();
	now_=new view_detail(data);
	now_.set_();
	now_.set_art();
	$('#userprof').popover('show');
	$('#userprof').popover('hide');
	}
}

function view_detail(data)
{
	this.name=data.getValue(0,0);
	this.profile=data.getValue(0,1);
	this.twitter=data.getValue(0,2);
	this.work=data.getValue(0,3).split(',')
	this.genre=data.getValue(0,4).split(',');
	this.art=data.getValue(0,5).split(',');
}

view_detail.prototype.set_= function()
{
	$('#userprof').attr('data-content','<img style="margin-left:auto;margin-right:auto; width:100%" src="'+this.profile+'">');
	$('title,#username').html(this.name);
	$('#usertwitter').html(this.twitter);
	for(var i=this.genre.length;i--;)
	{
		$('#genres').prepend('<a href="matome.html?option'+obj[this.genre[i]]+'"><button class="btn btn-default  btn-sm" style="margin:3px;">'+test2[(obj[this.genre[i]]-1)]+'</button></a>');
	}
}
view_detail.prototype.set_art=function()
{
	if(this.art.length==1&&this.art[0].indexOf('html')==-1)
	{
		var img = new Image();
		img.src = this.art[0];
		$(img).on('load',function(){
			if($(window).width()<800||this.width>800)
			{
				$('#sizing').prepend('<h6>(画像クリックで 拡大表示します）</h6>');
				$(this).css('width','100%');
			}			
			$('#home').append(this).wrap('<a href="'+this.src+'"rel="lightbox"></a>');
			$('body').fadeIn();
		});
	}	
	else if(this.art[0].indexOf('html')!=-1)
	{
		var jqxhr = $.ajax( this.art[0] )
				.done(function(htl){
				$('#home').css('text-align','left').html(htl);
				$('img').css('width','100%');
				$('.tab-pane').each(function(i){
					if(i!=0){
						$('#myTab').show().append('<li><a href="#'+$(this).attr('id')+'">'+(i+1)+'</a></li>');
					}
				});	
				$('#myTab a').on('click',function (e) {
						e.preventDefault();
						$("html, body").animate({ scrollTop: 260 }, 0);
						$(this).tab('show');
						now_pg=$('#myTab a').index(this);
					}).show();	
				$('body').fadeIn();
				})
				.error(function(){console.log('err');});			
	}
	else
	{
		var loaded = 0;
		var numImages = this.art.length;
		$('#home').append('<div class="tab-content" id="glls"></div>');
		for(var i=0;i<numImages;i++)
		{
			var preloader =new Image();
			preloader.src=this.art[i];
			if(i!=0){
				$('#myTab').append('<li><a href="#page'+(i+1)+'">'+(i+1)+'</a></li>');
			}
			else{
			
			}
			$(preloader).on('load',function(){
				if($(window).width()<800||this.width>800){
					$('#sizing').html('<h6>(画像クリックで 拡大表示します）</h6>');
					$(this).css('width','100%');
					$(this).wrap('<a href="'+this.src+'"rel="lightbox"></a>');
				}
				if(++loaded>=numImages){
					$('body').fadeIn();
				}				
			})
			.appendTo('#glls')
			.wrap('<div id="page'+(i+1)+'" class="tab-pane non-active"></div>');
		}
		$('#page1').addClass('active').removeClass('non-active');		
		$('#myTab a').on('click',function (e) {
			e.preventDefault();
			$("html, body").animate({ scrollTop: 260 }, 0);
			$(this).tab('show');
			now_pg=$('#myTab a').index(this);
		}).show();
	}	
}