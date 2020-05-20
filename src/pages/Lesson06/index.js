import React from "react";
import LessonPage from "../../components/LessonPage";
import Chart from "../../components/Chart06";
import instruction from "./instruction.md";

const convertData = (input) => {
  //男性=blue、女性=redとなるcolorプロパティに使う
  const colors = {
    男性: "blue",
    女性: "red",
  };
  //欲しい引数のみ貰って、各データを目的のオブジェクトに変更
  return input.map(({gender,x,y}) => {
    return {
      //貰った引数genderと一致しているcolorsオブジェクトのプロパティ名で設定
      color: colors[gender],
      gender,  
      //プロパティ名と変数名が同じなのは省略可能
      bmi: x/(y/100)**2,
      weight: x,
      height: y,
    };
  });
};

const Lesson = () => {
  return (
    <LessonPage
      answerUrl="/answer06"
      convertData={convertData}
      dataUrl="data/size-and-weight.json"
      instruction={instruction}
      title="Lesson 06"
      Chart={Chart}
    />
  );
};

export default Lesson;
