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

  //考え中（tweet・retweetオブジェクトを作り、日付をプロパティ名としてカウントしたい）
  //各createdAtプロパティの値のみ集めた配列を作って昇順に（重複なし）
  const dates = Array.from(new Set(input.map(({createdAt}) => createdAt)));
  dates.sort(); //文字列の場合は引数なしで大丈夫

  const t = {}; //各日付のtweet件数をカウントする用のオブジェクト
  const r = {}; //各日付のretweet件数をカウントする用のオブジェクト
  //各オブジェクト内のプロパティを追加・初期化（プロパティ名は日付で）
  for(const d of dates){
    t[d] = 0;
    r[d] = 0;
    //console.log(Object.keys(t[d]),Object.keys(r[d])); ←プロパティ名が添字になってた
  }
  //カウント処理
  for(const {createdAt, isRetweet} of input){
    if(isRetweet){
      r[createdAt] += 1;
    }else{
      t[createdAt] += 1;
    }
  }
  //配列をオブジェクト化に
  const  array = ["tweet","retweet"];
  array.map((item) => {
      return {
        id: item,
        data: dates.map((d) => {
          if(item === "tweet"){
            return {x: d, y: t[d]};
          }else{
            return {x: d, y: r[d]};
          }
        })
      };
  });
  //解答例の場合：カウント用にcountオブジェクトを作り、ネストでtweet・retweetオブジェクトを作ってる
  //そしてそのオブジェクト内で各日付の件数をカウントする（各日付をプロマティ名としている）
  /*
  //各createdAtプロパティの値のみ集めた配列を作って昇順に（重複なし）
  const dates = Array.from(new Set(input.map(({createdAt}) => createdAt)));
  dates.sort(); //文字列の場合は引数なしで大丈夫
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
          //countオブジェクトのtweet・retweetオブジェクトの日付（今見ているdatasの値）プロパティの値を代入
        };
      }),
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
