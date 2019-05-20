//const baseURL = 'http://127.0.0.1:8080';
const baseURL = 'https://xiaoyuu.ngrok.xiaomiqiu.cn/';
module.exports = {
  User: baseURL + '/user',
  Login: baseURL + '/user/login',

  Course: baseURL + '/course',
  CourseSearch: baseURL + '/course/search',

  Comment: baseURL + '/comment',
  CommentForCourse: baseURL + '/comment/course',
};