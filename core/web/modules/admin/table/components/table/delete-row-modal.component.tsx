import * as  React from 'react';
import cn from 'classnames';
import {Modal} from 'reactstrap';
import 'react-image-crop/dist/ReactCrop.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import * as styles from './delete-row-modal.component.styles.css';
import * as commonStyles from '../../../../../common/styles/admin/admin.common.component.styles.css';

interface ImagePreviewModalProps {
    isOpen: boolean,
    toggleModal: () => void,
    deleteRow: () => void
}

export default ({toggleModal, isOpen, deleteRow}: ImagePreviewModalProps) => {
    return (
        <Modal isOpen={isOpen}
               size="md"
               toggle={toggleModal}
               className={styles.Modal}
        >
            <div className={cn(styles.Modal__title, styles.Modal__title_warning)}>
                Внимание!
            </div>
            <div className={styles.Modal__content}>
                Вы уверены, что хотите удалить эту запись?
                <div className={styles.Modal__buttons}>
                    <button
                        onClick={deleteRow}
                        className={cn(commonStyles.Button, commonStyles.Button_warning)}>
                        Удалить
                    </button>
                    <button
                        onClick={toggleModal}
                        className={commonStyles.Button}>
                        Отменить
                    </button>
                </div>
            </div>
        </Modal>);
}
