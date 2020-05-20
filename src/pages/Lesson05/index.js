import React from "react";
import LessonPage from "../../components/LessonPage";
import Chart from "../../components/Chart05";
import instruction from "./instruction.md";

const convertData = (input) => {
  //Array.fromメゾット：配列風のオブジェクトを配列に変換する
  //setオブジェクト：重複する値は格納できない
  //mapメゾット：配列の要素を順番にコールバック関数へ渡し、新たな配列を作る
  //性別の種類を要素とした配列を作り、それを重複なくする
  const genders = Array.from(new Set(input.map(({gender}) => gender)));
  //Math.roundメゾット：引数の値を四捨五入する
  //前に...をつけると引数が配列となる (← つけないとエラーになるのは？)
  //身長の最大値・最小値を知りたいため、身長の値のみの配列を作って求める
  const min = Math.round(Math.min(...input.map(({y}) => y)));
  const max = Math.round(Math.max(...input.map(({y}) => y)));
  /*最大値-最小値＋１で求まる長さのオブジェクトを作る
  長さについて：ex)10-3+1=8より、3から10までの長さは8*/
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

//→binsをArray.form以外でやる方法は？

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
