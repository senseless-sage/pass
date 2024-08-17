import { Mapping, toTarget } from "sage-ui/mapper";
import { AccountDto } from "../../application/dtos/accountDto";
import { Account } from "../../domain/models/account";
import { User } from "../../domain/models/user";

/**
 * Used for transferring a {@link User}.
 */
export class UserDto {
    /** @type {string} */
    id;
    /** @type {number[]} */
    masterPwd;
    /** @type {number[]} */
    encPwd;
    /** @type {Account[]} */
    accounts;

    /**
     * @param {User} user 
     * @returns {UserDto}
     */
    static from(user) {
        return toTarget(user, this.prototype, this.MAPPINGS_FROM_USER);
    }

    /**
     * @param {UserDto} dto
     * @returns {User}
     */
    static toUser(dto) {
        return toTarget(dto, User.prototype, this.MAPPINGS_TO_USER);
    }

    static MAPPINGS_FROM_USER = [
        new Mapping("masterPwd", (/** @type {Uint8Array} */ a) => Array.from(a)),
        new Mapping("encPwd", (/** @type {Uint8Array} */ a) => Array.from(a)),
        new Mapping("accounts", (/** @type {Account[]} */ accs) => accs.map(acc => AccountDto.from(acc))),
    ];

    static MAPPINGS_TO_USER = [
        new Mapping("masterPwd", (/** @type {number[]} */ a) => new Uint8Array(a)),
        new Mapping("encPwd", (/** @type {number[]} */ a) => new Uint8Array(a)),
        new Mapping("accounts", (/** @type {AccountDto[]} */ dtos) => dtos.map(dto => AccountDto.toAccount(dto))),
    ];
}
