import { Alert } from 'react-native';

export default function errorHandler({
    title,
    message,
    retry = false,
    retryText = 'Try again',
    retryFunc,
}) {
    return Alert.alert(title, message, [
        { text: 'Dismiss' },
        retry && {
            text: retryText,
            onPress: retryFunc,
        },
    ]);
}

export const ApiErrorHandler = (
    value = {},
    retry = false,
    retryText = 'Try again',
    retryFunc,
) => {
    let errorArray = value;
    console.log(value);
    if (Array.isArray(value)) {
        errorArray = Object.values(value);
    }
    let message;
    if (Array.isArray(errorArray[0])) {
        message = errorArray[0].join('');
    } else {
        message = errorArray;
    }
    return errorHandler({ title: 'Error!', message, retry, retryText, retryFunc });
};
