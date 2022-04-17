const translation = {
    "The user with the given ID was not found": "O usuário informado não foi encontrado.",
    "User already registered": "Usuário/Email já cadastrado.",
    "Invalid email or password": "Email ou senha inválida.",
    "Type already registered": "Tipo já cadastrado.",
    "The type with the given ID was not found": "O tipo informado não foi encontrado.",
    "The type with the given typeId was not found": "O tipo passado não foi encontrado.",
    "The task with the given ID was not found": "A tarefa informada não foi encontrada.",
    "Invalid status": "Status inválido."
}

export function getTranslation(message) {
    return translation[message] ? translation[message] : message;
}