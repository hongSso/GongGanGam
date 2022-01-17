
// 해당 달의 이모티콘들 조회
async function selectMonthDiary(connection) {
    const selectMonthDiaryQuery = `
        SELECT diaryDate, emoji
        FROM Diary;
                `;
    const [monthRows] = await connection.query(selectMonthDiaryQuery);
    return monthRows;
}



module.exports = {
    selectMonthDiary
};
