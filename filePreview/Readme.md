# 该目录包含3种形式的文件预览

## 1. DOCXViewer（支持缩放 预览格式仅限docx）

## 2. PDFViewer (支持缩放 预览格式仅限pdf)

## 3. PICViewer（支持缩放、旋转、拖拽，预览格式为jpg、jpeg、png等antd支持的图片类型）

## 4. 调用方式示例
>    const docxProps = {
>        url: fileUrl,
>        imgIndex: fileIndex,
>        imgList: oriFileList,
>        isSwitch: true, // 图片允许切换 
>    };

>  <DOCXViewer {...docxProps} />