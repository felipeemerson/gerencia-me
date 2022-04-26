const translation = {
    "The user with the given ID was not found": "O usuário informado não foi encontrado.",
    "User already registered": "Usuário/Email já cadastrado.",
    "Invalid email or password": "Email ou senha inválida.",
    "Category already registered": "Categoria já cadastrada.",
    "The category with the given ID was not found": "A categoria informada não foi encontrada.",
    "The category with the given categoryId was not found": "A categoria passada não foi encontrada.",
    "The task with the given ID was not found": "A tarefa informada não foi encontrada.",
    "Invalid status": "Status inválido."
}

export function getTranslation(message) {
    return translation[message] ? translation[message] : message;
}