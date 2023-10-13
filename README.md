수정일 : 2023-10-13 14:40

# dadamda-chrome-extension

## 📰 프로젝트 소개
모든 사이트의 URL을 담을 수 있고 여러 스크랩들을 모아 사용자가 보드를 꾸미고 공유할 수 있는 웹 서비스입니다.

## 🐳 개발 환경
- Vanilla Java Script
- HTML
- CSS
- VS Code

## 🖥️ 관리 도구
- 형상 관리 : Github
- 이슈 관리 : Jira
- 커뮤니케이션 : Confluence
- 디자인 : Figma

## 📥 다운로드
<img src="https://github.com/SWM-team-forever/dadamda-chrome-extension/assets/75533232/bb923d90-dd7b-4925-a7f1-8c76b8c7f0ab">

https://chrome.google.com/webstore/detail/dadamda/kgaiabolccidmgihificdfaimdlfmcfj?hl=ko

## 🛠️ 로컬 설치
1. 가장 최신의 버전인 latest인 release에서 Source code.zip을 다운로드 받습니다.
2. 파일의 압축을 풉니다.
3. Chrome에서 확장 페이지(chrome://extensions)로 이동합니다.
4. 개발자 모드를 활성화합니다.
5. 압축 해제된 폴더를 페이지의 아무 곳이나 끌어 가져옵니다(이후에는 폴더를 삭제하지 마십시오).

## 🔧 test
1. E2E 테스트에 필요한 npm 패키지를 설치하기 위해서, `npm install`을 실행합니다.
(1번의 작업은 dadamda-chrome-extension 프로젝트를 처음 열 때만 수행하면 됩니다.)
2. Puppeteer E2E 테스트 실행하기 위해서, `npm test`를 실행합니다.
