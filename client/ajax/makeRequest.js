import request from 'superagent';

export const postToApi = (url, data, apiSuccessCallback, apiFailureCallBack) => {
  request
    .post(url)
    .type('form')
    .send(data)
    .set('Accept', 'application/json')
    .end(function (err, res) {
      var apiRes = res.body;

      if (err) {
        apiFailureCallBack(apiRes);
        return;
      }

      apiSuccessCallback(apiRes);
    });
};
