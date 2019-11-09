import * as React from 'react';
import {useState} from 'react';
import cn from 'classnames';
import {ValueRenderProps} from './value.component';
import * as styles from './value-single-image.component.styles.css';
import ModalImageEditor from './helpers/image-modal.component';
import ModalPreviewImage from './helpers/image-preview-modal.component';
import {getValueAsArray} from './helpers/utilities';

interface ImageGalleryValueProps extends ValueRenderProps {
    isSingleImage?: boolean
}

const SingleImageValue = ({
                              value,
                              locale,
                              isEditMode,
                              changeValue,
                              defaultLocale,
                              notLocalized,
                              isSingleImage,
                              properties,
                              isTableValue,
                          }: ImageGalleryValueProps) => {
    const [isOpenModalImageEditor, toggleModalImageEditor] = useState(false);
    const [isOpenModalPreviewImage, toggleModalPreviewImage] = useState(false);
    const [srcImagePreview, changeSrcImagePreview] = useState('');

    const valueLocale = !notLocalized ? locale : undefined;
    const images = getValueAsArray(value, valueLocale);
    const aspectRatio = properties && properties.aspectRatio;

    const saveImage = (imageUrl: string) => {
        changeValue(images.concat(imageUrl), valueLocale);
    };

    const deleteImage = (imageIndex: number) => {
        changeValue(images.filter((image: any, i: number) => i !== imageIndex), valueLocale);
    };

    const renderImageGalleryInPreviewMode = () => {
        return (
            images.length === 0
                ? (<div>Изображение не задано</div>)
                : (
                    <div className={cn(
                        styles.ImagesPreview, {[styles.ImagesPreview_tableValue]: isTableValue})}>
                        {images.map((image: any, i: number) => {
                            return (
                                <div className={styles.ImagesPreview__item}
                                     key={i}
                                     onClick={() => {
                                         changeSrcImagePreview(image);
                                         toggleModalPreviewImage(true);
                                     }}
                                     style={{
                                         backgroundImage: `url(${image})`
                                     }}
                                >
                                </div>
                            );
                        })}
                        <ModalPreviewImage isOpen={isOpenModalPreviewImage}
                                           toggleModal={() => toggleModalPreviewImage(!isOpenModalPreviewImage)}
                                           srcImage={srcImagePreview}
                        />
                    </div>
                )
        );
    };

    const renderImageGalleryInEditMode = () => {
        return (
            <div className={styles.ImageGallery}>
                {images.map((image: any, i: number) => {
                    return (
                        <div className={styles.Item}>
                            <div className={styles.Item__image}
                                 style={{
                                     backgroundImage: `url(${image})`
                                 }}>
                            </div>
                            <div className={styles.Item__toolbar}>
                                <button className={styles.Item__btn}
                                        onClick={() => {
                                            changeSrcImagePreview(image);
                                            toggleModalPreviewImage(true);
                                        }}>
                                    Просмотр
                                </button>
                                <button className={styles.Item__btn}
                                        onClick={() => {
                                            deleteImage(i);
                                        }}>
                                    Удалить
                                </button>
                            </div>
                        </div>
                    );
                })}
                {(!isSingleImage || (isSingleImage && images.length === 0)) && (
                    <button
                        className={cn(styles.SingleImage__uploadBtn, {
                            [styles.SingleImage__uploadBtn_section]: images.length !== 0
                        })}
                        onClick={() => toggleModalImageEditor(!isOpenModalImageEditor)}>
                        Загрузить изображение
                    </button>
                )}
                <ModalImageEditor isOpen={isOpenModalImageEditor}
                                  properties={properties}
                                  toggleModal={() => toggleModalImageEditor(!isOpenModalImageEditor)}
                                  saveImage={saveImage}
                />
                <ModalPreviewImage isOpen={isOpenModalPreviewImage}
                                   toggleModal={() => toggleModalPreviewImage(!isOpenModalPreviewImage)}
                                   srcImage={srcImagePreview}
                />
            </div>
        );
    };


    return !isEditMode || (notLocalized && defaultLocale.key !== locale.key)
        ? renderImageGalleryInPreviewMode()
        : renderImageGalleryInEditMode();
};

export default SingleImageValue;
