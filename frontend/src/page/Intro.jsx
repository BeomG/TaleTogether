import * as React from 'react';
import Box from '@mui/material/Box';
import CommunityButton from '../components/main/CommunityButton';
import GameButton from '../components/main/GameButton';
import MainButton from '../components/main/MainButton';
import MyButton from '../components/main/MypageButton';
import '../components/main/Button.css';
import { Link } from 'react-router-dom';

export default function Intro() {
  return (
    <>
      <h1>인트로</h1>
      {/* <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          width: '95%',
          height: '95%',
          flexGrow: 1,
          bgcolor: '#CCD5AE',
          borderRadius: '61px',
          justifyContent: 'center',
          alignItems: 'center',
          boxShadow: 5,
        }}
      >
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'row',
            width: '95%',
            height: '2rem',
            mt: '1rem',
            alignItems: 'center',
          }}
        >
          <Link to="/community">
            <CommunityButton></CommunityButton>
          </Link>
          <Link to="/game">
            <GameButton></GameButton>
          </Link>
          <MainButton state="Active"></MainButton>
          <Link to="/mypage">
            <MyButton></MyButton>
          </Link>
        </Box>
        <Box
          sx={{
            width: '90%',
            height: '90%',
            backgroundImage: "url('./assets/Layerbg.png')",
            backgroundRepeat: 'no-repeat',
            backgroundSize: 'cover',
            borderRadius: '61px',
            backgroundPosition: 'center', // 이미지를 가운데에 맞춰 보이도록 설정
          }}
        ></Box>
      </Box> */}
    </>
  );
}
