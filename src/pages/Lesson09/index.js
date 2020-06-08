import React from "react";
import LessonPage from "../../components/LessonPage";
import Chart from "../../components/Chart09";
import instruction from "./instruction.md";

const convertData = (input) => {
  /*
  1:各省（ministry）と一致するデータを集める
  2:各省内で部局（bureau）を集める
  3:各部局内で担当課（department）を集める
  4:それぞれの事業数を数えて各’その他’のデータを作る
  5:目的の形になるように作る
  */

  /* この形にまとめてからその他を計算
  count{
    省(ministry){
      部局(bureau){
        担当課(department): 事業数
        .
        .
        .
      }
      .
      .
      .
    }
    .
    .
    .
  }
  */
  const mTipe = Array.from(new Set(input.map(({ministry}) => ministry)));
  const count = {};
  for(const m of mTipe){
    count[m] = {}; 
    for(const item of input){
      if(item.ministry === m){ //今見ている省と同じもの
        count[m][item.bureau] = {};
        const b = item.bureau; //今見ている部局を記憶
        for(const item of input){
          if(item.bureau === b){ //今見ている部局と同じもの
            count[m][b][item.department] = 0;
          }
        }
      }
    }
    console.log(Object.keys(count[m])); //今見ている省が持ってるオブジェクト名(＝部局)
  }
  for(const {ministry, bureau, department} of input){
    count[ministry][bureau][department] += 1;  //事業数のカウント
  }
  //その他のデータは 全体の事業数/事業数 < 0.01 ?

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
