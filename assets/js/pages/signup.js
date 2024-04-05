// Phần 1: chọn element
const btnSignUpSelector = document.querySelector('.btn-signup');
const inputNameSelector = document.querySelector('.name');
const inputEmailSelector = document.querySelector('.email');
const inputPasswordSelector = document.querySelector('.password');
const errorMessageAll = document.querySelectorAll('.error_message');

const inputAllSelector = document.querySelectorAll('.form-group input');
const regexEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

// validate cho từng field một
// trong từng ô input check sẽ đính kèm các rule + qui tắc validate riêng của nó 

// Phần 2: function xử lí sự kiện + chạy lần đầu khi load
 function handleSignUpClick(event){
    event.preventDefault();
    // 1. Thực hiện validate
    let isFormValid = true;
    for (let i = 0; i < inputAllSelector.length; i++){
      let inputSelector = inputAllSelector[i];
      let valueInput = inputSelector.value;
      let divMessageSelector = inputSelector.closest('.form-group').querySelector('.error_message');
      let name = inputSelector.getAttribute('name');
      // validate not empty
      if (name === 'name'){
        let isRequireValid = requireValidate(inputSelector, name);
        // check xem nó có rỗng hay ko => có rỗng : false || ko rỗng: true
        if (isRequireValid){
         showSuccess(inputSelector, divMessageSelector);
        }
      } else if ( name === 'email') {
         let isMinLengthValid;
         let isEmailRegexValid;
         // check xem nó có rỗng hay ko
         let isRequireValid = requireValidate(inputSelector, name);
         if (isRequireValid){
             // email tối thiểu 3 kí tự
            isMinLengthValid = minLengthValidate(inputSelector, name);
         }
         if (isRequireValid && isMinLengthValid){
            // validate email 
            isEmailRegexValid = emailRegexValidate(inputSelector, name);
         }
         // check validate success
         if (isRequireValid && isMinLengthValid && isEmailRegexValid){
            showSuccess(inputSelector, divMessageSelector);
         }
      } else if ( name === 'password'){
         let isRequireValid = requireValidate(inputSelector, name);
         let isMinLengthValid;
         if (isRequireValid){
            // validate password tối thiểu 8 kí tự 
            isMinLengthValid = minLengthValidate(inputSelector, name, 'password has at least 8 characters');
         }
         if (isRequireValid && isMinLengthValid){
            showSuccess(inputSelector, divMessageSelector);
         }
      } else if (name === 'confirm_password'){ 
         let isRequireValid = requireValidate(inputSelector, name);
         let isMinLengthValid;
         let isCompareValid;
         if (isRequireValid){
            // validate password tối thiểu 8 kí tự 
            isMinLengthValid = minLengthValidate(inputSelector, name, 'confirm_password has at least 8 characters');
         }
         // validate compare to password
         if (isRequireValid && isMinLengthValid){
            isCompareValid = compareFieldsValidate(inputSelector, name);
         }

         if (isRequireValid && isMinLengthValid && isCompareValid){
            showSuccess(inputSelector, divMessageSelector);
         }
      }
    }
    //  Kiểm tra không có ô input nào lỗi validate
    // 1. lưu user vào localStorage
    // 2. Redirect màn hình sang login
    for (let i = 0; i < errorMessageAll.length; i++){
       if (errorMessageAll[i].textContent !== ''){
         isFormValid = false;
         break;
       }
    }
    if (isFormValid){
      console.log('redirect to login');
    }
 }

 // function for compare password and confirmpassword
 function compareFieldsValidate(inputSelector, name, message){
   let isValid = true;
   // confirm password value
   let valueInput = inputSelector.value;
   let compareSelectorClass = inputSelector.getAttribute("selector_compare");
   // get the selector of password
   let compareSelector = document.querySelector('.' + compareSelectorClass);
   let divMessageSelector = inputSelector.closest('.form-group').querySelector('.error_message');
   if (compareSelector.value !== valueInput){
      isValid = false;
      inputSelector.classList.add('error');
      let messageError = 'Data from ' + name +' does not match with data from ' + compareSelectorClass;
      if (message){
         messageError = message;
      }
      divMessageSelector.textContent = messageError;
   }
   return isValid;
 }

 // validate success
  function showSuccess(inputSelector, divMessageSelector){
      inputSelector.classList.remove('error');
      divMessageSelector.textContent = '';
  }

  // rule require filed validate
  function requireValidate(inputSelector, name, message){
   let isValid = true;
   let valueInput = inputSelector.value;
   let divMessageSelector = inputSelector.closest('.form-group').querySelector('.error_message');
   if (valueInput === ''){
      isValid = false;
      // thêm viền đỏ cho input
      inputSelector.classList.add('error');
      // hiển thị message lỗi
      let messageError = name + ' can not empty';
      if (message){
         messageError = message;
      }
      divMessageSelector.textContent = messageError;

   }
   return isValid;
  }

// rule validate min-length
 function minLengthValidate(inputSelector, name, message){
   let isValid = true;
   let valueInput = inputSelector.value;
   let divMessageSelector = inputSelector.closest('.form-group').querySelector('.error_message');
   // optional
   let minLength = inputSelector.getAttribute('min_length');
   if (valueInput.length < minLength){
      isValid = false;
      inputSelector.classList.add('error');
      let messageError = name + ' at least ' + minLength + ' characters';
      if (message){
         messageError = message;
      }
      divMessageSelector.textContent = messageError;
   }
   return isValid;
 }

 // check valid email with regex
 function emailRegexValidate(inputSelector, name, message){
     let isValid = true;
     let valueInput = inputSelector.value;
     let isValidRegex = regexEmail.test(valueInput);
     let divMessageSelector = inputSelector.closest('.form-group').querySelector('.error_message');
     if (isValidRegex === false){
       isValid = false;
       inputSelector.classList.add('error');
       let messageError = valueInput + ' not a valid email';
       if (message){
         messageError = message;
       }
       divMessageSelector.textContent = messageError;
     }
     return isValid;
 }

// Phần 3: thêm sự kiện cho phần tử
btnSignUpSelector.addEventListener('click', handleSignUpClick);

