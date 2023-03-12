# 내일배움 캠프 Final project - Be My Desk 


<br>

## 프로젝트명
**Be My Desk**

<br>

## :computer: 프로젝트 소개 
데스크 셋업을 소개하고 각자의 셋업을 공유하는 커뮤니티 사이트입니다.

- [보러가기](https://be-my-desk.vercel.app)

- [깃허브](https://github.com/young-02/BeMyDesk.git)

- [시연영상]()


<br>

## ⏲️ 개발 기간
2023.02.06(월) ~ 03.13(월) (5주)


<br>

## :book: 목차

1. [프로젝트 개요](#프로젝트-개요)
2. [주요 기술 스택 ](#주요-기술-스택)
3. [주요 기능](#주요-기능)
4. [트러블 슈팅](#트러블-슈팅)
5. [실행 방법](#실행-방법)
6. [팀 소개](#팀-소개)

<br>

## 📎프로젝트 개요
데스크테리어 공유 커뮤니티, **Be my desk.**

’**나다운 공간에서 나다움을 만들다.**’


데스크테리어 = 데스크 + 인테리어
재택근무가 많아짐에 따라 데스크테리어에 관심을 가지는 사람 증가했습니다 

나만의 데스크 셋업을 가지고 있거나, 가지고 싶은 사람들을 위한 공간 Be my desk.
사용한 제품과 함께 나만의 데스크 셋업을 소개할 수 있습니다. 당신이 어떤 사람인지도요!

<br>

## 주요 기술 스택
- react
- nextJS
- Firebase
- typescript
- react-query

<br>

## 주요 기능

    1. 포스트 필터링(트렌트, 직업별(개발자, 디자이너, 학생, 게이머)
  
  
<img src="https://velog.velcdn.com/images/j_hana01/post/aa73df56-84f7-44d3-9c9b-f6d956f1b44c/image.gif" width="50%" height="50%"> 

  - 포스트리스트 페이지전체글, 트렌드(좋아요 많은 순), 직업별 필터링(개발자, 디자이너, 학생, 게이머)별로 필터링
  - 메인 페이지에서 직업별로 필터링
  
<br>

    2. 검색 1 (포스트의 제목, 내용 검색)


  <img src="https://velog.velcdn.com/images/j_hana01/post/aa73df56-84f7-44d3-9c9b-f6d956f1b44c/image.gif" width="50%" height="50%">
  
  
  - 상단 오른쪽 검색창에서 글 제목과 내용을 기준으로 검색 가능


<br>  

    3. 검색 2 (네이버 오픈 API 사용하여 제품 검색

 <img src="https://velog.velcdn.com/images/j_hana01/post/b4161553-d5c0-4f15-8511-ebf2b34b11c1/image.gif" width="50%" height="50%">

- 글쓰기 페이지 내 모달 안에서 네이버 쇼핑 검색 가능

<br>

    4. 공유(카카오톡, 페이스북, 링크)

 <img src="https://velog.velcdn.com/images/j_hana01/post/cb5c8b29-433e-4bc2-807f-c85ece54e1e4/image.gif" width="50%" height="50%">

- 드롭다운 형식의 공유하기 버튼 클릭 시 카카오톡, 페이스북, 해당 페이지 링크 직접 공유 
선택 가능

<br>

    5. 좋아요, 스크랩, 팔로우

<img src="https://velog.velcdn.com/images/j_hana01/post/64a2b137-3232-47aa-9ae6-58c601716f6e/image.gif" width="50%" height="50%">

- 마음에 드는 게시물 좋아요와 스크랩 가능
- 계속 소식을 받아보고 싶은 사람 팔로우 가능

<br>


    6. 마이페이지 내 마이포스트, 스크랩, 좋아요, 팔로우 조회

<img src="https://velog.velcdn.com/images/j_hana01/post/f30310f8-1af0-4efc-a7b1-1f123519af94/image.gif" width="50%" height="50%">

- 마이페이지에서 자신이 작성한 게시물, 스크랩 한 글, 팔로우 조회 및 삭제 가능 

<br>

    7. 유저인증(비밀번호찾기, SNS유저 추가정보 입력)
<img src="https://velog.velcdn.com/images/j_hana01/post/a6a01654-47ab-43e1-bb2a-314e6a786bf2/image.gif" width="50%" height="50%">

<img src="https://velog.velcdn.com/images/j_hana01/post/577ef186-5251-4890-88ca-175172ac55a0/image.gif" width="50%" height="50%">

- SNS 로그인 유저의 추가정보 입력(닉네임 중복검사),
- 비밀번호 찾기 시 유저 회원타입(SNS/패스워드 회원가입) 검증
  
<br>

## 트러블 슈팅

☑️: [React-Query 로 서버 데이터 효율적으로 관리하기](https://www.notion.so/fd9a3600206b495691f326cccf24ac94)


☑️: [이미지 압축으로 렌더링 속도 높이기](https://www.notion.so/fd9a3600206b495691f326cccf24ac94)


☑️: [SEO 검색 최적화](https://www.notion.so/fd9a3600206b495691f326cccf24ac94)


☑️: [검색어 카테고리 제한](https://www.notion.so/fd9a3600206b495691f326cccf24ac94)

<br>

## 실행 방법
1. **git clone**

```
$ git clone https://github.com/young-02/BeMyDesk.git
$ yarn install
$ yarn dev
```

2. **firebase key**
- firebase 가입
- firebase 프로젝트 생성 -> Cloud Firestore, Storage, Authentication 생성
- 프로젝트 개요 -> 프로젝트 설정 -> 내 앱 -> sdk 복사
- .env.local 생성 후 다음과 같이 설정
 ```
 NEXT_PUBLIC_FIREBASE_PUBLIC_API_KEY = apiKey
 NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN = authDomain
 NEXT_PUBLIC_FIREBASE_PROJECT_ID = projectId
 NEXT_PUBLIC_FIREBASE_STORAGEBUC_KEY = storageBucket
 NEXT_PUBLIC_FIREBASE_MESSAGINGING_SENDER_ID = messagingSenderId
 NEXT_PUBLIC_FIREBASE_APP_ID = appId
```
- `http://localhost:3000` **접속**

<br>

## 팀 소개

|이름|역할|
|---|---|
|성태영|ㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇ|
|박다영|ㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇ|
|정하나|ㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇ|
|임홍구|ㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇ|
|이성규|ㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇ|
