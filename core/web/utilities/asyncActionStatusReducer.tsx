// app/reducers/asyncActionStatusReducer.ts
import { AsyncAction, AsyncActionStatus } from './asyncActions';


export type ReduxState = AsyncActionStatus;
export const initialState = AsyncActionStatus.UNSTARTED;

export function reduceAsyncActionStatusOf<T extends string>(type: T) {
    return (state: ReduxState = initialState, action: AsyncAction<T>): ReduxState => {
        if (action.type === type) {
            return action.status;
        }
        return state;
    };
}