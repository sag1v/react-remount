export const invariantMessageType = (keyType, value) => `[withRemount] expected type of "forwardKey" 
    to be a none empty string or a function that returns a string 
    but instead recieved the type ${keyType} with value of (${value})
    `.replace(/[\r\n\s]+/g, ' ');

export const invariantMessageUndefined = (keyStr) => `"${keyStr}" is not a key in the props object, therefor cannot be used as a key to a react component`;
