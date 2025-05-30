import React, { useEffect } from 'react';
import { Route, Routes, useNavigate } from 'react-router';

import './App.css';
import Layout from './layouts/Layout';
import Auth from './views/Auth';
import { ACCESS_TOKEN, AUTH_ABSOLUTE_PATH, AUTH_PATH, CONCENTRATION_TEST_COMPLETE_PATH, CONCENTRATION_TEST_PATH, DIARY_PATH, DIARY_UPDATE_PATH, DIARY_VIEW_PATH, DIARY_WRITE_PATH, MAIN_ABSOLUTE_PATH, MAIN_PATH, MEMORY_TEST_COMPLETE_PATH, MEMORY_TEST_PATH, OTHERS_PATH } from './constants';

import { useCookies } from 'react-cookie';
import DiaryMain from './views/Diary';
import DiaryWrite from './views/Diary/Write';
import DiaryDetail from './views/Diary/Detail';
import DiaryUpdate from './views/Diary/Update';
import MemoryTest from './views/MemoryTest';
import MemoryTestComplete from './views/MemoryTest/Complete';
import ConcentratioTest from './views/ConcentrationTest';
import ConcentrationTestComplete from './views/ConcentrationTest/complete';
import Main from './views/Main';

// Router 구성
// - /auth : 로그인 및 회원가입 페이지

// - /main : 메인 페이지

// - /memory-test : 기억력 검사 페이지
// - /memory-test/commplete : 기억력 검사 완료 페이지

// - /concentration-test : 집중력 검사 페이지
// - /concentration-test/complete : 집중력 검사 완료 페이지

// - /diary : 일기 메인 페이지
// - /diary/write : 일기 작성 페이지
// - /diary/:diaryNumber : 일기 보기 페이지
// - /diary/:diaryNumber/update : 일기 수정 페이지

function App() {
  return (
    <Routes>
      <Route index element={<Index />} />
      <Route path={AUTH_PATH} element={<Auth />} />

      <Route element={<Layout />}>
        <Route path={MAIN_PATH} element={<Main />} />

        <Route path={MEMORY_TEST_PATH}>
          <Route index element={<MemoryTest />} />
          <Route path={MEMORY_TEST_COMPLETE_PATH} element={<MemoryTestComplete />} />
        </Route>

        <Route path={CONCENTRATION_TEST_PATH}>
          <Route index element={<ConcentratioTest />} />
          <Route path={CONCENTRATION_TEST_COMPLETE_PATH} element={<ConcentrationTestComplete/>} />
        </Route>

        <Route path={DIARY_PATH}>
          <Route index element={<DiaryMain />} />
          <Route path={DIARY_WRITE_PATH} element={<DiaryWrite />} />
          <Route path={DIARY_VIEW_PATH}>
            <Route index element={<DiaryDetail />} />
            <Route path={DIARY_UPDATE_PATH} element={<DiaryUpdate />} />
          </Route>
        </Route>
      
        <Route path={OTHERS_PATH} element={<>404 페이지</>} />
      </Route>
    </Routes>
  );
}

export default App;

// component: Root 경로 컴포넌트 //
function Index() {

  // state: cookie 상태 //
  const [cookies] = useCookies();

  // function: 네비게이터 함수 //
  const navigator = useNavigate();

  // effect: 컴포넌트가 렌더링 될 때 실행할 함수 //
  useEffect(() => {
    if (cookies[ACCESS_TOKEN]) navigator(MAIN_ABSOLUTE_PATH);
    else navigator(AUTH_ABSOLUTE_PATH);
  }, []);

  // render: Root 경로 컴포넌트 렌더링 //
  return null;
}