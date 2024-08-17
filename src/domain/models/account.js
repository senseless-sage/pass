import { Settings } from "./settings";
import { User } from "./user";

/**
 * A {@link User} account.
 */
export class Account {
    /** @type {string} */
    name;
    /** @type {Settings} */
    settings;

    /**
     * @param {string} name
     * @returns {Account}
     */
    static create(name) {
        const account = new Account();

        account.name = name;
        account.settings = Settings.create();

        return account;
    }
}
