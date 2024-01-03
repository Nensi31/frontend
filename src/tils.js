export const validate = (
    key,
    value
) => {
    const emailRegx = '[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,4}$';
    // const phoneRegx = '/^(\\([0-9]{3}\\) |[0-9]{3}-)[0-9]{3}-[0-9]{4}/';

    switch (key) {
        case 'email':
            if (!value) {
                return 'Email is required';
            }
            if (!new RegExp(emailRegx).test(value )) {
                return 'Please check the email address';
            }



        case 'password':
            if (!value) {
                return 'Password is required';
            }
            return '';

        case 'role':
            if (!value) {
                return 'Please Select Role';
            }
            return '';
        case 'name':
            if (value === '') {
                return 'Please enter your  name';
            }
            return '';

        case 'department':
            if (!value) {
                return 'Please enter your department';
            }
            return '';







        default:
            return '';
    }
};