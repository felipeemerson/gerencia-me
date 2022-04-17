import { getTranslation } from "./errors.translation";

export function getSuccessfulToastObject(message) {
    return {
        title: message,
        status: 'success',
        duration: 2000,
        isClosable: true,
    };
}

export function getErrorToastObject(error) {
    return {
        title: getTranslation(error.response.data),
        status: 'error',
        duration: 2000,
        isClosable: true,
    };
}