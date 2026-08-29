// Thông tin tài khoản ngân hàng nhận thanh toán của phòng khám, dùng để tạo mã QR
// VietQR (https://vietqr.io) cho phương thức "Chuyển khoản" ở trang Thanh toán.
export const CLINIC_BANK_ACCOUNT = {
  bankBin: "970422", // MB Bank (NAPAS BIN)
  accountNumber: "0948637749",
  accountName: "HUYNH TAN CHUONG",
};

const stripDiacritics = (value) =>
  String(value || "")
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/đ/g, "d")
    .replace(/Đ/g, "D");

/**
 * Build a VietQR "quick link" image URL for a bank-transfer QR code.
 * @param {number} amount - Số tiền cần chuyển (VND, không thập phân).
 * @param {string} note - Nội dung chuyển khoản (sẽ tự bỏ dấu cho tương thích với mạng NAPAS).
 * @returns {string}
 */
export const buildVietQrUrl = (amount, note) => {
  const { bankBin, accountNumber, accountName } = CLINIC_BANK_ACCOUNT;
  const params = new URLSearchParams({
    amount: String(Math.max(0, Math.round(Number(amount) || 0))),
    addInfo: stripDiacritics(note),
    accountName: stripDiacritics(accountName),
  });
  return `https://img.vietqr.io/image/${bankBin}-${accountNumber}-compact2.png?${params.toString()}`;
};
