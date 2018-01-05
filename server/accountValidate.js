// Validate username, sending a specific error message on failure.
Accounts.validateNewUser(function (user) {
    return false; // limit new account
   // return true; // free new account
});
