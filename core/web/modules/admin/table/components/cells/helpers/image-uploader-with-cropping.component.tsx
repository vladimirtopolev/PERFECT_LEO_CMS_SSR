import * as React from 'react';
import {Fragment} from 'react';
import {useState} from 'react';
import {Crop} from 'react-image-crop';
import * as styles from './image-modal.component.styles.css';
import * as ReactCropModule from 'react-image-crop';
import {useEffect} from 'react';
import Spinner from '../../../../../../common/elements/spinner.component';

interface ImageUploaderWithCroppingProps {
    src: any,
    aspectRatio: number,
    initWidth?: number,
    toggleModal: () => void,
    ChangePreviewButtonRenderer: any,
    changeUploadingImageStatus: (status: boolean) => void,
    saveImageInCloudinary: (imageFile: any) => void,
    isUploadingImage: boolean
}

export default ({
                    aspectRatio,
                    initWidth = 50,
                    src,
                    ChangePreviewButtonRenderer,
                    changeUploadingImageStatus,
                    saveImageInCloudinary,
                    toggleModal,
                    isUploadingImage
                }: ImageUploaderWithCroppingProps) => {

    const [crop, changeCrop] = useState<Crop>({
        aspect: aspectRatio,
        width: initWidth,
        x: 0,
        y: 0
    });

    useEffect(() =>
        changeCrop({...crop, aspect: aspectRatio}), [aspectRatio]);

    const [pixelCrop, changePixelCrop] = useState(null);


    const onSaveImage = () => {
        changeUploadingImageStatus(true);
        const canvas = document.createElement('canvas');

        const image = document.createElement('img');
        image.src = src;

        const {height, width} = image;
        canvas.width = pixelCrop.width * width / 100;
        canvas.height = pixelCrop.height * height / 100;

        const ctx = canvas.getContext('2d');
        ctx.drawImage(
            image,
            pixelCrop.x * width / 100,
            pixelCrop.y * height / 100,
            pixelCrop.width * width / 100,
            pixelCrop.height * height / 100,
            0,
            0,
            pixelCrop.width * width / 100,
            pixelCrop.height * height / 100
        );

        canvas.toBlob((blob: any) => {
            blob.name = 'crop.img';
            blob.lastModifiedDate = new Date();
            saveImageInCloudinary(blob);
        }, 'image/jpeg');
    };

    const onCropChange = (newCrop: Crop) => {
        changeCrop({...crop, ...newCrop});
    };

    const onCropComplete = (newCrop: Crop, pixelCrops?: any) => {
        changePixelCrop(pixelCrops);
    };

    const ReactCrop = (ReactCropModule as any).default;

    return (
        <Fragment>
            {src && (
                <div className={styles.ImageModal__previewCroppingImage}>
                    <ReactCrop
                        src={src}
                        crop={crop}
                        onChange={onCropChange}
                        onComplete={onCropComplete}
                        keepSelection={true}
                        imageStyle={{width: '100%', maxHeight: 'none'}}
                        className={styles.ImageModal__previewContainer}
                    />
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
