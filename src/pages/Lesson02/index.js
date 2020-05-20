import React from "react";
import LessonPage from "../../components/LessonPage";
import Chart from "../../components/Chart02";
import instruction from "./instruction.md";

const convertData = (input) => {
  //各プロパティcountの値をソートする
  //２つの値を比較しながら１つずつ順番を入れ替える手法（比較関数）
  //曻順：a-b、降順：b-a 
  input.sort(function(a,b){
    return b.count-a.count;
  });
  //sliceメゾット：指定された位置の一部を取って新しい配列として返す
  return input.slice(0,20);
};

const Lesson = () => {
  return (
    <LessonPage
      dataUrl="data/qiita-tags.json"
      answerUrl="/answer02"
      convertData={convertData}
      instruction={instruction}
      title="Lesson 02"
      Chart={Chart}
    />
  );
};

export default Lesson;