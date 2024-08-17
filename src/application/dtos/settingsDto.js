import { toTarget } from "sage-ui/mapper";
import { Account } from "../../domain/models/account";
import { Settings, SpecialCharGroup } from "../../domain/models/settings";

/**
 * The user {@link Account} settings.
 */
export class SettingsDto {
    /** @type {number} */
    version;
    /** @type {number} */
    length;
    /** @type {SpecialCharGroup} */
    specialChar;
    /** @type {string} */
    userName;
    /**
     * If set, this pwd will be used for the acc and no pwd will be generated.
     * @type {string}
     */
    customPwd;

    /**
     * @param {Settings} settings 
     * @returns {SettingsDto}
     */
    static from(settings) {
        return toTarget(settings, this.prototype, [], true);
    }

    /**
     * @param {SettingsDto} dto
     * @returns {Settings}
     */
    static toSettings(dto) {
        return toTarget(dto, Settings.prototype, [], true);
    }
}
