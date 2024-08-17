import { Account } from "./account";

/**
 * @readonly
 * @enum {number}
 */
export const SpecialCharGroup = Object.freeze({
    ALL: 0,
    REDUCED: 1,
    NONE: 2,

    /**
     * @returns {number[]}
     */
    values() { return /** @type {number[]} */ (Object.values(this).filter(value => !(value instanceof Function))); },

    /**
     * @returns {string[]}
     */
    keys() { return Object.keys(this).filter(key => !(this[key] instanceof Function)); },

    /**
     * @param {string} key 
     * @returns {number}
     */
    valueOf(key) { return this[key]; },

    /**
     * @param {number} value 
     * @returns {string}
     */
    keyOf(value) { return Object.keys(this).find(key => this[key] === value); }
});

/**
 * The user {@link Account} settings.
 */
export class Settings {
    /** @type {number} */
    #version;
    /** @type {number} */
    #length;
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
     * @returns {Settings}
     */
    static create() {
        const settings = new Settings();

        settings.version = 1;
        settings.length = 20;
        settings.specialChar = SpecialCharGroup.REDUCED;

        return settings;
    }

    get version() {
        return this.#version;
    }

    get length() {
        return this.#length;
    }

    /**
     * @param {number} version 
     */
    set version(version) {
        if (version < 0) {
            throw new Error("Settings.version cannot be negative.");
        }

        this.#version = version;
    }

    /**
     * @param {number} length 
     */
    set length(length) {
        if (length < 0) {
            throw new Error("Settings.length cannot be negative.");
        }

        this.#length = length;
    }
}
