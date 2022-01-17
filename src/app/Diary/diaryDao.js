
// 해당 달의 이모티콘들 조회
async function selectMonthDiary(connection, params) {
    const selectMonthDiaryQuery = `
        select date_format(diaryDate, '%e') as day, emoji
        from Diary
        where userIdx=1 and year(diaryDate) - ? = 0 and month(diaryDate) - ? =0
        order by diaryDate;
    `;
    const [monthRows] = await connection.query(selectMonthDiaryQuery, params);
    return monthRows;
}

// 그날의 다이어리 가져오기
async function selectDiary(connection, params) {
    const selectDeliveryQuery = `
        select diaryIdx, emoji, date_format(updatedAt, '%Y년 %c월 %e일') as diaryDate, contents, imgUrl as image
        from Diary
        where userIdx=1 and year(diaryDate) - ? = 0 and month(diaryDate) - ? =0
          and day(diaryDate) - ? = 0;
                `;
    const [diaryInfo] = await connection.query(selectDeliveryQuery, params);
    return diaryInfo;
}

// 그날의 다이어리에서 그 다이어리의 답장 가져오기
async function selectDiaryAnswer(connection, diaryIdx) {
    const selectDeliveryQuery = `
        select answerIdx, answerUserIdx as userIdx, nickname, profImg as userProfImg,
               date_format(User.updatedAt, '%y.%m.%d') as answerTime, answerContents
        from Answer join User on answerUserIdx=User.userIdx
        where diaryIdx=?;
                `;
    const [diaryInfo] = await connection.query(selectDeliveryQuery, diaryIdx);
    return diaryInfo;
}

module.exports = {
    selectMonthDiary, selectDiary, selectDiaryAnswer
};
