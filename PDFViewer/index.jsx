/*
 * @Author: lxx 
 * @Date: 2024-04-28 18:01:29 
 * @Last Modified by: lxx
 * @Last Modified time: 2024-05-10 16:07:46
 */
import React, { useEffect, useState, useRef } from 'react';
import { Spin, Tooltip, Input, Button } from 'antd';
import { LeftOutlined, RightOutlined, ZoomInOutlined, ZoomOutOutlined, RedoOutlined } from '@ant-design/icons';
import pdfjsWorker from 'pdfjs-dist/build/pdf.worker.entry';
import { DirectionEnum } from "modules/drugCompanies/diseaseCourseManage/patientList/index.enum";
import { Document, Page, pdfjs } from "react-pdf";
pdfjs.GlobalWorkerOptions.workerSrc = pdfjsWorker;

import 'react-pdf/dist/esm/Page/AnnotationLayer.css';
import 'react-pdf/dist/esm/Page/TextLayer.css';
import './index.scss';
const PageCom = (props) => {
  const { imgIndex, isSwitch, imgList, fileChangeCallback, connectCallback, associationCount } = props;
  const [filePath, setFilePath] = useState(null);
  const baseWidth = 800;
  const maxWidth = 1100;
  const minWidth = 400;
  const [pageCurrent, setPageCurrent] = useState(1);
  const pageCurrentRef = useRef(pageCurrent);

  const [pageTotal, setPageTotal] = useState(1);
  const [loadSuccess, setLoadSuccess] = useState(true);

  const pageTotalRef = useRef(pageTotal);

  const [pageWidth, setPageWidth] = useState(baseWidth);
  useEffect(() => {
    setPageCurrent(1);
    pageCurrentRef.current = 1;

    setFilePath(props.filePath);
  }, [props.filePath]);

  const prevPage = () => {
    if (pageCurrentRef.current === 1) { return; }
    setPageCurrent(pageCurrentRef.current - 1);
    pageCurrentRef.current = pageCurrentRef.current - 1;
  };

  const nextPage = () => {
    if (pageCurrentRef.current === pageTotalRef.current) {
      return;
    }

    setPageCurrent(pageCurrentRef.current + 1);
    pageCurrentRef.current = pageCurrentRef.current + 1;
  };

  const pageNumChange = e => {
    let value = Number(e.target.value);
    let value2 = 1;

    if (value <= 0) {
      value2 = 1;
    } else if (value >= pageTotalRef.current) {
      value2 = pageTotalRef.current;
    } else {
      value2 = value;
    }

    setPageCurrent(value);
    pageCurrentRef.current = value;
  };

  const toPage = e => {
    let value = Number(e.target.value);
    let value2 = value;

    if (value <= 0) {
      value2 = 1;
    } else if (value >= pageTotalRef.current) {
      value2 = pageTotalRef.current;
    } else {
      value2 = value;
    }
    setPageCurrent(value2);
    pageCurrentRef.current = value2;
  };

  const pageZoomOut = () => {
    const _pageWidth = pageWidth * 0.9 < minWidth ? minWidth : pageWidth * 0.9;
    setPageWidth(_pageWidth);
  };

  const pageZoomIn = () => {
    const _pageWidth = pageWidth * 1.1 > maxWidth ? maxWidth : pageWidth * 1.1;
    setPageWidth(_pageWidth);
  };

  // 重置缩放
  const resetFile = () => {
    setPageWidth(baseWidth);
  };

  const onDocumentLoadSuccess = (args) => {
    setPageTotal(args.numPages);
    pageTotalRef.current = args.numPages;
    setLoadSuccess(true);
  };

  // 上一个
  const handlePrev = () => {
    fileChangeCallback && fileChangeCallback(DirectionEnum.PREV);
    resetFile();
  };

  // 下一个
  const handelNext = () => {
    fileChangeCallback && fileChangeCallback(DirectionEnum.NEXT);
    resetFile();
  };

  return (
    <div className='pdfViewer_container'>
      <Button onClick={() => handlePrev()} disabled={imgIndex === 0} icon={<LeftOutlined />} size='small'></Button>
      {loadSuccess && <div className="pageTool">
        <div>{associationCount}</div>
        <div>
          <Tooltip title={pageCurrent === 1 ? "已是第一页" : "上一页"}>
            <LeftOutlined className='tool_btn' onClick={prevPage} />
          </Tooltip>
          <Input className='pageInput' value={pageCurrent} onChange={pageNumChange} onPressEnter={toPage} type="number" />
          <span className='page_text'> / {pageTotal}</span>
          <Tooltip title={pageCurrent === pageTotal ? "已是最后一页" : "下一页"}>
            <RightOutlined className='tool_btn' onClick={nextPage} />
          </Tooltip>
          <ZoomInOutlined className='tool_btn' onClick={pageZoomIn} />
          <ZoomOutOutlined className='tool_btn' onClick={pageZoomOut} />
          <RedoOutlined className='tool_btn' onClick={resetFile} />
          {connectCallback && <Button className='tool_btn' size='small' onClick={() => connectCallback()}>
            关联
          </Button>}
        </div>
      </div>}
      <div className="pdfViewer_wrapper">
        {filePath ? (<>
          <div className="page_container">
            <Document file={filePath} onLoadSuccess={onDocumentLoadSuccess} loading={<Spin style={{ width: '100%', marginTop: 'calc(50vh - 90px)' }} size="large" />} >
              <div className='page_container_inner'>
                <Page pageNumber={pageCurrent} width={pageWidth} loading={<Spin size="large" />} />
              </div>
            </Document>
          </div>
        </>) : (<div className="empty-wrapper">未生成报告文件！</div>)}
      </div>
      <Button onClick={() => handelNext()} disabled={imgIndex + 1 === imgList?.length} icon={<RightOutlined />} size='small'></Button>
    </div>
  );
};

export default PageCom;