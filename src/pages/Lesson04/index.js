import React from "react";
import LessonPage from "../../components/LessonPage";
import Chart from "../../components/Chart04";
import instruction from "./instruction.md";

const convertData = (input) => {
  //Array.fromメゾット：配列風のオブジェクトを配列に変換する
  //setオブジェクト：重複する値は格納できない
  //mapメゾット：配列の要素を順番にコールバック関数へ渡し、新たな配列を作る
  //花の品種を要素とした配列を作り、それを重複なくする
  const species = Array.from(new Set(input.map(({species}) => species)));  //Arow Function式で
  //各データを目的の形にする
  return species.map( (species) => {
    return {
      id: species,
      data: input
            .filter((item) => item.species === species)
            .map(({sepalLength: x, petalWidth: y }) => ({x, y}))
            /*filterメゾット：引数としてもらったテスト関数を各配列に対して実行し、
            条件に当てはまる要素を新しい配列として返す*/
            //今見ている花の品種の名前と一致しているものを抜き出し、目的の形にする
    };
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
