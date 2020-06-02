import React from "react";
import LessonPage from "../../components/LessonPage";
import Chart from "../../components/Chart08";
import instruction from "./instruction.md";

const convertData = (input) => {
  /* 
  全体の流れについて
  1:tagsの要素を重複なく集める
  2:全通りとなるペアを作る
  3:各ペアをカウントする
  4:カウント数が２以上のみのtag名をnodes配列に、ペアをlinks配列に代入
  5:nodes・links配列をひとつのオブジェクトとして返す
  */

  //1
  const t = [];
  for(const item of input){
    const n = (item.tags).length;
    for(let i = 0; i < n; i++){       //各tags配列の長さ分だけ回す
      if(!t.includes(item.tags[i])){
        t.push(item.tags[i]);
      }
    }
  }
  t.sort();
  //2 （７番と同じような考えで、オブジェクトで管理する）
  const count = {};
  for(const t1 of t){
    count[t1] = {};
    for(const t2 of t){
      count[t1][t2] = 0;
    }
  }
 //3
 for(const item of input){
   const n = (item.tags).length;
   for(let i = 0; i < n; i++){     //行列で考える(i=横、j=縦)
    for(let j = 0; j < i; j++){
      count[item.tags[i]][item.tags[j]] += 1;
    }
   }
 }
 //4 （それぞれ目的の形になるように変える）
 const links = [];
 for(const t1 of t){
   for(const t2 of t){
     if(count[t1][t2] >= 2){
       links.push(
         {
           source: t1,
           target: t2,
          }
       );
     }
   }
 }
 const n = [];
 for (const { source, target } of links) {
   if(!n.includes(source)){
     n.push(source);
   }
   if(!n.includes(target)){
     n.push(target);
   }
 }
 const nodes = Array.from(n).map((tag) => {
  return {id: tag,};
 });
 //5
 return { nodes, links}; 
};

const Lesson = () => {
  return (
    <LessonPage
      answerUrl="/answer08"
      convertData={convertData}
      dataUrl="data/qiita-articles.json"
      instruction={instruction}
      title="Lesson 08"
      Chart={Chart}
    />
  );
};

export default Lesson;
