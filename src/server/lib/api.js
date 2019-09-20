let baseURL = "http://localhost/safe_pal_api/api/v1";
let userid = "C7rPaEAN9NpPGR8e9wz9bzw";
exports.get = function(requesturl = "", callback) {
  this.getToken(function(error, token) {
    if (error) {
      console.log(error);
    } else {
      console.log(token);
      let error_ = null;
      let data_ = {};
      fetch(baseURL + requesturl, {
        method: "GET",
        headers: new Headers({
          Accept: "application/json",
          "Content-Type": "application/json",
          userid: userid
        })
      })
        .then(response => response.json())
        .then(responseJson => {
          data_ = responseJson;
          return callback(error_, data_);
        })
        .catch(error => {
          error_ = error;
          return callback(error_);
        });
    }
  });
};
//  exports.put = function(requesturl = "", data_sent = {}, callback) {
//      AsyncStorage.getItem('token', function(error, result){
//          if(error){
//              console.log(error)
//          }else{
//              console.log(result);
//      let error_ = null;
//      let data_ = {};
//      fetch(requesturl, {
//        method: "PUT",
//        headers: {
//          Accept: "application/json",
//          "Content-Type": "application/json",
//          "Authorization":"Bearer "+result ? result : ""
//        },
//        body: JSON.stringify(data_sent)
//      })
//        .then(response => response.json())
//        .then(responseJson => {
//          data_ = responseJson;
//          return callback(error_, data_);
//        })
//        .catch(error => {
//          error_ = error;
//          return callback(error_);
//        });
//      }
//  });

//    };

exports.post = function(requesturl = "", data_sent = {}, callback) {
  let error_ = null;
  let data_ = {};
  this.getToken(function(error_, token) {
    if (error_) {
      error_ = error_;
      return callback(error_);
    } else {
      console.log(token);
      data_sent.token = token;
      fetch(baseURL + requesturl, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          userid: userid
        },
        body: JSON.stringify(data_sent)
      })
        .then(response => response.json())
        .then(responseJson => {
          data_ = responseJson;
          return callback(error_, data_);
        })
        .catch(error => {
          error_ = error;
          console.log("error", error)
          return callback(error_);
        });
    }
  });
};

exports.getToken = function(callback) {
  let error_ = null;
  let token = {};
  fetch(baseURL + "/auth/newtoken", {
    method: "GET",
    headers: new Headers({
      Accept: "application/json",
      "Content-Type": "application/json",
      userid: userid
    })
  })
    .then(response => response.json())
    .then(responseJson => {
      token = responseJson.token;
      return callback(error_, token);
    })
    .catch(error => {
      error_ = error;
      return callback(error_);
    });
};
