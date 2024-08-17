import { Mapping, toTarget } from "sage-ui/mapper";
import { Account } from "../../domain/models/account";
import { Settings } from "../../domain/models/settings";
import { User } from "../../domain/models/user";
import { SettingsDto } from "./settingsDto";

/**
 * A {@link User} account.
 */
export class AccountDto {
    /** @type {string} */
    name;
    /** @type {SettingsDto} */
    settings;

    /**
     * @param {Account} account 
     * @returns {AccountDto}
     */
    static from(account) {
        return toTarget(account, this.prototype, this.MAPPINGS_FROM_ACCOUNT);
    }

    /**
     * @param {AccountDto} dto 
     * @returns {Account}
     */
    static toAccount(dto) {
        return toTarget(dto, Account.prototype, this.MAPPINGS_TO_ACCOUNT);
    }

    static MAPPINGS_FROM_ACCOUNT = [
        new Mapping("settings", (/** @type {Settings} */ settings) => SettingsDto.from(settings)),
    ];

    static MAPPINGS_TO_ACCOUNT = [
        new Mapping("settings", (/** @type {SettingsDto} */ settings) => SettingsDto.toSettings(settings)),
    ];
}
