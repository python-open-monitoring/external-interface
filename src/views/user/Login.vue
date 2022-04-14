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
                                        <h1 class="h5 text-gray-900 mb-4">Authorization</h1>
                                    </div>
                                    <form class="user" id="UserLogin__login-form" action="" @submit.prevent="login">
                                        <div class="form-group">
                                            <input type="email" class="form-control form-control-user"
                                                id="UserLogin__email" aria-describedby="emailHelp"
                                                v-model="email" required=""
                                                placeholder="Email">
                                        </div>
                                        <div v-if="email_error">
                                            <code>{{ email_error }}</code>
                                            <hr>
                                        </div>
                                        <div class="form-group">
                                            <input type="password" id="UserLogin__password" class="form-control form-control-user"
                                                v-model="password"
                                                placeholder="Password">
                                        </div>
                                        <div v-if="password_error"><code>{{ email_error }}</code></div>
                                        <button class="btn btn-primary btn-user btn-block" type="submit" id="LogIn" method="post">
                                            Sign in
                                        </button >
                                    </form>
                                    <hr>
                                    <div class="text-center">
                                        <router-link :to="{ name: 'ResetPassword'}" class="small"><b>Reset password</b></router-link>
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
    name: "UserLogin",
    data() {
        return {
            email : "",
            password : "",
            email_error : "",
            password_error : ""
        }
    },    
    methods: {
        login: function() {
            let email = this.email; 
            let password = this.password;

            this.$store.dispatch("loginUser", { email, password })
            .then(() => this.$router.push("/dashboard"))
            .then(() => window.location.reload())
            .catch(err => {
                if (err.response.data == 'Invalid login') {
                    return this.email_error = err.response.data, this.password_error = "";
                } else if (err.response.data == 'Invalid password') {
                    return this.password_error = err.response.data, this.email_error = "";
                }
            })
            // .catch(err => this.email_error=('error=%s',err.response.data))
        },           
    }
}
</script>

