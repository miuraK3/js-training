import React from "react";
import LessonPage from "../../components/LessonPage";
import Chart from "../../components/Chart05";
import instruction from "./instruction.md";

const convertData = (input) => {
  /*身長の最大値・最小値の値によって作りたい配列の長さがわかるため、それぞれを求める
    長さについて：ex)10-3+1=8より、3から10までの長さは8*/
  let max = 0;
  let m = 0;   //仮の最大値
  let min = 300;  //絶対なさそうな任意の数値で初期化(0だと処理できないため)
  let mm = 0;  //仮の最小値
  for(const item of input){
    m = item.y;
    mm = item.y;
    if(max < m){
      max = m;
    }
    if(mm < min){
      min = mm;
    }
  }  
  max = Math.round(max);
  min = Math.round(min);
  //Math.roundメゾット：引数の値を四捨五入する
  /*const max = Math.round(Math.max(...input.map(({y}) => y))); 
    const min = Math.round(Math.min(...input.map(({y}) => y)));   でもいい*/
  
  //性別の種類が入った配列を重複なしで作成 = 場合分け
  const genders = [];
  for(const item of input){
    if(!genders.includes(item.gender)){
      genders.push(item.gender);
    }
  }
  //求めた最大値・最小値より配列を作り、目的の形となるオブジェクトに変換
  const bins = Array.from({length: max-min+1}).map((_,i) => {
    const obj = {
      //最小値に添字iを足した値が身長の値 (←iの使い方について？)
      bin: (min+i).toString()
    };
    for(const gender of genders){
      //男性と女性のプロパティを追加・初期化
      obj[gender] = 0; 
    }
    return obj;
  });
  //各データの男性と女性のプロパティ値をカウント
  for(const {y, gender} of input){
    /*添字について：ex)最小値155、見ている値157とするとi=2
                    つまり見ている値は配列の２番目となる*/
    const i = Math.round(y)-min;
    //添字iの当てはまるプロパティの値に追加
    bins[i][gender] += 1;
  }
  return bins; 
};


  /*考え中
  //最大値-最小値＋１で求まる長さnの配列を作り、値を身長値に（重複なし）
  const n = max-min+1;
  const bins = Array(n);
  for(const item of input){
    if(!bins.includes( Math.round(item.y) )){
      bins.push(Math.round(item.y));
    }
  }
  //配列からオブジェクト化して、bin・男性・女性プロパティを追加
  bins.map((b) => {
    const obj = {
      bin: b
    };
    for(const gender of genders){
      obj[gender] = 0; //初期化
    }
    return obj;
  });
  //数を数えてからbinsをreturn 
  };
  */

const Lesson = () => {
  return (
    <LessonPage
      answerUrl="/answer05"
      convertData={convertData}
      dataUrl="data/size-and-weight.json"
      instruction={instruction}
      title="Lesson 05"
      Chart={Chart}
    />
  );
};

export default Lesson;
