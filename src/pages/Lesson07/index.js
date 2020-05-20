import React from "react";
import LessonPage from "../../components/LessonPage";
import Chart from "../../components/Chart07";
import instruction from "./instruction.md";

const convertData = (input) => {
  //各プロパティcreatedAtの値を時間以外のみに変える
  //各データ(input）を変数itemに代入して処理を繰り返す
  for (const item of input) {
    //値をまず取得 
    //new Data()の返り値はUTC (←この１行で−9時間になっているのか？)
    const d = new Date(`${item.createdAt} UTC`); 
    const year = d.getFullYear();
    //padStartメゾットは配列に対して使用するため、文字列に変換する
    const month = `${d.getMonth() + 1}`.padStart(2, "0"); //1月＝０となるため+1
    const date = `${d.getDate()}`.padStart(2, "0");
    item.createdAt = `${year}-${month}-${date}`;
  }
  //各createdAtプロパティの値のみ集めた配列を作って昇順に（重複なし）
  const datas = Array.from(new Set(input.map(({createdAt}) => createdAt)));
  datas.sort(); //文字列の場合は引数なしで大丈夫
  //countオブジェを生成 (←なぜ？)
  const count = {
    tweet:{},
    retweet:{}
  };
  /*配列datasの各要素に件数のプロパティを追加・初期化
  つまり各日付の各件数をそれぞれ初期化*/ 
  for(const d of datas){
    count.tweet[d] = 0;
    count.retweet[d] = 0;
  }
  // 各日付の各件数をカウント
  for(const {createdAt, isRetweet} of input){
    if(isRetweet){
      count.retweet[createdAt] += 1;
    }else{
      count.tweet[createdAt] += 1;
    }
  }
  /*目的の形になるようなオブジェクトに変形する
  まず配列０番目の要素tweet、次に１番目の要素vretweerを処理している*/
  return ["tweet","retweet"].map((item) =>{
    return {
      id: item,
      data: datas.map((d) => {
        return {
          x: d,
          y: count[item][d]
        };
      }),
    };
  });
};

const Lesson = () => {
  return (
    <LessonPage
      answerUrl="/answer07"
      convertData={convertData}
      dataUrl="data/covid19-tweets.json"
      instruction={instruction}
      title="Lesson 07"
      Chart={Chart}
    />
  );
};

export default Lesson;
