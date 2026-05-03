/**
 * @typedef {Object} ChangePasswordRequest
 * @property {string} email
 * @property {string} phoneNumber
 * @property {string} newPassword
 * @property {string} confirmNewPassword
 */
export const createChangePasswordRequest = (
    email = "",
    phoneNumber = "",
    newPassword = null,
    confirmNewPassword = null
) => ({
    email,
    phoneNumber,
    newPassword: newPassword || null,
    confirmNewPassword: confirmNewPassword || null,
});