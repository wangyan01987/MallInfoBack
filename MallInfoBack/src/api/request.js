import $ from "jquery"

$.ajax({
  type: "POST",
  url: "http://192.168.0.103:6689/api/UserInfoApi/SmsSendCodeByType",
  data: JSON.stringify(data),
  dataType:'json',
  contentType:"application/JSON",
  success: function (response) {
    console.log(response);
  },

  failure: function (response) {
    alert(response);
  }
});
