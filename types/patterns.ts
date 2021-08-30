export default {
  email: /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9]))\.){3}(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9])|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/,
  hexColor: /^#(?:[0-9a-fA-F]{3}){1,2}$/,
  password: /(?=.*[a-zA-Z0-9!@#$%^&*])/,
  snowflake: /^\d{18}$/,
  status: /^ONLINE|^BUSY$|^AFK$|^OFFLINE$/,
  textChannelName: /^[A-Za-z\-\d]{2,32}$/,
  username: /(^(?! |^everyone$|^here$|^me$|^someone$)[A-Za-z\d\-\_ ]{2,32}(?<! )$)/,
  roleName: /(^(?! |^everyone$|^here$|^me$|^someone$)(.*){2,32}(?<! )$)/,
}