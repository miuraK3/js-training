import React from "react";
import LessonPage from "../../components/LessonPage";
import Chart from "../../components/Chart07";
import instruction from "./instruction.md";

const convertData = (input) => {
  //考え中（tweet・retweetオブジェクトを作り、それぞれに日付をプロパティ名としたオブジェクトをさらに作ってカウントしたい）
  //各プロパティcreatedAtの値を年月日のみに変更（扱いやすくするため）
  for (const item of input) {
    const d = new Date(`${item.createdAt} UTC`); 
    const year = d.getFullYear();
    //padStartメゾットで2桁になるように空いたところを０埋めする（配列に対して使用するため、文字列に変換すること）
    const month = String(d.getMonth()+1).padStart(2,"0"); //1月＝０となるため+1
    const date = String(d.getDate()).padStart(2, "0");
    item.createdAt = `${year}-${month}-${date}`;
  }
  //各createdAtプロパティの値のみ集めた配列を作って昇順に（重複なし）
  const dates = Array.from(new Set(input.map(({createdAt}) => createdAt)));
  dates.sort(); //文字列の場合は引数なしで大丈夫

  const t = {}; //各日付のtweet件数をカウントする用のオブジェクト
  const r = {}; //各日付のretweet件数をカウントする用のオブジェクト
  //各オブジェクト内のプロパティを追加・初期化（プロパティ名は日付で）
  for(const d of dates){
    t[d] = 0;
    r[d] = 0;
  }
  console.log(Object.keys(t),Object.keys(r));  //プロパティ名の確認
  console.log(Object.values(t),Object.values(r));  //各プロパティの値（初期値）の確認

  //カウント処理
  for(const {createdAt, isRetweet} of input){
    if(isRetweet){
      r[createdAt] += 1;
    }else{
      t[createdAt] += 1;
    }
  }
  console.log(Object.values(t),Object.values(r)); //各プロパティ値の確認

  //配列を目的の形（オブジェクト）に
  const  array = ["tweet","retweet"];
  return array.map((item) => {
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
  //注：最後にreturnを忘れないこと
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
