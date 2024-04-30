// 変数の初期化
let untyped ='';
let typed ='';
let score = 0;
// 必要のHTML
const untypefield = document.getElementById('untyped')
const typefield =document.getElementById('typed')
const wrap =document.getElementById('wrap')
const start = document.getElementById('start')
const count = document.getElementById('count')
// kadai
const counter = document.getElementById('counter')
let counting = 0;

// 複数のテキストを格納する配列
const textLists = [
  'Hello World','This is my App','How are you?',
  'Today is sunny','I love JavaScript!','Good morning',
  'I am Japanese','Let it be','Samurai',
  'Typing Game','Information Technology',
  'I want to be a programmer','What day is today?',
  'I want to build a web app','Nice to meet you',
  'Chrome Firefox Edge Safari','machine learning',
  'Brendan Eich','John Resig','React Vue Angular',
  'Netscape Communications','undefined null NaN',
  'Thank you very much','Google Apple Facebook Amazon',
  'ECMAScript','console.log','for while if switch',
  'var let const','Windows Mac Linux iOS Android',
  'programming','aaaaaaaaaaaa',
];

//ランダムなテキストを表示する
const createText = () => {
  // タイプした文字列をクリア
  typed = '';
  typefield.textContent = typed;

  // ランダム　数字.少数点切り上げ(ceil=切り捨て).ランダム
  let random = Math.floor(Math.random()*textLists.length);

  untyped =textLists[random];
  untypefield.textContent = untyped;
};

//キー入力の判定機能
const keyPress = (e) => {
  // 誤タイプの場合
  if(e.key !== untyped.substring(0,1)) {
    wrap.classList.add('mistyped')

    setTimeout(() => {
      wrap.classList.remove('mistyped')
    }, 100);
    return;
  }

  // 正タイプの場合
  // kadai
  counting++;
  counter.textContent = counting;

  score++;
  wrap.classList.remove('mistyped')
  typed += untyped.substring(0,1);
  untyped = untyped.substring(1);
  typefield.textContent = typed;
  untypefield.textContent = untyped;
  
  // もしテキストが無くなったら新しいテキストを表示
  if(untyped === '') {
    createText();
  }
};

//タイピングスキルのランクを判定する機能
const rankCheck = score => {
  //メッセージを格納する変数
  let text = '';

  // スコアに応じてメッセージを変数textに格納
  if(score < 100) {
    text = `あなたのランクはCです。\nBランクまであと${100 - score}`;
  } else if(score < 200) {
    text = `あなたのランクはBです。\nAランクまであと${200 - score}文字です。`;    
  } else if(score < 300) {
    text = `あなたのランクはAです。\nSランクまであと${300 - score}文字です。`;    
  } else if(score >= 300) {
    text = `あなたのランクはSです。\nおめでとうございます!`;  
  }
  
  //生成したメッセージと一緒に文字列を返す
  return `${score}文字打てました！\n${text}\n【OK】リトライ/【キャンセル】終了`;
};

//ゲームを終了する機能
const gameOver = id => {

  clearInterval(id);

  const result = confirm(rankCheck(score));

  if(result == true) {
    window.location.reload();
  }
};

//カウントダウンタイマーの機能 
const timer = () => {
  let time = count.textContent;

  const id = setInterval(() => {
    // カウントダウンする
    time--;
    count.textContent = time;
    // カウントが0で関数gameOverを持ってくる
    if(time <= 0) {

    // kadai02
    
      untypefield.textContent = 'タイムアップ！';
      typefield.textContent = '';
      setTimeout(() =>{
      gameOver(id);
    },100)

    }
  },1000);
}; 

//スタートをクリック時の処理
start.addEventListener('click',() =>{
  // 関数timerの実行
  timer();
  //ランダムなテキストを表示
  createText();
  // スタートボタンの非表示
  start.style.display ='none';
  // キーボードのイベント処理
  document.addEventListener('keypress',keyPress);

  // kadai
  counter.style.display = 'inline-block'
});

untypefield.textContent ='スタートボタンで開始'