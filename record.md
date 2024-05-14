# db存放位置
  打开访达->按住command+shift+G->输入/usr/local 就可以找到
# 所有db文件手动更改为读写权限

# db 配置环境变量：

>open ~/.zshrc
# 把该变量写入文件  
>export PATH=${PATH}:/usr/local/MongoDB/bin
# 保存成功后执行
>source ~/.zshrc

# Advanced Connection Options
root  123456 admin