/*
 * @Author: lxx 
 * @Date: 2024-04-28 18:01:21 
 * @Last Modified by: lxx
 * @Last Modified time: 2024-05-09 10:16:26
 */
import React, { useEffect, useRef, useState } from "react";
import * as docx from 'docx-preview';
import { Button, Spin } from "antd";
import { LeftOutlined, RedoOutlined, RightOutlined, ZoomInOutlined, ZoomOutOutlined } from "@ant-design/icons";
import "./index.scss";

export interface DOCXViewerProps {
    url: '', // 文件路径
    imgIndex: number, // 文件下标
    imgList: [], // 文件列表
  }
const Index: React.FC<DOCXViewerProps> = (props: DOCXViewerProps) => {
    const { url, imgIndex, imgList} = props;
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const docxContainerRef = useRef<HTMLDivElement | null>(null);
    const docxScaleRef = useRef<any>(); // 缩放容器
    const [baseScale, setBaseScale] = useState(1); // 缩放比例

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            const response = await fetch(url);
            const data = await response.blob();
            const containerElement = docxContainerRef.current;
            if (containerElement) {
                docx.renderAsync(data, containerElement).then(() => {
                    console.info('docx: finished');
                    setIsLoading(false);
                });
            }
        } catch (error) {
            setIsLoading(false);
            console.info('Error fetching or rendering document:', error);
        }
    };

    // 上一个
    const handlePrev = () => {
        console.log('上一个');
        
    };

    // 下一个
    const handelNext = () => {
       console.log('下一个');
       
    };

    // 缩小
    const pageZoomOut = () => {
        const currScale = baseScale - 0.1 < 0.5 ? 0.5 : baseScale - 0.1;
        docxScaleRef.current.style.transformOrigin = 'left top';
        docxScaleRef.current.style.transform = `scale(${currScale})`;
        setBaseScale(currScale);
    };

    // 放大
    const pageZoomIn = () => {
        const currScale = baseScale + 0.1 > 2 ? 2 : baseScale + 0.1;
        docxScaleRef.current.style.transformOrigin = 'left top';
        docxScaleRef.current.style.transform = `scale(${currScale})`;
        setBaseScale(currScale);
    };

    // 重置缩放
    const resetFile = () => {
        docxScaleRef.current.style.transformOrigin = 'left top';
        docxScaleRef.current.style.transform = `scale(1)`;
        setBaseScale(1);
    };
    return (
        <div className='docxViewer_container'>
            <Button onClick={() => handlePrev()} disabled={imgIndex === 0} icon={<LeftOutlined />} size='small'></Button>

            <div className="docx_inner">
                <div className="docx_content" ref={docxScaleRef}>
                    <div ref={docxContainerRef} className="docx_dom" />
                    {isLoading && (
                        <div className="loading_content">
                            <Spin size="large" />
                        </div>
                    )}
                </div>
            </div>
            <Button onClick={() => handelNext()} disabled={imgIndex + 1 === imgList?.length} icon={<RightOutlined />} size='small'></Button>
            <div className="scale_tools">
                <div>
                    <ZoomInOutlined className='tool_btn' onClick={pageZoomIn} />
                    <ZoomOutOutlined className='tool_btn' onClick={pageZoomOut} />
                    <RedoOutlined className='tool_btn' onClick={resetFile} />
                </div>

            </div>
        </div>

    );
};

export default Index;