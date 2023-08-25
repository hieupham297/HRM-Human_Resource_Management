export const validateUsername = (username) => {
  if (!username) {
    return "Please enter username!";
  } else if (username.length > 30) {
    return "Username length must not exceed 30 characters";
  }
  return null;
};

export const validatePassword = (password) => {
  if (!password) {
    return "Please enter password!";
  } else if (password.length < 8) {
    return "Password must be longer than 8 characters!";
  }
  return null;
};

export const validateRepeatPassword = (password, repeatedPassword) => {
  if (!repeatedPassword) {
    return "Please repeat your password!";
  } else if (repeatedPassword !== password) {
    return "The password does not match!";
  }
  return null;
};

export const validateFullName = (fullName) => {
  // const namePattern = /^[a-zA-Z]+$/;
  if (!fullName) {
    return "Please enter your fullname!";
  } else if (fullName.length > 30) {
    return "Fullname length must not exceed 30 characters!";
  }
  // else if (!namePattern.test(fullName)) {
  //   return "Full name should only contain letters and at least one space!";
  // }
  return null;
};

export const validateEmail = (email) => {
  const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  if (!email) {
    return "Please enter your email!";
  } else if (!emailPattern.test(email)) {
    return "Invalid email!";
  }
  return null;
};

export const validatePhoneNumber = (phoneNumber) => {
  const phoneNumberPattern = /^\d{10}$/;
  if (!phoneNumber) {
    return null;
  } else {
    if (!phoneNumberPattern.test(phoneNumber)) return "Invalid phone number!";
    else return null;
  }
};

export const isNull = (input) => {
  if (!input) {
    return "Please enter all the required fields!";
  }
};
