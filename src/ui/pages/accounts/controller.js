import { cp2cb } from "sage-ui/utils/os";
import { makeReactive } from "sage-ui/reactivity";
import { $, createToast, parseHtml } from "sage-ui/utils/ui";
import { LoginToken } from "../../../application/dtos/loginToken";
import { User } from "../../../domain/models/user";
import * as userService from "../../../application/services/user";
import { UserDto } from "../../dtos/userDto";
import { debounce } from "sage-ui/utils/debounce";
import { loadPage, deletePageArg } from "sage-ui/page";
import { secureClear } from "sage-ui/utils/secureClear";

/**
 * @param {LoginToken} loginToken
 */
export default function (loginToken) {
    /** @type {User} */
    let user;

    const accountsDataListElement = /** @type {HTMLDataListElement} */ ($("accounts-data-list"));
    const accountInputElement = /** @type {HTMLInputElement} */ ($("account"));

    /**
     * @param {PageTransitionEvent} event 
     */
    window.onpageshow = (event) => {
        if (loginToken === undefined) {
            return loadPage("/");
        }

        if (!event.persisted) {
            window.onfocus = debounce(clearClipboard, 200);
            $("logout").onclick = logout;
            $("show-pwd").onclick = showPwd;
            $("copy-pwd").onclick = copyPwdOrUsername;
            $("account").onkeydown = copyPwdOrUsername;
            $("add-account").onclick = addAccount;
            $("open-settings").onclick = openSettings;
        }

        userService.loadUser(loginToken)
            .then(loadedUser => {
                user = loadedUser;
            }).catch(() => {
                user = userService.createUser(loginToken);
                createBigToast("New master password entered!", 2000);
            }).finally(() => {
                user.accounts = makeReactive(user.accounts, [updateAccountsDataList]);
                updateAccountsDataList();
            });
    };

    function createBigToast(msg, delay) {
        createToast(msg, delay, "zoom-200 no-zoom-m");
    }

    function updateAccountsDataList() {
        accountsDataListElement.replaceChildren();

        user.accounts.toSorted()
            .forEach(acc => accountsDataListElement
                .append(parseHtml(`<option value='${acc.name}'>`)));
    }

    function clearClipboard() {
        cp2cb("").then(() => createBigToast("Cleared!", 2000));
    }

    function logout() {
        secureClear(loginToken);
        secureClear(user);
        loginToken = undefined;
        deletePageArg();
        loadPage("/");
    }

    function showPwd() {
        const showPwdToggle = /** @type {HTMLInputElement} */ ($("show-pwd"));
        const pwdTooltip = /** @type {HTMLElement} */ ($("pwd-tooltip"));

        if (showPwdToggle.checked) {
            selectAccount().then(acc => userService.generateAccPwd(user, acc)).then(pwd => {
                pwdTooltip.innerText = pwd;
            });
        } else {
            pwdTooltip.innerText = "";
        }
    }

    /**
     * @param {KeyboardEvent | MouseEvent} event 
     */
    function copyPwdOrUsername(event) {
        if (/** @type {KeyboardEvent} */ (event).key !== "Enter" && event.type !== "click") return;

        event.preventDefault();

        cp2cb(selectAccount()
            .then(accName => event.ctrlKey
                ? user.accounts.find((acc) => acc.name === accName).settings.userName
                : userService.generateAccPwd(user, accName)
            ))
            .then(() => {
                accountInputElement.value = "";
                createBigToast("Copied!", 2000);
            });
    }

    function addAccount() {
        const acc = accountInputElement.value;

        userService.addAccount(user, acc);

        createBigToast("Created!", 2000);
    }

    function openSettings() {
        selectAccount().then(acc => {
            loadPage("/accounts/" + acc + "/settings", UserDto.from(user));
        });
    }

    /**
     * @returns {Promise<string>}
     */
    function selectAccount() {
        return new Promise((resolve, reject) => {
            const accName = accountInputElement.value;

            if (accName === "") {
                return reject(new Error("No account selected."));
            }

            const allAccounts = Array.from(accountsDataListElement.options).map(o => o.value).sort();
            const relevantAccounts = allAccounts.filter(option => option.toLowerCase().includes(accName.toLowerCase()));

            if (!allAccounts.includes(accName)) {
                if (relevantAccounts.length > 0) {
                    accountInputElement.value = relevantAccounts.at(0);
                    return reject(new Error("Found relevant account, but not an exact match."));
                } else {
                    addAccount();
                    return resolve(accName);
                }
            }

            return resolve(accName);
        });
    }
}
