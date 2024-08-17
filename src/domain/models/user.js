import { hash } from "sage-ui/utils/crypto";
import { Account } from "./account";
import { SpecialCharGroup } from "./settings";

export class User {
    /** @type {string} */
    id;
    /** 
     * Used for generating the account passwords.
     * @type {Uint8Array}
     */
    masterPwd;
    /** 
     * Used for encrypting the user account information.
     * @type {Uint8Array}
     */
    encPwd;
    /** @type {Account[]} */
    accounts;

    /**
     * @param {string} id
     * @param {Uint8Array} masterPwd - {@link User.masterPwd}
     * @param {Uint8Array} encPwd - {@link User.encPwd}
     * @returns {User}
     */
    static create(id, masterPwd, encPwd) {
        const user = new User();

        user.id = id;
        user.masterPwd = masterPwd;
        user.encPwd = encPwd;
        user.accounts = [];

        return user;
    }

    /**
     * I am using a hash algorithm for generating the account passwords, so ...
     * @param {Account} acc 
     * @returns {Promise<string>}
     */
    async generateAccPwd(acc) {
        /**
         * @param {number} s start of range.
         * @param {number} e end of range.
         * @returns {string[]}
         */
        const getCharsFromCharCodeRange = (s, e) => {
            const charCodes = Array.from(Array(e - s + 1), (_, i) => i + s);
            return String.fromCharCode(...charCodes).split("");
        };

        /**
         * Maps the random numbers to the allowed chars, by using the unique and sorted list of
         * random numbers as a between mapping.
         * @param {number[]} rn - list of random numbers.
         * @param {number[]} usRn - unique and sorted list of random numbers. 
         * @param {string[]} ac - list of allowed chars.
         * @returns the random numbers mapped to the allowed chars.
         */
        function mapRndNumsToAllowedChars(rn, usRn, ac) {
            const offset = (usRn.length - ac.length) / 2;

            const usRnSubset = usRn.slice(offset, usRn.length - offset);
            const rnSubset = rn.filter(num => usRnSubset.includes(num));

            return rnSubset.map(num => ac[usRnSubset.indexOf(num)]);
        }

        const numbers = getCharsFromCharCodeRange(48, 57);
        const capitalLetters = getCharsFromCharCodeRange(65, 90);
        const smallLetters = getCharsFromCharCodeRange(97, 122);
        const allSpecialChars = [..."!$%&/()=?{}#+*@-_.,;:"];
        const reducedSpecialChars = [..."@#$%*()"];
        const allowedCharGroups = [numbers, capitalLetters, smallLetters];

        if (acc.settings.specialChar === SpecialCharGroup.ALL) {
            allowedCharGroups.push(allSpecialChars);
        }
        else if (acc.settings.specialChar === SpecialCharGroup.REDUCED) {
            allowedCharGroups.push(reducedSpecialChars);
        }

        // Generate at least 128 random numbers to have enough entropy for the password!
        const rndNums = [
            ...await hash.digest(this.masterPwd, acc.name + acc.settings.version + "RND_NUMS_PART_1"),
            ...await hash.digest(this.masterPwd, acc.name + acc.settings.version + "RND_NUMS_PART_2")
        ];

        const uniqueSortedRndNums = Array.from(new Set(rndNums)).sort((a, b) => a - b);

        const pwd = mapRndNumsToAllowedChars(rndNums, uniqueSortedRndNums, allowedCharGroups.flat()).slice(0, acc.settings.length);

        // Check and mod password until it has at least one of each allowed char groups.
        let counter = 0;
        while (!allowedCharGroups.every(allowedCharGroup => allowedCharGroup.some(c => pwd.includes(c)))) {
            allowedCharGroups.forEach(allowedCharGroup => {
                if (!allowedCharGroup.some(c => pwd.includes(c))) {
                    const pwdIndexList = Array.from(Array(pwd.length), (_, i) => String(i));
                    const rndPwdIndex = mapRndNumsToAllowedChars(rndNums, uniqueSortedRndNums, pwdIndexList)[counter];
                    pwd[rndPwdIndex] = mapRndNumsToAllowedChars(rndNums, uniqueSortedRndNums, allowedCharGroup)[counter];
                    counter++;
                }
            });
        }

        return pwd.join("");
    }
}
