
// 공지사항 조회
async function selectNoticeList(connection) {
    const selectNoticeQuery = `
        select title, noticeContent, date_format(updatedAt, '%Y.%c.%e') as noticeDate
        from Notice;
    `;
    const [noticeRows] = await connection.query(selectNoticeQuery);
    return noticeRows;
}


module.exports = {
    selectNoticeList
};

