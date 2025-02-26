//Response로 보내줄 상태코드와 메세지 등을 이 파일에서 관리함

module.exports = {

    // Success
    SUCCESS : { "isSuccess": true, "code": 1000, "message":"성공" },

    // Common
    TOKEN_EMPTY : { "isSuccess": false, "code": 2000, "message":"JWT 토큰을 입력해주세요." },
    TOKEN_VERIFICATION_FAILURE : { "isSuccess": false, "code": 3000, "message":"JWT 토큰 검증 실패" },
    TOKEN_VERIFICATION_SUCCESS : { "isSuccess": true, "code": 1001, "message":"JWT 토큰 검증 성공" }, // ?

    //Request error
    SIGNUP_EMAIL_EMPTY : { "isSuccess": false, "code": 2001, "message":"이메일을 입력해주세요" },
    SIGNUP_EMAIL_LENGTH : { "isSuccess": false, "code": 2002, "message":"이메일은 30자리 미만으로 입력해주세요." },
    SIGNUP_EMAIL_ERROR_TYPE : { "isSuccess": false, "code": 2003, "message":"이메일을 형식을 정확하게 입력해주세요." },
    SIGNUP_PASSWORD_EMPTY : { "isSuccess": false, "code": 2004, "message": "비밀번호를 입력 해주세요." },
    SIGNUP_PASSWORD_LENGTH : { "isSuccess": false, "code": 2005, "message":"비밀번호는 6~20자리를 입력해주세요." },
    SIGNUP_NICKNAME_EMPTY : { "isSuccess": false, "code": 2006, "message":"닉네임을 입력 해주세요." },
    SIGNUP_NICKNAME_LENGTH : { "isSuccess": false,"code": 2007,"message":"닉네임은 최대 20자리를 입력해주세요." },

    SIGNIN_EMAIL_EMPTY : { "isSuccess": false, "code": 2008, "message":"이메일을 입력해주세요" },
    SIGNIN_EMAIL_LENGTH : { "isSuccess": false, "code": 2009, "message":"이메일은 30자리 미만으로 입력해주세요." },
    SIGNIN_EMAIL_ERROR_TYPE : { "isSuccess": false, "code": 2010, "message":"이메일을 형식을 정확하게 입력해주세요." },
    SIGNIN_PASSWORD_EMPTY : { "isSuccess": false, "code": 2011, "message": "비밀번호를 입력 해주세요." },

    USER_USERID_EMPTY : { "isSuccess": false, "code": 2012, "message": "userId를 입력해주세요." },
    USER_USERID_NOT_EXIST : { "isSuccess": false, "code": 2013, "message": "해당 회원이 존재하지 않습니다." },

    USER_USEREMAIL_EMPTY : { "isSuccess": false, "code": 2014, "message": "이메일을 입력해주세요." },
    USER_USEREMAIL_NOT_EXIST : { "isSuccess": false, "code": 2015, "message": "해당 이메일을 가진 회원이 존재하지 않습니다." },
    USER_ID_NOT_MATCH : { "isSuccess": false, "code": 2016, "message": "유저 아이디 값을 확인해주세요" },
    USER_NICKNAME_EMPTY : { "isSuccess": false, "code": 2017, "message": "변경할 닉네임 값을 입력해주세요" },

    USER_STATUS_EMPTY : { "isSuccess": false, "code": 2018, "message": "회원 상태값을 입력해주세요" },

    // Response error
    SIGNUP_REDUNDANT_EMAIL : { "isSuccess": false, "code": 3001, "message":"중복된 이메일입니다." },
    SIGNUP_REDUNDANT_NICKNAME : { "isSuccess": false, "code": 3002, "message":"중복된 닉네임입니다." },

    SIGNIN_EMAIL_WRONG : { "isSuccess": false, "code": 3003, "message": "아이디가 잘못 되었습니다." },
    SIGNIN_PASSWORD_WRONG : { "isSuccess": false, "code": 3004, "message": "비밀번호가 잘못 되었습니다." },
    SIGNIN_INACTIVE_ACCOUNT : { "isSuccess": false, "code": 3005, "message": "비활성화 된 계정입니다. 고객센터에 문의해주세요." },
    SIGNIN_WITHDRAWAL_ACCOUNT : { "isSuccess": false, "code": 3006, "message": "탈퇴 된 계정입니다. 고객센터에 문의해주세요." },

    //Connection, Transaction 등의 서버 오류
    DB_ERROR : { "isSuccess": false, "code": 4000, "message": "데이터 베이스 에러"},
    SERVER_ERROR : { "isSuccess": false, "code": 4001, "message": "서버 에러"},
 

    // 5000번대 수이
    DIARY_YEAR_EMPTY : { "isSuccess": false, "code": 5001, "message": "연도를 입력해주세요."},
    DIARY_MONTH_EMPTY : { "isSuccess": false, "code": 5002, "message": "달을 입력해주세요."},
    DIARY_DAY_EMPTY : { "isSuccess": false, "code": 5003, "message": "날짜를 입력해주세요."},
    DIARY_DIARYIDX_EMPTY : { "isSuccess": false, "code": 5004, "message": "diaryIdx를 입력해주세요."},
    DIARY_DIARYIDX_NOT_EXIST : { "isSuccess": false, "code": 5005, "message": "존재하지 않는 다이어리입니다."},
    USER_NOT_EXIST : { "isSuccess": false, "code": 5006, "message": "존재하지 않는 유저입니다."},
    DIARY_USER_INVALID : { "isSuccess": false, "code": 5007, "message": "수정할 권한이 없는 유저입니다."},
    ANSWER_ANSWERIDX_EMPTY : { "isSuccess": false, "code": 5008, "message": "answerIdx를 입력해주세요."},
    ANSWER_USERIDX_INVALID : { "isSuccess": false, "code": 5008, "message": "유저를 다시 확인해주세요."},

    // 6000번 소연
    USER_BIRTHYEAR_EMPTY: {"isSuccess": false, "code": 6000, "message": "출생년도 값을 입력해주세요."},
    USER_GENDER_EMPTY: {"isSuccess": false, "code": 6001, "message": "성별을 입력해주세요."},
    USER_DIARY_PUSH_EMPTY: {"isSuccess": false, "code": 6003, "message": "받은일기 알람 설정을 선택해주세요."},
    USER_CHAT_PUSH_EMPTY : {"isSuccess": false, "code": 6004, "message": "채팅 알람 설정을 선택해주세요."},
    USER_NICKNAME_EMPTY : {"isSuccess": false, "code": 6005, "message": "닉네임을 입력해주세요."},
    USER_STATUS_ALREADY_INACTIVE : {"isSuccess": false, "code": 6006, "message": "이미 탈퇴한 회원입니다."},

}
