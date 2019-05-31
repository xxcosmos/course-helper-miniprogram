//const baseURL = 'http://127.0.0.1:8080';
//const baseURL = 'https://xiaoyuu.ngrok.xiaomiqiu.cn';
//const baseURL = 'http://xiaoyuu.nat300.top';
const cosURL = 'https://inwust-1251756217.cos.ap-chengdu.myqcloud.com';

const baseURL = 'https://course.verly-badcw.top';
module.exports = {
    CosURL: cosURL,

    User: baseURL + '/user',
    Login: baseURL + '/user/login',
    Bind: baseURL + '/user/bind',

    Course: baseURL + '/course',
    CourseSearch: baseURL + '/course/search',
    HottestCourse: baseURL + '/course/hot',
    RecommendCourse: baseURL + '/course/recommend',
    CourseByCollegeCode: baseURL + '/course/college',
    Comment: baseURL + '/comment',
    Star: baseURL + '/collection',
    Collection: baseURL + '/course/collection',

    Like: baseURL + '/like',
    Auth: baseURL + '/auth',
    CosAuth: baseURL + '/auth/cos',

    File: baseURL + '/file',
    GetCourseFile: baseURL + '/file/course/file',
    AddDownloadCount: baseURL + '/file/download/count/',
    Feedback: baseURL+ '/feedback'
};
