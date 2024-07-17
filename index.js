// confirm('같은 사진을 제한 시간 내에 잘 매칭해봐 ! 준비됐어 ?');
// //confirm 커스텀이랑 제한시간 걸어보자


const cardArray = [
  {
    name: 'Untitled-1',
    img: './public/Untitled-1.png',
    id: null,
    done: false,
  },
  {
    name: 'Untitled-1',
    img: './public/Untitled-1.png',
    id: null,
    done: false,
  },
  {
    name: 'Untitled-2',
    img: './public/Untitled-2.png',
    id: null,
    done: false,
  },
  {
    name: 'Untitled-2',
    img: './public/Untitled-2.png',
    id: null,
    done: false,
  },
  {
    name: 'Untitled-3',
    img: './public/Untitled-3.png',
    id: null,
    done: false,
  },
  {
    name: 'Untitled-3',
    img: './public/Untitled-3.png',
    id: null,
    done: false,
  },
  {
    name: 'Untitled-4',
    img: './public/Untitled-4.png',
    id: null,
    done: false,
  },
  {
    name: 'Untitled-4',
    img: './public/Untitled-4.png',
    id: null,
    done: false,
  },
  {
    name: 'Untitled-5',
    img: './public/Untitled-5.png',
    id: null,
    done: false,
  },
  {
    name: 'Untitled-5',
    img: './public/Untitled-5.png',
    id: null,
    done: false,
  },
  {
    name: 'Untitled-6',
    img: './public/Untitled-6.png',
    id: null,
    done: false,
  },
  {
    name: 'Untitled-6',
    img: './public/Untitled-6.png',
    id: null,
    done: false,
  },
];

const gameDOM = [];

let clickFirst = -1;
let clickSecond = -1;
let clickCount = 0;

const getGameDOM = () => {
  const rows = document.querySelectorAll('.container .row');
  for (let i = 0; i < rows.length; i++) {
    gameDOM[i] = rows[i].querySelectorAll('.column');
  }
};

const setIdtoCardArray = () => {
  cardArray[0].id = '0-0';
  cardArray[1].id = '0-1';
  cardArray[2].id = '0-2';
  cardArray[3].id = '0-3';
  cardArray[4].id = '1-0';
  cardArray[5].id = '1-1';
  cardArray[6].id = '1-2';
  cardArray[7].id = '1-3';
  cardArray[8].id = '2-0';
  cardArray[9].id = '2-1';
  cardArray[10].id = '2-2';
  cardArray[11].id = '2-3';
};

const createBoard = () => {
  //2중 for문
  for (let i = 0; i < gameDOM.length; i++) {
    for (let j = 0; j < gameDOM[i].length; j++) {
      const card = document.createElement('img');
      card.setAttribute('src', './public/q.png');
      card.classList.add('eachImage');
      gameDOM[i][j].appendChild(card);
    }
  }
};

//페이지가 로딩 되었을 때 자동으로 실행되는 함수 : onload
onload = () => {
  //기존함수 새로운 정의 : 오버로딩
  getGameDOM();
  cardArray.sort(() => 0.5 - Math.random());
  setIdtoCardArray(); //섞여진 배열에 ID 부여
  createBoard();
};

const setClickHistory = (location) => {
  if (clickFirst === -1) {
    clickFirst = location;
  } else {
    clickSecond = location;
  }
};

const backFlip = () => {
  //처음 클릭한 카드의 인덱스는 clickFirst에 저장됨
  //두번째 클릭한 카드의 인덱스는 clickSecond에 저장됨
  //이 둘의 타입은 number기때문에 gameDOM으로 접근해서
  //0~11까지 받았으면 1-3, 2-2 와 같은 형태로 파싱
  const parseIdFirst = cardArray[clickFirst].id.split('-');
  const parseIdSecond = cardArray[clickSecond].id.split('-');
  setTimeout(() => {
    gameDOM[parseIdFirst[0]][parseIdFirst[1]].querySelector('img').src =
      './public/q.png';
    gameDOM[parseIdSecond[0]][parseIdSecond[1]].querySelector('img').src =
      './public/q.png';
  }, 500);
};

//2번째 클릭했을 때 실행
const isCorrect = () => {
  if (cardArray[clickFirst].name === cardArray[clickSecond].name) {
    cardArray[clickFirst].done = true;
    cardArray[clickSecond].done = true;
  } else {
    backFlip(); //card가 일치하지 않을때
  }
};

const flip = (location) => { //location은 함수호출위치에서 매개변수를 받아옴
  //done이 true면 함수가 실행하지 않음
  if (!cardArray[location].done) {
    setClickHistory(location); // -1인지 판단 후 배치

    const parseId = cardArray[location].id.split('-');

    gameDOM[parseId[0]][parseId[1]].querySelector('img').src =
      cardArray[location].img;

    clickCount++;

    if (clickCount === 2) {
      clickCount = 0;
      isCorrect();
    }

    if (clickFirst !== -1 && clickSecond !== -1) {
      clickFirst = -1;
      clickSecond = -1;
    }
  }
};

//모두 정답일 때 코드 짜보자 
// const allCorrect = () => {
//   for(let i =0; i < cardArray.length; i++){
//     if (cardArray[clickFirst].done == true &&
//       cardArray[clickSecond].done == true) {
      
//       alert('ㅅㄱ')
//     }
//   }
// };

// allCorrect();




