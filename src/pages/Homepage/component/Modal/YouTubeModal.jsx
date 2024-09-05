import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import React, {useState} from "react";
import YouTube from "react-youtube";

const YouTubeModal = (props) => {
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const obj = {
        height: '490',
        width: '800',
        playerVars: {
            autoplay: 1,
        }
    }
    return (
        <>
            <Button variant="light" className={'px-3 py-2'} onClick={handleShow}>
                <span className="fs-5">▶ </span>예고편 재생
            </Button>

            <Modal show={show} onHide={handleClose} size={'lg'} data-bs-theme={'dark'}>
                <Modal.Header cl closeButton>
                    <Modal.Title>{props.title} 예고편</Modal.Title>
                </Modal.Header>
                <YouTube
                    videoId={props.video}
                    opts={obj}
                />
            </Modal>
        </>
    );
}

export default YouTubeModal;