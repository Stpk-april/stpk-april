var count =0;
var timer;
var btnCount;
var cnt_ck=false,aki_ck=false;
var tictac_max=2000, tictac=2000, tictac_c=0, tictac_l=0;
var plus_second=1,plus_second_or=0;

var char_list=new Array(0,1,2,3,4);
var char_list_name=new Array('#kia','#neon','#tesla','#theA','#lily');
var char_list_or=new Array(1,1,1,1,1);

var char_count=0;

var te_sc=0; //max
var min_cnt=0.1; //min+ %
var min=0.1; //min +

var click_cnt=0,total_c=0, click_cnt_or=0;

var help_on=true;

var arc_cl=0;
var arcv=new Array(0,0,0,0,0,0,0);
var male=0, female=0, ougon=0, maguro=0;

var comp_thema=new Array(0,0,0,0,0,0,0,0);
var name_thema=new Array('blue','red','black','white','purple','yellow','pink','orange');

var comp_onsen=new Array(0,0,0,0,0,0,0,0);
var comp_back=new Array(0,0,0,0,0,0,0,0);
var thema_now=new Array('','','');
var thema=0;

//totalclick
var tot_clk=0;

window.onload = function(){
	timer = setInterval(tick, tictac);
	btnCount = document.getElementById("btnCount");
}

function set_toast(text,icon){
icon=(icon!=null)? icon:null;
$().toastmessage('showToast', {
       text     : text,
       sticky   : false,
       position : 'bottom-right',
       type     : 'success',
       close    : function () {},
	   icon		: icon
    });
}

function ap_archive(icon,txt,eve){
eve=(eve!=null)? eve:0;
	$('<li><img src="images/arc_'+icon+'.png" style="width:50px; height:50px;"></li>').appendTo('#archive_')
	.hide()
	.fadeIn()
	.mouseover(function(){
	$('#view_arc').html(txt);
		})
	.mouseout(function(){
			$('#view_arc').html("&nbsp;");
	});
	if(eve==0) set_toast(txt,'images/arc_'+icon+'.png');
	arc_cl++;
	$('#arc_c').html(arc_cl);				
}
function tick(){
total_c+=Math.random()*(plus_second-min)+min;

count=count+Math.random()*(plus_second-min)+min;
if(cnt_ck==false&&total_c>10000){	
	ap_archive('14','１万回以上手を伸ばしました');
	cnt_ck=true;
}
var ccc=Math.floor(count);
$(btnCount).html(ccc);
}

Array.prototype.remove = function(index) {
	this.splice(index,1);
	return this;
};

function help_m(event, txt){
		if(help_on==true){
		var divTop = event.clientY+3;
		var divLeft =  event.clientX+3;
		$('body').append("<div id=\"help\" class=\"help_w div_round\" style=\"position:fixed;top:"+divTop+"px;z-index:9999;left:"+divLeft+"px;\">"+txt+"</div>");
		$('#help').hide().fadeIn();
		}
}


function set_timer(){
te_sc=plus_second;
var min_sc=min;
$('#te_second').html(min_sc.toFixed(3)+'~'+te_sc.toFixed(3));
//chk_archive();
//$('#debug').html(tictac);
}
function chk_archive(){
	if(arcv[0] ==2){
		ap_archive('01','蒼天のメモリーを集めました');
		arcv[0]=-1;
	}
	else if(arcv[1]==1){
		ap_archive('02','赫炎のメモリーを集めました');
		arcv[1]=-1;
	}
	else if(arcv[2]==2){
		ap_archive('03','漆黒のメモリーを集めました');
		arcv[2]=-1;
	}
	else if(arcv[3]==2){
		ap_archive('04','白光のメモリーを集めました');
		arcv[3]=-1;
	}
	else if(arcv[4]==2){
		ap_archive('05','紫影のメモリーを集めました');
		arcv[4]=-1;
	}
	else if(arcv[5]==2){
		ap_archive('06','黄雷のメモリーを集めました');
		arcv[5]=-1;
	}
	else if(arcv[6]==2){
		ap_archive('07','灰燼のメモリーを集めました');
		arcv[6]=-1;
	}
	if(male==2){
		ap_archive('09','ヒーローのメモリーを集めました');
		male=-10;
	}
	if(female==3){
		ap_archive('10','ヒロインのメモリーを集めました');
		female=-10;
	}
	if(maguro==2){
		ap_archive('12','マグロのメモリーを集めました');
		maguro=-99;
	}
	if(ougon==1){	
		ap_archive('11','黄金瞳のメモリーを集めました');
		ougon=-999;
	}
	if(female+male==-20){	
		ap_archive('08','すべてのメモリーを集めました');
	}
}

function chk_cha(cha){
var t=$(cha).attr('genre').split(' ');	
//$('#archive_').html(t[0]*1);
arcv[t[0]*1]++;
if( t[1]=="fe") female++;
else male++;
if(t[2]*1==1) ougon++;
}

//push character
function plus_ch(){
	if(char_list.length>0&&count>=100*(char_count)*(char_count)){
			count-=100*(char_count)*(char_count);
			var result = Math.floor(Math.random() * char_list.length);
			switch(char_list[result]){
				case 0:
						$('#kia').fadeIn(500);
						tictac-=200;
						char_count++;
						chk_cha('#kia');
						set_timer();
						clearInterval(timer);
						timer = setInterval(tick, tictac);
						break;
				case 1:
						$('#neon').fadeIn(500);
						plus_second+=50;
						min=plus_second*min_cnt;
						char_count++;
						set_timer();
						chk_cha('#neon');
						break;
				case 2:
						$('#tesla').fadeIn(500);
						click_cnt+=20;
						char_count++;
						chk_cha('#tesla');
						break;
				case 3:
						$('#theA').fadeIn(500);
						min_cnt+=0.5;
						min=plus_second*min_cnt;
						char_count++;
						set_timer();
						chk_cha('#theA');
						break;
				case 4:
						$('#lily').fadeIn(500);
						click_cnt+=20;
						char_count++;
						chk_cha('#lily');
						break;
			}
			char_list_or[char_list[result]]=-1;
			chk_archive();
			$('#now_cha_l').html(char_count);
			var ccc=Math.floor(count);
			$(btnCount).html(ccc);
			char_list.remove(result);
			if(char_list.length==0){
				//	$('#now_cha_t').remove();
					$('#now_cha_l').html('MAX');
					$(this).attr('data-hover', '全員集合！');
			}
			else{
			//$('#now_cha').html(100*(char_count)*(char_count)+'回消費');
			$(this).attr('data-hover', 100*(char_count)*(char_count)+'回消費');

		}
	}
}

function reste_cha(){

}

function change_thema_f(cost, name, no_thema, no_css){
	if(count>=cost&&comp_thema[no_thema]!=1){
		comp_thema[no_thema]=1;
		count-=cost;
		$('#'+name+'_lock').fadeOut();
		$('#now_thema').attr('href','ani_cha'+no_css+'.css');
	}
	else if(comp_thema[no_thema]==1) $('#now_thema').attr('href','ani_cha'+no_css+'.css');
	else{
		return false;
	}
	return true;
}

$(function(){ 
		set_timer();
		$('#now_c_t').hide();
		$('#now_a_t').hide();
		$('#shop').hide();
		$('#now_k_t').hide();
		$('#now_cha_t').hide();
		$('#now_c').html((1+tictac_l)*(1+tictac_l)*300);
		$('#now_cha').html("初回無料！");
		$('#chg_thema').toggle();
		$('#chg_onsen').toggle();
		$('#chg_back').toggle();
		$('#thema').click(function(){ $('#chg_thema').slideToggle();});
		$('#onsen').click(function(){ $('#chg_onsen').slideToggle();});
		$('#back_').click(function(){ $('#chg_back').slideToggle();});
		
		$('#change').click(function(){
			 $('#shop').slideToggle('slow');
			 $('#archives').slideToggle('slow');
			 if( $(this).html()=="ショップ") $(this).html("アーカイブ");
			 else $(this).html("ショップ");
		});
		
		$("#chg_thema input").click(function(event){
		var now_ck= $('#chg_thema input[type=radio]:checked');
			if(now_ck.attr('id')=='chg_default')
			{
					$('#now_thema').attr('href','ani_cha.css');
			}
			else if(now_ck.attr('id')=='chg_blue')
				{
					if(count<10000&&comp_thema[0]!=1){
							event.stopPropagation();
							return false;
					}
					change_thema_f(10000,'blue', 0, 4);
				}
			else if(now_ck.attr('id')=='chg_red')
				{
					if(count<10000&&comp_thema[1]!=1){
							event.stopPropagation();
							return false;
					}
					change_thema_f(10000,'red', 1, 5);
				}
			else if(now_ck.attr('id')=='chg_black')
			{
					if(count<10000&&comp_thema[3]!=1){
							event.stopPropagation();
							return false;
					}
					change_thema_f(10000,'black', 3, '');
			}
			else if(now_ck.attr('id')=='chg_yellow')
			{
					if(count<10000&&comp_thema[5]!=1){
							event.stopPropagation();
							return false;
					}
					change_thema_f(10000,'yellow', 5, 3);
			}
			else if(now_ck.attr('id')=='chg_orange')
				{
					if(count<10000&&comp_thema[8]!=1){
							event.stopPropagation();
							return false;
					}
					change_thema_f(10000,'orange', 8, 2);
				}
			var ccc=Math.floor(count);
			$(btnCount).html(ccc);
		});
		
		$("#chg_back input").click(function(event){
			var now_ck= $('#chg_back input[type=radio]:checked');
			if(now_ck.attr('id')=='back00')
			{
					$('body').css('background','black');
			}
			else if(now_ck.attr('id')=='back01')
			{
					if(count>=10000&&comp_back[0]!=1){
						comp_back[0]=1;
						count-=10000;
						$('#back01_lock').fadeOut();
						$('body').css('background','url("images/back02.jpg")');
						}
				if(comp_back[0]==1){
						$('body').css('background','url("images/back02.jpg")');
				}
				else{
					event.stopPropagation();
					return false;
				}
			}
			else if(now_ck.attr('id')=='back02')
			{
					if(count>=10000&&comp_back[1]!=1){
						comp_back[1]=1;
						count-=10000;
						$('#back02_lock').fadeOut();
						$('body').css('background','url("images/back03.jpg")');
						}
				if(comp_back[1]==1){
						$('body').css('background','url("images/back03.jpg")');
				}
				else{
					event.stopPropagation();
					return false;
				}
			}
			else if(now_ck.attr('id')=='back03')
			{
					if(count>=10000&&comp_back[2]!=1){
						comp_back[2]=1;
						count-=10000;
						$('#back03_lock').fadeOut();
						$('body').css('background','url("images/back04.jpg")');
						}
				if(comp_back[2]==1){
						$('body').css('background','url("images/back04.jpg")');
				}
				else{
					event.stopPropagation();
					return false;
				}
			}
			else if(now_ck.attr('id')=='back04')
			{
					if(count>=10000&&comp_back[3]!=1){
						comp_back[3]=1;
						count-=10000;
						$('#back04_lock').fadeOut();
						$('body').css('background','url("images/back04.png")');
						}
				if(comp_back[3]==1){
						$('body').css('background','url("images/back04.png")');
				}
				else{
					event.stopPropagation();
					return false;
				}
			}
			
		});
		
		

		
		$("#chg_onsen input").click(function(event){
			var now_ck= $('#chg_onsen input[type=radio]:checked');
			if(now_ck.attr('id')=='onsen00')
			{
					$('#clickbut').css('background','url("images/ons_s.jpg")');
					$('#tesla').css('top','25%');
					$('#neon').css('top','26.8%');
					$('#lily').css({'top':'360px','left':'180px'});
					$('#kia_con').css({'top':'32%'});
			}
			else if(now_ck.attr('id')=='onsen01')
			{
				if(count>=10000&&comp_onsen[0]!=1){
					comp_onsen[0]=1;
					count-=10000;
					$('#onsen01_lock').fadeOut();
					$('#clickbut').css('background','url("images/ons_s2.png")');
					$('#tesla').css({'top':'31%'});
					$('#neon').css({'top':'34%'});
					$('#lily').css({'top':'370px','left':'145px'});
				}
				if(comp_onsen[0]==1){
					$('#clickbut').css('background','url("images/ons_s2.png")');
					$('#tesla').css({'top':'31%'});
					$('#neon').css({'top':'34%'});
					$('#lily').css({'top':'370px','left':'145px'});
				}
				else{
					event.stopPropagation();
					return false;
				}
			}
			else if(now_ck.attr('id')=='onsen02')
			{		
				if(count>=10000&&comp_onsen[1]!=1){
					comp_onsen[1]=1;
					count-=10000;
					$('#onsen02_lock').fadeOut();
					$('#clickbut').css('background','url("images/ons_s3.png")');
					$('#tesla').css({'top':'31%'});
					$('#neon').css({'top':'34%'});
					$('#kia_con').css({'top':'40%'});
					$('#lily').css({'top':'370px','left':'160px'});
				}
				if(comp_onsen[1]==1){
					$('#clickbut').css('background','url("images/ons_s3.png")');
					$('#tesla').css({'top':'31%'});
					$('#neon').css({'top':'34%'});
					$('#kia_con').css({'top':'40%'});
					$('#lily').css({'top':'370px','left':'160px'});
				}
				else{
					event.stopPropagation();
					return false;
				}
			}
			else if(now_ck.attr('id')=='onsen03')
			{		
				if(count>=10000&&comp_onsen[2]!=1){
					comp_onsen[2]=1;
					count-=10000;
					$('#onsen03_lock').fadeOut();
					$('#clickbut').css('background','url("images/ons_s4.png")');
					$('#tesla').css({'top':'21%'});
					$('#neon').css({'top':'24%'});
					$('#kia_con').css({'top':'60%'});
				}
				if(comp_onsen[2]==1){
					$('#clickbut').css('background','url("images/ons_s4.png")');
					$('#tesla').css({'top':'21%'});
					$('#neon').css({'top':'24%'});
					$('#kia_con').css({'top':'60%'});
				}
				else{
					event.stopPropagation();
					return false;
				}
			}
			var ccc=Math.floor(count);
			$(btnCount).html(ccc);
		});
		

		
		
		//Char 
		$('#tesla').hide().mouseover(function(event){
			help_m(event, "テスラ：クリック時の手を伸ばす回数が増える");
		})
		 .mouseout(function() {
			$('#help').remove();
		});
		$('#neon').hide()
		.mouseover	(function(event){
			help_m(event, "ネオン：自動的に手を伸ばす回数が増える");
		})
		 .mouseout(function() {
			$('#help').remove();
		});	
		$('#kia').hide()
		.mouseover	(function(event){
			help_m(event, "キーア：自動的に手を伸ばす速度が増える");
		})
		 .mouseout(function() {
			$('#help').remove();
		});			
		$('#theA').hide()
		.mouseover	(function(event){
			help_m(event, "A：自動的に手を伸ばす最低回数が増えます");
		})
		 .mouseout(function() {
			$('#help').remove();
		});			
		$('#lily').hide()
		.mouseover	(function(event){
			help_m(event, "リリィ：クリック時の手を伸ばす回数が増える");
		})
		 .mouseout(function() {
			$('#help').remove();
		});			

		
		
		//click
		$('#clickbut').bind('click',function(e){
			total_c+=1+click_cnt;
			count+=1+click_cnt;
			tot_clk++;
			$(btnCount).html(Math.floor(count));
			var xx=e.pageX+8-Math.floor(Math.random()*20);
			var yy=e.pageY-40;
			//set particle
			var tt=$('<div class="aaa" style="pointer-events: none;position:fixed;cursor:pointer;opacity:1;top:'+yy+'px;left:'+xx+'px;"><h3>+'+(1+click_cnt)+'</h3></div>');
			tt.appendTo('body')
			.animate({top: yy-50,opacity:0}, 1000,"linear",function()
			{
						$(this).remove();
			});
			xx=e.pageX-60+Math.floor(Math.random()*30);
			yy=e.pageY-80;
			var bb=$('<div class="steam" style="top:'+yy+'px;left:'+xx+'px;"></div>');
			if(Math.floor(Math.random()*2)==0){
			bb=$('<div class="steam" style="background:url(images/steam02.png);background-size:100%;top:'+yy+'px;left:'+xx+'px;"></div>');			
			}	
			bb.appendTo('body')
			.animate({top: yy-100,left:xx-20,width:200,height:200,opacity:0}, 2000,"linear",function()
			{
						$(this).remove();
			});
		
			if(tot_clk==10000){
				ap_archive('15','1万回以上クリックしました');
			}
		});
		
		//button
		$('#button1').bind('click',function(){
				if(count>=(plus_second_or+1)*(plus_second_or+1)*200){
				count-=(plus_second_or+1)*(plus_second_or+1)*200;
				plus_second++;
				plus_second_or++;
				min=plus_second*min_cnt;
				set_timer();
				$(btnCount).html(Math.floor(count));
				$('#now_k_l').html(plus_second_or);
				$(this).attr('data-hover', (plus_second_or+1)*(plus_second_or+1)*200+'回消費');
				}
		})
		.bind('mouseover touchstart',function(){
			$('#view_help').html("自動的に手を伸ばす回数を増えます");
		})
		.bind('mouseout touchend',function(){
			$('#view_help').html("&nbsp;");
		});		

		
		
		//button
		$('#button5').bind('click',function(){
				if(count>=(click_cnt_or+1)*(click_cnt_or+1)*20){
					count-=(click_cnt_or+1)*(click_cnt_or+1)*20;
					click_cnt++;
					click_cnt_or++;
					$(btnCount).html(Math.floor(count));
					$('#now_a_l').html(click_cnt_or);
					$('#now_a').html((click_cnt_or+1)*(click_cnt_or+1)*20);
					$(this).attr('data-hover', (click_cnt_or+1)*(click_cnt_or+1)*20+'回消費');
				}
		})
		.bind('touchstart mouseover',function(){
//			$('#now_a_t').toggle();
			$('#view_help').html("クリック時の手を伸ばす回数が増えます");
		})
		.bind('touchend mouseout',function(){
//			$('#now_a_t').toggle();
			$('#view_help').html("&nbsp;");
			}
		);
		
	
		//speed
        $('#button3').bind('click',function(){ 
			var cost=(1+tictac_l)*(1+tictac_l)*300;
			if(count>=cost&&tictac_l<15){ //degree 10
				count-=cost;
				tictac-=100;
				tictac_l++;
				clearInterval(timer);
				timer = setInterval(tick, tictac);
				$(btnCount).html(Math.floor(count));
				set_timer();
				$('#now_c_l').html(tictac_l);
				$(this).attr('data-hover', (1+tictac_l)*(1+tictac_l)*300+'回消費');

				if(aki_ck==false&&tictac_l==15){
					ap_archive('17','最後まで諦めないでした');
					aki_ck=true;
					$('#now_c_l').html('MAX');
					$(this).attr('data-hover', 'MAX');

				}
			}
		})
			.bind('touchstart mouseover',function(){
			$('#view_help').html("自動的に手を伸ばす速度が増えます");
		})
			.bind('touchend mouseout',function(){
			$('#view_help').html("&nbsp;");
			}
		);
		
		
		
		//character
		$('#button4').bind('click',plus_ch)
			.bind('touchstart mouseover',function(){
		//	$('#now_cha_t').toggle();
			$('#view_help').html("ランダムにキャラクターが増えます。ガチャ！");
		})
			.bind('touchend mouseout',function(){
		//	$('#now_cha_t').toggle();
			$('#view_help').html("&nbsp;");
			}
		);
    
});


function save_clk(){
if (('localStorage' in window) && window.localStorage != null){  
localStorage.setItem('count' , count);
localStorage.setItem('cnt_ck' , (cnt_ck==true)? 1:0);
localStorage.setItem('aki_ck' , (aki_ck==true)? 1:0);
localStorage.setItem('tictac_c' , tictac_c);
localStorage.setItem('tictac_l' , tictac_l);
localStorage.setItem('tictac' , tictac);
localStorage.setItem('plus_second' , plus_second);
localStorage.setItem('plus_second_or' , plus_second_or);
localStorage.setItem('char_count' , char_count);
localStorage.setItem('te_sc' , te_sc);
localStorage.setItem('min_cnt' , min_cnt);
localStorage.setItem('min' , min);
localStorage.setItem('click_cnt' , click_cnt);
localStorage.setItem('total_c' , total_c);
localStorage.setItem('click_cnt_or' , click_cnt_or);
localStorage.setItem('male' , male);
localStorage.setItem('female' , female);
localStorage.setItem('ougon' , ougon);
localStorage.setItem('maguro' , maguro);
localStorage.setItem('tot_clk' , tot_clk);
var i;
var temp='';
if(char_list.length==0) temp='null';
else{
for(i=0;i<char_list.length;i++){
	temp+=char_list[i]+',';
	}
}
temp=temp.substr(0,temp.length-1);
localStorage.setItem('char_list' , temp);
temp='';
for(i=0;i<char_list_or.length;i++){
	temp+=char_list_or[i]+',';
}
temp=temp.substr(0,temp.length-1);
localStorage.setItem('char_list_or' , temp);
temp='';
for(i=0;i<arcv.length;i++){
	temp+=arcv[i]+',';
}
temp=temp.substr(0,temp.length-1);
localStorage.setItem('arcv' , temp);

temp='';
for(i=0;i<comp_thema.length;i++){
	temp+=comp_thema[i]+',';
}
temp=temp.substr(0,temp.length-1);
localStorage.setItem('comp_thema' , temp);

temp='';
for(i=0;i<comp_back.length;i++){
	temp+=comp_back[i]+',';
}
temp=temp.substr(0,temp.length-1);
localStorage.setItem('comp_back' , temp);

temp='';
for(i=0;i<comp_onsen.length;i++){
	temp+=comp_onsen[i]+',';
}
temp=temp.substr(0,temp.length-1);
localStorage.setItem('comp_onsen' , temp);

localStorage.setItem('thema_now' , thema_now[0]+','+thema_now[1]+','+thema_now);
set_toast('セーブ完了');
}
else if($.cookie('test' , '1')){
$.cookie('saved_' , 1, { expires : 365 })
var tok=count+'/'+cnt_ck+'/'+aki_ck+'/'+tictac_c+'/'+tictac_l+'/'+tictac+'/'+plus_second+'/'+plus_second_or+'/'+char_count;
var tok2=te_sc+'/'+min_cnt+'/'+min+'/'+click_cnt+'/'+total_c+'/'+click_cnt_or;
var tok3=male+'/'+female+'/'+ougon+'/'+maguro+'/'+tot_clk;

$.cookie('save01' , tok, { expires : 365 });
$.cookie('save02' , tok2, { expires : 365 });
$.cookie('save03' , tok3, { expires : 365 });

var i;
var temp='';
if(char_list.length==0) temp='null';
else{
for(i=0;i<char_list.length;i++){
	temp+=char_list[i]+',';
	}
}
temp=temp.substr(0,temp.length-1);
$.cookie('char_list' , temp, { expires : 365 });

temp='';
for(i=0;i<char_list_or.length;i++){
	temp+=char_list_or[i]+',';
}
temp=temp.substr(0,temp.length-1);
$.cookie('char_list_or' , temp, { expires : 365 });

temp='';
for(i=0;i<arcv.length;i++){
	temp+=arcv[i]+',';
}
temp=temp.substr(0,temp.length-1);
$.cookie('arcv' , temp, { expires : 365 });

set_toast('セーブ完了');		
}

else {
	set_toast('セーブ出来ない環境です');
	}
}

function load_clk(){
if (('localStorage' in window) && window.localStorage != null && localStorage.getItem('count')!= null){
		count= localStorage.getItem('count')*1;
		cnt_ck=((localStorage.getItem('cnt_ck')*1==1)? true:false);
		aki_ck=((localStorage.getItem('aki_ck')*1==1)? true:false);
		tictac_c=localStorage.getItem('tictac_c')*1;
		tictac_l=localStorage.getItem('tictac_l')*1;
		tictac=localStorage.getItem('tictac')*1;
		plus_second=localStorage.getItem('plus_second')*1;
		plus_second_or=localStorage.getItem('plus_second_or')*1;
		char_count=localStorage.getItem('char_count')*1;
		te_sc=localStorage.getItem('te_sc')*1;
		min_cnt=localStorage.getItem('min_cht')*1;
		min=localStorage.getItem('min')*1;
		click_cnt=localStorage.getItem('click_cnt')*1;
		total_c=localStorage.getItem('total_c')*1;
		click_cnt_or=localStorage.getItem('click_cnt_or')*1;

		male=localStorage.getItem('male')*1;
		female=localStorage.getItem('female')*1;
		ougon=localStorage.getItem('ougon')*1;
		maguro=localStorage.getItem('maguro')*1;
		tot_clk=localStorage.getItem('tot_clk')*1; 

		var i;
		var p=localStorage.getItem('char_list').split(',');
		if(p!='nul'){
			for(i=0;i<p.length;i++) p[i]=p[i]*1;
			char_list=p;
		}
		else {
			char_list.length=0;
		}

		char_list_or=localStorage.getItem('char_list_or').split(',');
		for(i=0;i<char_list_or.length;i++) char_list_or[i]=char_list_or[i]*1;

		arc_cl=0;
		arcv=localStorage.getItem('arcv').split(',');
		for(i=0;i<arcv.length;i++) arcv[i]=arcv[i]*1;

		comp_thema=localStorage.getItem('comp_thema').split(',');
		comp_back=localStorage.getItem('comp_back').split(',');
		comp_onsen=localStorage.getItem('comp_onsen').split(',');
		thema_now=localStorage.getItem('thema_now').split(',');
		$('.lock_box').show();
		for(i=0;i<comp_thema.length;i++){
			if(comp_thema[i]==1)	$('#'+name_thema[i]+'_lock').fadeOut(); }
		for(i=0;i<comp_back.length;i++){
			if(comp_back[i]==1)	$('#back0'+(i+1)+'_lock').fadeOut(); }
		for(i=0;i<comp_onsen.length;i++){
			if(comp_onsen[i]==1)	$('#onsen0'+(i+1)+'_lock').fadeOut(); }

			
			
		$('#archive_').empty();
		tick();
		set_timer();
		clearInterval(timer);
		timer = setInterval(tick, tictac);
		$('#now_c_l').html(tictac_l);
		$('#button3').attr('data-hover', (1+tictac_l)*(1+tictac_l)*300+'回消費');
		$('#button1').attr('data-hover', (plus_second_or+1)*(plus_second_or+1)*200+'回消費');
		$('#button5').attr('data-hover', (click_cnt_or+1)*(click_cnt_or+1)*20+'回消費');
		$('#now_cha_l').html(char_count);
		$('#now_a_l').html(click_cnt_or);
		$('#now_k_l').html(plus_second_or);
		if(total_c>10000){	
			ap_archive('14','１万回以上手を伸ばしました');
			cnt_ck=true;
		}
		if(char_list.length==0){
			$('#now_cha_l').html('MAX');
			$('#button4').attr('data-hover', '全員集合！');
		}
		else{$('#button4').attr('data-hover', 100*(char_count)*(char_count)+'回消費')};
				chk_archive_2();
				put_char();
				if(tictac_l==15){
					ap_archive('17','最後まで諦めないでした');
					aki_ck=true;
					$('#now_c_l').html('MAX');
					$('#button3').attr('data-hover', 'MAX');

				}
				
		set_toast('ロード完了');
}
else if($.cookie('saved_')*1==1) {
	var temp01= ($.cookie('save01')).split('/');
	var temp02= ($.cookie('save02')).split('/');
	var temp03= ($.cookie('save03')).split('/');
	count= temp01[0]*1;
	cnt_ck=temp01[1]*1;
	aki_ck=temp01[2]*1;
	tictac_c=temp01[3]*1;
	tictac_l=temp01[4]*1;
	tictac=temp01[5]*1;
	plus_second=temp01[6]*1;
	plus_second_or=temp01[7]*1;
	char_count=temp01[8]*1;

	te_sc=temp02[0]*1;
	min_cnt=temp02[1]*1;
	min=temp02[2]*1;
	click_cnt=temp02[3]*1;
	total_c=temp02[4]*1;
	click_cnt_or=temp02[5]*1;
	male=temp03[0]*1;
	female=temp03[1]*1;
	ougon=temp03[2]*1;
	maguro=temp03[3]*1;
	tot_clk=temp03[4]*1; 
	
	var i;
	var p=($.cookie('char_list')).split(',');
	//$('#debug').html(p);
	if(p!='nul'){
	for(i=0;i<p.length;i++) p[i]=p[i]*1;
	char_list=p;
	}
	else {
	char_list.length=0;
	}

	char_list_or=($.cookie('char_list_or')).split(',');
	for(i=0;i<char_list_or.length;i++) char_list_or[i]=char_list_or[i]*1;

	arc_cl=0;

	arcv=($.cookie('arcv')).split(',');
	for(i=0;i<arcv.length;i++) arcv[i]=arcv[i]*1;

	//$('#debug').html(count);
	$('#archive_').empty();
	tick();
	set_timer();
	clearInterval(timer);
	timer = setInterval(tick, tictac);

	$('#now_c_l').html(tictac_l);
	$('#button3').attr('data-hover', (1+tictac_l)*(1+tictac_l)*300+'回消費');
	$('#button1').attr('data-hover', (plus_second_or+1)*(plus_second_or+1)*200+'回消費');
	$('#button5').attr('data-hover', (click_cnt_or+1)*(click_cnt_or+1)*20+'回消費');
	$('#now_cha_l').html(char_count);
	$('#now_a_l').html(click_cnt_or);
	$('#now_k_l').html(plus_second_or);

	if(char_list.length==0){
		$('#now_cha_l').html('MAX');
		$('#button4').attr('data-hover', '全員集合！');
	}
	else{$('#button4').attr('data-hover', 100*(char_count)*(char_count)+'回消費')};
			chk_archive_2();
			put_char();
	if(tictac_l==15){
		ap_archive('17','最後まで諦めないでした');
		aki_ck=true;
		$('#now_c_l').html('MAX');
		$('#button3').attr('data-hover', 'MAX');
	}
		set_toast('ロード完了');		
	}	

else{
	set_toast('ロード出来ません');
}
}

function reset_clk(){
if (('localStorage' in window) && window.localStorage !== null && localStorage.getItem('count')){
		localStorage.removeItem('count');
		localStorage.removeItem('cnt_ck');
		localStorage.removeItem('aki_ck');
		localStorage.removeItem('tictac_c');
		localStorage.removeItem('tictac_l');
		localStorage.removeItem('tictac');
		localStorage.removeItem('plus_second');
		localStorage.removeItem('plus_second_or');
		localStorage.removeItem('char_count');
		localStorage.removeItem('te_sc');
		localStorage.removeItem('min_cnt');
		localStorage.removeItem('min');
		localStorage.removeItem('click_cnt');
		localStorage.removeItem('total_c');
		localStorage.removeItem('click_cnt_or');
		localStorage.removeItem('male');
		localStorage.removeItem('female');
		localStorage.removeItem('ougon');
		localStorage.removeItem('maguro');
		localStorage.removeItem('tot_clk');
		localStorage.removeItem('char_list');
		localStorage.removeItem('char_list_or');
		localStorage.removeItem('arcv');
}
else{
   var cookies = $.cookie();
	for(var cookie in cookies) {
   $.removeCookie(cookie);
		}
	}

}

function put_char(){
		$('.char_').hide();	
		for(var i=0;i<char_list_or.length;i++){
			if(char_list_or[i]==-1) {$(char_list_name[i]).fadeIn();
		//	$('#debug').append(char_list_name[i]);
			}
		}
}

function chk_archive_2(){	
	if(arcv[0] ==-1) ap_archive('01','蒼天のメモリーを集めました',1);
	if(arcv[1]==-1) ap_archive('02','赫炎のメモリーを集めました',1);
	if(arcv[2]==-1) ap_archive('03','漆黒のメモリーを集めました',1);
	if(arcv[3]==-1) ap_archive('04','白光のメモリーを集めました',1);
	if(arcv[4]==-1) ap_archive('05','紫影のメモリーを集めました',1);
	if(arcv[5]==-1) ap_archive('06','黄雷のメモリーを集めました',1);
	if(arcv[6]==-1) ap_archive('07','灰燼のメモリーを集めました',1);
	if(male==-10) ap_archive('09','ヒーローのメモリーを集めました',1);
	if(female==-10) ap_archive('10','ヒロインのメモリーを集めました',1);
	if(maguro==-99)ap_archive('12','マグロのメモリーを集めました',1);
	if(ougon==-999)ap_archive('11','黄金瞳のメモリーを集めました',1);
	if(female+male==-20)ap_archive('08','すべてのメモリーを集めました',1);
	if(tot_clk==10000) ap_archive('15','1万回以上クリックしました',1);
}