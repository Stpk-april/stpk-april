/*

 * Copyright 2015 STPK-anthology kikaku stpkkik77@gmail.com
 * Licensed under the MIT License
 * please leave this
 * http://opensource.org/licenses/MIT

*/

var viewing;
function comic (option)
{
	this.zoomed=false;
	this.bulit=false;
	this.pages=option.pages; 
	this.nowpage=0; 
	this.cominum=option.cominum
	this.self_=$('<div class="comic_container"></div>');
	this.images=new Array();
	this.name=option.name;
}
comic.prototype.build_ =function()
{	
	this.built=true;
	var self=this;
	$('.prog').html('0/'+self.pages).show();
	var t;
	var loaded=0,loadedfst=0;
	this.self_.id=this.cominum;
	this.self_.empty();
	this.self_.append('<div class="navi"><a href="#" class="ext"><img src="images/close.png"></a><a href="#" class="zoom"><img src="images/zoomin.png"></a><a href="#" class="zoomout"><img src="images/zoomout.png"></a></div>');
	self.self_.find('.ext').on('click',function(e){
		e.preventDefault();
		$('.prog').hide();
		self.self_.find('.zoomout').click();
		self.self_.fadeOut();
		return;
	});
	for(var i=0;i<this.pages;i++)
	{
		var preloader = new Image();
		preloader.id='page'+(i+1);
		//
		preloader.src='http://googledrive.com/host/0B2pOZywE5TjAeFJLQkdaOHIxVXc/'+this.cominum+' ('+(i+1)+').png';
		this.images.push(preloader);
		if(i%2==0)
		{
			t=$('<div class="comic_page"/>').prepend(this.images[i]);
			$(this.images[i]).addClass('right_');
		}
		else{
			$(this.images[i]).addClass('left_');
			t.prepend(this.images[i]);
			t.append('<br/><span class="view_name views">'+self.name+'</span><span class="view_pg views">'+((i+1)/2)+'/'+Math.ceil(this.pages/2)+'</span>');
			this.self_.append(t);
		}
		if(i==this.pages-1&&this.pages%2==1){
			t.append('<br/><span class="view_pg">'+Math.round((i+1)/2)+'/'+Math.round(this.pages/2)+'</span>');
			this.self_.append(t);		
		}
		t.hide();
		$(this.images[i]).addClass('comic_side');
	}
	var bui=false;
	this.self_.appendTo('body').hide().fadeIn();
	$('.comic_side')
	.load(function(){
		if(this.id=='page1'||this.id=='page2') loadedfst++;
		if(bui==false&&++loaded>=self.pages/2&&loadedfst>=2)
		{	
			bui=true;
			self.self_.find('.comic_page:eq(0),.zoom,.zoomout').fadeIn();
			self.self_.find('.comic_side').show();
			$('.prog').empty();			
			$('.prog').hide();
			self.bindgin();
			self.self_.css('background-image','none');
		}
		$('.prog').html(loaded+'/'+self.pages);
	});
	$('img').error(function(){$(this).hide()});
}
comic.prototype.bindgin = function()
{

	var self=this;
	this.self_.find('.comic_page').draggable().draggable('disable');
	self.self_.find('.left_').on('click',function(){
			if(self.nowpage+1<self.pages/2&&self.zoomed==false){
				self.self_.find('.comic_page:eq('+self.nowpage+')').hide().removeClass('active');
				self.self_.find('.comic_page:eq('+(self.nowpage+1)+')').show().addClass('active');
				self.nowpage++;
				}
	});	
	self.self_.find('.right_').on('click',function(){
				if(self.nowpage>0&&self.zoomed==false){
				self.self_.find('.comic_page:eq('+self.nowpage+')').hide().removeClass('active');
				self.self_.find('.comic_page:eq('+(self.nowpage-1)+')').show().addClass('active');
				self.nowpage--;
				}
	});
	self.self_.on('click',function(e){
	   if($(e.target).hasClass('comic_page')){
		self.self_.find('.ext').click();
	   }
	});
	self.self_.find('.zoom').on('click',function(e){
		e.preventDefault();
		self.self_.find('.views').hide();
		self.self_.find('.comic_side').css('cursor','move');
		self.self_.find('.comic_page').draggable('enable').css({'width':'auto','height':'auto','left':'-65%'});
		self.zoomed=true;
	});
	self.self_.find('.zoomout').on('click',function(e){
		e.preventDefault();
		self.zoomed=false;
		self.self_.find('.views').show();
		self.self_.find('.comic_side').css('cursor','pointer');
		self.self_.find('.comic_page').draggable('disable').css({'width':'auto','height':'95%','top':'0px','left':'0px'});
	});
}

comic.prototype.show_ = function()
{
	if(!this.built) this.build_();
	else {
		this.nowpage=0;
		$('.prog').html('0/'+self.pages).hide();
		this.self_.find('.comic_page').hide();
		this.self_.find('.comic_page:eq(0)').show();
		this.self_.fadeIn();
	}
	viewing=this.self_;
}

$(function(){
	var comit=new Object();
	$('body').append('<span class="prog" style="display:none"></span>');
	$('.comicv').on('click',function(e){
		e.preventDefault();
		var target=$(this).attr('href').split('#')[1];
		var pge=$(this).attr('rel')*1;
		if(comit[target]==null)
		{
			comit[target]= new comic({pages:pge,cominum:target,name:$(this).attr('data-title')});
		}
		comit[target].show_();
	});
	$(document).bind('keydown', function(e){
		if(e.keyCode==37&&viewing!=null)
		   {
				viewing.find('#page2').click();
			}
		else if(e.keyCode==39&&viewing!=null){
				viewing.find('#page3').click();		
			}
      });
});