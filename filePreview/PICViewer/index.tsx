/*
 * @Author: lxx 
 * @Date: 2024-04-28 09:56:14 
 * @Last Modified by: lxx
 * @Last Modified time: 2024-05-09 18:01:22
 *  url: '', // 图片路径
 * imgIndex?: number, // 图片下标
 * isSwitch?: boolean, // 是否切换图片
 */
import { LeftOutlined, RedoOutlined, RightOutlined, RotateRightOutlined, ZoomInOutlined, ZoomOutOutlined } from "@ant-design/icons";
import { Button } from "antd";
import React, { useEffect, useRef } from "react";
import "./index.scss";
interface PICViewerTypes {
    url: '', // 图片路径
    imgIndex: number, // 图片下标
    isSwitch?: boolean, // 是否切换图片
    imgList: [], // 图片列表
  }
  
const Index: React.FC<PICViewerTypes> = (props: PICViewerTypes) => {
    const { url, imgIndex, imgList, isSwitch } = props;
    const imgRef = useRef<any>();
    const oBox = useRef<any>();
    const imgDom = useRef<any>();

    const DELTA = 1.1;
    let x = 0;
    let y = 0;
    useEffect(() => {
        init();
    }, []);
    // 初始化监听
    const init = () => {
        // 禁止选中文字/图片
        document.addEventListener('selectstart', e => { e.preventDefault(); });
        // 鼠标按下事件
        imgRef.current.addEventListener('mousedown', mouseDown);
        // 图片缩放
        imgRef.current.addEventListener('wheel', zoom);
    };
    // 旋转控制
    const handleRotate = () => {
        let transformDeg = imgDom.current.style.transform;
        if (transformDeg) {
            const deg = imgDom.current.style.transform.split('rotate(')[1].split('deg')[0];
            transformDeg = `rotate(${Number(deg) + 90}deg)`;
        } else {
            transformDeg = 'rotate(90deg)';
        }
        imgDom.current.style.transform = transformDeg;
    };

    // 鼠标拖动 更新transform
    const getTransform = (DOM: any) => {
        const arr = getComputedStyle(DOM).transform.split(',');
        return {
            transX: isNaN(+arr[arr.length - 2]) ? 0 : +arr[arr.length - 2], // 获取translateX
            transY: isNaN(+arr[arr.length - 1].split(')')[0]) ? 0 : +arr[arr.length - 1].split(')')[0], // 获取translateX
            multiple: +arr[3] // 获取图片缩放比例
        };
    };
    // 鼠标拖动 更新transform
    const mouseMove = (e: { clientX: number; clientY: number; }) => {
        const multiple = getTransform(imgRef.current).multiple;
        const moveX = e.clientX - x; // x向移动距离
        const moveY = e.clientY - y; // y向移动距离
        imgRef.current.style.transform = `matrix(${multiple}, 0, 0, ${multiple}, ${moveX}, ${moveY})`;
    };
    // 鼠标抬起 移除监听器
    const mouseUp = () => {
        document.removeEventListener('mousemove', mouseMove);
        document.removeEventListener('mouseup', mouseUp);
    };

    // 鼠标按下 获取位置并添加事件监听
    const mouseDown = (e: { clientX: number; clientY: number; }) => {
        const transf = getTransform(imgRef.current);
        x = e.clientX - transf.transX; // 图片初始位置
        y = e.clientY - transf.transY; // 图片初始位置
        document.addEventListener('mousemove', mouseMove);
        document.addEventListener('mouseup', mouseUp);
    };

    // 缩放
    const zoom = (e: { deltaY: number; clientX?: number; clientY?: number }) => {
        const transf = getTransform(imgRef.current);
        if (e.deltaY < 0) {
            transf.multiple *= DELTA; // 放大DELTA倍
        } else {
            transf.multiple /= DELTA; // 缩小DELTA倍
        }
        if (transf.multiple <= 0.5) {
            transf.multiple = 0.5;
        }
        if (transf.multiple > 2) {
            transf.multiple = 2;
        }

        imgRef.current.style.transformOrigin = `${e.clientX}px ${e.clientY}px`;
        imgRef.current.style.transform = `matrix(${transf.multiple}, 0, 0, ${transf.multiple}, ${transf.transX}, ${transf.transY})`;
    };

    // 重置图片
    const resetImage = () => {
        imgRef.current.style.transform = `matrix(1, 0, 0, 1, 0, 0)`;
        imgDom.current.style.transform = `rotate(0deg)`;
    };

    // 上一个
    const handlePrev = () => {
        console.log('切换上一个');

    };

    // 下一个
    const handelNext = () => {
        console.log('切换下一个');
    };

    return (
        <div className="pic_viewer_container">
            <div className="pic_action">
                <Button onClick={() => handlePrev()} disabled={imgIndex === 0} icon={<LeftOutlined />} size='small'></Button>
                <div className="pic_viewer" ref={oBox}>
                    <div className="img_wrapper" ref={imgRef}>
                        <img
                            ref={imgDom}
                            className="pic_viewer_img"
                            src={url}
                            draggable="false"
                        />
                    </div>
                </div>
                <Button onClick={() => handelNext()} disabled={imgIndex + 1 === imgList?.length} icon={<RightOutlined />} size='small'></Button>
            </div>
            <div className="action_btns">
                <div>
                    <Button onClick={handleRotate} icon={<RotateRightOutlined />} size='small'></Button>
                    <Button onClick={() => zoom({ deltaY: -0.9 })} icon={<ZoomInOutlined />} size='small'></Button>
                    <Button onClick={() => zoom({ deltaY: 0.9 })} icon={<ZoomOutOutlined />} size='small'></Button>
                    <Button onClick={() => resetImage()} icon={<RedoOutlined />} size='small'></Button>
                </div>
            </div>
        </div>
    );
};

export default Index;