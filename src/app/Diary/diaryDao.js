
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

// 공유된 다이어리 리스트 가져오기
async function selectShareList(connection) {
    const selectDeliveryQuery = `
        select DiaryShare.diaryIdx, Diary.userIdx, nickname as userNickname, profImg as userProfImg, contents as diaryContents,
               date_format(diaryDate, '%y.%m.%d') as diaryDate, isRead
        from DiaryShare join Diary on Diary.diaryIdx=DiaryShare.diaryIdx
                        join User on Diary.userIdx = User.userIdx
        where shareUserIdx=1 order by diaryDate;
                `;
    const [diaryInfo] = await connection.query(selectDeliveryQuery);
    return diaryInfo;
}

// 공유된 다이어리 가져오기
async function selectShareDiary(connection, diaryIdx) {
    const selectDeliveryQuery = `
        select Diary.userIdx, nickname as userNickname, profImg as userProfImg, diaryIdx,
               date_format(diaryDate, '%Y년 %c월 %e일') as diaryDate, contents as diaryContent, imgUrl as diaryImg
        from Diary join User on Diary.userIdx=User.userIdx
        where diaryIdx=?;
                `;
    const [diaryInfo] = await connection.query(selectDeliveryQuery, diaryIdx);
    return diaryInfo;
}

module.exports = {
    selectMonthDiary, selectDiary, selectDiaryAnswer, selectShareList, selectShareDiary
};
