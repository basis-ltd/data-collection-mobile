export const getInitials = (fullName) => {
    if (!fullName) return null;
    const names = fullName.split(' ');
    const initials = names.reduce((acc, name) => acc + name[0].toUpperCase(), '');
    return initials;
}
