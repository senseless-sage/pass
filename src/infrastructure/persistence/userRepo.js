import { decrypt, encrypt } from "sage-ui/utils/crypto";
import { User } from "../../domain/models/user";
import { UserPM } from "./userPM";

/**
 * @param {User} user 
 */
export function userRepoSave(user) {
    encrypt(JSON.stringify(UserPM.from(user)), user.encPwd)
        .then(encUser => {
            localStorage.setItem(
                user.id,
                encUser
            );
        });
}

/**
 * 
 * @param {string} id
 * @param {Uint8Array} encPwd 
 * @returns {Promise<User>}
 */
export function findById(id, encPwd) {
    const item = localStorage.getItem(id);

    if (item === null) {
        return new Promise((_, reject) => {
            reject(new Error(`No user found with id: ${id}`));
        });
    }

    return decrypt(item, encPwd).then(userJSON =>
        UserPM.toUser(JSON.parse(userJSON))
    );
}