const {logger} = require("../../../config/winston");
const {pool} = require("../../../config/database");
const secret_config = require("../../../config/secret");

// user 뿐만 아니라 다른 도메인의 Provider와 Dao도 아래처럼 require하여 사용할 수 있습니다.
const userProvider = require("./userProvider");
const userDao = require("./userDao");

const baseResponse = require("../../../config/baseResponseStatus");
const {response} = require("../../../config/response");
const {errResponse} = require("../../../config/response");

const jwt = require("jsonwebtoken");
const crypto = require("crypto");


//04. 유저 생성
exports.createUser = async function (nickname, birthYear, gender) {
    try {
        const insertUserInfoParams = [nickname, birthYear, gender];
        const connection = await pool.getConnection(async (conn) => conn);

        //닉네임 중복 방지
        const userNicknameRows = await userProvider.userNicknameCheck(nickname);
        if (userNicknameRows.length > 0)
            return errResponse(baseResponse.SIGNUP_REDUNDANT_NICKNAME);

        const userNicknameResult = await userDao.insertUserInfo(connection, insertUserInfoParams);
        console.log(`추가된 회원 : ${userNicknameResult[0].insertId}`)
        connection.release();
        return response(baseResponse.SUCCESS);

    } catch (err) {
        logger.error(`App - createUser Service error\n: ${err.message}`);
        return errResponse(baseResponse.DB_ERROR);
    }
};

//05. 회원 정보 수정
exports.editUser = async function ( nickname, birthYear, gender, setAge, userIdx) {
    try {
        const connection = await pool.getConnection(async (conn) => conn);

        //닉네임 중복 방지 & 동일 유저가 같은 이름으로 수정할 때
        const userNicknameRows = await userProvider.userIdCheck(userIdx);
        if (userNicknameRows[0].nickname!==nickname && userNicknameRows.length > 0)
            return errResponse(baseResponse.SIGNUP_REDUNDANT_NICKNAME);

        //회원 존재 확인
        if (userNicknameRows.length < 1)
            return errResponse(baseResponse.USER_USERID_NOT_EXIST);

        const editUserResult = await userDao.updateUserInfo(connection, nickname, birthYear, gender, setAge, userIdx)
        connection.release();
        return response(baseResponse.SUCCESS);

    } catch (err) {
        logger.error(`App - editUser Service error\n: ${err.message}`);
        return errResponse(baseResponse.DB_ERROR);
    }
}

//07. 탈퇴하기
exports.editUserStatus = async function (userIdx, status) {
    try {
        const connection = await pool.getConnection(async (conn) => conn);

        //회원 존재 확인
        const userIdRows = await userProvider.userIdCheck(userIdx);
        if (userIdRows.length < 1)
            return errResponse(baseResponse.USER_USERID_NOT_EXIST);

        const userStatus = await userDao.selectUserStatus(connection, userIdx);
        if(userStatus[0].status==status) return errResponse(baseResponse.USER_STATUS_ALREADY_INACTIVE);

        const editStatusResult = await userDao.updateUserStatus(connection, userIdx, status);
        connection.release();
        return response(baseResponse.SUCCESS);


    } catch (err) {
        logger.error(`App - editUserStatus Service error\n: ${err.message}`);
        return errResponse(baseResponse.DB_ERROR);
    }
}

//09.받은 일기 알림 설정
exports.editDiaryPush= async function (userIdx, diaryPush) {
    try {
        const connection = await pool.getConnection(async (conn) => conn);

        //회원 존재 확인
        const userIdRows = await userProvider.userIdCheck(userIdx);
        if (userIdRows.length < 1)
            return errResponse(baseResponse.USER_USERID_NOT_EXIST);

        const editDiaryPushResult = await userDao.updateDiaryPush(connection, userIdx, diaryPush);
        connection.release();
        return response(baseResponse.SUCCESS);

    } catch (err) {
        logger.error(`App - editDiaryPush Service error\n: ${err.message}`);
        return errResponse(baseResponse.DB_ERROR);
    }
}

//10. 받은 답장 알림 설정
exports.editAnswerPush = async function (userIdx, answerPush) {
    try {
        const connection = await pool.getConnection(async (conn) => conn);

        //회원 존재 확인
        const userIdRows = await userProvider.userIdCheck(userIdx);
        if (userIdRows.length < 1)
            return errResponse(baseResponse.USER_USERID_NOT_EXIST);

        const editAnswerPushResult = await userDao.updateAnswerPush(connection, userIdx, answerPush);
        connection.release();

        return response(baseResponse.SUCCESS);

    } catch (err) {
        logger.error(`App - editAnswerPush Service error\n: ${err.message}`);
        return errResponse(baseResponse.DB_ERROR);
    }
}

//11. 채팅 알림 설정
exports.editChatPush = async function (userIdx, chatPush) {
    try {
        const connection = await pool.getConnection(async (conn) => conn);

        //회원 존재 확인
        const userIdRows = await userProvider.userIdCheck(userIdx);
        if (userIdRows.length < 1)
            return errResponse(baseResponse.USER_USERID_NOT_EXIST);

        const editChatPushResult = await userDao.updateChatPush(connection, userIdx, chatPush);
        connection.release();

        return response(baseResponse.SUCCESS);

    } catch (err) {
        logger.error(`App - editChatPush Service error\n: ${err.message}`);
        return errResponse(baseResponse.DB_ERROR);
    }
}