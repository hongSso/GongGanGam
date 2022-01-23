
module.exports = function(app){
    const user = require('./userController');
    const jwtMiddleware = require('../../../config/jwtMiddleware');

    // 0. 테스트 API
    app.get('/app/test', user.getTest)

    // 4. 유저 생성 (회원가입) API
    app.post('/app/users', user.postUsers);

    // 5. 회원 정보 수정 API
    app.patch('/app/users/:userIdx', user.patchUsers);

    // 6. 특정 유저 조회 API
    app.get('/app/users/:userIdx', user.getUserById);

   /* // 7. 탈퇴하기 API
    app.patch('/app/users/:useIdx/status', user.patchStatus);

    // 9. 받은 일기 알림 설정
    app.patch('/app/users/push/diary', user.patchPushDiary);

    // 10. 받은 답장 알림 설정
    app.patch('/app/users/push/answer', user.patchPushAnswer);

    // 10. 받은 답장 알림 설정
    app.patch('/app/users/push/chat', user.patchPushChat);*/

    // 아래 부분은 7주차에서 다룸.
    // TODO: After 로그인 인증 방법 (JWT)




};


// TODO: 자동로그인 API (JWT 검증 및 Payload 내뱉기)
// JWT 검증 API
// app.get('/app/auto-login', jwtMiddleware, user.check);

// TODO: 탈퇴하기 API