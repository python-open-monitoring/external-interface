<template>
    <div id="content-wrapper" class="d-flex flex-column">
        <br>
        <div class="col-md-4 offset-md-4 d-flex justify-content-center">
            <div class="card shadow mb-4">
                <div class="card-header py-3">
                    <h6 class="m-0 font-weight-bold text-primary">Python open monitoring</h6>
                </div>
                <div class="card-body">
                    <div class="text-center">
                        <img class="img-fluid px-3 px-sm-4 mt-3 mb-4" style="width: 100%;" src="@/assets/logo.svg" alt="...">
                    </div>
                    <p>
                        THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, 
                        EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF 
                        MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. 
                        IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, 
                        DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, 
                        ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER 
                        DEALINGS IN THE SOFTWARE.
                    </p>
                    <div v-if="!isLoggedIn">
                        <router-link :to="{ name: 'UserLogin'}" class="collapse-item">Authorization</router-link>
                        <br>
                        <router-link :to="{ name: 'UserRegister'}" class="collapse-item">Registration</router-link>
                    </div>
                    <div v-if="isLoggedIn">
                        <router-link :to="{ name: 'Dashboard'}" class="collapse-item">Dashboard</router-link>
                    </div>
                </div>      
            </div>
        </div>
    </div>
</template>
<script>
export default {
    name: "MainIndex", 
	computed: {
		isLoggedIn: function() {
			return this.$store.getters.isLoggedIn
		},
		authUser: function() {
			return this.$store.getters.authUser
	    }
    }
}
</script>
