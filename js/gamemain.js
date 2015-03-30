/*

 * Copyright 2015 stpk-april kikaku
 * Licensed under the MIT License
 * http://opensource.org/licenses/MIT
 
*/

var count =0;
var char_list=new Array();
var arcv_list=new Array();
var char_list_num=new Array();
var char_count=0;
var char_count_cost=0;

var timer, timer2;
var btnCount;
var cnt_ck=false,aki_ck=false;
var tictac_max=2000, tictac=2000, tictac_c=0, tictac_l=0;
var plus_second=1,plus_second_or=0;

var te_sc=0; //max
var min_cnt=0.1; //min+ %
var min=0.1; //min +

var click_cnt=0,total_c=0, click_cnt_or=0;

var help_on=true;

var arc_cl=0;
var arcv=new Array(0,0,0,0,0,0,0);
var arcv_re=new Array(3,3,3,2,3,2,2);
var male=0, female=0, ougon=0, maguro=0;
var male_=0, female_=0, ougon_=0, maguro_=0;

var comp_thema=new Array();
var comp_onsen=new Array();
var comp_back=new Array();
var thema_count=0;

var thema_now=new Array('','','');
var thema=0;

//totalclick
var tot_clk=0;


Array.prototype.remove = function(index) {
	this.splice(index,1);
	return this;
};
//charactor option:id,skill,txt  sex: 0-hero 1-heroin genre - 0~6



var default_char = {speed_up:0,auto_up:0,min_up:0,click_up:0,sex:false,ougon:false, maguro:false, genre:0};
function Set_char (option){
	option=$.extend({}, default_char, option); 
	// console.log(option);
	this.id=option.id;
	this.chk=1;
	
	this.speed_up=option.speed_up;
	this.auto_up=option.auto_up;
	this.min_up=((option.min_up)*0.01);
	this.click_up=option.click_up;
	
	this.sex=option.sex;
	if(this.sex) female_++;
	else male_++;
	
	this.ougon=option.ougon;
	if(this.ougon==true) ougon_++;
	
	this.maguro=option.maguro;
	if(this.maguro==true) maguro_++;
	
	this.genre=option.genre;
	this.txt=option.txt;
	this.default_x=$(this.id).css('left');
	this.default_y=$(this.id).css('top');
	this.default_z=$(this.id).css('z-index');
	console.log(this.default_z);
	
	$(this.id).hide();
	$(this.id).mouseover(function(event){
		help_m(event, option.txt);
	})
	.mouseout(function() {
		$('#help').remove();
	});
}
Set_char.prototype.show_=function(){
	$(this.id).fadeIn();	
//	// console.log(this.id);
}
Set_char.prototype.set_xy= function(posi, xy){
	$(this.id).css(posi,xy);
}
Set_char.prototype.set_defaultxy= function(){
	$(this.id).css('top',this.default_y);
	$(this.id).css('left',this.default_x);
	$(this.id).css('z-index',this.default_z);
}
Set_char.prototype.do_skill= function(){
	tictac-=this.speed_up;
	plus_second+=this.auto_up;
	click_cnt+=this.click_up;
	
	min_cnt+=this.min_up;
	if(min_cnt>=1) min_cnt=1;
	
	min=plus_second*min_cnt;
	
	set_timer();
	clearInterval(timer);
	timer=setInterval(tick,tictac);
}
Set_char.prototype.chk_cha=function(){
	arcv[this.genre]++;
	if( this.sex ==true ) female++;
	else male++;
	if(this.ougon ==true ) ougon++;
	if(this.maguro ==true ) maguro++;
}

Set_char.prototype.get_char= function(){
	return this.id+','+this.chk;
}

function Set_arc (icon_, txt_){
		this.icon=icon_;
		this.txt=txt_;
		this.checked=0;
};

Set_arc.prototype.ap_archive=function (eve){
	eve=(eve!=null)? eve:0;
	arc_cl++;
	var text=this.txt;
	$('<li><div class="arc_'+this.icon+'"></div></li>').appendTo('#archive_')
	.hide()
	.fadeIn()
	.mouseover(function(){
		$('#view_arc').html(text);
	})
	.mouseout(function(){
			$('#view_arc').html("&nbsp;");
	});
	if(eve==0) set_toast(this.txt,'arc_'+this.icon);
	this.checked_=-1;
	$('#arc_c').html(arc_cl);				
};

window.console.log = function(){
  window.console.log = function() {
      return false;
  }
}


function push_arc(){
		arcv_list.push(new Set_arc('01','蒼天のメモリーを集めました'));
		arcv_list.push(new Set_arc('02','赫炎のメモリーを集めました'));
		arcv_list.push(new Set_arc('03','漆黒のメモリーを集めました'));
		arcv_list.push(new Set_arc('04','白光のメモリーを集めました'));
		arcv_list.push(new Set_arc('05','紫影のメモリーを集めました'));
		arcv_list.push(new Set_arc('06','黄雷のメモリーを集めました'));
		arcv_list.push(new Set_arc('07','灰燼のメモリーを集めました'));
		arcv_list.push(new Set_arc('08','すべてのメモリーを集めました'));
		arcv_list.push(new Set_arc('09','ヒーローのメモリーを集めました'));
		arcv_list.push(new Set_arc('10','ヒロインのメモリーを集めました'));
		arcv_list.push(new Set_arc('11','黄金のメモリーを集めました'));
		arcv_list.push(new Set_arc('12','マグロのメモリーを集めました'));
		arcv_list.push(new Set_arc('13','キラキラ輝いています'));
		arcv_list.push(new Set_arc('14','１万回以上手を伸ばしました'));
		arcv_list.push(new Set_arc('15','１千回以上クリックしました'));
		arcv_list.push(new Set_arc('16','１０万回以上手を伸ばしました'));
		arcv_list.push(new Set_arc('17','最後まで諦めないでした'));
}

function find_arc(id_){
	for(var i in arcv_list){
		if(arcv_list[i].icon==id_) return arcv_list[i];
	}
}
function find_char(id_){
	for(var i in char_list){
		if(char_list[i].id==id_) return char_list[i];
	}
}

function ap_archive(icon,txt,eve){
eve=(eve!=null)? eve:0;
	$('<li><div class="arc_'+icon+'"></div></li>').appendTo('#archive_')
	.hide()
	.fadeIn()
	.mouseover(function(){
		$('#view_arc').html(txt);
		})
	.mouseout(function(){
		$('#view_arc').html("&nbsp;");
	});
	if(eve==0) set_toast(txt,'arc_'+icon);
	arc_cl++;
	$('#arc_c').html(arc_cl);				
}

function chk_archive(){
	for(var i=0;i<arcv.length;i++){
		if(arcv[i] == arcv_re[i]&&find_arc('0'+(1+i)).checked!=-1){
			find_arc('0'+(i+1)).ap_archive();
			find_arc('0'+(i+1)).checked=-1;
		}
	}
	if(male==male_){
		find_arc('09').ap_archive();
		find_arc('09').checked=-1;
		male=-10;
	}
	if(female==female_){
		ap_archive('10','ヒロインのメモリーを集めました');
		female=-10;
	}
	if(maguro==maguro_){
		ap_archive('12','マグロのメモリーを集めました');
		maguro=-99;
	}
	if(ougon==ougon_){	
		ap_archive('11','黄金瞳のメモリーを集めました');
		ougon=-999;
	}
	if(female+male==-20){	
		ap_archive('08','すべてのメモリーを集めました');
	}
}

var $tempinput;
var $templabel;
var $tempdiv;
var $tempdiv2;
var $tempdiv3;

//set_thema
var default_thema = {name: 'none' , thumb:'images/on_thumb00.png', option1:'', option2:''};
function Set_thema(option){
	option=$.extend({}, default_thema, option); 
	this.name=option.name;
	this.id='#'+option.id;
	this.thumb=option.thumb;
	if(this.thumb.indexOf('.jpg')!=-1||this.thumb.indexOf('.png')!=-1){
		this.thumb='url('+this.thumb+')';
	}
	this.checked=0;
	this.type=option.type;
	this.cost=option.cost;
	this.option1=option.option1;
	this.option2=option.option2;
	if(this.id.indexOf('00')==-1){
		// console.log(this.thumb);
		$tempinput=$('<input type="radio"> </input>').attr({
			'id': option.id,
			'name':option.type+'_ch'
			});
		$templabel=$('<label for="'+option.id+'"> </label>');
		$tempdiv=$('<div>'+option.name+'</div>').attr('id',option.id+'_label').css('position','relative');
		$tempdiv2=$('<div class="thema_box"></div>').css({
			'height': ((option.type=='thema')? '40px':'60px'),
			'width': ((option.type=='thema')? '':'85px'),
			'background' : this.thumb
		});
		$tempdiv3=$('<div class="lock_box">'+option.cost+'</div>').attr('id',option.id+'_lock');
		$tempdiv.append($tempdiv3);
		$tempdiv.prepend($tempdiv2);
		$templabel.append($tempdiv);
		$('#chg_'+this.type).append($tempinput,$templabel);
		// console.log('#chg_'+this.type);
	}
}


function help_m(event, txt){
		if(true){
		var divTop = event.clientY+3;
		var divLeft =  event.clientX+3;
			$('body').append("<div id=\"help\" class=\"help_w div_round\" style=\"position:fixed;top:"+divTop+"px;z-index:9999;left:"+divLeft+"px;\">"+txt+"</div>");
			$('#help').hide().fadeIn();
		}
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
function set_timer(){
te_sc=plus_second;
var min_sc=min;
//// console.log(min);
$('#te_second').html(min_sc.toFixed(3)+'~'+te_sc.toFixed(3));
}

function tick(){
total_c+=Math.random()*(plus_second-min)+min;
count=count+Math.random()*(plus_second-min)+min;
if(find_arc('14').checked!=-1&&total_c>10000){	
	find_arc('14').ap_archive();
	find_arc('14').checked=-1;
}
else if(find_arc('16').checked!=-1&&total_c>100000){
	find_arc('16').ap_archive();
	find_arc('16').checked=-1;
}
var ccc=Math.floor(count);
$(btnCount).html(ccc);
}

function change_thema_f(no_thema){
	if(comp_thema[no_thema].checked!=1){
		thema_count++;
		if(thema_count==5){
			find_arc('13').checked=-1;
			find_arc('13').ap_archive();
		}
		comp_thema[no_thema].checked=1;
		count-=comp_thema[no_thema].cost;
		$(comp_thema[no_thema].id+'_lock').fadeOut();
		$('#now_thema').attr('href',comp_thema[no_thema].option1);
	}
	else $('#now_thema').attr('href',comp_thema[no_thema].option1);
}

window.onload = function(){
	timer = setInterval(tick, tictac);
	timer2 = setInterval(save_clk, 300000);
	btnCount = document.getElementById("btnCount");
}

$(function(){
	for(var i=1;i<=9;i++){
	$('<div id="char_0'+i+'" class="onsen_ch"/>').appendTo('#clickbut');
	char_list_num.push(i-1);
	}
	for(var i=10;i<=18;i++){
	$('#clickbut').append('<div id="char_'+i+'" class="onsen_ch"/>');
	char_list_num.push(i-1);
	}

	char_list.push(new Set_char({id:"#char_18", genre:2, sex:false, ougon:false, maguro:true, speed_up:20, auto_up:15, min_up:5, click_up:10, txt:"M"}));		
	char_list.push(new Set_char({id:"#char_17", genre:6, sex:true, ougon:false, maguro:false, speed_up:10, auto_up:25, min_up:0, click_up:15, txt:"ジュネ"}));
	char_list.push(new Set_char({id:"#char_16", genre:2, sex:true, ougon:false, maguro:false, speed_up:15, auto_up:15, min_up:0, click_up:20, txt:"シャーリィ"}));
	char_list.push(new Set_char({id:"#char_15", genre:0, sex:true, ougon:false, maguro:false, speed_up:50, auto_up:0, min_up:0, click_up:0, txt:"コーニー"}));
	char_list.push(new Set_char({id:"#char_14", genre:4, sex:true, ougon:false, maguro:false, speed_up:0, auto_up:20, min_up:20, click_up:10, txt:"リリィ"}));
	char_list.push(new Set_char({id:"#char_13", genre:3, sex:true, ougon:true, maguro:false, speed_up:0, auto_up:0, min_up:0, click_up:50, txt:"クセル"}));
	char_list.push(new Set_char({id:"#char_12", genre:5, sex:true, ougon:true, maguro:false, speed_up:0, auto_up:50, min_up:0, click_up:0, txt:"ネオン"}));
	char_list.push(new Set_char({id:"#char_11", genre:2, sex:true, ougon:true, maguro:false, speed_up:50, auto_up:0, min_up:0, click_up:0, txt:"メアリ"}));
	char_list.push(new Set_char({id:"#char_10", genre:0, sex:true, ougon:true, maguro:false, speed_up:10, auto_up:20, min_up:10, click_up:10, txt:"シェラ"}));
	char_list.push(new Set_char({id:"#char_09", genre:1, sex:true, ougon:true, maguro:false, speed_up:5, auto_up:10, min_up:0, click_up:35, txt:"アティ"}));
	char_list.push(new Set_char({id:"#char_08", genre:4, sex:true, ougon:true, maguro:false, speed_up:0, auto_up:25, min_up:25, click_up:0, txt:"エリシア"}));
	char_list.push(new Set_char({id:"#char_07", genre:1, sex:true, ougon:false, maguro:false, speed_up:0, auto_up:0, min_up:0, click_up:50, txt:"キーア"}));
	char_list.push(new Set_char({id:"#char_06", genre:6, sex:false, ougon:true, maguro:false, speed_up:5, auto_up:15, min_up:0, click_up:30, txt:"キリエ"}));
	char_list.push(new Set_char({id:"#char_05", genre:5, sex:false, ougon:false, maguro:false, speed_up:25, auto_up:0, min_up:25, click_up:0, txt:"テスラ"}));
	char_list.push(new Set_char({id:"#char_04", genre:1, sex:false, ougon:false, maguro:true, speed_up:25, auto_up:20, min_up:0, click_up:5, txt:"ギー"}));
	char_list.push(new Set_char({id:"#char_03", genre:0, sex:false, ougon:true, maguro:false, speed_up:0, auto_up:20, min_up:15, click_up:15, txt:"カル"}));
	char_list.push(new Set_char({id:"#char_02", genre:4, sex:false, ougon:false, maguro:false, speed_up:15, auto_up:25, min_up:0, click_up:10, txt:"Ａ"}));
	char_list.push(new Set_char({id:"#char_01", genre:3, sex:false, ougon:false, maguro:false, speed_up:30, auto_up:5, min_up:5, click_up:10, txt:"アスル"}));	

	push_arc();
	$('#chg_thema').toggle();
	$('#chg_onsen').toggle();
	$('#chg_back').toggle();
	$('#thema').click(function(){ $('#chg_onsen').hide();$('#chg_back').hide();$('#chg_thema').slideToggle();});
	$('#onsen').click(function(){ $('#chg_back').hide();$('#chg_thema').hide();$('#chg_onsen').slideToggle();});
	$('#back_').click(function(){ $('#chg_onsen').hide();$('#chg_thema').hide();$('#chg_back').slideToggle();});	

	comp_thema.push(new Set_thema({id:'chg00', type:'thema', cost:0, option1:'ani_cha.css'}));
	comp_thema[0].checked=1;
	comp_thema.push(new Set_thema({name:'黄色', id:'chg01', thumb: '#FFFF00', type:'thema', cost:10000, option1:'ani_cha3.css'}));
	comp_thema.push(new Set_thema({name:'オレンジ', id:'chg08', thumb:'#FFC76B', type:'thema', cost:10000, option1:'ani_cha2.css'}));
	comp_thema.push(new Set_thema({name:'蒼色', id:'chg04', thumb:'#A4E7F5', type:'thema', cost:10000, option1:'ani_cha4.css'}));

	$('#change_s').click(function(){
			$('#shop').slideToggle('slow');
	}).mouseover(function(){
			$('#view_help').html("ショップを見る");
	})
	.mouseout(function(){
		$('#view_help').html("&nbsp;");
	});		
	
	$('#change_a').click(function(){
			$('#archives').slideToggle('slow');	
	}).mouseover(function(){
			$('#view_help').html("アーカイブス記録を見る");
	})
	.mouseout(function(){
		$('#view_help').html("&nbsp;");
	});
	$('.exit').click(function(){
		$(this).parent().fadeOut();
	});
	
	$("#chg_thema input").click(function(event){
		var now_ck=$('#chg_thema input').index(this);
				if(count<comp_thema[now_ck].cost&&comp_thema[now_ck].checked!=1){
						event.stopPropagation();
						return false;
				}
				else{
					change_thema_f(now_ck);
				}
	});
	comp_onsen.push(new Set_thema({id: 'onsen00', type: 'onsen', cost:0, option1: 'onsen/onsen1.png'}));
	comp_onsen[0].checked=1;
	comp_onsen.push(new Set_thema({id : 'onsen01', name: '室内温泉', type: 'onsen', cost: 10000, thumb:'images/on_thumb01.png', option1: 'onsen/onsen2.jpg', option2:'#char_11:top:400px:left:830px:z-index:3/#char_16:left:376px:top:470px:z-index:2'}));
	comp_onsen.push(new Set_thema({id : 'onsen02', name: '野外温泉', type: 'onsen', cost: 10000, thumb:'images/on_thumb01.png', option1: 'onsen/onsen3.jpg', option2:'#char_07:top:304px:left:363px:z-index:0/#char_11:top:414px:left:436px:z-index:3/#char_09:top:247px:left:156px/#char_01:top:240px:left:429px:z-index:0'}));

	$("#chg_onsen input").click(function(event){
		var now_ck=$('#chg_onsen input').index(this);
		if(count<comp_onsen[now_ck].cost&&comp_onsen[now_ck].checked!=1){
						event.stopPropagation();
						return false;
				}
				else{
					for(j=0;j<char_list.length;j++){
						char_list[j].set_defaultxy();
					}
					if(count>comp_onsen[now_ck].cost&&comp_onsen[now_ck].checked!=1)
					{
						comp_onsen[now_ck].checked=1;
						thema_count++;
						count-=comp_onsen[now_ck].cost;
						$(comp_onsen[now_ck].id+'_lock').fadeOut();
						if(thema_count==5){
							find_arc('13').checked=-1;
							find_arc('13').ap_archive();
						}
					}
					$('#clickbut').css('background','url('+comp_onsen[now_ck].option1+')');
					var temp= comp_onsen[now_ck].option2.split('/');
					for(var j=0;j<temp.length;j++){
						var temp2=temp[j].split(':');
							for(var k=1;k<temp2.length;k+=2){
								$(temp2[0]).css(temp2[k],temp2[k+1]);
							}
						}
				}
	
	});
	
	comp_back.push(new Set_thema({id: 'back00', type: 'back', cost:0, option1: 'onsen/onsen1.png'}));
	$('#chg_back input:eq(0),#chg_back label:eq(0)').hide();
	comp_back.push(new Set_thema({id: 'back01', name: 'カダスｾｯﾄ', type: 'back', cost:30000, option1: 'onsen/onsen1.png'}));
	comp_back.push(new Set_thema({id: 'back02', name: '地球ｾｯﾄ', type: 'back', cost:30000, option1: 'onsen/onsen1.png'}));
	$("#chg_back input").click(function(event){	
		var now_ck=$('#chg_back input').index(this);
				if(count<comp_back[now_ck].cost&&comp_back[now_ck].checked!=1){
						return false;
				}
				else if(comp_back[now_ck].checked!=1){
					count-=comp_back[now_ck].cost;
					comp_back[now_ck].checked=1;
					$(comp_back[now_ck].id+'_lock').fadeOut();
				}
				if(now_ck==1){
					window.location.href = 'https://drive.google.com/uc?export=download&id=0B2pOZywE5TjAcXlOVzUyUnZhcVU';
				}
				else{
					window.location.href = 'https://drive.google.com/uc?export=download&id=0B2pOZywE5TjAY0JPdjRQN1pDakE';
				}
		event.stopPropagation();
	});
	
	$('#clickbut').bind('click',function(e){
		total_c+=1+click_cnt;
		count+=1+click_cnt;
		tot_clk++;
		$(btnCount).html(Math.floor(count));
		var xx=e.pageX+8-Math.floor(Math.random()*20);
		var yy=e.pageY-40;
		//set particle
		var tt=$('<div class="aaa" style="pointer-events: none;position:fixed;cursor:pointer;opacity:1;top:'+yy+'px;left:'+xx+'px;"><h3>+'+(1+click_cnt)+'</h3></div>');
		tt.appendTo(this)
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
		bb.appendTo(this)
		.animate({top: yy-100,left:xx-20,width:200,height:200,opacity:0}, 2000,"linear",function()
		{
					$(this).remove();
		});
		
		if(tot_clk>=1000&&find_arc('15').checked!=-1){				
			find_arc('15').ap_archive();
			find_arc('15').checked=-1;
		}
	});
	
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
			$('#view_help').html("クリック時の手を伸ばす回数が増えます");
		})
		.bind('touchend mouseout',function(){
			$('#view_help').html("&nbsp;");
		});
		
		
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
		$('#change_h').click(function(){
			$('#helps_int').fadeIn();
		});
		$('#helps_int').click(function(){$(this).hide()});
		
		
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
					find_arc('17').ap_archive();
					find_arc('17').checked=-1;
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
		});

		$('#button4').bind('click',function(){
			if(char_list_num.length>0&&count>=400*(char_count)*(char_count)){
				count-=400*(char_count)*(char_count);
				var result = Math.floor(Math.random() * char_list_num.length);
				char_list[char_list_num[result]].show_();
				char_list[char_list_num[result]].do_skill();
				char_list[char_list_num[result]].chk=-1;
				char_list[char_list_num[result]].chk_cha();
				char_count++;
				char_count_cost++;
				$('#now_cha_l').html(char_count);
				var ccc=Math.floor(count);
				$(btnCount).html(ccc);
				char_list_num.remove(result);
				chk_archive();
				if(char_list_num.length==0){
						$('#now_cha_l').html('MAX');
						$(this).attr('data-hover', '全員集合！');
				}
				else{
					$(this).attr('data-hover', 400*(char_count)*(char_count)+'回消費');
				}
			save_clk();
			}
		})
			.bind('touchstart mouseover',function(){
			$('#view_help').html("ランダムにキャラクターが増えます。ガチャ！");
		})
			.bind('touchend mouseout',function(){
			$('#view_help').html("&nbsp;");
			}
		);
		set_timer();
		$('#shop,#archives').hide().draggable({
        opacity:'0.5'
    }); 
		
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
	var i, temp='';
	for(i=0;i<char_list.length;i++){
		temp+=char_list[i].chk+',';
	}
	temp=temp.substr(0,temp.length-1);
	localStorage.setItem('char_list' , temp);
	temp='';
	for(i=0;i<char_list_num.length;i++){
		temp+=char_list_num[i]+',';
//		console.log(temp);
	}
	temp=temp.substr(0,temp.length-1);
	if(temp=='') temp='null';
	localStorage.setItem('char_list_num' , temp);

	temp='';
	for(i=0;i<arcv.length;i++){
		temp+=arcv[i]+',';
	}
	temp=temp.substr(0,temp.length-1);
	localStorage.setItem('arcv' , temp);
	
	temp='';
	for(i=0;i<arcv_list.length;i++){
		temp+=arcv_list[i].checked+',';
	}
	temp=temp.substr(0,temp.length-1);
	localStorage.setItem('arcv_list' , temp);

	temp='';
	for(i=0;i<comp_thema.length;i++){
		temp+=comp_thema[i].checked+',';
	}
	temp=temp.substr(0,temp.length-1);
	localStorage.setItem('comp_thema' , temp);
	// console.log('thema'+temp);
	temp='';
	for(i=0;i<comp_onsen.length;i++){
		temp+=comp_onsen[i].checked+',';
	}
	temp=temp.substr(0,temp.length-1);
	localStorage.setItem('comp_onsen' , temp);
	
	temp='';
	for(i=0;i<comp_back.length;i++){
		temp+=comp_back[i].checked+',';
	}
	temp=temp.substr(0,temp.length-1);
	localStorage.setItem('comp_back' , temp);
	// console.log(temp);
	set_toast('セーブ完了');
	}
	else{


	}	
	
}


function load_clk(){
if (('localStorage' in window) && window.localStorage != null && localStorage.getItem('count')!= null){
		clearInterval(timer);
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
		min_cnt=localStorage.getItem('min_cnt')*1;
		min=localStorage.getItem('min')*1;
		click_cnt=localStorage.getItem('click_cnt')*1;
		total_c=localStorage.getItem('total_c')*1;
		click_cnt_or=localStorage.getItem('click_cnt_or')*1;
		male=localStorage.getItem('male')*1;
		female=localStorage.getItem('female')*1;
		ougon=localStorage.getItem('ougon')*1;
		maguro=localStorage.getItem('maguro')*1;
		tot_clk=localStorage.getItem('tot_clk')*1; 
		arc_cl=0;

		
		var i;
		var p=localStorage.getItem('char_list').split(',');
		// console.log(p.length);
		$('.char_').hide();	
		for(i=0;i<p.length;i++) 
		{
			p[i]=p[i]*1;
			char_list[i].chk=p[i];
			if(p[i]==-1) char_list[i].show_();
			// console.log(p[i]);
		}
		
		$('#archive_').empty();
		p=localStorage.getItem('arcv_list').split(',');
		for(i=0;i<p.length;i++) 
		{
			p[i]=p[i]*1;
			arcv_list[i].checked=p[i];
		}
		for(var i=0;i<arcv.length;i++){
			if(find_arc('0'+(1+i)).checked==-1){
				find_arc('0'+(i+1)).ap_archive(1);
			}
		}

		
		if(localStorage.getItem('char_list_num')=='null')
		{
			// console.log('this');
			char_list_num.length=0;
		}
		else char_list_num=localStorage.getItem('char_list_num').split(',');

		for(i=0;i<char_list_num.length;i++) char_list_num[i]=char_list_num[i]*1;

		arcv=localStorage.getItem('arcv').split(',');
		for(i=0;i<arcv.length;i++) arcv[i]=arcv[i]*1;
		
		$('.lock_box').show();
	
		p=localStorage.getItem('comp_thema').split(',');
		for(i=0;i<p.length;i++){
			p[i]=p[i]*1;
			comp_thema[i].checked=p[i];
			if (p[i]*1==1) {
				$(comp_thema[i].id+'_label .lock_box').fadeOut();
			}
		}
		p=localStorage.getItem('comp_back').split(',');
		for(i=0;i<p.lenght;i++){
			p[i]=p[i]*1;
			
			comp_back[i].checked=p[i];
			if (p[i]*1==1) {
				$(comp_back[i].id+'_label .lock_box').fadeOut();
			}
		}
		p=localStorage.getItem('comp_onsen').split(',');
		var k=p.length;
		for(i=0;i<k;i++){
			p[i]=p[i]*1;
			comp_onsen[i].checked=p[i];
			if (p[i]*1==1) {
				$(comp_onsen[i].id+'_label .lock_box').fadeOut();
			}
		}	
		min=plus_second*min_cnt;	
		set_timer();
		timer = setInterval(tick, tictac);
		$('#now_c_l').html(tictac_l);
		$('#button3').attr('data-hover', (1+tictac_l)*(1+tictac_l)*300+'回消費');
		$('#button1').attr('data-hover', (plus_second_or+1)*(plus_second_or+1)*200+'回消費');
		$('#button5').attr('data-hover', (click_cnt_or+1)*(click_cnt_or+1)*20+'回消費');
		$('#now_cha_l').html(char_count);
		$('#now_a_l').html(click_cnt_or);
		$('#now_k_l').html(plus_second_or);
		
		if(male==-10) {ap_archive('09','ヒーローのメモリーを集めました',1)};
		if(female==-10) {ap_archive('10','ヒロインのメモリーを集めました',1);}
		if(maguro==-99) {ap_archive('12','マグロのメモリーを集めました',1);}
		if(ougon==-999)ap_archive('11','黄金瞳のメモリーを集めました',1);
		
		if(female+male==-20)ap_archive('08','すべてのメモリーを集めました',1);
		if(tot_clk>=1000) ap_archive('15','1万回以上クリックしました',1);
		if(total_c>10000){
			ap_archive('14','１万回以上手を伸ばしました',1);
			find_arc('14').checked=-1;
		}
		if(total_c>100000){
			find_arc('16').ap_archive(1);
			find_arc('16').checked=-1;
		}
		if(char_list_num.length==0){
			$('#now_cha_l').html('MAX');
			$('#button4').attr('data-hover', '全員集合！');
		}
		else{$('#button4').attr('data-hover', 400*(char_count)*(char_count)+'回消費')};

		if(tictac_l==15){
			ap_archive('17','最後まで諦めないでした',1);
			aki_ck=true;
			$('#now_c_l').html('MAX');
			$('#button3').attr('data-hover', 'MAX');
		}
			$('#arc_c').html(arc_cl);
			set_toast('ロード完了');		
	}
}
