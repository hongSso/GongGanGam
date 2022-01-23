const jwtMiddleware = require("../../../config/jwtMiddleware");
const userProvider = require("../../app/User/userProvider");
const userService = require("../../app/User/userService");
const baseResponse = require("../../../config/baseResponseStatus");
const {response, errResponse} = require("../../../config/response");

/**
 * API No. 0
 * API Name : 테스트 API
 * [GET] /app/test
 */
exports.getTest = async function (req, res) {
    return res.send(response(baseResponse.SUCCESS))
}

/**
 * API No. 4
 * API Name : 유저 생성 (회원가입) API
 * [POST] /app/users
 */
exports.postUsers = async function (req, res) {

    /**
     * Body: nickname, birthYear, gender
     */
    const {nickname, birthYear, gender} = req.body;

    // 빈 값 체크
    if (!nickname)
        return res.send(response(baseResponse.USER_USERID_EMPTY));

    if (!birthYear)
        return res.send(response(baseResponse.USER_BIRTHYEAR_EMPTY));

    if (!gender)
        return res.send(response(baseResponse.USER_GENDER_EMPTY));

    // createUser 함수 실행을 통한 결과 값을 signUpResponse에 저장
    const signUpResponse = await userService.createUser(
        nickname,
        birthYear,
        gender
    );

    // signUpResponse 값을 json으로 전달
    return res.send(signUpResponse);
};

/**
 * API No. 5
 * API Name : 회원 정보 수정 API + JWT + Validation
 * [PATCH] /app/users/:userIdx
 * body : nickname, birthYear, age, gender
 */
exports.patchUsers = async function (req, res) {

    // jwt - userIdx, path variable :userId

    const userIdFromJWT = req.verifiedToken.userId

    const userIdx = req.params.userId;
    const nickname = req.body.nickname;
    const birthYear = req.body.birthYear;
    const age = req.body.age;
    const gender = req.body.gender;

    // JWT는 이 후 주차에 다룰 내용
    if (userIdFromJWT != userIdx) {
        res.send(errResponse(baseResponse.USER_ID_NOT_MATCH));
    } else {
        if (!nickname) return res.send(errResponse(baseResponse.USER_NICKNAME_EMPTY));

        const editUserInfo = await userService.editUser(nickname, birthYear, age, gender);
        return res.send(editUserInfo);
    }
};


/**
 * API No. 6
 * API Name : 특정 유저 조회 API
 * [GET] /app/users/:userIdx
 */
exports.getUserById = async function (req, res) {

    /**
     * Path Variable: userIdx
     */
    const userIdx = req.params.userIdx;
    const userIdFromJWT = req.verifiedToken.userId
    // errResponse 전달
    if (!userIdx) return res.send(errResponse(baseResponse.USER_USERID_EMPTY));

    // userId를 통한 유저 검색 함수 호출 및 결과 저장
    const userByUserIdx = await userProvider.retrieveUser(userIdx);
    return res.send(response(baseResponse.SUCCESS, userByUserIdx));
};


// TODO: After 로그인 인증 방법 (JWT)
/**
 * API No. 4
 * API Name : 로그인 API
 * [POST] /app/login
 * body : email, passsword
 */
exports.login = async function (req, res) {

    const {email, password} = req.body;

    const signInResponse = await userService.postSignIn(email, password);

    return res.send(signInResponse);
};









// JWT 이 후 주차에 다룰 내용
/** JWT 토큰 검증 API
 * [GET] /app/auto-login
 */
exports.check = async function (req, res) {
    const userIdResult = req.verifiedToken.userId;
    console.log(userIdResult);
    return res.send(response(baseResponse.TOKEN_VERIFICATION_SUCCESS));
};
