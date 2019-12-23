 export default {
  install(Vue) {
    Date.prototype.FormatMy = function (fmt) { //author: meizz 
      var o = {
        "M+": this.getMonth() + 1, //月份 
        "d+": this.getDate(), //日 
        "h+": this.getHours(), //小时 
        "m+": this.getMinutes(), //分 
        "s+": this.getSeconds(), //秒 
        "q+": Math.floor((this.getMonth() + 3) / 3), //季度 
        "S": this.getMilliseconds() //毫秒 
      };
      if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
      for (var k in o)
        if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
      return fmt;
    }
    //时间戳转换为时间 format('yyyy-MM-dd hh:mm:ss')
    Vue.prototype.formatTime = function (value, format) {
      var timeObj;
      if (value) {
        timeObj = new Date(parseInt(value));
      } else if (value == '') {
        timeObj = new Date();
      } else {
        return;
      }
      var date = {
        "M+": timeObj.getMonth() + 1,
        "d+": timeObj.getDate(),
        "h+": timeObj.getHours(),
        "m+": timeObj.getMinutes(),
        "s+": timeObj.getSeconds(),
        "q+": Math.floor((timeObj.getMonth() + 3) / 3),
        "S+": timeObj.getMilliseconds()
      };
      if (/(y+)/i.test(format)) {
        format = format.replace(RegExp.$1, (timeObj.getFullYear() + '').substr(4 - RegExp.$1.length));
      }
      for (var k in date) {
        if (new RegExp("(" + k + ")").test(format)) {
          format = format.replace(RegExp.$1, RegExp.$1.length == 1 ?
            date[k] : ("00" + date[k]).substr(("" + date[k]).length));
        }
      }
      return format;
    }

    //时间戳转换为时间 format('yyyy-MM-dd hh:mm:ss')
    Vue.filter("format", function (value, format) { //全局方法 Vue.filter() 注册一个自定义过滤器,必须放在Vue实例化前面
      return Vue.prototype.formatTime(value, format);
    });
    Vue.prototype.clickDateDiff = function (value) {
      const _this = this;
      var result;
      var minute = 1000 * 60;
      var hour = minute * 60;
      var day = hour * 24;
      var halfamonth = day * 15;
      var month = day * 30;
      var now = new Date().getTime();
      var diffValue = parseInt(now) - parseInt(value);
      if (diffValue < 0) {
        return;
      }
      var monthC = diffValue / month;
      var weekC = diffValue / (7 * day);
      var dayC = diffValue / day;
      var hourC = diffValue / hour;
      var minC = diffValue / minute;
      if (monthC >= 1) {
        result = "" + parseInt(monthC) + '月前';
      } else if (weekC >= 1) {
        result = "" + parseInt(weekC) + '周前';
      } else if (dayC >= 1) {
        result = "" + parseInt(dayC) + '天前';
      } else if (hourC >= 1) {
        result = "" + parseInt(hourC) + '小时前';
      } else if (minC >= 1) {
        result = "" + parseInt(minC) + '分钟前';
      } else {
        result = '刚刚';
      }
      return result;
    };
    //时间戳转换为XX天前
    Vue.filter("getDateDiff", function (value) { //全局方法 Vue.filter() 注册一个自定义过滤器,必须放在Vue实例化前面
      return Vue.prototype.clickDateDiff(value);
    });
    //金额保留两位
    Vue.filter("decimal", function (value) { //全局方法 Vue.filter() 注册一个自定义过滤器,必须放在Vue实例化前面
      return parseFloat(value).toFixed(2);
    });
    // 婚姻状况
    Vue.filter("marriage", function (value) { //全局方法 Vue.filter() 注册一个自定义过滤器,必须放在Vue实例化前面
      return value==1?"未婚":value==2?"已婚":value==3?"离婚":value==4?"丧偶":"";
    });
    //提示框
    var repeat = '';
    Vue.prototype.prompt = function (text, time) {
      if (text == repeat) {
        return false;
      }
      repeat = text;
      var time = time || 3000;
      var htm = document.createElement('div');
      htm.innerHTML = text;
      htm.setAttribute('class', "prompt");
      document.body.appendChild(htm);
      setTimeout(() => {
        deletes(htm);
        repeat = '';
      }, time);

      function deletes(htm) {
        htm.style.opacity = 0;
        htm.style.top = htm.offsetTop - 80 + 'px';
        setTimeout(() => {
          document.body.removeChild(htm);
        }, 600)
      }
    }
  }
}
