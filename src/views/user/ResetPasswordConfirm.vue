<template>
    <div class="container container-sm">
        <div class="row justify-content-center">
            <div class="col-xl-10 col-lg-12 col-md-9">
                <div class="card o-hidden border-0 shadow-lg my-5">
                    <div class="card-body p-0">
                        <div class="row">
                            <div class="col-lg-12">
                                <div class="p-5">
                                    <div class="text-center" v-if="show_title">
                                        <h1 class="h5 text-gray-900 mb-4">Reset password confirm</h1>
                                    </div>
                                    <form class="user" id="ResetPasswordConfirm__form" v-if="reset_password_confirm_form_visibility" action="" @submit.prevent="resetPasswordConfirm">
                                        <div class="form-group">
                                            <div class="col-xs-12">
                                                <input class="form-control form-control-user" type="password" id="ResetPasswordConfirm__password" required="" placeholder="New password" value="" v-model="new_password">
                                            </div>
                                            <div v-if="!$v.new_password.required"><font size="2">Password is required</font></div>
                                            <div v-if="!$v.new_password.minLength"><font size="2">The password must contain a minimum {{$v.password.$params.minLength.min}} characters</font></div>
                                            <div v-if="!$v.new_password.maxLength"><font size="2">The password must contain a maximum {{$v.password.$params.maxLength.max}} characters</font></div>
                                            <div v-if="!$v.new_password.validValue"><font size="2">The password must contain english letters in upper and lower case and at least one digit</font></div>
                                        </div>
                                        <div class="form-group">
                                            <div class="col-xs-12">
                                                <input class="form-control form-control-user" type="password" id="ResetPasswordConfirm__confirm_password" required="" placeholder="Repeat new password" value="" v-model="new_password_confirm">
                                            </div>
                                            <div v-if="!$v.new_password_confirm.required"><font size="2">This is required field</font></div>
                                            <div v-if="!$v.new_password_confirm.sameAsPassword"><font size="2">Passwords must match</font></div>
                                        </div>
                                        <div v-if="new_password_confirm_error"><code>{{ new_password_confirm_error }}</code></div>
                                        <button class="btn btn-primary btn-user btn-block" type="submit" :disabled="$v.$invalid" id="ResetPassword" method="post">
                                            Change password
                                        </button >
                                    </form>
                                    <hr>
                                    <div class="text-center" v-if="reset_complited_info_visibility">
                                        <h4>You have successfully changed your password!</h4>
                                    </div>
                                    <div class="text-center" v-if="reset_hash_error_info_visibility">
                                        <h4>Invalid password reset link</h4>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>    
</template>
<script>
import { required, minLength, maxLength, sameAs } from 'vuelidate/lib/validators'

export default {
    
    name: "ResetPasswordConfirm",
    data() {
        return {
            reset_password_md5 : "",
            new_password : "",
            new_password_confirm : "",
            new_password_confirm_error : "",
            reset_password_confirm_form_visibility : false,
            reset_complited_info_visibility : false,
            reset_hash_error_info_visibility : false,
            show_title: true,
            monitors: [],
        }
    },

    validations: {
        new_password: {
            required,
            minLength: minLength(6),
            maxLength: maxLength(30),
            validValue: val => /(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])/g.test(val),
        },
        new_password_confirm: {
            required,
            sameAsPassword: sameAs('new_password')
        }
    },
    methods: {

        resetPasswordConfirm: function() {
            let new_password_flag = 'yes';
            let reset_password_md5 = window.location.hash.slice(1);
            let new_password = this.new_password;
            var data = JSON.stringify({ new_password_flag, reset_password_md5, new_password });
            
            if (this.new_password == this.new_password_confirm){
                this.$http({url: `${process.env.VUE_APP_EXTERNAL_GATE}/user/reset-password-confirm/`, 
                    data: data, 
                    method: 'POST' 
                })
                .then(() => {
                    this.reset_password_confirm_form_visibility = false;
                    this.reset_complited_info_visibility = true;
                    this.show_title = false;
                })
                .catch(error => {
                    if (error.response.data == 'Invalid md5 hash.') {
                        return this.new_password_confirm_error = error.response.data;
                    }
                })
            } else {
                this.new_password_confirm_error = "Passwords must match"
            }           
        },        
    },
    mounted() {
        
        let new_password_flag = 'no';
        let reset_password_md5 = window.location.hash.slice(1);
        var hash_data = JSON.stringify({ new_password_flag, reset_password_md5 });
        this.$http({
            method: 'POST',
            url: `${process.env.VUE_APP_EXTERNAL_GATE}/user/reset-password-confirm/`, 
            headers: { 'Content-Type': 'text/plain', },
            data: hash_data,                 
        })
        .then(() => {
            this.reset_password_confirm_form_visibility = true;
        })
        .catch(error => {
            if (error.response.data == 'Invalid md5 hash.') {
                this.reset_password_confirm_form_visibility = false;
                this.reset_hash_error_info_visibility = true;
                this.show_title = false;
            }
        })
    },
}
</script>