import React from "react";
import LessonPage from "../../components/LessonPage";
import Chart from "../../components/Chart07";
import instruction from "./instruction.md";

const convertData = (input) => {
  //各プロパティcreatedAtの値を時間以外のみに変える
  //inputオブジェクトのプロパティを変数itemに代入して処理を繰り返す
  for (const item of input) {
    const d = new Date(`${item.createdAt} UTC`); //値をまず取得
    const year = d.getFullYear();
    const month = `${d.getMonth() + 1}`.padStart(2, "0"); //1月＝０となるため+1
    const date = `${d.getDate()}`.padStart(2, "0");
    //padStartメゾットは配列に対して使用するため、文字列に変換する
    item.createdAt = `${year}-${month}-${date}`;
  }
  //createdAtの要素のみの配列を作る？
  const datas = Array.from(new Set(input.map(({createdAt}) => createdAt)));
  datas.sort(); //文字列の場合は引数なしで大丈夫
  const count = {
    tweet:{},
    retweet:{}
  };
  //各件数の初期化
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
  //オブジェクト内を作成
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
