import dayjs from 'dayjs';

const DATE_TIME_FORMAT = 'YYYY-MM-DD HH:mm';
const DATE_FORMAT = 'YYYY-MM-DD ';

export function formatToDateTime(date, format = DATE_TIME_FORMAT): string {
  if (!date) {
    return '-';
  }
  return dayjs(date).format(format);
}

export function formatToDate(date, format = DATE_FORMAT): string {
  if (!date) {
    return '-';
  }
  return dayjs(date).format(format);
}

export function getGoogleQrCodeUrl(accountName: string, secret: string) {
  if (!accountName) {
    accountName = 'agent';
  }
  return `https://chart.googleapis.com/chart?chs=200x200&chld=M|0&cht=qr&chl=otpauth://totp/${accountName}?secret=${secret}`;
}
export const dateUtil = dayjs;
