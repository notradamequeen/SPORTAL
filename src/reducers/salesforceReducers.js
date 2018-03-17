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
    applicationList: {
        retrievedAt: 0,
        records: [],
    },
    beneficiaryList: {
        retrievedAt: 0,
        records: [],
    },
    fundRequestList: {
        retrievedAt: 0,
        records: [],
    },
    recordType: {
        data: {},
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
    GET_APPLICATION_LIST: (state, payload) => ({
        ...state,
        applicationList: {
            retrievedAt: new Date().getTime(),
            records: payload,
        },
    }),
    GET_BENEFICIARY_LIST: (state, payload) => ({
        ...state,
        beneficiaryList: {
            retrievedAt: new Date().getTime(),
            records: payload,
        },
    }),
    GET_FUND_REQUEST_LIST: (state, payload) => ({
        ...state,
        fundRequestList: {
            retrievedAt: new Date().getTime(),
            records: payload,
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