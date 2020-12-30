# ShieldsCraft

[![GitHub license](https://img.shields.io/github/license/Tekiter/shields-craft?style=flat-square)](https://github.com/Tekiter/shields-craft/blob/master/LICENSE.md)
[![GitHub stars](https://img.shields.io/github/stars/Tekiter/shields-craft?style=flat-square)](https://github.com/Tekiter/shields-craft/stargazers)
[![GitHub issues](https://img.shields.io/github/issues/Tekiter/shields-craft?style=flat-square)](https://github.com/Tekiter/shields-craft/issues)

**ShieldsCraft** 를 사용하면 [Shields.io](http://shields.io/) 뱃지를 쉽게 만들 수 있습니다.

-   [English](README.md)
-   [한국어](README.ko.md)

## 시작하기

[tekiter.github.io/shields-craft](https://tekiter.github.io/shields-craft)

## 소개

[Shields.io](http://shields.io/) 는 URL만으로 손쉽게 뱃지를 만들고 README 파일 등에 넣을 수 있게 해주는 서비스입니다. 그러나 뱃지를 입맛대로 꾸미려면 다음과 같은 과정을 거쳐야합니다.

1. 사이트에서 어떤 스타일 옵션들이 있나 확인하기
2. **직접 손으로** 해당 옵션에 대한 URL 쿼리 스트링을 만들기
3. 뱃지 URL 뒤에다가 옵션 쿼리 스트링 추가하기
4. 브라우저 주소칸에다 URL 붙여넣고 새로고침
5. 어떻게 보이나 확인하기
6. 맘에 들때까지 반복

이게 불편해서 직접 만들었습니다.

ShieldsCraft 가 여러분을 대신해서 뱃지 URL을 만들어줍니다.

## 기능

-   GUI 버전의 스타일 옵션
-   뱃지 미리보기
-   색상 선택 (Color Picker)
-   로고 선택
-   URL/Markdown/HTML 포맷으로 내보내기

현재 Static Badge 타입만 지원합니다.

## 기술 스택

-   Typescript
-   React
-   Next.js
-   Semantic UI React
-   Storybook

## 개발

1. Node 버전 12 이상과 yarn 을 설치합니다.
2. 이 리포지토리를 clone 합니다.
3. `yarn install` 명령으로 필요한 디펜던시들을 설치합니다.
4. `yarn dev` 명령으로 개발 서버를 실행합니다.
5. `yarn storybook` 명령으로 Storybook 서버를 실행합니다.

Static HTML 버전으로 빌드하려면, `yarn build` 명령으로 실행한 다음에 `yarn export` 명령을 실행하면 됩니다.

## 라이선스

프로젝트 라이선스는 [여기서](LICENSE.md) 확인 가능합니다.

모든 생성된 뱃지들은 [Shields.io](https://github.com/badges/shields) 의 뱃지들입니다.
