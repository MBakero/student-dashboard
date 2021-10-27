// eslint-disable-next-line import/prefer-default-export
export const DEFAULT_VALIDATION_MESSSAGES = {
    required: 'champ obligatoire!',
    phone: 'le numéro saisi est invalide',
    email: "l'email saisi est invalide",
    number: 'Il faut saisir un numéro'
}

export const REGEX_PHONE = /^[+]?[(]?[0-9]{3}[)]?[-\s.]?[0-9]{3}[-\s.]?[0-9]{4,6}$/im
export const REGEX_EMAIL =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
