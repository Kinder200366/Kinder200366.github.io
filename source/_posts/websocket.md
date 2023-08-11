---
abbrlink: '0'
---


![image-20221103230248111](C:\Users\Kinder2003\AppData\Roaming\Typora\typora-user-images\image-20221103230248111.png)

- ### **消息格式**

  - 客户端 ——服务端

    ​                									{"toName":"张三"  ，"message":brabra}

  - 服务端——客户端

    - 基本格式
    - ![image-20221103230537086](C:\Users\Kinder2003\AppData\Roaming\Typora\typora-user-images\image-20221103230537086.png)

### **功能实现**

> ​	参考:https://blog.csdn.net/moshowgame/article/details/80275084?ops_request_misc=%257B%2522request%255Fid%2522%253A%2522166748714216782425664597%2522%252C%2522scm%2522%253A%252220140713.130102334..%2522%257D&request_id=166748714216782425664597&biz_id=0&utm_medium=distribute.pc_search_result.none-task-blog-2~all~top_positive~default-1-80275084-null-null.142^v63^control,201^v3^control_1,213^v1^control&utm_term=websocket&spm=1018.2226.3001.4187

1. 创建项目

   ```xml
   	<dependency>  
          <groupId>org.springframework.boot</groupId>  
          <artifactId>spring-boot-starter-websocket</artifactId>  
      </dependency> 
   ```

2. 工具类

   ```java
   public class MessageUtils{
       public static String getMessage(boolean isSystemMessage,String fromName,Object message){
           ResultMessage result= new ResultMessage();
           result.setIsSystem(isSystemMessage);
           result.setMessage(message);
           if(fromName!=null){
               result.setFromName(fromName);
           }
           ObjectMapper mapper = new ObjectMapper();
           return mapper.writeValueAsString(result);
       }
   }
   ```

   

