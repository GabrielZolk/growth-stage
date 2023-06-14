export const formatMonth = (str: string) => {
    const capitalized = str.charAt(0).toUpperCase() + str.slice(1);
    return capitalized.replace('.', '');
};
