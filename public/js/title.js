//��̬����
var OriginTitile = document.title;
var titleTime;
document.addEventListener("visibilitychange", function () {
  if (document.hidden) {
    //�뿪��ǰҳ��ʱ��ǩ��ʾ����
    document.title = "QAQ��Ҫ�ߣ��ٿ����";
    clearTimeout(titleTime);
  } else {
    //���ص�ǰҳ��ʱ��ǩ��ʾ����
    document.title = "QwQ��ӭ������" + OriginTitile;
    //���������������
    titleTime = setTimeout(function () {
      document.title = OriginTitile;
    }, 2000);
  }
});
