import { loadPage, deletePageArgCallback } from "sage-ui/page";
import { makeReactive } from "sage-ui/reactivity";
import { $, parseHtml } from "sage-ui/utils/ui";
import * as userService from "../../../../../application/services/user";
import { Account } from "../../../../../domain/models/account";
import { SpecialCharGroup } from "../../../../../domain/models/settings";
import { User } from "../../../../../domain/models/user";
import { UserDto } from "../../../../dtos/userDto";

/**
 * @param {UserDto} userDto
 * @param {Map<string, string>} routeParams 
 */
export default async function (userDto, routeParams) {
    /** @type {User} */
    let user;
    /** @type {Account} */
    let selectedAcc;

    const versionInputElement = /** @type {HTMLInputElement} */ ($("version"));
    const lengthInputElement = /** @type {HTMLInputElement} */ ($("length"));
    const userInputElement = /** @type {HTMLInputElement} */ ($("user"));
    const pwdInputElement = /** @type {HTMLInputElement} */ ($("pwd"));
    /** @type {HTMLInputElement[]} */
    const specialCharGroupElements = [];

    /**
     * @param {PageTransitionEvent} event 
     */
    window.onpageshow = (event) => {
        if (userDto === undefined) {
            loadPage("/");
        }

        if (!event.persisted) {
            versionInputElement.addEventListener("input", () => selectedAcc.settings.version = Number(versionInputElement.value));
            lengthInputElement.addEventListener("input", () => selectedAcc.settings.length = Number(lengthInputElement.value));
            userInputElement.addEventListener("input", () => selectedAcc.settings.userName = userInputElement.value);
            pwdInputElement.addEventListener("input", () => selectedAcc.settings.customPwd = pwdInputElement.value);
            $("back").addEventListener("click", () => history.back());
            $("delete").addEventListener("click", deleteAccount);

            user = UserDto.toUser(userDto);
            selectedAcc = user.accounts[user.accounts.findIndex(acc => acc.name === routeParams.get("account"))];

            selectedAcc.settings = makeReactive(selectedAcc.settings, [() => userService.saveUser(user)]);

            loadSpecialCharGroups();
            loadSettings();
        }
    };

    window.onpagehide = await deletePageArgCallback();

    function loadSpecialCharGroups() {
        for (const group of SpecialCharGroup.keys()) {
            const groupElementContainer = parseHtml(
                `<div>
                    <input type="radio" id="${group}" name="specialCharGroup" value="${group}"/>
                    <label for="${group}">${group}</label>
                </div>`
            );
            const groupElement = /** @type {HTMLInputElement} */(groupElementContainer.firstElementChild);

            $("specialCharGroup").append(groupElementContainer);
            groupElement.addEventListener("input", () => selectedAcc.settings.specialChar = SpecialCharGroup.valueOf(groupElement.value));
            specialCharGroupElements.push(groupElement);
        }
    }

    function loadSettings() {
        versionInputElement.value = String(selectedAcc.settings.version);
        lengthInputElement.value = String(selectedAcc.settings.length);
        userInputElement.value = selectedAcc.settings.userName ? selectedAcc.settings.userName : "";
        pwdInputElement.value = selectedAcc.settings.customPwd ? selectedAcc.settings.customPwd : "";

        for (const groupElement of specialCharGroupElements) {
            if (groupElement.id === SpecialCharGroup.keyOf(selectedAcc.settings.specialChar)) {
                groupElement.checked = true;
            }
        }
    }

    function deleteAccount() {
        if (!confirm(`Delete ${selectedAcc.name}?`)) return;

        user.accounts.splice(user.accounts.indexOf(selectedAcc), 1);
        userService.saveUser(user);
        loadPage("/accounts");
    }
}