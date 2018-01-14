export interface Account {
    name: string;
    username: string;
    password: string;
    email: string;
}


export interface AccountFull extends Account {
    uuid: string;
    type: string;
    hotspotid: string;
}