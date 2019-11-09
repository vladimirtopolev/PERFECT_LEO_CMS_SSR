import {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import * as selectors from '../../modules/client/properties/reducers';
import * as actions from '../../modules/client/properties/actions/actions';

export function useProperties() {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(actions.getProperties());
    }, []);
    return useSelector(selectors.getProperties);
}
