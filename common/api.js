//const baseURL = 'http://127.0.0.1:8080';
//const baseURL = 'https://xiaoyuu.ngrok.xiaomiqiu.cn';
const baseURL = 'http://xiaoyuu.nat300.top';



module.exports = {
  User: baseURL + '/user',
  Login: baseURL + '/user/login',
  Bind: baseURL + '/user/bind',

  Course: baseURL + '/course',
  CourseSearch: baseURL + '/course/search',
    HottestCourse: baseURL + '/course/hot',
    RecommendCourse: baseURL + '/course/recommend',

  Comment: baseURL + '/comment',
  CommentForCourse: baseURL + '/comment/course',

    Like: baseURL + '/like',
    Auth: baseURL + '/auth',
    CosAuth: baseURL + '/auth/cos',

    File: baseURL + '/file',
    GetCourseFile: baseURL + '/file/course/file',
    AddDownloadCount: baseURL + '/file/download/count/'
};