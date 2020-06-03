import React from "react";
import LessonPage from "../../components/LessonPage";
import Chart from "../../components/Chart09";
import instruction from "./instruction.md";

const convertData = (input) => {
  /*
  1:各省（ministry）と一致するデータを集める（グループ化）
  2:各省内で部局（bureau）を集める
  3:各部局内で担当課（department）を集める
  4:
  */

  //まずは省がいくつあるのかを知ってから各省ごとにデータ集める
  const mTipe = Array.from(new Set(input.map(({ministry}) => ministry)))
    .map((m) => {
     const ministrys = input.filter((item => item.ministry === m)); //1

  })
  

  //return { children: [] }; // ここを作りましょう！
};

const Lesson = () => {
  return (
    <LessonPage
      answerUrl="/answer09"
      convertData={convertData}
      dataUrl="data/judgit-departments.json"
      instruction={instruction}
      title="Lesson 09"
      Chart={Chart}
    />
  );
};

export default Lesson;
