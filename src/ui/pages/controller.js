import { $ } from "sage-ui/utils/ui";
import { loadPage } from "sage-ui/page";
import * as userService from "../../application/services/user";

export default function () {
    const masterPwdInputElement = /** @type {HTMLInputElement} */ ($("master-password"));
    const masterPwdVisibilityBtn = /** @type {HTMLButtonElement} */ ($("input-visibility"));

    masterPwdInputElement.focus();
    masterPwdInputElement.addEventListener("keydown", login);
    masterPwdVisibilityBtn.addEventListener("click", togglePwdVisibility);
    $("login").addEventListener("click", login);

    function togglePwdVisibility() {
        masterPwdInputElement.type = masterPwdInputElement.type === "password" ? "text" : "password";
        masterPwdVisibilityBtn.classList.toggle("fa-eye");
        masterPwdVisibilityBtn.classList.toggle("fa-eye-slash");
    }

    function login(event) {
        if (event.key !== "Enter" && event.type !== "click") return;

        event.preventDefault();

        userService.login(masterPwdInputElement.value).then(loginToken => loadPage("/accounts", loginToken));
    }
}