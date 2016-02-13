/**
 * Created by apple on 16/1/5.
 */

define('app/usercenter/view/MyCertView',
[
    'underscore',
    'backbone',
    'jquery',
    'text!/app/usercenter/template/MyCertView.ejs',

	'bootstrap',
	'bootbox'

],
function(_, Backbone, $ ,tmpl, bootstrap,bootbox){
    var v = Backbone.View.extend({
	    events:{
		    'click #testBtn':'testBtn_clickHandler',
		    'click #more':'more_clickHandler',
		    'click #hide':'hide_clickHandler',
		    'click #mycertsub':"sub_clickHandler"

	    },
        initialize:function(){
            this.template = _.template(tmpl);
	        this.elems = {
		        'testBtn':'#testBtn',
	            'mycertFields':'.mycert-field',
		        'more':"#more",
		        'mycert_hide':"#hide",
		        'expTeacher':"#expTeacher",
				'mycert_sub':"#mycertsub",
		        'mycert_opt':".mycert_teacher",
		        'mycert_radio':".mycert_radio",
		        'mycert_id':"#mycert_id"

	        }
        },
        render:function(){
            $(this.el).html(this.template({mycert:this.model.toJSON()}));

            return this;
        },
	    testBtn_clickHandler:function(evt){
			console.log($(evt.currentTarget).attr('data'));
		    $(this.elems.testBtn).css({
			    'display':'none'
		    });
	    },
	    more_clickHandler:function(cc){
		    $(this.elems.expTeacher).show();
		    $(this.elems.more).hide();
		    /*$( this.elems.more).unbind("click");*/
		    $( this.elems.mycert_hide).show();
		   /* $( this.elems.mycert_hide).bind("click",hide_clickHandler());*/
	    },
	    hide_clickHandler:function(){
		    $( this.elems.expTeacher).hide();
		    $( this.elems.mycert_hide).hide();
		   /* $( this.elems.mycert_hide).unbind("click");*/
		    $( this.elems.more).show();
		   /* $( this.elems.more).bind("click",more_clickHandler);*/
	    },sub_clickHandler:function(){

		    var data ;
		    var url = '/users/authenticate';
		    var acId = $(this.elems.mycert_id).val();
		  var usertype =  $(":radio:checked").val();
		    console.log($(this.elems.mycert_radio).find(":checked"));
		    if(usertype == '1' && acId != ''){
			    url = '/users/authenticateDB';//教师补充认证
		    }else if(usertype == '2' && acId != ''){
				url = '';//机构补充认证
		    }
		    data = this.teacherCheck() ;
		    console.log(url);

		    if(typeof data !='object' &&!data){
			    return;
		    }
			data._id = acId;
		    $.ajax({
			    url: url,
			    type: 'POST',
			    dataType:"json",
			    data: data,
			    success: function(data1){
				    console.log(data1);
				    if(200 === data1.code) {
					    bootbox.alert("提交成功,请等待审核")
				    } else {
					    var msg = data1.msg;
					    if(msg == undefined){
						    msg = "提交失败";
					    }
					    bootbox.alert(msg);
				    }

			    },
			    error: function(){
				    $("#spanMessage").html("与服务器通信发生错误");
			    }
		    });




	    },teacherCheck:function(){
			var data = {};
		    var cc = this.elems.mycert_opt;
		    var jsonData = {};
		    $(cc).each(function(i,n){
			   var fname = $(n).attr("name");
			    var value = $(n).val();
			    jsonData[fname] = value;
		    });
		    var name = jsonData['name']//真实姓名
		    var credentype = jsonData['credentype'];//证件类型
		    var credencode = jsonData['credencode'] ;//证件号码
		    var credenImg = jsonData['credenImg'] ;//证件照片
		    var payway = jsonData['payway'] ;//付款方式



		    if(name == ''){
			    bootbox.alert("真实姓名不能为空！");
			    return false;
		    }
		    data.name = name;
		    if(credentype ==''){
			    bootbox.alert("证件类型不能为空！");
			    return false;
		    }
		    data.credentype = credentype;
		    if(credencode == ''){
			    bootbox.alert("证件号码不能为空！");
			    return false;
		    }
		    data.credencode = credencode;
		    if(credenImg == ''){
			    bootbox.alert("证件照片不能为空！");
			    return false;
		    }
		    data.credenImg = credenImg;
		    if(payway == ''){
			    bootbox.alert("付款方式不能为空！");
			    return false;
		    }
		    data.payway = payway;
		    //可选项

		    var level = jsonData['level'];
		    var image = jsonData['image'] ;
		    var code = jsonData['code'];
		    if( !((level !='' && image !=''  && code !='') ||(level =='' && image ==''  && code ==''))){
			    bootbox.alert("请输入完整的学历认证信息！");
			    return false;
		    }
		    if(level !='' && image !=''  && code !='') {
			    var acadecerti = {};
			    acadecerti.level = level;
			    acadecerti.image = image;
			    acadecerti.code = code;
			    data.acadecerti = JSON.stringify(acadecerti);
		    }
		    var info = jsonData['info'];
		    var honorImg =  jsonData['honorImg'];
		    if( !((info !='' && honorImg !='') ||(info =='' && honorImg =='' ))){
			    bootbox.alert("请输入完整的荣誉认证信息！");
			    return false;
		    }
		    if(info !='' && honorImg !=''){
			    var servexerti = {};
			    servexerti.info = info;
			    servexerti.image = honorImg;
			    data.servexerti = JSON.stringify(servexerti);
		    }

		    var workexp = jsonData['workexp'];
		    if(workexp !=''){
			    data.workexp = workexp;
		    }

		    return data;
	    },
	    show: function () {
		    this._show();
	    },
	    hide: function () {
		    this._hide();
	    },
	    _hide: function () {
		    $(this.el).css({
			    'display': 'none'
		    })
	    },
	    _show: function () {
		    $(this.el).css({
			    'display': 'block'
		    });
	    }
    });

    return v;
})