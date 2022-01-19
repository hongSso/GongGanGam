const {logger} = require("../../../config/winston");
const {pool} = require("../../../config/database");
const secret_config = require("../../../config/secret");

const diaryProvider = require("./diaryProvider");
const diaryDao = require("./diaryDao");

const baseResponse = require("../../../config/baseResponseStatus");
const {response} = require("../../../config/response");
const {errResponse} = require("../../../config/response");

const jwt = require("jsonwebtoken");
const crypto = require("crypto");

// Service: Create, Update, Delete 비즈니스 로직 처리

exports.createDiary = async function (userIdx, date, emoji, content, shareAgree) {
    try {

        // 쿼리문에 사용할 변수 값을 배열 형태로 전달
        const insertDiaryParams = [userIdx, date, emoji, content, shareAgree];
        console.log(insertDiaryParams);

        const connection = await pool.getConnection(async (conn) => conn);

        const diaryResult = await diaryDao.insertDiary(connection, insertDiaryParams);

        connection.release();
        return response(baseResponse.SUCCESS);

    } catch (err) {
        logger.error(`App - createDiary Service error\n: ${err.message}`);
        return errResponse(baseResponse.DB_ERROR);
    }
};

exports.updateDiaryStatus = async function (userIdx, diaryIdx) {
    try {

        const connection = await pool.getConnection(async (conn) => conn);

        // 존재하는 사용자, 다이어리인지 확인
        const userResult = await diaryDao.checkUserExists(connection, userIdx);
        if (userResult.length<1) return errResponse(baseResponse.USER_NOT_EXIST);
        const diaryResult = await diaryDao.checkDiaryExists(connection, diaryIdx);
        if (diaryResult.length<1) return errResponse(baseResponse.DIARY_DIARYIDX_NOT_EXIST);

        // 삭제할 권한 있는 사용자인지 확인
        if (diaryResult[0].userIdx !== userIdx) return errResponse(baseResponse.DIARY_USER_INVALID);


        const updateDiaryResult = await diaryDao.updateDiaryStatus(connection, diaryIdx);

        connection.release();
        return response(baseResponse.SUCCESS);

    } catch (err) {
        logger.error(`App - updateDiaryStatus Service error\n: ${err.message}`);
        return errResponse(baseResponse.DB_ERROR);
    }
};
