// Phần 1: chọn element
const btnSignUpSelector = document.querySelector('.btn-signup');
const errorMessageAll = document.querySelectorAll('.error_message');

const inputAllSelector = document.querySelectorAll('.form-group input');
const regexEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

// validate cho từng field một
// trong từng ô input check sẽ đính kèm các rule + qui tắc validate riêng của nó 

// Phần 2: function xử lí sự kiện + chạy lần đầu khi load


// ---------------- Start Listener Function ------------------------
 function handleSignUpClick(event){
    event.preventDefault();
    let isNameValid;
    let isEmailValid;
    let isPasswordValid;
    let isConfirmValid;
    // 1. Thực hiện validate
    let isFormValid = true;
    for (let i = 0; i < inputAllSelector.length; i++){
      let inputSelector = inputAllSelector[i];
      let name = inputSelector.getAttribute('name');
      // validate not empty
      if (name === 'name'){
         isNameValid = validateName(inputSelector);
      } else if ( name === 'email') {
         isEmailValid = validateEmail(inputSelector);
      } else if ( name === 'password'){
         isPasswordValid = validatePassword(inputSelector);
      } else if (name === 'confirm_password'){ 
         isConfirmValid = validateConfirmPassoword(inputSelector);
      }
    }
    //  Kiểm tra không có ô input nào lỗi validate
    if (isNameValid && isEmailValid && isPasswordValid && isConfirmValid){
      console.log('to login page');
    }
    
 }

 // fucntion for keep track of changing value in each input field
function handleChangeValue(event){
   let inputSelector = event.target;
   let nameInput = inputSelector.getAttribute('name');
   if (nameInput === 'name'){
      validateName(inputSelector);
   } else if (nameInput === 'email'){
      validateEmail(inputSelector);
   } else if (nameInput === 'password'){
      validatePassword(inputSelector)
   } else if (nameInput === 'confirm_password'){
      validateConfirmPassoword(inputSelector);
   } 
}


// ---------------- End Listener Function ------------------------




 // ---------------- Start Validate Function ------------------------

 // validate for name
function validateName(inputSelector){
   let isValid = false;
   if (!require(inputSelector)){
      // show error
      showError(inputSelector, 'Name can not empty');
  } else {
     // show success
     showSuccess(inputSelector);
     isValid = true;
  }
  return isValid;
}

function validateEmail(inputSelector){
   let isValid = false;
   if (!require(inputSelector)){
      showError(inputSelector, 'Email can not empty');
   } else if (!minLength(inputSelector)){
      showError(inputSelector, `Email has at least ${inputSelector.getAttribute('min_length')} characters`);
   } else if (!emailRegex(inputSelector)){
      showError(inputSelector, `Email does not match the format`);
   } else {
      showSuccess(inputSelector);
      isValid = true;
   }
   return isValid;
}

function validatePassword(inputSelector){
   let isValid = false;
   if (!require(inputSelector)){
      showError(inputSelector, 'Password can not empty');
   } else if (!minLength(inputSelector)){
      showError(inputSelector, `Password has at least ${inputSelector.getAttribute('min_length')} characters`);
   } else {
      showSuccess(inputSelector);
      isValid = true;
   }
   return isValid;
}

function validateConfirmPassoword(inputSelector){
   let isValid = false;
   if (!require(inputSelector)){
      showError(inputSelector, 'Confirm_password can not empty');
   } else if (!minLength(inputSelector)){
      showError(inputSelector, `Confirm_password has at least ${inputSelector.getAttribute('min_length')} characters`);
   } else if (!comparePass(inputSelector)){
      showError(inputSelector, `Confirm_password does not match with password`);
   } else {
      showSuccess(inputSelector);
      isValid = true;
   }
   return isValid;
}

// ---------------- End Validate Function ------------------------




// ---------------- Start Message Function ------------------------

// show error 
function showError(inputSelector, message = null){
   inputSelector.classList.add('error');
   let divMessageSelector = inputSelector.closest('.form-group').querySelector('.error_message');
   divMessageSelector.textContent = message;
}

// show success
function showSuccess(inputSelector){
   let divMessageSelector = inputSelector.closest('.form-group').querySelector('.error_message');
   inputSelector.classList.remove('error');
   divMessageSelector.textContent = '';
}

// ---------------- End Message Function ------------------------




// ---------------- Start Rules Function ------------------------
function require(inputSelector){
   return inputSelector.value ? true : false;
}

// check min length

function minLength(inputSelector){
    let minLength = inputSelector.getAttribute('min_length');
    let minLengthInput = inputSelector.value;
    return minLengthInput.length < minLength ? false : true;
}

// check email validate

function emailRegex(inputSelector){
   let emailInput = inputSelector.value;
   return regexEmail.test(emailInput) ? true : false;
}

// check confirm_pass match with pass
function comparePass(inputSelector){
   let passWordValue = document.querySelector('.' + inputSelector.getAttribute('selector_compare')).value;
   let confirmPassValue = inputSelector.value;
   return confirmPassValue !== passWordValue ? false : true;
}


// ---------------- End Rules Function ------------------------



// Phần 3: thêm sự kiện cho phần tử
btnSignUpSelector.addEventListener('click', handleSignUpClick);
// Thêm sự kiện input cho các ô nhập dữ liệu 
for (let i = 0; i < inputAllSelector.length; i++){
   let inputElement = inputAllSelector[i];
   inputElement.addEventListener('blur', handleChangeValue);
}
