import React from "react";
import LessonPage from "../../components/LessonPage";
import Chart from "../../components/Chart04";
import instruction from "./instruction.md";

const convertData = (input) => {
  //Array.fromメゾット：配列風のオブジェクトを配列に変換する
  //setオブジェクト：重複する値は格納できない
  //mapメゾット：配列の要素を順番にコールバック関数へ渡し、新たな配列を作る
  //花の品種を要素とした配列を作り、それを重複なくする
  const array = [];
  for(const item of input){
    if(!array.includes(item.species)){
      array.push(item.species);
    }
  }
  //const array = Array.from(new Set(input.map(({species}) => species)));  でもいい

  //各データを目的の形にする
  return array.map((array) => {
    return {
      id: array,
      data: input
            /*filterメゾット：引数としてもらったテスト関数を各配列に対して実行し、
            条件に当てはまる要素を新しい配列として返す*/
            //今見ている花の品種の名前と一致しているものを抜き出し、目的の形にする
            .filter(function(item) {
              if(item.species === array) return true;
            })
            .map(function({sepalLength: x, petalWidth: y}){
              return {x: x, y: y}
            })
            /*それぞれを分割代入でする場合は以下となる
            .filter((item) => item.species === array)
            .map(({sepalLength: x, petalWidth: y }) => ({x: x, y: y})) 
            */
          }
  });
};

const Lesson = () => {
  return (
    <LessonPage
      answerUrl="/answer04"
      dataUrl="data/iris.json"
      convertData={convertData}
      instruction={instruction}
      title="Lesson 04"
      Chart={Chart}
    />
  );
};

export default Lesson;
