import * as React from 'react';
import {Fragment} from 'react';
import * as styles from './image-modal.component.styles.css';
import b64ImageToBlob from '../../../../../../utilities/b64ImageToBlob';
import Spinner from '../../../../../../common/elements/spinner.component';
interface ImageUploaderProps {
    src: any,
    ChangePreviewButtonRenderer: any,
    toggleModal: () => void,
    saveImageInCloudinary: (imageFile: any) => void,
    isUploadingImage: boolean
}

export default ({
                    src,
                    ChangePreviewButtonRenderer,
                    toggleModal,
                    saveImageInCloudinary,
                    isUploadingImage
                }: ImageUploaderProps) => {
    const onSaveImage = () => {
        b64ImageToBlob(src)
            .then(blob => saveImageInCloudinary(blob));
    };

    return (
        <Fragment>
            {src && (
                <div className={styles.ImageModal__previewImage}
                     style={{
                         backgroundImage: `url(${src})`
                     }}>
                    {isUploadingImage && <Spinner className={styles.ImageModal__previewImage_spinner}/>}
                </div>
            )}
            <div className={styles.ImageModal__buttons}>
                {src && (
                    <Fragment>
                        <ChangePreviewButtonRenderer disabled={isUploadingImage}/>
                        <button className="button" onClick={onSaveImage} disabled={isUploadingImage}>Сохранить</button>
                    </Fragment>
                )}
                <button onClick={toggleModal} className="button" disabled={isUploadingImage}>Отменить</button>
            </div>
        </Fragment>
    );
}
