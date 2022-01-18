const jwtMiddleware = require("../../../config/jwtMiddleware");
const diaryProvider = require("../../app/Diary/diaryProvider");
const diaryService = require("../../app/Diary/diaryService");
const baseResponse = require("../../../config/baseResponseStatus");
const {response, errResponse} = require("../../../config/response");


/**
 * API No. 12
 * API Name : 받은 일기 리스트 조회 API
 * [GET] /app/diarys/share
 */
exports.getSharedDiarys = async function (req, res) {

    const sharedDiaryResult = await diaryProvider.retrieveSharedDiaryList();
    return res.send(response(baseResponse.SUCCESS, sharedDiaryResult));

};

/**
 * API No. 14
 * API Name : 받은 일기 조회 API
 * [GET] /app/diarys/share/:diaryIdx
 */
exports.getSharedDiarys = async function (req, res) {

    const diaryIdx = req.params.diaryIdx;

    const sharedDiaryResult = await diaryProvider.retrieveSharedDiary(diaryIdx);
    return res.send(response(baseResponse.SUCCESS, sharedDiaryResult));

};

/**
 * API No. 16
 * API Name : 나의 다이어리 조회(캘린더 - 이모티콘) API
 * [GET] /app/diary?year=&month=
 */
exports.getDiarys = async function (req, res) {

    /**
     * Query String: year, month
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
     * Query String: year, month, day
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