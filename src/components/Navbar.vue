<template>
  <nav class="navbar navbar-expand navbar-light bg-white topbar mb-4 static-top shadow">
    <button id="sidebarToggleTop" class="btn btn-link d-md-none rounded-circle mr-3">
      <i class="fa fa-bars"></i>
    </button>
    <div class="d-none d-sm-inline-block form-inline mr-auto ml-md-3 my-2 my-md-0 mw-100 navbar-search">
      <div class="input-group">
        <input type="text" class="form-control bg-light border-0 small" v-model="search" placeholder="Check host" aria-label="Search" aria-describedby="basic-addon2">
        <div class="input-group-append">
          <button class="btn btn-primary" type="button" @click="checkHost">
            <i class="fas fa-search fa-sm"></i>
          </button>
        </div>
      </div>
    </div>
    <ul class="navbar-nav ml-auto">    
      <li class="nav-item dropdown no-arrow mx-1">
        <a class="nav-link dropdown-toggle" href="#" id="alertsDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
            <i class="fas fa-bell fa-fw"></i>
        </a>
        <div class="dropdown-list dropdown-menu dropdown-menu-right shadow animated--grow-in" aria-labelledby="alertsDropdown">
            <h6 class="dropdown-header">
                UNDER MIT LICENSE
            </h6>
            <p class="dropdown-item d-flex align-items-center" href="#">
              THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, 
              EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF 
              MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. 
              IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, 
              DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, 
              ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER 
              DEALINGS IN THE SOFTWARE.
            </p>
        </div>
      </li>    
      <div class="topbar-divider d-none d-sm-block"></div>
      <li class="nav-item dropdown no-arrow" v-if="isLoggedIn">
        <a class="nav-link dropdown-toggle" href="#" id="userDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
          <span class="mr-2 d-none d-lg-inline text-gray-600 small">
            <b>You logged in {{ authUser.username }} ({{ authUser.email }})</b>
          </span>
          <img :src="avatar_url" width="50" height="50" class="image-circle" alt="" v-if="avatar_url">
          <img class="img-profile rounded-circle" src="../plugins/images/default-avatar.png" v-if="!avatar_url">
        </a>
        <div class="dropdown-menu dropdown-menu-right shadow animated--grow-in" aria-labelledby="userDropdown">
          <router-link :to="{ name: 'UserProfile'}" class="dropdown-item" v-if="isLoggedIn">Profile</router-link>
          <router-link :to="{ name: 'ChangePassword'}" class="dropdown-item" v-if="isLoggedIn">Change password</router-link>
          <a href="#" @click="logoutUser" class="dropdown-item" v-if="isLoggedIn">Logout</a>
        </div>
      </li>      
      <li class="nav-item dropdown no-arrow" v-if="!isLoggedIn">
        <a class="nav-link dropdown-toggle" href="#" id="userDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
          <span class="mr-2 d-none d-lg-inline text-gray-600 small">
            User:
          </span>
          <img class="img-profile rounded-circle" src="../plugins/images/default-avatar.png">
        </a>
        <div class="dropdown-menu dropdown-menu-right shadow animated--grow-in" aria-labelledby="userDropdown">
          <router-link :to="{ name: 'UserLogin'}" class="dropdown-item" v-if="!isLoggedIn">Authorization</router-link>
          <router-link :to="{ name: 'UserRegister'}" class="dropdown-item" v-if="!isLoggedIn">Registration</router-link>     
        </div>
      </li>
    </ul>
  </nav>
</template>
<script>
import Swal from 'sweetalert2';

export default {
	name: 'Navbar',
	data() {
		return {
      avatar_url : "",
      search: "",
		}
  },
  
  mounted() {
    this.$http({url: `${process.env.VUE_APP_EXTERNAL_API}/user-profile/user-profile/`,
      method: 'GET' 
    })
    .then(response => {
      if (response.data.avatar_url.length > 0) {
        this.avatar_url = process.env.VUE_APP_EXTERNAL_API + 'media/' + JSON.parse(JSON.stringify(response.data.avatar_url));
      }
    })
    .catch(error => {
      return error;
    })  
  },

	methods: {
    logoutUser: function() {
      this.$store.dispatch('logoutUser')
      .then(() => this.$router.push('/'))
      .catch(err => console.log(err))
    },  		
    checkHost: function() {    
      var data = `${this.search}`;       
      this.$http({
        method: 'POST',
        url: `${process.env.VUE_APP_EXTERNAL_API}/ping/`,
        data: data, 
      })
      .then(response => {
        if (response.data.server_ping == 'yes') {
          Swal.fire({
            icon: 'success',
            title: 'OK',
            text: `${this.search} response`,
          });
        } else {
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: `${this.search} do not response`,
          });
        }
      })
      .catch(error => {
        Swal.fire({
          icon: 'warning',
          title: 'Error',
          text: error,
        });
        return error;
      })
    },  
	},

	computed: {
		isLoggedIn: function() {
			return this.$store.getters.isLoggedIn
		},
		authUser: function() {
			return this.$store.getters.authUser
		}
	},
  
}	
</script>