document.addEventListener('DOMContentLoaded', (event) => {
    console.log('DOM fully loaded and parsed');

    // Switch between sign-in and sign-up forms
    const signInSwitch = document.getElementById('sign-in-switch');
    const signUpSwitch = document.getElementById('sign-up-switch');
    const signInForm = document.getElementById('sign-in-form');
    const signInBtn = signInForm.querySelector('.sign-btn');
    const signUpForm = document.getElementById('sign-up-form');
    const signUpBtn = signUpForm.querySelector('.sign-btn');
    const signUpPassword = document.getElementById('signup-password');

    signInSwitch.addEventListener('click', () => {
        if (!signInForm.classList.contains('active-form')) {
            signInForm.classList.add('active-form');
            signUpForm.classList.remove('active-form');

            signInSwitch.classList.add('active-switch-btn');
            signUpSwitch.classList.remove('active-switch-btn');
        }
    });

    signUpSwitch.addEventListener('click', () => {
        if (!signUpForm.classList.contains('active-form')) {
            signUpForm.classList.add('active-form');
            signInForm.classList.remove('active-form');

            signUpSwitch.classList.add('active-switch-btn');
            signInSwitch.classList.remove('active-switch-btn');
        }
    });

    // Validate password dynamically
    signUpPassword.addEventListener('input', () => {
        const password = signUpPassword.value;
        const passwordRegex = /^(?=.*[!@#$%^&*(),.?":{}|<>]).{6,}$/;
        const msg = 'Password must be at least 6 characters long and contain at least one special character.';
        if (!passwordRegex.test(password)) {
            setWarningMsg(signUpPassword, msg);
        } else {
            setWarningMsg(signUpPassword, '');
        }
    });

    // Handle form submissions
    signInForm.addEventListener('submit', (event) => {
        event.preventDefault();
        const email = document.getElementById('signin-email').value;
        const password = document.getElementById('signin-password').value;

        // Retrieve user data from local storage
        const storedUser = JSON.parse(localStorage.getItem('user'));

        // Check if the user exists and the password matches
        if (storedUser && storedUser.email === email && storedUser.password === password) {
            document.cookie = email+"=active; path=/";
            //alert('Sign in successful!');
            // Redirect
            window.location.href = '/';
        } else {
            setWarningMsg(signInBtn, 'Invalid email or password.', true);
        }
    });

    signUpForm.addEventListener('submit', (event) => {
        event.preventDefault();
        const email = document.getElementById('signup-email').value;
        const password = document.getElementById('signup-password').value;
        const confirmPassword = document.getElementById('signup-confirm-password').value;

        // Simulate sign-up verification       
        if (!document.querySelector('.warning-msg')) {
            if (password === confirmPassword) {
                // Save user data to local storage
                const user = { email: email, password: password };
                localStorage.setItem('user', JSON.stringify(user));
    
                setWarningMsg(signUpBtn, '', true);
                //alert('Sign up successful!');
                // Redirect
                signInSwitch.click();
                document.getElementById('signin-email').value = email;
                document.getElementById('signin-password').value = password;
            } else {
                setWarningMsg(signUpBtn, 'Passwords do not match', true);
            }
        } 
        else {
            setWarningMsg(signUpBtn, 'Invalid password', true)
        }       
    });

    function setWarningMsg(warnedElement, message, position = false) { // position: true = before, false = after
        const sibling = position ? warnedElement.previousElementSibling : warnedElement.nextElementSibling;
        
        if (message !== '') {
            if (sibling.classList.contains('warning-msg')) {
                sibling.textContent = message;
                return;
            }
            const WarningDiv = document.createElement('div');
            WarningDiv.classList.add('warning-msg');
            WarningDiv.textContent = message;
            warnedElement.parentNode.insertBefore(WarningDiv, position ? warnedElement : sibling);
        }      
        else {
            if (sibling.classList.contains('warning-msg')) {
                sibling.remove();
            }
        }  
    }
});