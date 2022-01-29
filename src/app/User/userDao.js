
// 유저 생성
//const {USER_STATUS_EMPTY} = require("./baseResponseStatus");

async function insertUserInfo(connection, insertUserInfoParams) {
  const insertUserInfoQuery = `
        INSERT INTO User(nickname, birthYear, gender, type, email, accessToken)
        VALUES (?, ?, ?, ?, ?, ?);
    `;
  const insertUserInfoRow = await connection.query(
      insertUserInfoQuery,
      insertUserInfoParams
  );

  return insertUserInfoRow;
}

// 모든 유저 조회
async function selectUser(connection) {
  const selectUserListQuery = `
            SELECT nickname,birthYear, gender
            FROM User;
                `;
  const [userRows] = await connection.query(selectUserListQuery);
  return userRows;
}

// 닉네임으로 회원 조회
async function selectUserNickname(connection, nickname) {
  const selectUserNicknameQuery = `
    SELECT nickname
    FROM User
    WHERE nickname=?;
  `;
  const [nicknameRows] = await connection.query(selectUserNicknameQuery, nickname);
  return nicknameRows;
}

// userId 회원 조회
async function selectUserId(connection, userIdx) {
  const selectUserIdQuery = `
                 SELECT  nickname, birthYear, diaryPush, answerPush, chatPush, profImg
                 FROM User
                 LEFT JOIN Push ON Push.userIdx=User.userIdx
                 WHERE User.userIdx = ?;
                 `;
  const [userRow] = await connection.query(selectUserIdQuery, userIdx);
  return userRow;
}

// email 회원 조회
async function selectUserEmail(connection, email) {
  const selectUserIdQuery = `
    select userIdx
    from User
    where User.email=?; 
                 `;
  const [userRow] = await connection.query(selectUserIdQuery, email);
  return userRow;
}

// 이메일, 식별값으로 사용자 존재하는지 확인
async function selectUserCheck(connection, email, identification) {
  const params = [email, identification]
  const selectUserQuery = `
    select userIdx, accessToken
    from User
    where User.email = ? and accessToken = ?;
                 `;
  const [userRow] = await connection.query(selectUserQuery, params);
  return userRow;
}


async function updateUserInfo(connection,nickname, birthYear, gender, setAge, userIdx) {
  const updateUserQuery = `
    UPDATE User
    SET nickname=?, birthYear=?, gender=?, setAge=?
    WHERE userIdx = ?;`;
  const updateUserRow = await connection.query(updateUserQuery, [nickname, birthYear, gender, setAge, userIdx]);
  return updateUserRow[0];
}

async function selectUserStatus(connection, userIdx){
  const selectUserStatusQuery = `
    SELECT status
    FROM User
    WHERE userIdx=?;`;
  const [selectStatusRow] = await connection.query(selectUserStatusQuery,userIdx);
  return selectStatusRow;
}

async function updateUserStatus(connection,  userIdx, status) {
  const updateUserStatusQuery = `
    UPDATE User
    SET status = ?
    WHERE userIdx = ?;`;
  const updateUserStatusRow = await connection.query(updateUserStatusQuery, ['INACTIVE', userIdx]);
  return updateUserStatusRow[0];
}

async function updateDiaryPush(connection, userIdx, diaryPush) {

  const updateDiaryPushQuery = `
    UPDATE Push
    SET diaryPush = ?
    WHERE userIdx = ?;`;
  const updateDiaryPushRow = await connection.query(updateDiaryPushQuery,[diaryPush, userIdx]);
  return updateDiaryPushRow[0];
}

async function updateAnswerPush(connection, userIdx, answerPush){
  const updateAnswerPushQuery = `
    UPDATE Push
    SET answerPush = ?
    WHERE userIdx = ?;`;
  const updateAnswerPushRow = await connection.query(updateAnswerPushQuery,[answerPush, userIdx]);
  return updateAnswerPushRow[0];
}

async function updateChatPush(connection, userIdx, chatPush){
  const updateChatPushQuery = `
    UPDATE Push
    SET chatPush = ?
    WHERE userIdx = ?;`;
  const updateChatPushRow = await connection.query(updateChatPushQuery,[chatPush, userIdx]);
  return updateChatPushRow[0];
}

module.exports = {
  selectUser,
  selectUserNickname,
  selectUserId,
  insertUserInfo,
  updateUserInfo,
  updateUserStatus,
  updateDiaryPush,
  updateAnswerPush,
  updateChatPush,
  selectUserStatus,
  selectUserCheck,
  selectUserEmail
};
