var key ='1yqK2p_HGwxrLLixIxNShiwtVElpHySCC282M0S7Z_XA';

var obj=new Object;
obj['name']='B';
obj['profile']='C';
obj['twitter']='D';
obj['work']='E';
obj['genre']='F';
obj['arts']='G';
var alls = new Array();
var illust = new Array();
var manga = new Array();
var novel = new Array();

var query;
var now_;
$( document ).ready(function() {
	$('body').hide();
	query = new google.visualization.Query('http://spreadsheets.google.com/a/google.com/tq?key='+key+'&pub=1');
	set_Q('');
})
function set_Q(txt){
	$('#loadingg').show();
	$('#gamen').hide();
	now='';
	query.setQuery("SELECT B, C, D, E, F, I ");
	query.send(handleQueryResponse);
}
function handleQueryResponse(event){
	if (event.isError()) {
		alert('Error in query: ' + event.getMessage() + ' ' + event.getDetailedMessage());
		return;
	}
	var data = event.getDataTable();
	for (i=0; i<16; i++){
		$("#home-page1").append(generate_thumb(data.getValue(i,5),data.getValue(i,0),data.getValue(i,4),(i+1))).hide().fadeIn();
		alls.push(generate_thumb(data.getValue(i,5),data.getValue(i,0),data.getValue(i,4),(i+1)));
		if(data.getValue(i,3).indexOf('Illust')!=-1) insother(data,'illust','-page1');
		if(data.getValue(i,3).indexOf('comic')!=-1) insother(data,'manga','');
		if(data.getValue(i,3).indexOf('Novel')!=-1) insother(data,'novel','');
	}
	for (i=16; i<data.getNumberOfRows()-1; i++){
		$("#home-page2").append(generate_thumb(data.getValue(i,5),data.getValue(i,0),data.getValue(i,4),(i+1)));
		alls.push(generate_thumb(data.getValue(i,5),data.getValue(i,0),data.getValue(i,4),(i+1)));
		if(data.getValue(i,3).indexOf('Illust')!=-1) insother(data,'illust','-page2');
		if(data.getValue(i,3).indexOf('comic')!=-1) insother(data,'manga','');
		if(data.getValue(i,3).indexOf('Novel')!=-1) insother(data,'novel','');
	}
	
	re_merg(illust, 'illust',1);
	$( "img" )
	  .error(function() {
		$( this ).attr( "src", "http://dummyimage.com/150x150/FFF/000" );
	  });
	
	$('#loadingg').hide();
	$('#gamen').fadeIn();	
	autosort();
	$('body').fadeIn();
}

function autosort(){
	if($(location).attr('search').indexOf('option')!=-1){
	var t= $(location).attr('search').split('?')[1];
		if(t.split('option')[1]*1<8&&t.split('option')[1]*1>=0){
			t='#'+t;
			sorting(t);
		}
	}
}

function insother(data,chk,pgng){
		var temped=generate_thumb(data.getValue(i,5),data.getValue(i,0),data.getValue(i,4),(i+1));
		switch (chk){
			case 'illust' : illust.push(temped);
							break;
			case 'manga' : manga.push(temped);
							break;
			case 'novel' : novel.push(temped);
		}
		if(chk!='illust'){
				$("#"+chk+pgng).append(temped);
		}
}
function re_merg(data, pge, pgr){
var temp1=0;
pgr=(pgr==null)? 0: pgr;
		$('.'+pge+'pager').hide();
		for(var i=0;i<data.length;i++){
			if(data[i]!='0'){
				if(temp1>=16){
					temp1++;
					$('#'+pge+'-page2').append(data[i]);
				}
				else{
					temp1++
					$('#'+pge+'-page1').append(data[i]);			
				}
			}
		}
		if(temp1>16&&pgr!=0){
			$('.'+pge+'pager').show();
			$('.'+pge+'pager > .next').show();
			$('.'+pge+'pager > .previous').hide();
		}		
}

function copyarray(array2){
	var temp;
	var tarray=new Array();
	for(var i=0; i<array2.length;i++){
		temp=''+array2[i];
		tarray.push(temp);
	}
	return tarray;
}

$(function(){
		$('#home-page2').hide();
		$('#illust-page2').hide();
		$('#myTab a').click(function (e) {
		  e.preventDefault();
		  $(this).tab('show')
		 })
		$('#pageTab a').click(function (e) {
		  e.preventDefault();
		  var targetbox = $(this).attr('href');
		  $('.home-page').hide();
		  $('.hpg').toggle();
		  $(targetbox).fadeIn();
		});
		
		$('#pageTab2 a').click(function (e) {
		  e.preventDefault();
		  var targetbox = $(this).attr('href');
		  $('.illust-page').hide();
		  $('.illustpager > li').toggle();
		  $(targetbox).fadeIn();
		});
		
		$('#genre_sel input').click(function(){
			var al2= copyarray(alls);
			var il2= copyarray(illust);
			var ma2= copyarray(manga);
			var no2= copyarray(novel);
			if($(this).attr('id')!='option0'){
				$('#la'+$(this).attr('id')).toggleClass('active');
			}
			else{
				$('input').attr('checked',false);			
				$('.btn').removeClass('active');			
			}
			$("input:checkbox[name=options]:checked").each(function()
			{
				var temp=$(this).val();
				for(var i=0;i<al2.length;i++){
					if(al2[i].indexOf(temp)==-1){
						al2[i]='0';
					}
				}
				for(var i=0;i<il2.length;i++){
					if(il2[i].indexOf(temp)==-1){
						il2[i]='0';
					}
				}
				for(var i=0;i<ma2.length;i++){
					if(ma2[i].indexOf(temp)==-1){
						ma2[i]='0';
					}
				}
				for(var i=0;i<no2.length;i++){
					if(no2[i].indexOf(temp)==-1){
						no2[i]='0';
					}
				}
			});
			$('.genr').remove();
			re_merg(il2, 'illust',1);
			re_merg(ma2, 'manga');
			re_merg(no2, 'novel');
			re_merg(al2, 'home',1);			
			$( "img" )
			  .error(function() {
				$( this ).attr( "src", "http://dummyimage.com/150x150/FFF/000" );
			  });
			$('#home').tab('show');
			$('#home-page1').show();
			$('#home-page2').hide();
			$('#illust-page1').show();
			$('#illust-page2').hide();
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

		if(isMobile.any()) {
			$('#gototop').hide();
			$('#dummy').attr('data-'+($( document ).height()+1000),"opacity:0;");
		}
		else{
			$('#gototop').click(function(e){
				e.preventDefault();
				$("html, body").animate({ scrollTop: 0 }, "slow");
			})
		}
		
		var s= skrollr.init({
			forceHeight: true,
			skrollrBody:'skrollr-body'
		});	
});

function generate_thumb(img, name,genre,id)
{
	return '<a href="gallery.html?aid='+id+'"><button type="button" class="genr btn btn-default col-xs-5 col-sm-13" style="margin:5px" genre="'+genre+'"><img class="img-thumbnail" src="'+img+'"><br>'+name+'</button></a>';
}

function sorting(id_)
{
			$('#genre_sel input').filter(function(index){
				return id_.split('option')[1]*1==index;
			}).click();
}