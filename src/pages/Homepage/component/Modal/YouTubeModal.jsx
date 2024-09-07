import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import React, { useState, useEffect } from "react";
import YouTube from "react-youtube";

const YouTubeModal = (props) => {
    const [show, setShow] = useState(false);
    const [opts, setOpts] = useState({
        height: '400',
        width: '800',
        playerVars: {
            autoplay: 1,
        },
    });

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    // window 크기에 맞게 opts 값을 업데이트하는 함수
    const updateOpts = () => {
        const width = window.innerWidth < 800 ? window.innerWidth - 20 : 800;
        const height = (width / 16) * 9; // 16:9 비율로 높이 설정

        setOpts({
            height: height.toString(),
            width: width.toString(),
            playerVars: {
                autoplay: 1,
            },
        });
    };

    useEffect(() => {
        updateOpts(); // 처음 렌더링 시 실행
        window.addEventListener('resize', updateOpts); // 창 크기 변경 시 실행

        // 컴포넌트 언마운트 시 이벤트 리스너 제거
        return () => {
            window.removeEventListener('resize', updateOpts);
        };
    }, []);

    return (
        <>
            <Button variant="light" className={'px-3 py-2'} onClick={handleShow}>
                <span className="fs-5">▶ </span>예고편 재생
            </Button>

            <Modal show={show} onHide={handleClose} size={'lg'} data-bs-theme={'dark'}>
                <Modal.Header closeButton>
                    <Modal.Title>{props.title} 예고편</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <YouTube
                        videoId={props.video}
                        opts={opts}
                    />
                </Modal.Body>
            </Modal>
        </>
    );
}

export default YouTubeModal;