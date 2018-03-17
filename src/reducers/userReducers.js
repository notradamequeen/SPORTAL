const DEFAULT_STATE = {
    loggedInUser: null,
    recaptcha: null,
    siteToken: null,
};


const fnList = {
    RECAPTCHA_RESPONSE: (state, payload) => ({
        ...state,
        recaptcha: payload,
    }),
    SITE_TOKEN: (state, payload) => ({
        ...state,
        siteToken: payload,
    }),
    LOGGED_IN: (state, payload) => ({
        ...state,
        loggedInUser: payload,
    }),
    LOGGED_OUT: (state, payload) => ({
        ...state,
        loggedInUser: payload,
    }),
};

export default (state = DEFAULT_STATE, { type, payload }) => {
    const fn = fnList[type];
    if (typeof fn === 'function') {
        return fn(state, payload);
    }
    return state;
};
