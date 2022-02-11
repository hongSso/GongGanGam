const { pool } = require("../../../config/database");
const { logger } = require("../../../config/winston");

const adminDao = require("./adminDao");

// Provider: Read 비즈니스 로직 처리


exports.retrieveNotice = async function (pageSize, offset) {
    const connection = await pool.getConnection(async (conn) => conn);
    const noticeList = await adminDao.selectNoticeList(connection, );

    connection.release();

    return noticeList;
};