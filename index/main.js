/**
 * 
 * @authors Your Name (you@example.org)
 * @date    2017-01-04 20:28:14
 * @version $Id$
 */
$(function(){
      $(window).scrollTop(0)
     // 页面数据加载
     /*商品分类列表加载*/
     $(".shopClassShow").load("shopclass.html",function(){
        /*列表切换*/
        $(".shopClassShow").on("mouseenter",".item",function(e){
            var id=$(this).attr("id");
            $(this).addClass("itemActive");
            $("#"+id+"List").toggle();
            var top=$(this).offset().top;
            $("#"+id+"hide").css("top",top-151);
    }).on("mouseleave",".item",function(e){
            var id=$(this).attr("id");
            $(this).removeClass("itemActive");
            $("#"+id+"List").toggle()
    })
     })
    /* 商品信息部分加载*/
    $.ajax({
      type:"GET",
      url:"bannerItem.json",
      dataType:"json",
      success:function(responseText,status,xhr){
       $.each(responseText,function(index1,value1){ 
          var html=""   
          $.each(value1,function(index2,value2){     
            if(index2=="bannerListTop"){
            var htmlTop=""
            $.each(value2,function(index3,value3){
             htmlTop+= '<div class="bannerItem"><div class="bannerImg"><a href="#"><img src="images/banner/'+value3[0]+'"></a></div><div class="bannerText"><a href="#" title="'+value3[1]+'">'+value3[1]+'</a><p>'+value3[2]+'</p></div></div>'
            })
             html+='<div class="bannerListTop">'+htmlTop+'</div>'
            }else if(index2=="bannerListBottom"){
              var htmlBottom="";
              $.each(value2,function(index4,value4){
                htmlBottom+='<div class="bannerBottomItem"><div class="bannerBottomImg"><a href=""><img src="images/banner/'+value4[0]+'"></a></div><div class="bannerBottonText"><a href="#" title="'+value4[1]+'">'+value4[1]+'</a><p>'+value4[2]+'</p></div></div>'
              })
              html+='<div class="bannerListBottom">'+htmlBottom+'</div>'
            }
            
          })
          $("#"+index1+" .bannerListRight").html(html)
       })
      }
    })
/*精品推荐部分加载*/
$.getJSON("waterFall.json",function(dataInt){
                $.each(dataInt,function(index,value){
                $("<div class='waterFallBox'><div class='BoxPic'><img src='images/waterFall/"+value.src+"'><a href='#'>"+value.text+"</a><p>"+value.paid+"</p></div></div>").appendTo($("#waterFall"))
            })
   })
/*展示列表图片动画*/
$(".bannerListRight").on("mouseenter",".bannerImg",function(){
  $(this).find("img").stop().animate({top:"-197px",opacity:0.5},300,function(){
    $(this).css({"top":"200px","opacity":0,"filter":"alpha(opacity=0)"}).stop().animate({top:"10px",opacity:1},300)
   })
})
     /* 导航条移动*/
     $(".nav .blank li").bind("mouseover",function(){
          var target=$(this).get(0).offsetLeft;
          $(".nav_bg").stop().animate({
            left:target
          },function(){
            $(".white").stop().animate({
              left:-target
            },100)
          })
        })

      $(".nav").bind("mouseout",function(){    
          $(".nav_bg").stop().animate({
            left:0
          },function(){
            $(".white").stop().animate({
              left:0
            },100)
        })
      })
    /*展示时间*/
     showTime();
    /*距离春节时间*/
     leftT();
    /*搜索框*/
    $("#searchText").bind("keyup",function(e){ /*在搜索框键入字符时*/
        var searchText=$("#searchText").val();
        $.get("http://api.bing.com/qsonhs.aspx?q="+searchText,function(d){
            var d=d.AS.Results[0].Suggests;    
            var html=""
            for(i=0;i<d.length;i++){
                html+="<li>"+d[i].Txt+"</li>"
            }
            $("#searchList").html(html);
            $("#searchList").show();
        })
         if(e.keyCode==13){                         /*敲击回车键时*/
            var searchText=$("#searchText").val();
        location.href="https://search.jd.com/Search?keyword="+searchText+"&enc=utf-8";
        }
    })
    $(document).bind("click",function(){           /*点击页面时*/
        $("#searchList").hide();
    })
    $("#searchBtn").click(function(){              /*点击搜索按钮时*/
        var searchText=$("#searchText").val();
        location.href="https://search.jd.com/Search?keyword="+searchText+"&enc=utf-8";
    })
   $(document).delegate("#searchList li","click",function(){    /*点击列表时*/
        var searchText=$(this).text();
        location.href="https://search.jd.com/Search?keyword="+searchText+"&enc=utf-8";
    })
   var waterFall_counter=0;/*计数瀑布流加载次数*/
   /*左侧页面内定位导航*/
   $(window).bind("scroll",function(){
    var menus=$("#menu");
    var contents=$(".bannerContent");
    var top=$(document).scrollTop();
    var currentID="";
    contents.each(function(){
        var con=$(this);
        if(top>con.offset().top-100){
            currentID="#"+con.attr("id")
        }else{
            return false
        }
    })
    var current=menus.find(".current");
    if(currentID && current.attr("href")!=currentID){
        current.removeClass("current");
        
    }
    for(var i=0;i<$("#menu a").length;i++){

      if($("#menu a").eq(i).attr("href")==currentID){
        $("#menu a").eq(i).addClass("current")
      }
    }
    if(top>$("#item1").offset().top-100){
        menus.fadeIn(1000);
        $("#flagShop").fadeOut(1000);
        $("#toolBar").slideDown(500);
    }else{
        menus.fadeOut(1000);
        $("#flagShop").fadeIn(1000);
        $("#toolBar").slideUp(500);
    }
    if(top>0){
        $("#leftTime").fadeOut()
    }else{
        $("#leftTime").fadeIn()
    }
    /*延迟加载图片*/
    if(waterFall_counter<3){           /*加载3次*/
        if(scrollCheck()){
          $.getJSON("waterFall.json",function(dataInt){
                $.each(dataInt,function(index,value){
                $("<div class='waterFallBox'><div class='BoxPic'><img src='images/waterFall/"+value.src+"'><a href='#'>"+value.text+"</a><p>"+value.paid+"</p></div></div>").appendTo($("#waterFall"))
            })
            waterFall_counter+=1;
          })
        }
    }
   })
  /*鼠标划过watweFallBox时，BoxPic边框变色*/
  $(document).delegate(".waterFallBox","mouseover",function(){
    $(this).find(".BoxPic").css("border","1px solid #1d7ad9")
  });
 $(document).delegate(".waterFallBox","mouseout",function(){
    $(this).find(".BoxPic").css("border","1px solid #999")
  });
/*品牌旗舰店向上滚动*/
var timer1,timer2;
var flagBox=document.getElementById("flagShopBox")
flagBox.innerHTML+=flagBox.innerHTML;
scrollUp();
function startScroll(){
     flagBox.scrollTop+=1;
     if(flagBox.scrollTop>=flagBox.scrollHeight/2){
       
        flagBox.scrollTop=0
     }
     if(flagBox.scrollTop%43==0){
        clearInterval(timer1)
        timer2=setTimeout(scrollUp,1000)
     }
}
function scrollUp(){
  timer1=setInterval(startScroll,40)
}
$("#flagShopBox").on("mouseover",function(){
    clearInterval(timer1);
    clearTimeout(timer2)
})
$("#flagShopBox").on("mouseout",function(){
    scrollUp()
})
/*右边工具栏*/
$("#toolBar li").bind("mouseover",function(){
     var flag=true;
     var $this=$(this)
     $(this).css("background","#1d7ad9");
     $(this).find(".toolBarText").css("background","#1d7ad9");
     /*alert(parseInt($(this).find(".toolBarText").css("left")))*/
     $(this).siblings().find(".toolBarText").each(function(){if($(this).css("right")!="-40px"){
        $(this).stop().animate({right:"-40px"},5,function(){
            $this.find(".toolBarText").stop().animate({right:"40px"},200)});
        flag=false;
        return false;
    }}) 
     if(flag){$(this).find(".toolBarText").stop().animate({right:"40px"},200);}
})

$("#toolBar li").bind("mouseout",function(){
    $(this).css("background","#aaa");
    $(this).find(".toolBarText").stop().css({"background":"#aaa"}).animate({right:"-40px"},300);
})
/*右侧工具栏弹出菜单*/
  var toolBarId="Bar";
    $("#toolBar li").bind("click",function(){
      if(getCookie("user")){
          if(toolBarId!=$(this).attr("id")){
          if(toolBarId=="Bar"){
              toolBarId=$(this).attr("id"); 
              $(this).find(".toolBarList").css({top:"-="+parseInt(toolBarId.slice(-1))*42+"px"}).show();
              $(this).find(".toolBarImg").css("background","#1d7ad9")
              $(this).find(".toolBarText").hide()
              $("#toolBar").animate({right:"144px"},500);
              }
          else{
              $("#"+toolBarId).find(".toolBarList").hide().css({top:"+="+parseInt(toolBarId.slice(-1))*42+"px"});
              $("#"+toolBarId).find(".toolBarImg").css("background","none")  
              $("#"+toolBarId).find(".toolBarText").show()
              toolBarId=$(this).attr("id");
              $(this).find(".toolBarList").css({top:"-="+parseInt(toolBarId.slice(-1))*42+"px",left:"184px"}).show().animate({left:"44px"});
              $(this).find(".toolBarImg").css("background","#1d7ad9")
              $(this).find(".toolBarText").hide()
              $("#toolBar").animate({right:"144px"},500);
              toolBarId=$(this).attr("id");}
      }else{
        var $this=$(this);
           $("#"+toolBarId).find(".toolBarImg").css("background","none")   
           $this.css("background","#aaa").find(".toolBarText").css("right","-40px").show();  
           $("#toolBar").animate({right:"0px"},500,function(){$this.find(".toolBarList").hide(function(){
           $(this).css({top:"+="+parseInt(toolBarId.slice(-1))*42+"px"}); 
           toolBarId="Bar";
        })});   
      }
      return false
      }else{
       $("#_login").trigger("click")
      }
    })
$("#toolBar li").on("click",function(){
  if(getCookie("user")){
    $.ajax({
      url:"userInfo.php",
      dataType:"json",
      type:"GET",
      success:function(reponseText,status,xhr){
        $.each(reponseText,function(index,value){
          if(index==getCookie("user")){
            if(!$(".userInfo").get(0)){
             $("#toolBar0 .toolBarList").append('<h2 ><img src="images/icon/account-01.png">地购会员</h2><div class="userInfo"><div class="userInfoTop"><img src="images/headPicture/'+value[0]+'"><a href="#" class="userName">'+getCookie("user")+'</a></div><p><span>'+value[1]+'</span></br><span >土豆</span></p><p><span>'+value[2]+'</span></br><span>优惠券</span></p><p style="border:none"><span>'+value[3]+'</span></br><span>积分</span ></p></div>')
            }
          }
        })
      }
    })
  }
})



$("#toolBar .toolBarList").bind("click",function(){
    return false
})
$("#toolBar .toolBarList").bind("mouseover",function(){
    return false
})
$(document).bind("click",function(){
    $("#toolBar").animate({right:"0px"},500).find(".toolBarImg").each(function(){$(this).css("background","none")})

})

/*登录框显示、锁频*/
$("#_login").bind("click",function(){
     lock($("#screen"))   
     setCenter($("#login"))
     $("#login").show()
})
/*鼠标在登录框标题处可拖拽*/
drag($("#login"),$("#login h2").get(0))
/*登录框隐藏、解锁屏幕*/
$("#login h2 .close").bind("click",function(){
    $("#login").hide();
    unlock($("#screen"));
    $("#login .errowInfo").html(""); 
    $(".login").get(0).reset();

})
$(window).bind("resize",function(){
    setCenter($("#login"))
})
/*文本框成为焦点时提示信息消失*/
$("#user").bind("focus",function(){
  $("#login .errowInfo").html(""); 
})
$("#pass").bind("focus",function(){
  $("#login .errowInfo").html(""); 
})
/*登录及验证用户名及密码*/
$("#sub").bind("click",function(){
  var _this=this;
  var user=trim($("#user").val());
  var pass=trim($("#pass").val());
  setCenter($("#subing"));
  $("#subing p").html("正在登录，请稍后···")
  $("#subing").show();
  $(_this).attr("disabled",true).css("background","#999")
  if(/^[\w_]{4,20}$/.test(user) && pass.length>=6 && pass.length<=20){
    $.ajax({
      url:"login.php",
      type:"POST",
      async:false,
      dataType:"json",
      success:function(data){
        var flag=true;
        //alert(data)
        //data=eval(text)
        for(var i=0;i<data.length;i++){
          if(trim(data[i].user)==user && trim(data[i].password)==pass){
            flag=false;
            $("#subing").hide();
            $("#success h3").html("登录成功");
            setCenter( $("#success"));
            $("#success").show();
            setTimeout(function(){
                $("#success").hide();
                $(_this).attr("disabled",false).css("background","#1D7AD9");
                $("#login").hide();
                unlock($("#screen"));
                $("#_reg").hide();
                $("#_login").hide();
                $(".loginSuccess").html(user).show();
                $(".exit").show();
                if($("#autologin").is(":checked")){
                  setCookie("user",user,setCookieDate(7));
                }else{
                  setCookie("user",user)
                }              
                $(".login").get(0).reset();
                return
            },1500)
            }
          }
          if(flag){
            $("#login .errowInfo").html("用户名或密码不存在，请再次输入");
            $("#subing").hide();
            $(_this).attr("disabled",false).css("background","#1D7AD9");
          }
        }
    })
     
  }else{
    $("#login .errowInfo").html("用户名或密码输入不合法，请再次输入");
    $("#subing").hide();
    $(_this).attr("disabled",false).css("background","#1D7AD9");

  }
})
/*退出登录*/
$(".exit").bind("click",function(){
    $("#_reg").show();
    $("#_login").show();
    $(".loginSuccess").html("").hide();
    $(".exit").hide();
    setCookie("user","",new Date(0));
    $("#toolBar0 .toolBarList").html("")
})
// 自动登录
if(getCookie("user")){
  $("#_reg").hide();
  $("#_login").hide();
  $(".loginSuccess").html(getCookie("user")).show();
  $(".exit").show();
}




/*轮播图*/
/*图片计数器*/
  banner_index=0;
/*初始化*/
  $(".pic li").css("opacity",0).eq(0).css("opacity",1);
  $(".control li").css("color","#999").eq(0).css("color","#333");
  $(".bannerFocus strong").html($(".pic img").eq(0).attr("alt"))
  /*静态*/
  $(".control li").hover(function(){
    clearInterval(banner_timer)
    var index=$.inArray(this, $(".control li"));
    if($(".pic li").eq(index).css("opacity")!=1){
       banner(index)
    }
       
  },function(){
      banner_index=$.inArray(this, $(".control li"));
      banner_timer=setInterval(banner_fn,3000)
  })
   $(".pic li").hover(function(){
    clearInterval(banner_timer);
    var index=$.inArray(this, $(".pic li"));
    if($(".pic li").eq(index).css("opacity")!=1){
       banner(index)
    }
       
  },function(){
      banner_index=$.inArray(this, $(".pic li"));
      banner_timer=setInterval(banner_fn,3000)
  })
/*自动*/
var banner_timer=setInterval(banner_fn,3000)
 function banner(index){ 
     
     $(".pic li").stop(true)
     $(".bannerFocus strong").html($(".pic img").eq(index).attr("alt"))
     for(var i=0;i<$(".pic li").length;i++){
      if($(".pic li").eq(i).css("opacity")==1){
        prevElement=$(".pic li").eq(i)
      }else{
        $(".pic li").eq(i).css("opacity",0)
      }
     }
     $(".control li").css("color","#999");
     $(".control li").eq(index).css("color","#333");
     prevElement.css({"zIndex":1,"opacity":0.7}).stop().animate({"opacity":0},600)
     $(".pic li").eq(index).css({"zIndex":2,"opacity":0.4}).stop().animate({"opacity":1},600)
 }


 function banner_fn(){
  banner_index++
  if(banner_index>=$(".pic li").length){banner_index=0}
     banner(banner_index)
   
     
 }
})





/*全局函数*/
/*展示时间*/
function change(i){
    if(i<10){
        i="0"+i
    }
    return i
}
function showTime(){
    var myDate=new Date(),
        Y=myDate.getFullYear(),
        M=myDate.getMonth()+1,
        D=myDate.getDate(),
        W=myDate.getDay(),
        H=myDate.getHours(),
        Mi=myDate.getMinutes(),
        S=myDate.getSeconds();
        Mi=change(Mi);
        S=change(S);
        var weekend=new Array(7);
        weekend[0]="星期天"
        weekend[1]="星期一"
        weekend[2]="星期二"
        weekend[3]="星期三"
        weekend[4]="星期四"
        weekend[5]="星期五"
        weekend[6]="星期六"
        document.getElementById("timer").innerHTML=Y+"年"+M+"月"+D+"日"+" "+weekend[W]+" "+H+":"+Mi+":"+S;
        var goTime=setTimeout(showTime,500);

}
 /*距离春节时间*/
 function leftT(){

            var nowdate=new Date();
            var enddate=new Date("2017/4/3,00:00:00");
            var leftDate=parseInt((enddate.getTime()-nowdate.getTime())/1000);
            var D=change(parseInt(leftDate/(60*60*24))),
                H=change(parseInt(leftDate/(60*60))%24),
                M=change(parseInt(leftDate/60)%60),
                S=change(leftDate%60);
             var leftTime=document.getElementById("leftTime")
            if(leftDate<=0){
                leftTime.innerHTML="清 明 快 乐!";
                leftTime.style.color="#f3a";
            }else{ leftTime.innerHTML=D+"天"+H+"时"+M+"分"+S+"秒";
                   Lf=setTimeout(leftT,500)}
        }
/*最后一个waterFallBox的一半处是否滚动到窗口*/
function scrollCheck(){
    var lastBox=$("#waterFall .waterFallBox").last();
    var lastHeight=lastBox.outerHeight()/2+lastBox.offset().top;
    var scrollTop=$(window).scrollTop()+$(window).height();
    return(scrollTop>lastHeight)

}
/*拖拽*/
function drag(element,target){
        element.bind("mousedown",function(e){
        if(trim(this.innerHTML).length==0){e.preventDefault();}     
        var _this=this;
        var diffX=e.pageX-_this.offsetLeft;
        var diffY=e.pageY-_this.offsetTop;
        var flag=false;
        if(e.target==target){
                flag=true;
            }
        
        
        if(flag){
            $(document).bind("mousemove",move)
            $(document).bind("mouseup",up)
        }else{
            $(document).unbind("mousemove",move)
            $(document).unbind("mouseup",up)
        }
        function move(e){
            var scrollTop=$(document).scrollTop();
            var left=e.pageX-diffX;
            var top=e.pageY-diffY;
            if(left<0){
                left=0
            }
            if(top<scrollTop){
                top=scrollTop
            }
            if(left>=getInner().width-_this.offsetWidth){
                left=getInner().width-_this.offsetWidth
            }
            if(top>=getInner().height+scrollTop-_this.offsetHeight){
                top=getInner().height+scrollTop-_this.offsetHeight
            }
            _this.style.left=left+"px";
            _this.style.top=top+"px";
            if(typeof _this.setCapture!="undefined"){
            _this.setCapture();
        }
        }
        function up(){
             $(document).unbind("mousemove",move)
             $(document).unbind("mouseup",up)
            if(typeof _this.releaseCapture!="undefined"){
                _this.releaseCapture()
            }   
        }
       })
}
//去除字符串空白
function trim(str){
    return str.replace(/(^\s*)|(\s*$)/g,"")
}
//获取屏幕大小
function getInner(){
    if(window.innerHeight){
        return{
            width:window.innerWidth,
            height:window.innerHeight
        }
    }else{
        return{
            width:document.documentElement.clientWidth,
            height:document.documentElement.clientHeight
        }
    }
}
//设置物体居中
setCenter=function(element){
        var eleH=parseInt(element.css("height")),
            eleW=parseInt(element.css("width")),
            winH=getInner().height,
            winW=getInner().width;
        var scrollTop=$(document).scrollTop();
            element.get(0).style.top=(winH-eleH)/2>30?(winH-eleH)/2+scrollTop+"px":scrollTop;
            element.get(0).style.left=(winW-eleW)>0?(winW-eleW)/2+"px":0; 
            
}
//屏幕锁频
lock=function(element){

        var scrolltop=$(document).scrollTop();
        element.get(0).style.display="block";
        element.get(0).style.width=getInner().width+"px";
        element.get(0).style.height=getInner().height+"px";
        element.get(0).style.top=scrolltop+"px";
        document.documentElement.style.overflow="hidden";
       // $(window).bind("scroll",scrollTop);
        element.animate({opacity:0.8}); 
}
//解锁屏幕
unlock=function(element){
    element.animate({opacity:0},function(){
        element.get(0).style.display="none";
        document.documentElement.style.overflow="auto"
        //$(window).unbind("scroll",scrollTop)
    })
}
//滚动条清零
/*function scrollTop(){
    //$(window).scrollTop(scrollTop);
    document.documentElement.scrollTop=scrolltop+"px";
    document.body.scrollTop=scrolltop+"px";
}*/
//创建cookie
function setCookie(name,value,expires,path,domain,secure){
   var cookieName=encodeURIComponent(name)+"="+encodeURIComponent(value);
  if(expires instanceof Date){
    cookieName+=";expires"+"="+expires
  }
  if(path){
    cookieName+=";path"+"="+path;
  }
  if(domain){
    cookieName+=";domain"+"="+domain;
  }
  if(secure){
    cookieName+=";secure"
  }
  document.cookie=cookieName;
}
//设置Cookie时间
function setCookieDate(day){
  if(typeof day=="number"&&day>0){
    var date=new Date();
    date.setDate(date.getDate()+day)
    return date
  }else{
    throw new Error("day为大于0的数字")
  }
}
//获取cookie某个值
function getCookie(name){
    var cookieName=document.cookie;
    var cookieArr=cookieName.split(";");
    for(var i=0;i<cookieArr.length;i++){
        var nameValue=cookieArr[i].split("=");
      if(trim(nameValue[0])==name){
        return trim(decodeURIComponent(nameValue[1]))
      }
        }
    }
