const jwtMiddleware = require("../../../config/jwtMiddleware");
const diaryProvider = require("../../app/Diary/diaryProvider");
const diaryService = require("../../app/Diary/diaryService");
const baseResponse = require("../../../config/baseResponseStatus");
const {response, errResponse} = require("../../../config/response");

/**
 * API No. 16
 * API Name : 나의 다이어리 조회(캘린더 - 이모티콘) API
 * [GET] /app/diary?year=&month=
 */
exports.getDiarys = async function (req, res) {

    /**
     * Query String: email
     */
    const year = req.query.year;
    const month = req.query.month;

    if (!year) return res.send(errResponse(baseResponse.DIARY_YEAR_EMPTY));
    if (!month) return res.send(errResponse(baseResponse.DIARY_MONTH_EMPTY))

    const monthDiaryResult = await diaryProvider.retrieveMonthList(year, month);
    return res.send(response(baseResponse.SUCCESS, monthDiaryResult));

};


/**
 * API No. 16
 * API Name : 그날의 다이어리 조회 API
 * [GET] /app/diary/detail?year=&month=&day=
 */
exports.getDiaryDetail = async function (req, res) {

    /**
     * Query String: email
     */
    const year = req.query.year;
    const month = req.query.month;
    const day = req.query.day;

    if (!year) return res.send(errResponse(baseResponse.DIARY_YEAR_EMPTY));
    if (!month) return res.send(errResponse(baseResponse.DIARY_MONTH_EMPTY));
    if (!day) return res.send(errResponse(baseResponse.DIARY_DAY_EMPTY));

    const diaryResult = await diaryProvider.retrieveDiary(year, month, day);
    return res.send(response(baseResponse.SUCCESS, diaryResult));

};