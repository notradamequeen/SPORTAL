const DEFAULT_STATE = {
    Person__c: [],
};

const fnList = {
    PERSON_DESCRIBE: (state, payload) => ({
        ...state,
        Person__c: payload,
    }),
    LOGGED_OUT: () => DEFAULT_STATE,
};

export default (state = DEFAULT_STATE, { type, payload }) => {
    const fn = fnList[type];
    if (typeof fn === 'function') {
        return fn(state, payload);
    }
    return state;
};
