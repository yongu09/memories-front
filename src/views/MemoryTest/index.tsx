import React, { useEffect, useState } from 'react'
import './style.css';
import { MemoryCard } from 'src/types/interfaces';

// interface: 메모리 검사 카드 컴포넌트 속성 //
interface CardProps {
  memoryCard : MemoryCard;
  onClick: (id: number) => void;
}

// component: 메모리 검사 카드 컴포넌트 //
function Card({ memoryCard, onClick } : CardProps) {

  const { id, color, isReverse } = memoryCard;

  if (isReverse)
  return (
    <div className='reversed-card' onClick={() => onClick(id)}></div>
  )

  // render: 메모리 검사 카드 컴포넌트 렌더링 //
  return(
    <div style={{ backgroundColor: color }}></div>
  )
}

// variable: 기억력 검사 설명 //
const DESCRIPTION = '16개의 뒤집혀진 카드의 앞면을 기억하여\n동일한 앞면의 카드 두 개를 연속해서 뒤집어\n모두 앞면으로 돌리면 성공입니다.\n검사 시작부터 모두 돌리는데 까지 걸린 시간을 측정합니다.';

// variable: 색상 리스트 //
const COLORS = ['#CF3832', '#A6AAA4', `#B40089`, '#57A365', '#334194', '#F8F253', '#DD883D', '#00AFFF'];
// variable: 무작위 색상 리스트 //
const MIX_COLORS = [...COLORS, ...COLORS].sort(() => Math.random() - 0.5);

// component: 기억력 검사 화면 컴포넌트 //
export default function MemoryTest() {

  // state: 검사 시작 여부 상태 //
  const [isStarted, setStarted] = useState<Boolean>(false);
  // state: 검사 시작 시간 상태 //
  const [startTime, setStartTime] = useState<number>(0);
  // state: 카드 리스트 상태 //
  const [memoryCards, setMemoryCards] = useState<MemoryCard[]>([]);
  // state: 선택된 카드 리스트 상태 //
  const [selectedCards, setSelectedCards] = useState<MemoryCard[]>([]);

  // event handler: 검사 시작 버튼 클릭 이벤트 처리 //
  const onStartClickHandler = () => {
    setStarted(true);
  };

  // event handler: 카드 클릭 이벤트 처리 //
  const onCardClickHandler = (id: number) => {
    const selectedCard = memoryCards.find(card => card.id === id);
    if (selectedCards.length === 2 || !selectedCard) return;

    const newSelectedCards = [... selectedCards, selectedCard];
    setSelectedCards(newSelectedCards);
    
    const newMemoryCards: MemoryCard[] = memoryCards.map(
      card => card.id === id ? {...card, isReverse: false } : card
    );
    setMemoryCards(newMemoryCards);
  };

  // effect: 게임 상태가 변경될 시 실행할 함수 //
  useEffect(() => {
    if (!isStarted) return;

    const initMemoryCards: MemoryCard[] = 
    MIX_COLORS.map((color, id) => ({
      id, color, isReverse: false
    }));
    setMemoryCards(initMemoryCards);

    setTimeout(() => {
      const memoryCards = 
        initMemoryCards.map(card => ({...card, isReverse: true }))
      setMemoryCards(memoryCards);
      setStartTime(Date.now());
    }, 3000)
  }, [isStarted])

  // render: 기억력 검사 화면 컴포넌트 렌더링 //
  return (
    <div id='memory-test-wrapper'>
      <div className='container'>
        <div className='description-box'>
          <div className='title'>기억력 검사</div>
          <div className='description'>{DESCRIPTION}</div>
        </div>
        <div className='test-box'>
          {isStarted ? 
          <div className='card-container'>
            {memoryCards.map((memoryCard, index) => 
            <Card key={index} memoryCard={memoryCard} onClick={onCardClickHandler} />
            )}
          </div> :
          <div className='button middle primary' onClick={onStartClickHandler}>검사 시작</div>
          }
        </div>
      </div>
    </div>
  )
}
