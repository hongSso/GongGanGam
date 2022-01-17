const { pool } = require("../../../config/database");
const { logger } = require("../../../config/winston");

const diaryDao = require("./diaryDao");

// Provider: Read 비즈니스 로직 처리


exports.retrieveMonthList = async function () {
    const connection = await pool.getConnection(async (conn) => conn);
    const monthList = await diaryDao.selectMonthDiary(connection);

    connection.release();

    return monthList;
};