/**
 * 
 * @authors Your Name (you@example.org)
 * @date    2017-01-04 20:28:14
 * @version $Id$
 */
$(document).ready(function(){

     
    /*展示时间*/
     showTime();
    

/*登录框显示、锁频*/
$("#_login").bind("click",function(){
     lock($("#screen"))   
     setCenter($("#login"))
     $("#login").show()
})
/*登录框拖拽*/

drag($("#login"),$("#login h2").get(0))
/*登录框隐藏、解屏*/
$("#login h2 .close").bind("click",function(){
    $("#login").hide()
    unlock($("#screen"))   
})
$(window).bind("resize",function(){
    setCenter($("#login"))
})
/*验证注册表单*/
/*重置表单*/
$("form").get(0).reset();
/*用户名*/
$("#user").bind("focus",function(){
    $(".user .info_mess").css("display","block")
    $(".user .info_error").css("display","none")
    $(".user .info_succ").css("display","none")
}).bind("blur",function(){
    if(trim($(this).val())==""){
        $(".user .info_mess").css("display","none")
        $(".user .info_error").css("display","none")
        $(".user .info_succ").css("display","none")
    }else if(checkUser($(this))){
        $(".user .info_mess").css("display","none")
        $(".user .info_error").css("display","none")
        $(".user .info_succ").css("display","block")
    }else{
        $(".user .info_mess").css("display","none")
        $(".user .info_error").css("display","block")
        $(".user .info_succ").css("display","none")
    }
})

function checkUser(_this){
     if(/^[\w_]{4,20}$/.test(trim(_this.val()))) {
       var flag=true
       $(".user .info_mess").css("display","none");
       $(".user .yanzheng").css("display","block");
       $.ajax({
        url:"/user.json",
        type:"get",
        async:false,
        dataType:"json",
        success:function(data){
         
          for(var i=0;i<data.length;i++){
           if(data[i].user==trim(_this.val())){
            $(".user .info_error").html("用户名已被注册");
            flag=false;
           }
          }
        }
       })
       $(".user .yanzheng").css("display","none");
       return flag;
      }

        else{
            $(".user .info_error").html("格式错误，请重新输入")
            return false
        }
}
/*密码*/
$("#pass").bind("focus",function(){
    $(".pass .info_mess").css("display","block")
    $(".pass .info_error").css("display","none")
    $(".pass .info_succ").css("display","none")
}).bind("blur",function(){
    if(trim($(this).val())==""){
       $(".pass .info_mess").css("display","none")
       $(".pass .info_error").css("display","none")
       $(".pass .info_succ").css("display","none") 
    }else if(checkPass($(this))){
        $(".pass .info_mess").css("display","none")
        $(".pass .info_error").css("display","none")
        $(".pass .info_succ").css("display","block") 
    }else{
         $(".pass .info_mess").css("display","none")
         $(".pass .info_error").css("display","block")
         $(".pass .info_succ").css("display","none") 
    }
})



$("#pass").bind("keyup",function(){
      checkPass($(this))
})
/*确认密码*/
$("#nopass").bind("focus",function(){
    $(".nopass .info_mess").css("display","block")
    $(".nopass .info_error").css("display","none")
    $(".nopass .info_succ").css("display","none")
}).bind("blur",function(){
    if(trim($(this).val())==""){
       $(".nopass .info_mess").css("display","none")
       $(".nopass .info_error").css("display","none")
       $(".nopass .info_succ").css("display","none") 
    }else if(checkNopass($(this))){
        $(".nopass .info_mess").css("display","none")
        $(".nopass .info_error").css("display","none")
        $(".nopass .info_succ").css("display","block") 
    }else{
         $(".nopass .info_mess").css("display","none")
         $(".nopass .info_error").css("display","block")
         $(".nopass .info_succ").css("display","none") 
    }
})
/*回答*/
$("#ans").bind("focus",function(){
    $(".ans .info_mess").css("display","block")
    $(".ans .info_error").css("display","none")
    $(".ans .info_succ").css("display","none")
}).bind("blur",function(){
    if(trim($(this).val())==""){
       $(".ans .info_mess").css("display","none")
       $(".ans .info_error").css("display","none")
       $(".ans .info_succ").css("display","none") 
    }else if(checkAns($(this))){
        $(".ans .info_mess").css("display","none")
        $(".ans .info_error").css("display","none")
        $(".ans .info_succ").css("display","block") 
    }else{
         $(".ans .info_mess").css("display","none")
         $(".ans .info_error").css("display","block")
         $(".ans .info_succ").css("display","none") 
    }
})
/*email*/
$("#mail").bind("focus",function(){
    if($(this).val().indexOf("@")==-1){
        $(".all_email").css("display","block")
    }
    $(".mail .info_mess").css("display","block")
    $(".mail .info_error").css("display","none")
    $(".mail .info_succ").css("display","none")
    return false
}).bind("blur",function(){
    $(".all_email").css("display","none");
    $(".all_email li").css("background","#fff");
    index=-1;
    if(trim($(this).val())==""){
       $(".mail .info_mess").css("display","none")
       $(".mail .info_error").css("display","none")
       $(".mail .info_succ").css("display","none") 
    }else if(checkEmail($(this))){
        $(".mail .info_mess").css("display","none")
        $(".mail .info_error").css("display","none")
        $(".mail .info_succ").css("display","block") 
    }else{
         $(".mail .info_mess").css("display","none")
         $(".mail .info_error").css("display","block")
         $(".mail .info_succ").css("display","none") 
    }
})
$(".all_email li").bind("mousedown",function(){
    $("#mail").val($(this).text());
})
$(".all_email li").hover(
   function(){
     $(this).css("background","#74B2E6")
   },
   function(){
    $(this).css("background","#fff")
   }
    )
var index=-1;
$("#mail").bind("keyup",function(e){
    if($(this).val().indexOf("@")==-1){
        $(".all_email").css("display","block")
        $(".all_email li span").html($(this).val())
    }else{
        $(".all_email").css("display","none")
    }
    $(".all_email li").css("background","#fff")
   var length=$(".all_email li").length;
   if(e.keyCode==40){
         ++index;
         if(index>=length){index=0}
         $(".all_email li")[index].style.background="#74B2E6";
         
   }
   if(e.keyCode==38){
    --index;
    if(index<0){index=length-1};
    $(".all_email li")[index].style.background="#74B2E6";

   }
   if(e.keyCode==13){
    $(this).val($($(".all_email li")[index]).text());
    $(".all_email").css("display","none");
    $(".all_email li").css("background","#fff")
    index=-1;
   }
})
/*设置年份*/
for(var y=1950;y<=2017;y++){
   $("#year").get(0).add(new Option(y,y),undefined) 
}
/*设置月份*/
for(var m=1;m<=12;m++){
    $("#month").get(0).add(new Option(m,m),undefined)
}
/*改变年份设置日期*/
$("#year").bind("change",setDate)
/*改变月份设置日期*/
$("#month").bind("change",setDate)
/*隐藏错误信息*/
$(".birth").bind("click",function(){
   if(checkBirth()){
    $(".birth .info_error").css("display","none")
   }
})

/*分情况设置日期*/
function setDate(){
    var year=parseInt($("#year").val());
    var month=parseInt($("#month").val());
    var date=$("#date");
    var day31=[1,3,5,7,8,10,12];
    var day30=[4,6,9,11];
    date.get(0).options.length=1;
    if(year!=0 && month!=0){
      if($.inArray(month,day31)!=-1){
        for(var d=1;d<=31;d++){
           date.get(0).add(new Option(d,d),undefined)
        }
      }else if($.inArray(month,day30)!=-1){
        for(var d=1;d<=30;d++){
           date.get(0).add(new Option(d,d),undefined)
        }
      }else if(year%400==0 || (year%4==0 && year%100!=0)){
        for(var d=1;d<=29;d++){
            date.get(0).add(new Option(d,d),undefined)
        }
      }else{
        for(var d=1;d<=28;d++){
        date.get(0).add(new Option(d,d),undefined)
      }       
    }
  }  
}
/*问题是否设置*/
$("#ques").bind("change",function(){
    if(checkQues()){
        $(".ques .info_error").css("display","none")
    }
})
/*字数计数*/
var maxNum=140;
$("#ps").bind("keyup",function(){
    var num=$("#ps").val().length;
    if(checkPs()){
       $(".ps #leftAlert").css("display","block");
       $(".ps .left").html(maxNum-num)
       $(".ps #beyondAlert").css("display","none");
    }else{
        $(".ps #leftAlert").css("display","none");
        $(".ps .beyond").html(Math.abs(maxNum-num));
        $(".ps #beyondAlert").css("display","block");
    }
})
/*清尾*/
$(".clear").bind("click",function(){
    $("#ps").val($("#ps").val().slice(0,maxNum))
    $(".ps #leftAlert").css("display","block");
    $(".ps .left").html(0)
    $(".ps #beyondAlert").css("display","none");
})
/*注册提交*/
$("#sub").bind("click",function(){
    var flag=true;
    if(!checkUser($("#user"))){
       $(".user .info_error").css("display","block");
       flag=false;
    }
    if(!checkPass($("#pass"))){
       $(".pass .info_error").css("display","block");
       flag=false;
    }
    if(!checkNopass($("#nopass"))){
       $(".nopass .info_error").css("display","block");
       flag=false;
    }
    if(!checkQues()){
       $(".ques .info_error").css("display","block");
       flag=false;
    }
    if(!checkAns($("#ans"))){
       $(".ans .info_error").css("display","block");
       flag=false;
    }
    if(!checkEmail($("#mail"))){
       $(".mail .info_error").css("display","block");
       flag=false;
    }
     if(!checkBirth()){
       $(".birth .info_error").css("display","block");
       flag=false;
    }
    if(!checkPs()){
       flag=false;
    }
   if(!$("#agreement:checked").get(0)){
      alert("请阅读《地购用户注册协议》")
      flag=false
   }
   if(flag){
       var _this=this
       setCenter($("#subing"));
       $("#subing p").html("注册正在提交中···")
       $("#subing").show();
       $(_this).attr("disabled",true).css("background","#999")
       $.ajax({
        url:"demo.php",
        type:"POST",
        data:$("#regform").serialize(),
        success:function(text){
            if(text){
              $("#subing").hide();
              setCenter($("#success"));
              $("#success h3").html("注册成功");
              $("#success").show();
              setTimeout(function(){
                $("#success").hide();
                $(".info").hide();
                $(".ps .left").html(maxNum);
                $(_this).attr("disabled",false).css("background","#1D7AD9");
                $("#regform").get(0).reset();
                $(".pass .info_mess p strong").css("color","#999");
                $(".s4").html("");
                $(".q1").html("○");
                $(".q2").html("○");
                $(".q3").html("○");
                $(".all_email li span").html("")
              },1500)
            }
        }
       })
   }
})


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

/*拖拽*/
function drag(element,target){
        element.bind("mousedown",function(e){
        if(trim(this.innerHTML).length==0){e.preventDefault();}     
        var _this=this;
        var diffX=e.clientX-_this.offsetLeft;
        var diffY=e.clientY-_this.offsetTop;
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
            var left=e.clientX-diffX;
            var top=e.clientY-diffY;
            if(left<0){
                left=0
            }
            if(top<0){
                top=0
            }
            if(left>=getInner().width-_this.offsetWidth){
                left=getInner().width-_this.offsetWidth
            }
            if(top>=getInner().height-_this.offsetHeight){
                top=getInner().height-_this.offsetHeight
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
            element.get(0).style.top=(winH-eleH)/2>30?(winH-eleH)/2+"px":0;
            element.get(0).style.left=(winW-eleW)>0?(winW-eleW)/2+"px":0; 
            
}
//屏幕锁频
lock=function(element){
        element.get(0).style.display="block";
        element.get(0).style.width=getInner().width+"px";
        element.get(0).style.height=getInner().height+"px";
        document.documentElement.style.overflow="hidden";
        $(window).bind("scroll",scrollTop)
        element.animate({opacity:0.8})
   
}
//解锁屏幕
unlock=function(element){
    element.animate({opacity:0},function(){
        element.get(0).style.display="none";
        document.documentElement.style.overflow="auto"
        $(window).unbind("scroll",scrollTop)
    })
}
//滚动条清零
function scrollTop(){
    document.documentElement.scrollTop=0;
    document.body.scrollTop=0
}
/*用户名检查*/

/*密码检查*/
function checkPass(_this){
    var value=trim(_this.val());
    var length=value.length;
    var counter=0;
    if(length>=6 && length<=20){
        $(".q1").html("●").css("color","#0f0")
    }else{
        $(".q1").html("○").css("color","#999")
    }
    if(length>0 && !/\s/.test(value)){
        $(".q2").html("●").css("color","#0f0")
    }else{
        $(".q2").html("○").css("color","#999")
    }
    if(/[A-Z]/.test(value)){
        counter++
    }
    if(/[a-z]/.test(value)){
        counter++
    }
    if(/[\d]/.test(value)){
        counter++
    }
    if(/[^\w\s]/.test(value)){
        counter++
    }
    if(counter>=2){
        $(".q3").html("●").css("color","#0f0")
    }else{
        $(".q3").html("○").css("color","#999")
    }
    if(counter>=3&&length>=12){
        $(".s1").css("color","#0f0")
        $(".s2").css("color","#0f0")
        $(".s3").css("color","#0f0")
        $(".s4").html("高").css("color","#0f0")
    }else if(counter>=2&&length>=8){
        $(".s1").css("color","#F7EF07")
        $(".s2").css("color","#F7EF07")
        $(".s3").css("color","#999")
        $(".s4").html("中").css("color","#F7EF07")
    }else if(length>=1){
        $(".s1").css("color","#f00")
        $(".s2").css("color","#999")
        $(".s3").css("color","#999")
        $(".s4").html("低").css("color","#f00")
    }else{
        $(".s1").css("color","#999")
        $(".s2").css("color","#999")
        $(".s3").css("color","#999")
        $(".s4").html("")
    }
    if(length>=6 && length<=20 && counter>=2 &&!/\s/.test(value)){
        return true
    }else{
        return false
    }
}
/*确认密码检查*/
function checkNopass(_this){
    if(checkPass($("#pass")) && trim(_this.val())===trim($("#pass").val())){
        return true
    }else{return false}
        
}
/*检查问题*/
function checkQues(){
    if(parseInt($("#ques").val())!=0){
        return true
    }else{
        return false
    }
}
/*检查回答*/
function checkAns(_this){
    if(_this.val().length>=4&&_this.val().length<=20){
        return true
    }else{
        return false
    }
}
/*检查邮件*/
function checkEmail(_this){
    if(/^[\w\-\.]+@[\w\-]+(\.[A-Za-z]{2,4}){1,2}$/.test(_this.val())){
        return true
    }else{
        return false
    }
}
/*生日检验*/
function checkBirth(){
    if(parseInt($("#year").val())!=0 && parseInt($("#month").val())!=0&& parseInt($("#date").val())!=0){
        return true
    }else{
        return false
    }
}
/*备注检查*/
function checkPs(){
    if($("#ps").val().length<=140){
        return true
    }else{
        return false
    }
}

