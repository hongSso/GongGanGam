module.exports = function(app){
    const diary = require('./diaryController');
    const jwtMiddleware = require('../../../config/jwtMiddleware');

    // 16. 나의 다이어리 조회(캘린더 - 이모티콘) API
    app.get('/app/diary', diary.getDiarys);

};

