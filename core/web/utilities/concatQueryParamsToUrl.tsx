export default (rootUrl: string, params: { [K: string]: any }) => {
    const concatUrlQueryParams = Object.entries(params)
        .reduce((memo, [key, val]) => val ? memo.concat(`${key}=${val}`) : memo, [])
        .join('&');
    return rootUrl
        .concat(concatUrlQueryParams ? '?' : '')
        .concat(concatUrlQueryParams);
}
