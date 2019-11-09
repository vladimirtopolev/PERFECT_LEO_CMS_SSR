import * as  React from 'react';
import {Modal} from 'reactstrap';
import 'react-image-crop/dist/ReactCrop.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import * as styles from './image-modal.component.styles.css';

interface ImagePreviewModalProps {
    isOpen: boolean,
    toggleModal: () => void,
    srcImage: string
}

export default ({toggleModal, isOpen, srcImage}: ImagePreviewModalProps) => {
    return (
        <Modal isOpen={isOpen}
               size="lg"
               toggle={toggleModal}
        >
            <div className={styles.ImageModal__title}>
                Просмотр изображения
            </div>
            <div className={styles.ImageModal__content}>
                <div className={styles.ImageModal__previewImage}
                     style={{backgroundImage: `url(${srcImage})`}}>
                </div>
                <div className={styles.ImageModal__buttons}>
                    <button className="button" onClick={() => toggleModal()}>Закрыть</button>
                </div>
            </div>
        </Modal>);
}
