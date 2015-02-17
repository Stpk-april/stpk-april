var key ='1yqK2p_HGwxrLLixIxNShiwtVElpHySCC282M0S7Z_XA';
/*
var number=1;
$(function(){
$('#go').click(function(){
	 doajax({name:$("#name").val(), work:$("#work").val(),twitter:$("#twitter").val(),arts:$("#arts").val()});
	 $('#view').prepend($("#name").val()+' '+$("#work").val()+' '+$("#twitter").val()+' '+$("#arts").val()+'<br>'); 
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
var alls = new Array();
var illust = new Array();
var manga = new Array();
var novel = new Array();

var query;
var now_;
$( document ).ready(function() {
	 query = new google.visualization.Query('http://spreadsheets.google.com/a/google.com/tq?key='+key+'&pub=1');
	 var t= $(location).attr('search').split('&');
	set_Q('');
})
function set_Q(txt){
	$('#loadingg').show();
	$('#gamen').hide();
	now='';
	query.setQuery("SELECT B, C, D, E, F "+txt);
	query.send(handleQueryResponse);
}
function handleQueryResponse(event){
	if (event.isError()) {
		alert('Error in query: ' + event.getMessage() + ' ' + event.getDetailedMessage());
		return;
	}
	var data = event.getDataTable();
	for (i=0; i<13&&i<data.getNumberOfRows(); i++){
		$("#home-page1").prepend('<button type="button" class="genr btn btn-default" genre="'+data.getValue(i,4)+'">'+data.getValue(i,0)+'</button>').hide().fadeIn();
		alls.push('<button type="button" class="genr btn btn-default" genre="'+data.getValue(i,4)+'">'+data.getValue(i,0)+'</button>');
		if(data.getValue(i,3).indexOf('Illust')!=-1) insother(data,'illust','-page1');
		if(data.getValue(i,3).indexOf('comic')!=-1) insother(data,'manga','');
		if(data.getValue(i,3).indexOf('Novel')!=-1) insother(data,'novel','');
	}
	
	if(data.getNumberOfRows()>=13){
	for (i=13; i<data.getNumberOfRows(); i++){
		$("#home-page2").prepend('<button type="button" class="genr btn btn-default" genre="'+data.getValue(i,4)+'">'+data.getValue(i,0)+'</button>');
		alls.push('<button type="button" class="genr btn btn-default" genre="'+data.getValue(i,4)+'">'+data.getValue(i,0)+'</button>');
		if(data.getValue(i,3).indexOf('Illust')!=-1) insother(data,'illust','-page2');
		if(data.getValue(i,3).indexOf('comic')!=-1) insother(data,'manga','');
		if(data.getValue(i,3).indexOf('Novel')!=-1) insother(data,'novel','');
	}
	}
	else{
		$('#home-newer').hide();
	}
	$('#loadingg').hide();
	$('#gamen').fadeIn();
}

function insother(data,chk,pgng){
		$("#"+chk+pgng).prepend('<button type="button" class="genr btn btn-default" genre="'+data.getValue(i,4)+'">'+data.getValue(i,0)+'</button>');
		switch (chk){
			case 'illust' : illust.push('<button type="button" class="genr btn btn-default" genre="'+data.getValue(i,4)+'">'+data.getValue(i,0)+'</button>');
							break;
			case 'manga' : manga.push('<button type="button" class="genr btn btn-default" genre="'+data.getValue(i,4)+'">'+data.getValue(i,0)+'</button>');
							break;
			case 'novel' : novel.push('<button type="button" class="genr btn btn-default" genre="'+data.getValue(i,4)+'">'+data.getValue(i,0)+'</button>');
		}
}
function re_merg(data, pge, pgr){
var temp1=0;
pgr=(pgr==null)? 0: pgr;
		$('.'+pge+'pager').hide();
		for(var i=0;i<data.length;i++){
			if(data[i]!='0'){
				if(temp1>=13){
					temp1++;
					$('#'+pge+'-page2').prepend(data[i]);
				}
				else{
					temp1++
					$('#'+pge+'-page1').prepend(data[i]);			
				}
			}
		}
		if(temp1>=13&&pgr!=0){
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
	console.log(tarray);
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
		  console.log(this);
		  var targetbox = $(this).attr('href');
		  $('.home-page').hide();
		  $('.hpg').toggle();
		  $(targetbox).show();
		});
		
		$('#pageTab2 a').click(function (e) {
		  e.preventDefault();
		  console.log(this);
		  var targetbox = $(this).attr('href');
		  $('.illust-page').hide();
		  $('.illustpager > li').toggle();
		  $(targetbox).show();
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
			$('#home').tab('show');
			$('#home-page1').show();
			$('#home-page2').hide();
			$('#illust-page1').show();
			$('#illust-page2').hide();
		});
//		$('#home-page1').append(gen	erate_thumb('logo2.png','aaa'));
});


function generate_thumb(img, name)
{
	var $t=$('<div class="img-thumbnail col-xs-5 col-sm-13"></div>');
	$t.append('<img style="width: 100% height: auto;"  class="img-thumbnail" alt="300x200" src='+img+'>');
	$t.append('<div class="caption">'+name+'</div>');
	return $t;
}

