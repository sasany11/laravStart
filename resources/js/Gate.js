//use it to authurize users in js level
export default class Gate {
    constructor(user){
        this.user=user;
    }

    isAdmin(){
        return this.user.type === 'admin';
    }

    isUser(){
        return this.user.type === 'standard user';
    }

    isAuthor(){
        return this.user.type === 'author';
    }

}
