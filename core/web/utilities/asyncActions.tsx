export enum AsyncActionStatus {
    UNSTARTED = 'UNSTARTED',
    STARTED = 'STARTED',
    SUCCEEDED = 'SUCCEEDED',
    FAILED = 'FAILED',
}

export interface StartedAsyncAction<T> {
    type: T;
    status: AsyncActionStatus.STARTED;
}

export interface SucceededAsyncAction<TYPE, PAYLOAD = any, PARAMS = any> {
    type: TYPE;
    status: AsyncActionStatus.SUCCEEDED;
    payload: PAYLOAD;
    params?: PARAMS
}

export interface FailedAsyncAction<TYPE, PARAMS = any> {
    type: TYPE;
    status: AsyncActionStatus.FAILED;
    payload: Error;
    params?: PARAMS
}

export type AsyncAction<TYPE, PAYLOAD = any, PARAMS = any> =
    StartedAsyncAction<TYPE> | SucceededAsyncAction<TYPE, PAYLOAD, PARAMS> | FailedAsyncAction<TYPE, PARAMS>;

function startedAsyncAction<TYPE>(type: TYPE): StartedAsyncAction<TYPE> {
    return {
        type,
        status: AsyncActionStatus.STARTED,
    };
}

function succeededAsyncAction<TYPE, PAYLOAD, PARAMS>(type: TYPE, payload: PAYLOAD, params?: PARAMS): SucceededAsyncAction<TYPE, PAYLOAD, PARAMS> {
    return {
        type,
        status: AsyncActionStatus.SUCCEEDED,
        payload,
        params
    };
}

function failedAsyncAction<TYPE, PARAMS>(type: TYPE, error: Error, params?:PARAMS): FailedAsyncAction<TYPE, PARAMS> {
    return {
        type,
        status: AsyncActionStatus.FAILED,
        payload: error,
        params
    };
}

export function asyncActionCreator<TYPE, PAYLOAD, PARAMS>(type: TYPE, action: Promise<PAYLOAD>, params?: PARAMS) {
    return async (dispatch: any) => {
        dispatch(startedAsyncAction(type));
        try {
            const payload = await action;
            dispatch(succeededAsyncAction(type, payload, params));
        } catch (error) {
            dispatch(failedAsyncAction(type, error));
            throw error;
        }
    };
}
