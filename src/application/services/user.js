import { Account } from "../../domain/models/account";
import { User } from "../../domain/models/user";
import { findById, userRepoSave } from "../../infrastructure/persistence/userRepo";
import { hash } from "sage-ui/utils/crypto";
import { LoginToken } from "../dtos/loginToken";

/**
 * @param {string} pwd - the password used for generating the user id, master password and encryption password.
 * @returns {Promise<LoginToken>}
 */
export async function login(pwd) {
    return new LoginToken(
        await hash.hex(pwd, "__pass_userId"),
        Array.from(await hash.digest(pwd, "__pass_mpwd")),
        Array.from(await hash.digest(pwd, "__pass_encPwd")).slice(32)
    );
}

/**
 * @param {LoginToken} loginToken
 * @returns {User}
 */
export function createUser(loginToken) {
    return User.create(loginToken.id, new Uint8Array(loginToken.masterPwd), new Uint8Array(loginToken.encPwd));
}

/**
 * @param {LoginToken} loginToken
 * @returns {Promise<User>}
 */
export function loadUser(loginToken) {
    return findById(loginToken.id, new Uint8Array(loginToken.encPwd))
        .then(user => {
            user.masterPwd = new Uint8Array(loginToken.masterPwd);
            user.encPwd = new Uint8Array(loginToken.encPwd);
            return user;
        });
}

/**
 * @param {User} user
 */
export function saveUser(user) {
    userRepoSave(user);
}

/**
 * @param {User} user 
 * @param {string} accName
 */
export function addAccount(user, accName) {
    user.accounts.push(Account.create(accName));

    saveUser(user);
}

/**
 * @param {User} user 
 * @param {string} accName 
 * @returns {Promise<string>}
 */
export function generateAccPwd(user, accName) {
    const acc = user.accounts.find(acc => acc.name === accName);

    if (acc.settings.customPwd) {
        return new Promise(resolve => resolve(acc.settings.customPwd));
    }

    return user.generateAccPwd(acc);
}