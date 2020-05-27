import React from "react";
import LessonPage from "../../components/LessonPage";
import Chart from "../../components/Chart07";
import instruction from "./instruction.md";

const convertData = (input) => {
  //各プロパティcreatedAtの値を年月日のみに変更
  for (const item of input) {
    const d = new Date(`${item.createdAt} UTC`); 
    const year = d.getFullYear();
    //padStartメゾットで2桁になるように空いたところを０埋めする（配列に対して使用するため、文字列に変換すること）
    const month = String(d.getMonth()+1).padStart(2,"0"); //1月＝０となるため+1
    const date = String(d.getDate()).padStart(2, "0");
    item.createdAt = `${year}-${month}-${date}`;
  }
  //各createdAtプロパティの値のみ集めた配列を作って昇順に（重複なし）
  //カウント用にcountオブジェクトを作り、ネストでtweet・retweetオブジェクトを作って各日付の件数をカウントする
  const datas = Array.from(new Set(input.map(({createdAt}) => createdAt)));
  datas.sort(); //文字列の場合は引数なしで大丈夫
  const count = {
    tweet:{},
    retweet:{}
  };
  //tweet・retweetオブジェクトに日付をキー名としたプロパティを追加・初期化
  for(const d of datas){
    count.tweet[d] = 0;
    count.retweet[d] = 0;
  }
  //各日付の各件数をカウント
  for(const {createdAt, isRetweet} of input){
    if(isRetweet){
      count.retweet[createdAt] += 1;
    }else{
      count.tweet[createdAt] += 1;
    }
  }
  //配列を目的の形になるようなオブジェクトに変形する
  return ["tweet","retweet"].map((item) =>{
    return {
      id: item,  //見ている配列要素そのまま
      data: datas.map((d) => {
        return {
          x: d, 
          y: count[item][d] 
          /*
          countオブジェクトのtweet・retweetオブジェクトの日付（今見ているdatasの値）プロパティの値を代入
          */
        };
      }),
    };
  });
  /*考え中
  //各createdAtプロパティの値のみ集めた配列を作って昇順に（重複なし）
  const dates = Array.from(new Set(input.map(({createdAt}) => createdAt)));
  dates.sort();
  dates.map((d) => {
    return {
      data: d,
      tweet: 0,
      retweet: 0,
    };
  });
  //カウント処理
  //配列をオブジェクト化に
  const  array = ["tweet","retweet"];
  array.map((item) => {
    return {
      id: item,
      data: dates.map((d) => {
        return{
          x: d,
        };
      })
    };
  });
  */
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
