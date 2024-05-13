export const formValidation = (email, password, fullname) => {
    const fullNameRegex = /(^[A-Za-z]{3,16})([ ]{0,1})([A-Za-z]{3,16})?([ ]{0,1})?([A-Za-z]{3,16})?([ ]{0,1})?([A-Za-z]{3,16})/;
    const emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email.current.value);
    const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/.test(password.current.value);
    if (fullname.current) {
        if (!fullNameRegex.test(fullname.current.value)) {
            return 'Fullname is incorrect'
        }
    }
    if (!emailRegex) {
        return 'Email is incorrect'
    }
    if (!passwordRegex) {
        return 'Password is incorrect'
    }
};
