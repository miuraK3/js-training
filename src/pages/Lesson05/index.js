import React from "react";
import LessonPage from "../../components/LessonPage";
import Chart from "../../components/Chart05";
import instruction from "./instruction.md";

const convertData = (input) => {
  //空の配列に必要な個数分だけのオブジェクトを追加する→それぞれ目的の形に変換

  /*
  身長の値が順になっていることより
  身長の最大値・最小値の値によってオブジェクトの個数がわかる
  ex)160-155+1=6より、6個
  */
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
  //Math.roundメゾット：引数の値を四捨五入する
  max = Math.round(max);
  min = Math.round(min);

  //オブジェクトを空の配列に追加する（ついでにプロパティbinを追加する）
  const bins = [];
  for(let i = 0; i < max-min+1; i++){
    bins.push( {bin: (min+i).toString(),} );
  }

  //性別の種類が入った配列を重複なしで作成（＝性別の種類分け）
  const genders = [];
  for(const item of input){
    if(!genders.includes(item.gender)){
      genders.push(item.gender);
    }
  }
  //配列gendersを使ってプロパティ男性・女性を追加する（初期化）
  bins.map((bin) => {
    for(const gender of genders){
      bin[gender] = 0;
    }
    //console.log(bin.bin,bin.男性,bin.女性);  ←各プロパティの確認用
  });
  //プロパティ男性・女性の値をカウント
  for(const {y, gender} of input){
    /*
    今見ている身長の値に最小値を引けば添字（インデックス）がわかる
    ex)155~160にて今見ている身長が157の場合、157-155=2
    */
    const i = Math.round(y)-min;
    bins[i][gender] += 1;
  }
  return bins;
};

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
