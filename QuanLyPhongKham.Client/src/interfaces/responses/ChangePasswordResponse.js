/**
 * @typedef {Object} ChangePasswordResponse
 * @property {string} email
 * @property {string} phoneNumber
 */
export const createChangePasswordResponse = (email = "", phoneNumber = "") => ({
  email,
  phoneNumber,
});

export const normalizeChangePasswordResponse = (item) => ({
  email: item?.email ?? item?.Email ?? "",
  phoneNumber: item?.phoneNumber ?? item?.PhoneNumber ?? "",
});
