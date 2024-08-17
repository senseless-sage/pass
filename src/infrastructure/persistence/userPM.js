import { Mapping, toTarget } from "sage-ui/mapper";
import { AccountDto } from "../../application/dtos/accountDto";
import { Account } from "../../domain/models/account";
import { User } from "../../domain/models/user";

/**
 * Used for persisting a {@link User}.
 */
export class UserPM {
    /** @type {string} */
    id;
    /** @type {AccountDto[]} */
    accounts;

    /**
    * @param {User} user 
    * @returns {UserPM}
    */
    static from(user) {
        return toTarget(user, this.prototype, this.MAPPINGS_FROM_USER);
    }

    /**
     * @param {UserPM} pm 
     * @returns {User}
     */
    static toUser(pm) {
        return toTarget(pm, User.prototype, this.MAPPINGS_TO_USER);
    }

    static MAPPINGS_FROM_USER = [
        new Mapping("accounts", (/** @type {Account[]} */ accs) => accs.map(acc => AccountDto.from(acc))),
    ];

    static MAPPINGS_TO_USER = [
        new Mapping(Mapping.IGNORE, "masterPwd"),
        new Mapping(Mapping.IGNORE, "encPwd"),
        new Mapping("accounts", (/** @type {AccountDto[]} */ dtos) => dtos.map(dto => AccountDto.toAccount(dto))),
    ];
}
