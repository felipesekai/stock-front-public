export function IsValidPassword(password: string) {
    // //(?=.*[a-z]) A corda deve conter pelo menos 1 caracter alfabético minúsculo
    // // (?=.*[A-Z]) A corda deve conter pelo menos 1 carácter alfabético em maiúsculas
    // // (?=.*[0-9]) A cadeia deve conter pelo menos 1 carácter numérico
    // // (?=.{8,}) A cadeia deve ser de oito caracteres ou mais
    // const passRegex = new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{8,})");
    //
    // return password.match(passRegex) !== null;

    // Must have 8 characters
    if (password.length < 8) {
        return false;
    }

    // Must contain at least one number
    if (!/\d/.test(password)) {
        return false;
    }
    // Must contain at least one letter
    if (!/[a-z]/.test(password)) {
        return false;
    }
    // Must contain at least one uppercase letter
    if (!/[A-Z]/.test(password)) {
        return false;
    }

    // Must contain at least one special character
    // if (!/[!@#$%^&*]/.test(password)) {
    //     return false;
    // }

    // Password is valid
    return true;
}
export function IsPasswordEquals(password1: string, password2: string) {
    return password1 === password2;
}

export function IsValidHour(horaString: string) {
    const [hora] = horaString.split(":").map(Number)
    return hora > 23

}
