const { pool } = require("../../../config/database");
const { logger } = require("../../../config/winston");

const diaryDao = require("./diaryDao");

// Provider: Read 비즈니스 로직 처리


exports.retrieveMonthList = async function (year, month) {
    const params = [year, month];
    const connection = await pool.getConnection(async (conn) => conn);
    const monthList = await diaryDao.selectMonthDiary(connection, params);

    connection.release();

    return monthList;
};

exports.retrieveDiary = async function (year, month, day) {
    const params = [year, month, day];
    const connection = await pool.getConnection(async (conn) => conn);
    const diary = await diaryDao.selectDiary(connection, params);
    console.log(diary[0].diaryIdx)
    const diaryAnswer = await diaryDao.selectDiaryAnswer(connection, diary[0].diaryIdx);
    console.log(diaryAnswer)
    diary[0].answer = diaryAnswer[0];

    connection.release();

    return diary;
};

exports.retrieveSharedDiaryList = async function () {
    const connection = await pool.getConnection(async (conn) => conn);
    const shareList = await diaryDao.selectShareList(connection);
    const shareResult = {'diarys' : shareList}

    connection.release();

    return shareResult;
};