

var initialState ={
    userData: {
        token: '',
        tempToken: '',
        userID: 0,
        username: 'HA',
        country: 0,
        dataBal: 0,
        pendingDataDeductions: 0,
        expenses: 0,
        totalAddtlData: 0,
        balance: 0,
        pendingDeductions: 0,
        fbToken: '',
        userIsViewingOthers: false,
        loggedIn: false,
        passwordSet: false,
        companies: null,
        userViewed: {
            userExists: false,
            userID: 0,
            username: ''
        },
        companyViewed: {
            profile: null,
            id: 0,
            username: 'yo'
        },
        registering: false,
        windowSize: 'SMALL',
        currentPage: {
            front: 'login',
            back: 'home'
        },
        currentCoViewedID: 0,
        gotUserData: false,
        creatingReview: false,
        pageNum: 0,
        followedUsers: [],
        showingModal: false,
        showingReviews: false,
        showingInfo: false,
        showingYesNoModal: false,
        showingCompanyProfModal: false,
        showingProfileModal: false,
        viewingMsgs: false,
        companyIDs: [],
        photoPassword: '',
        reviewsData: {
            reviews: []
        },
        verification: {
            code: '',
            email: ''
        },
        production: false,
        usingSample: true
    },
    globals: {
        numOfPosts: 0,
        numOfSearches: 0,
        numOfItems: 0,
        varNames: {
            devApi: 'http://localhost:9000/api/',
            apiPath: 'https://sosyal.ph/api/',
            
            imgPath: '',
            MOST_RECENT: 'MOST_RECENT',
            TAGS: 'TAGS',
            USER: 'USER',
            SMALL: 'SMALL',
            MEDIUM: 'MEDIUM',
            LARGE: 'LARGE',
            XSMALL: 'XSMALL'
        },
    },
    countries: [],
    messageData: {
        msgHeaders: [],
        msgs: [],
        viewingMsgs: false,
        headerIndexViewed: -1
    },
} 

export default initialState;