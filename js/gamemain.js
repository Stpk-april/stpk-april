var count =1000000000000;
var char_list=new Array();
var arcv_list=new Array();
var char_list_num=new Array(0,1,2,3,4);
var char_count=0;


var timer;
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
var arcv_re=new Array(2,1,2,2,2,2,2);
var male=0, female=0, ougon=0, maguro=0;

var comp_thema=new Array();
var comp_onsen=new Array();
var comp_back=new Array();

var comp_back=new Array(0,0,0,0,0,0,0,0);
var thema_now=new Array('','','');
var thema=0;

//totalclick
var tot_clk=0;


Array.prototype.remove = function(index) {
	this.splice(index,1);
	return this;
};
//charactor option:id,skill,txt

function Set_char (id_, skill_, txt_){
	this.id=id_;
	this.chk=1;
	this.skill=skill_;
	this.txt=txt_;
	this.default_x=$(this.id).css('left');
	this.default_y=$(this.id).css('top');
	this.x=this.default_x;
	this.y=this.default_y;
	$(this.id).hide();
	$(this.id).mouseover(function(event){
		help_m(event, txt_);
	})
	.mouseout(function() {
		$('#help').remove();
	});
}
Set_char.prototype.show_=function(){
	$(this.id).fadeIn();	
	console.log(this.id);
}
Set_char.prototype.set_xy= function(xx,yy){
	this.x=xx;
	this.y=yy;
	$(this.id).css('top',this.y);
	$(this.id).css('left',this.x);
}
Set_char.prototype.set_defaultxy= function(){
	$(this.id).css('top',this.default_y);
	$(this.id).css('left',this.default_x);
}
Set_char.prototype.do_skill= function(){
	var temp=this.skill.split(':');
	switch(temp[0]){
		case 'speed_up' :
						 tictac-=(temp[1]*1);
						 set_timer();
						 clearInterval(timer);
						 timer=setInterval(tick,tictac);
						 break;
		case 'auto_up'	:
						 plus_second+=(temp[1]*1);
						 min=plus_second*min_cnt;
						 set_timer();
						 break;
		case 'click_up'	:
						 click_cnt+=(temp[1]*1);
						 break;
		case 'min_up'	:
						 min_cnt+=(temp[1]*1);
						 min=plus_second*min_cnt;
						 set_timer();
						 break;
	}
}
Set_char.prototype.get_char= function(){
	return this.id+','+this.chk;
}

function Set_arc (icon_, txt_){
		this.icon=icon_;
		this.txt=txt_;
		this.checked=0;
};
function chk_cha(cha){
	var t=$(cha).attr('genre').split(' ');	
	arcv[t[0]*1]++;
	if( t[1]=="fe") female++;
	else male++;
	if(t[2]*1==1) ougon++;
}
Set_arc.prototype.ap_archive=function (eve){
	eve=(eve!=null)? eve:0;
	var text=this.txt;
	$('<li><img src="images/arc_'+this.icon+'.png" style="width:50px; height:50px;"></li>').appendTo('#archive_')
	.hide()
	.fadeIn()
	.mouseover(function(){
		$('#view_arc').html(text);
	})
	.mouseout(function(){
			$('#view_arc').html("&nbsp;");
	});
	if(eve==0) set_toast(this.txt,'images/arc_'+this.icon+'.png');
	this.checked_=-1;
	arc_cl++;
	$('#arc_c').html(arc_cl);				
};

function push_arc(){
		arcv_list.push(new Set_arc('01','蒼天のメモリーを集めました'));
		arcv_list.push(new Set_arc('02','赫炎のメモリーを集めました'));
		arcv_list.push(new Set_arc('03','漆黒のメモリーを集めました'));
		arcv_list.push(new Set_arc('04','白光のメモリーを集めました'));
		arcv_list.push(new Set_arc('05','紫影のメモリーを集めました'));
		arcv_list.push(new Set_arc('06','黄雷のメモリーを集めました'));
		arcv_list.push(new Set_arc('07','灰燼のメモリーを集めました'));
		arcv_list.push(new Set_arc('09','ヒーローのメモリーを集めました'));
		arcv_list.push(new Set_arc('10','ヒロインのメモリーを集めました'));
		arcv_list.push(new Set_arc('11','黄金のメモリーを集めました'));
		arcv_list.push(new Set_arc('12','マグロのメモリーを集めました'));
		arcv_list.push(new Set_arc('08','すべてのメモリーを集めました'));
		arcv_list.push(new Set_arc('14','１万回以上手を伸ばしました'));
		arcv_list.push(new Set_arc('17','最後まで諦めないでした'));
}

function find_arc(id_){
	for(var i in arcv_list){
		if(arcv_list[i].icon==id_) return arcv_list[i];
	}
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

function chk_archive(){
	for(var i=0;i<arcv.length;i++){
		if(arcv[i] == arcv_re[i]&&find_arc('0'+(1+i)).checked!=-1){
			find_arc('0'+(i+1)).ap_archive();
			find_arc('0'+(i+1)).checked=-1;
		}
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


//set_thema
function Set_thema(id_, type_, cost_,option_,option2_){
	this.id=id_;
	this.checked=0;
	$(id_+'_label').append('<div id="'+id_+'_lock" class="lock_box">'+cost_+'</div>').show();
	console.log('<div id="'+id_+'_lock" class="lock_box">'+cost_+'</div>');
	this.type=type_;
	this.cost=cost_;
	this.option=option_;
	this.option2=(option2_!=null)? option2_:'';
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
$('#te_second').html(min_sc.toFixed(3)+'~'+te_sc.toFixed(3));
}

function tick(){
total_c+=Math.random()*(plus_second-min)+min;
count=count+Math.random()*(plus_second-min)+min;
if(find_arc('14').checked!=-1&&total_c>10000){	
	find_arc('14').ap_archive();
	find_arc('14').checked=-1;
}
var ccc=Math.floor(count);
$(btnCount).html(ccc);
}

function change_thema_f(no_thema){
	if(comp_thema[no_thema].checked!=1){
		comp_thema[no_thema].checked=1;
		count-=comp_thema[no_thema].cost;
		$(comp_thema[no_thema].id+'_label .lock_box').fadeOut();
		$('#now_thema').attr('href',comp_thema[no_thema].option);
	}
	else $('#now_thema').attr('href',comp_thema[no_thema].option);
}

window.onload = function(){
	timer = setInterval(tick, tictac);
	btnCount = document.getElementById("btnCount");
}
$(function(){
	char_list.push(new Set_char('#kia', 'speed_up:200','キーア：自動的に手を伸ばす速度が増える'));
	char_list.push(new Set_char('#neon', 'auto_up:50','ネオン：自動的に手を伸ばす回数が増える'));
	char_list.push(new Set_char('#tesla', 'click_up:20','テスラ：クリック時の手を伸ばす回数が増える'));
	char_list.push(new Set_char('#theA', 'min_up:0.5','A：自動的に手を伸ばす最低回数が増えます'));
	char_list.push(new Set_char('#lily', 'click_up:20','リリィ：クリック時の手を伸ばす回数が増える'));
	push_arc();
	$('#chg_thema').toggle();
	$('#chg_onsen').toggle();
	$('#chg_back').toggle();
	$('#thema').click(function(){ $('#chg_thema').slideToggle();});
	$('#onsen').click(function(){ $('#chg_onsen').slideToggle();});
	$('#back_').click(function(){ $('#chg_back').slideToggle();});	

	comp_thema.push(new Set_thema('#chg00', 'thema', 0, 'ani_cha.css'));
	comp_thema[0].checked=1;
	comp_thema.push(new Set_thema('#chg01', 'thema', 10000, 'ani_cha3.css'));
	comp_thema.push(new Set_thema('#chg08', 'thema', 10000, 'ani_cha2.css'));

	$('#shop').hide();
	$('#change').click(function(){
			 $('#shop').slideToggle('slow');
			 $('#archives').slideToggle('slow');
			 if( $(this).html()=="ショップ") $(this).html("アーカイブ");
			 else $(this).html("ショップ");
	});
	
	$("#chg_thema input").click(function(event){
		var now_ck= '#'+$('#chg_thema input[type=radio]:checked').attr('id');		
		for(var i=0;i<comp_thema.length;i++){
			if(now_ck==comp_thema[i].id){
				if(count<comp_thema[i].cost&&comp_thema[i].checked!=1){
						event.stopPropagation();
						return false;
				}
				else{
					change_thema_f(i);
				}
				break;
			}
		}
	});
	comp_onsen.push(new Set_thema('#onsen00', 'onsen', 0, 'onsen_s.jpg'));
	comp_onsen[0].checked=1;
	comp_onsen.push(new Set_thema('#onsen01', 'onsen', 10000, 'onsen_s2.png'));
	$("#chg_onsen input").click(function(event){
		var now_ck= '#'+$('#chg_onsen input[type=radio]:checked').attr('id');
		for(var i=0;i<comp_onsen.length;i++){
			if(now_ck==comp_onsen[i].id){
				if(count<comp_onsen[i].cost&&comp_onsen[i].checked!=1){
						event.stopPropagation();
						return false;
				}
				else{
				
				}
				break;
			}
		}
	});
	$("#chg_back input").click(function(event){
		var now_ck= '#'+$('#chg_back input[type=radio]:checked').attr('id');
		for(var i=0;i<comp_back.length;i++){
			if(now_ck==comp_oback[i].id){
				if(count<comp_back[i].cost&&comp_back[i].checked!=1){
						event.stopPropagation();
						return false;
				}
				else{
				
				}
				break;
			}
		}	
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
		
		if(tot_clk==10000){				
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
			if(char_list_num.length>0&&count>=100*(char_count)*(char_count)){
				count-=100*(char_count)*(char_count);
				var result = Math.floor(Math.random() * char_list_num.length);
				char_list[char_list_num[result]].show_();
				char_list[char_list_num[result]].do_skill();
				char_list[char_list_num[result]].chk=-1;
				chk_cha(char_list[char_list_num[result]].id);
				char_count++;
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
					$(this).attr('data-hover', 100*(char_count)*(char_count)+'回消費');
				}
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
	for(i=0;i<char_list_num;i++){
		temp+=char_list_num[i]+',';
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
		console.log(comp_thema[i].checked);
	}
	temp=temp.substr(0,temp.length-1);
	localStorage.setItem('comp_thema' , temp);
	console.log('thema'+temp);
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
	set_toast('セーブ完了');
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
		console.log(p.length);
		for(i=0;i<p.length;i++) 
		{
			p[i]=p[i]*1;
			char_list[i].chk=p[i];
			if(p[i]==-1) char_list[i].show_();
			else $(char_list[i].id).hide();
			console.log(p[i]);
		}
		
		
		p=localStorage.getItem('arcv_list').split(',');
		for(i=0;i<p.length;i++) 
		{
			p[i]=p[i]*1;
			arcv_list[i].checked=p[i];
		}
		if(localStorage.getItem('char_list_num')=='null')
		{
			console.log('this');
			char_list_num.length=0;
		}
		else char_list_num=localStorage.getItem('char_list_num').split(',');

		for(i=0;i<char_list_num.length;i++) char_list_num[i]=char_list_num[i]*1;

		arc_cl=0;
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
		for(i=0;i<p.lenght;i++){
			p[i]=p[i]*1;
			comp_onsen[i].checked=p[i];
			if (p[i]*1==1) {
				$(comp_onsen[i].id+'_label .lock_box').fadeOut();
			}
		}
	


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
		
		if(char_list_num.length==0){
			$('#now_cha_l').html('MAX');
			$('#button4').attr('data-hover', '全員集合！');
			}
		if(tictac_l==15){
			ap_archive('17','最後まで諦めないでした');
			aki_ck=true;
			$('#now_c_l').html('MAX');
			$('#button3').attr('data-hover', 'MAX');
		}
	}
}