<template>
    <div class="container container-sm">
        <div class="row justify-content-center">
            <div class="col-xl-10 col-lg-12 col-md-9">
                <div class="card o-hidden border-0 shadow-lg my-5">
                    <div class="card-body p-0">
                        <div class="row">
                            <div class="col-lg-12">
                                <div class="p-5">
                                    <div class="text-center">
                                        <h1 class="h5 text-gray-900 mb-4">Reset password</h1>
                                    </div>
                                    <form class="user" id="ResetPassword__form" v-if="reset_form_visibility" action="" @submit.prevent="reset">
                                        <div class="form-group">
                                            <input type="email" class="form-control form-control-user"
                                                id="ResetPassword__email" aria-describedby="emailHelp"
                                                v-model="email" required=""
                                                placeholder="Email">
                                        </div>
                                        <div v-if="email_error">
                                            <code>{{ email_error }}</code>
                                            <hr>
                                        </div>
                                        <button class="btn btn-primary btn-user btn-block" type="submit" id="LogIn" method="post">
                                            Reset password
                                        </button >
                                    </form>
                                    <div v-if="reset_mail_info_visibility">An email with further instructions has been sent to your email. Please check your mailbox.</div>
                                    <hr>
                                    <div class="text-center">
                                        <router-link :to="{ name: 'UserLogin'}" class="small"><b>Authorization</b></router-link>
                                    </div>
                                    <div class="text-center">
                                         <router-link :to="{ name: 'UserRegister'}" class="small"><b>Registration</b></router-link>
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
export default {
    name: "ResetPassword",
    data() {
        return {
            reset_form_visibility : true,
            reset_mail_info_visibility : false,
            email : "",
            email_error : ""
        }
    },    
    methods: {
        reset: function() {
            let email = this.email; 
            var data = JSON.stringify({ email });

            this.$http({url: `${process.env.VUE_APP_EXTERNAL_GATE}/user/reset-password/`, 
                data: data, 
                method: 'POST' 
            })
            .then(() => {
                this.reset_form_visibility = false, this.reset_mail_info_visibility = true
            })
            .catch(error => {
                if (error.response.data == 'Invalid request. This email is not registered.') {
                    return this.email_error = error.response.data;
                }
            })
        },           
    }
}
</script>