
function Validator(options) {
    function validate(inputElement, rule){
        // value: inputElement.value ; func test: rules.test; truyền value cho test func
        var messagError = rule.test(inputElement.value);
        var labelMessageError = inputElement.parentElement.parentElement.querySelector(options.errorSelector);
        if(messagError){
            labelMessageError.innerText = messagError;
            inputElement.parentElement.classList.add('invalid');
        }else{
            labelMessageError.innerText = '';
            inputElement.parentElement.classList.remove('invalid');
        }
    }
    var formElement = document.querySelector(options.form);
    if(formElement){
        options.rules.forEach(function(rule){
            var inputElement = formElement.querySelector(rule.selector);
            
            if(inputElement){
                inputElement.onblur = function(){
                    validate(inputElement,rule);
                }

                inputElement.oninput = function(){
                    var labelMessageError = inputElement.parentElement.parentElement.querySelector(options.errorSelector);
                    labelMessageError.innerText = '';
                    inputElement.parentElement.classList.remove('invalid');
                }
            }
        })
    }
}
//Rules:
//loại bỏ khoảng trắng trim()
// Khi k hợp lệ => message
//Khi hợp lệ => không làm gì cả (return undefined)
Validator.isRequired = function(selector){
    return {
        selector: selector,
        test: function(value){
            return value.trim() ? undefined : 'Vui lòng nhập trường này';
        }
    }
}

Validator.isEmail = function(selector){
    return {
        selector: selector,
        test: function(value){
            var regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
            return regex.test(value) ? undefined : 'Trường này phải là email';
        }
    }
}
Validator.minLength = function(selector,min){
    return {
        selector: selector,
        test: function(value){
            return value.length >= min ? undefined : `Vui lòng nhập tối thiểu ${min} ký tự`;
        }
    }
}