const DEFAULT_STATE = {
    token: null,
    postalCodeRecord: {
        fields: [],
    },
    personField: {
        retrievedAt: 0,
        fields: [],
    },
    schoolList: {
        fields: [],
    },
    applyingToList: {
        fields: [],
    },
    applicationField: {
        retrievedAt: 0,
        fields: [],
    },
    recordType: {
        data: {}
    },

};

const fnList = {
    SALESFORCE_TOKEN: (state, payload) => {
        return {
            ...state,
            token: payload,
        };
    },
    POSTAL_CODE_RECORD: (state, payload) => ({
        ...state,
        postalCodeRecord: {
            fields: payload,
        },
    }),
    PERSON_FIELD: (state, payload) => ({
        ...state,
        personField: {
            retrievedAt: new Date().getTime(),
            fields: payload,
        },
    }),
    SCHOOL_LIST: (state, payload) => ({
        ...state,
        schoolList: {
            retrievedAt: new Date().getTime(),
            fields: payload,
        },
    }),
    APPLYING_TO_LIST: (state, payload) => ({
        ...state,
        applyingToList: {
            retrievedAt: new Date().getTime(),
            fields: payload,
        },
    }),
    RECORD_TYPE: (state, payload) => ({
        ...state,
        recordType: {
            data: payload
        }
    }),
    APPLICATION_FIELD: (state, payload) => ({
        ...state,
        applicationField: {
            retrievedAt: new Date().getTime(),
            fields: payload,
        },
    }),
};

export default (state = DEFAULT_STATE, { type, payload }) => {
    const fn = fnList[type];
    if (typeof fn === 'function') {
        return fn(state, payload);
    }
    return state;
};