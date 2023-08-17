const POST_SCRAP_URL = "https://api.dadamda.me/v1/scraps";
const TOKEN_URL = "https://dadamda.me/google-login?token=";
const POST_HIGHLIGHTS_URL = "https://api.dadamda.me/v1/scraps/highlights";

// 해당 URL 경로 변경시, Path: assets/login/login.html에 있는 <a> 태그(id = dadamda-google-login)의 src도 함께 바꿔줘야 함.
const GOOGLE_LOGIN_URL = "https://api.dadamda.me/oauth2/authorization/google";