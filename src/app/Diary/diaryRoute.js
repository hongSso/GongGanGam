module.exports = function(app){
    const diary = require('./diaryController');
    const jwtMiddleware = require('../../../config/jwtMiddleware');

    // 12. 받은 일기 리스트 조회 API
    app.get('/app/diarys/share', diary.getSharedDiarys);

    // 14. 받은 일기 조회 API
    app.get('/app/diarys/share/:diaryIdx', diary.getSharedDiarys);

    // 16. 나의 다이어리 조회(캘린더 - 이모티콘) API
    app.get('/app/diarys', diary.getDiarys);

    // 17. 그날의 다이어리 조회 API
    app.get('/app/diarys/detail', diary.getDiaryDetail);

};

