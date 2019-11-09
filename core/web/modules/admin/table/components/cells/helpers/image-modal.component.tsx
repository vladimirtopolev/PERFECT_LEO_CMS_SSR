import * as  React from 'react';
import {useState, ChangeEvent} from 'react';
import {Modal} from 'reactstrap';
import 'react-image-crop/dist/ReactCrop.css';
import * as api from '../../../service/api';
import cn from 'classnames';
import 'bootstrap/dist/css/bootstrap.min.css';
import * as styles from './image-modal.component.styles.css';

import ImageUploaderWithCropping from './image-uploader-with-cropping.component';
import ImageUploader from './image-uploader.component';

interface ImageModalProps {
    isOpen: boolean,
    properties?: any,
    toggleModal: () => void,
    saveImage: (image: string) => void
}

export default ({toggleModal, saveImage, isOpen, properties}: ImageModalProps) => {
    const [src, changeSrc] = useState<any>(null);
    const [isUploadingImage, changeUploadingImageStatus] = useState<boolean>(false);

    const aspectRatio = properties && properties.aspectRatio;

    const changePreview = (e: ChangeEvent<HTMLInputElement>) => {
        const reader = new FileReader();
        reader.onload = () => {
            return changeSrc(reader.result);
        };

        const target = e.target as HTMLInputElement;
        const fileList = target.files as FileList;
        reader.readAsDataURL(fileList[0]);
    };

    const changePreviewBtn = (title: string, disabled?: boolean) => (
        <div className={cn('inputFileBtn', {'inputFileBtn_disabled': disabled})}>
            <input type="file" onChange={changePreview}/>
            {title}
        </div>
    );

    const onToggleModal = () => {
        if (isOpen === true) {
            changeSrc(null);
            changeUploadingImageStatus(false);
        }
        toggleModal();
    };

    const saveImageInCloudinary = (imageFile: any) => {
        changeUploadingImageStatus(true);
        const formData = new FormData();
        formData.append('0', imageFile);

        api.uploadImage(formData)
            .then(res => {
                saveImage(res.data[0].url);
                changeUploadingImageStatus(true);
                onToggleModal();
            })
            .catch(e => {
                changeUploadingImageStatus(true);
            });
    };

    const ChangePreviewButtonRenderer = (props: any) => changePreviewBtn('Изменить изображение', props.disabled);

    return (
        <Modal isOpen={isOpen}
               size="lg"
               toggle={toggleModal}
               onClosed={() => {
               }}
               className={styles.ImageModal}
        >
            <div className={styles.ImageModal__title}>
                Редактирование изображения
            </div>
            <div className={styles.ImageModal__content}>
                {!src && (
                    <div className={styles.ImageModal__dropAreaWrapper}>
                        <div className={styles.ImageModal__dropArea}>
                            {changePreviewBtn('Выбрать изображение')}
                        </div>
                    </div>
                )}
                {aspectRatio
                    ? <ImageUploaderWithCropping
                        src={src}
                        aspectRatio={aspectRatio}
                        initWidth={50}
                        toggleModal={onToggleModal}
                        changeUploadingImageStatus={changeUploadingImageStatus}
                        ChangePreviewButtonRenderer={ChangePreviewButtonRenderer}
                        saveImageInCloudinary={saveImageInCloudinary}
                        isUploadingImage={isUploadingImage}
                    />
                    : <ImageUploader
                        src={src}
                        ChangePreviewButtonRenderer={ChangePreviewButtonRenderer}
                        toggleModal={onToggleModal}
                        saveImageInCloudinary={saveImageInCloudinary}
                        isUploadingImage={isUploadingImage}
                    />
                }

            </div>
        </Modal>);
}
