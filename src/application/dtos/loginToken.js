import { User } from "../../domain/models/user";

/**
 * Used for transferring a {@link User}.
 */
export class LoginToken {
    /** @type {string} */
    id;
    /** @type {number[]} */
    masterPwd;
    /** @type {number[]} */
    encPwd;

    /**
     * @param {string} id - {@link User.id}
     * @param {number[]} masterPwd - {@link User.masterPwd}
     * @param {number[]} encPwd - {@link User.encPwd}
     */
    constructor(id, masterPwd, encPwd) {
        this.id = id;
        this.masterPwd = masterPwd;
        this.encPwd = encPwd;
    }
}
