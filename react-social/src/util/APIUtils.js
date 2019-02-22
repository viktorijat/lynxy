import { API_BASE_URL, ACCESS_TOKEN } from '../constants';

const request = (options) => {
    const headers = new Headers({
        'Content-Type': 'application/json',
    })
    
    if(localStorage.getItem(ACCESS_TOKEN)) {
        headers.append('Authorization', 'Bearer ' + localStorage.getItem(ACCESS_TOKEN))
    }

    const defaults = {headers: headers};
    options = Object.assign({}, defaults, options);

    return fetch(options.url, options)
    .then(response => 
        response.json().then(json => {
            if(!response.ok) {
                return Promise.reject(json);
            }
            return json;
        })
    );
};

export function getCurrentUser() {
    if(!localStorage.getItem(ACCESS_TOKEN)) {
        return Promise.reject("No access token set.");
    }

    return request({
        url: API_BASE_URL + "/user/me",
        method: 'GET'
    });
}

export function getCurrentUserCompetitions() {
    if(!localStorage.getItem(ACCESS_TOKEN)) {
        return Promise.reject("No access token set.");
    }

    return request({
        url: API_BASE_URL + "/competition",
        method: 'GET'
    });
}

export function joinCompetition(id) {
    if(!localStorage.getItem(ACCESS_TOKEN)) {
        return Promise.reject("No access token set.");
    }

    return request({
        url: API_BASE_URL + "/competition/"+id,
        method: 'POST'
    });
}

export function submitCompetitionUserData(id) {
    if(!localStorage.getItem(ACCESS_TOKEN)) {
        return Promise.reject("No access token set.");
    }

    return request({
        url: API_BASE_URL + "/user/me/submit/"+id,
        method: 'POST'
    });
}

export function getCompetition(id) {
    if(!localStorage.getItem(ACCESS_TOKEN)) {
        return Promise.reject("No access token set.");
    }

    return request({
        url: API_BASE_URL + "/competition/"+id,
        method: 'GET'
    });
}

export function createCompetition(competition) {
    if(!localStorage.getItem(ACCESS_TOKEN)) {
        return Promise.reject("No access token set.");
    }

    return request({
        url: API_BASE_URL + "/competition",
        method: 'POST',
        body: JSON.stringify(competition)
    });
}

export function getCurrentUserSteps() {
    if(!localStorage.getItem(ACCESS_TOKEN)) {
        return Promise.reject("No access token set.");
    }

    return request({
        url: API_BASE_URL + "/user/me/steps",
        method: 'GET'
    });
}

export function login(loginRequest) {
    return request({
        url: API_BASE_URL + "/auth/login",
        method: 'POST',
        body: JSON.stringify(loginRequest)
    });
}

export function signup(signupRequest) {
    return request({
        url: API_BASE_URL + "/auth/signup",
        method: 'POST',
        body: JSON.stringify(signupRequest)
    });
}

export function getParticipantsListWithResults(competition) {
    let participantsList = undefined;
    if (competition) {
        participantsList = competition.participants;

        var participantResults = competition.userSteps.reduce(function (map, obj) {
            map[obj.walker.user_id] = obj.amount;
            return map;
        }, {});

        participantsList.forEach(function (part, index) {
            part.amount = participantResults[part.user_id];
            this[index] = part;
        }, participantsList);
    }
    return participantsList;
}

export function getCurrentUserScore(competition, currentUser) {
    let currentUserScore = 0;
    if (competition) {
        var participantResults = competition.userSteps.reduce(function (map, obj) {
            map[obj.walker.user_id] = obj.amount;
            return map;
        }, {});

        currentUserScore = participantResults[currentUser.user_id];
    }

    return currentUserScore;
}

export function hasUserJoined(competition, currentUser) {
    let result = false;
    if (competition) {
        competition.participants.forEach(function (part, index) {
            if (part.user_id == currentUser.user_id) {
                result = true;
            }
        });
    }

    return result;
}