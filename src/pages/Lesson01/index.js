import React from "react";
import LessonPage from "../../components/LessonPage";
import Chart from "../../components/Chart01";
import instruction from "./instruction.md";

const convertData = (input) => {
  //エントリーの配列から連想配列（オブジェクト）へ変換
  //mapメゾット：配列の要素を順番にコールバック関数へ渡し、新たな配列を作る
  return input.map(function([name,count]){
    return ({name,count});
  });
};

const Lesson = () => {
  return (
    <LessonPage
      answerUrl="/answer01"
      convertData={convertData}
      dataUrl="data/chs-capacity.json"
      instruction={instruction}
      title="Lesson 01"
      Chart={Chart}
    />
  );
};

export default Lesson;
