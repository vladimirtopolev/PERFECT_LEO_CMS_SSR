import * as React from 'react';
import {getAuth} from '../../modules/auth/store/reducers';
import {Redirect} from 'react-router';
import {connect} from 'react-redux';


interface WithAuthenticatedUserProps {
    auth: any
}

const mapStateToProps = (state: any) => {
    return {
        auth: getAuth(state)
    };
};


export default function withAuthenticatesUser<P>(OriginComponent: React.ComponentType<P>) {
    const DecoratedComponent = (props: P & WithAuthenticatedUserProps) => {
        return props.auth === null
            ? <Redirect to={'/user/signin'}/>
            : <OriginComponent {...props}/>;
    };
    return connect(mapStateToProps, null)(DecoratedComponent);
}

