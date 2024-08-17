# PASS is a stateless password manager

**What makes it special:**
- It does not save your passwords anywhere and so you dont need to sync your passwords with any server or your different devices. Because of the stateless concept your passwords are always in sync on all your devices.
- You dont even need an internet connection, PASS runs completly offline in your browser.
- You have complete control over your passwords from everywhere, any time.

# Getting started

1. Enter a master password at the [login page](https://senseless-sage.github.io/pass/) and hit enter or click the login button.
2. Enter an account name you want to get the password for and hit enter or click on the copy password button.
3. Thats it, the password is now in your clipboard.

# How it works
PASS uses hashing algorithms to generate the passwords for your accounts.

Simply telled these algorithms take an input and return a new value.
This new value is always the same for the same given input.

So if you enter the same master password and same account name into PASS you will always get
the same password back, no matter on which device you type it in.

Dont be scared, yes this does mean if someone knows your master password and the account name you used then
he can get your passwords, but i will explain [here](#security-information) why this is no problem.

# Security information
All your passwords are dependent from your master password, so you need to choose a strong one.
A strong password means that you use at least one small letter, one capital letter, one number and one special character and that your password has a length of at least 16.

If this is given, then you are more secure than using one of the big common password managers,
because you have a reduced attack surface. Common password managers are saving & syncing your passwords accross the internet with all your devices and their servers. So an attacker has the option to steal your passwords by trying to hack into the network traffic. This should be almost impossible IF the password manager service provider has done everything right. The next attack surface would be to hack into the servers of the service provider and steal ALL the passwords of ALL users and try to decrypt it, IF its encrypted. This should be also almost impossible IF the service provider has done everything right. The last attack surface would be to hack into one of your devices and steal all your passwords. This should be also almost impossible IF its not a targeted attack.

As you see the common password managers should be very secure, but they have many IFs.

With PASS you just have one IF and thats your master password.

So an attacker would need to either directly steal your master password or steal one of your account passwords
and than try to brute force your master password.

Lets prove that brute forcing the master password should be impossible.

A master password with:
- a length of 16
- small letters (26)
- capital letters (26)
- numbers (10)
- special characters (14) (Lets assume that just the typical special chars are used like "!?+-&=/@#$%*()")

So we have 16 characters with 76 choices for each char.

So we have 76^16 ≈ 1.2e+30 possibilities.

Known super computers or special computers can hash 156,000,000 tera-hashes/sec. ([as of year 2021](https://www.quora.com/How-long-would-it-take-the-most-powerful-supercomputers-today-that-we-know-of-to-break-a-randomly-generated-16-character-password-symbols-upper-lowercase-and-numbers-included/answer/Mark-Gritter))

Dividing the two "1.2e+30 / (1.56 × 10^20)" gives us 7941323321.06 seconds, about 251 years.

But PASS is hashing your master password 2^18 time so it slows down the attacker.

So "1.2e+30 / ((1.56 × 10^20) / 2^18)" gives us 2.0164923e+15 seconds, about 63942551 years.

Even without the hashing it would be more than enough secure.

# Technical details
I ve choosen the pbkdf2-hmac-sha512 algorithm with 2^18 iterations and no salt for generating the passwords because this algo is available in every browser, so i dont need any 3th party code.
The iteration count is based on the OWASP recommendations and variouse other sources linked below.
I use no salt to get the same hashes / passwords on every device given the same input.

If one day the browsers natively support a memory dependent algorithm like bcyrpt, scrypt or argon2, I will switch to it.

- https://cheatsheetseries.owasp.org/cheatsheets/Password_Storage_Cheat_Sheet.html#pbkdf2
- https://1password.community/discussion/136293/1p-pbkdf2-iterations-are-less-than-recommended-by-owasp-please-do-better/p2
- https://security.stackexchange.com/questions/3959/recommended-of-iterations-when-using-pkbdf2-sha256
- https://www.quora.com/How-many-passwords-can-a-computer-try-in-a-second-when-performing-a-brute-force-attack
- https://www.reddit.com/r/cryptography/comments/vzaq5y/bcrypt_argon_scrypt_are_all_jokes_to_me_why_dont/
- https://www.quora.com/How-fast-could-the-worlds-fastest-supercomputer-brute-force-crack-a-password-Could-anyone-provide-a-spreadsheet-with-how-fast-the-worlds-fastest-supercomputer-could-break-a-password-that-is-1-2-3-100+-characters-long
- https://www.quora.com/How-long-would-it-take-the-most-powerful-supercomputers-today-that-we-know-of-to-break-a-randomly-generated-16-character-password-symbols-upper-lowercase-and-numbers-included/answer/Mark-Gritter
