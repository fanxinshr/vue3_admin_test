  // 封装一个函数：获取一个结果：当前是早上，上午，下午，晚上
  export const getTime = () => {
    let message = ""
   // 通过内置构造函数Date
   let hours = new Date().getHours();
   console.log("hour is",hours);
   if(hours <= 9){
     message = "早上好"
   }else if (hours <= 12 ) {
     message = "上午好"
   }else if (hours <= 18) {
     message = "下午好"
   }else {
     message = "晚上好"
   }
   console.log("message is ",message);
  // 返回字符串格式的信息
   return message;
 }
