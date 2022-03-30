import md5 from 'md5'

/**
 * md5加密密码
 * @param form
 */

export const passwordHandler = form => {
  const data = {}
  for (const i in form) {
    // eslint-disable-next-line no-prototype-builtins
    if (form.hasOwnProperty(i)) {
      if (
        i === 'password' ||
        i === 'oldPassword' ||
        i === 'surePassword' ||
        i === 'newPassword' ||
        i === 'payPassword'
      ) {
        data[i] = md5(form[i])
      } else {
        data[i] = form[i]
      }
    }
  }
  return data
}
