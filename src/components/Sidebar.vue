<template>
    <ul class="navbar-nav bg-gradient-primary sidebar sidebar-dark accordion" id="accordionSidebar">
        <router-link :to="{ name: 'MainIndex'}" class="sidebar-brand d-flex align-items-center justify-content-center" v-if="!isLoggedIn">
            <div class="sidebar-brand-icon rotate-n-10">
                <i class="fas fa-fw fa-desktop"></i>
            </div>
            <div class="sidebar-brand-text mx-3">
                MONITORING 
            </div>
        </router-link>
        <router-link :to="{ name: 'MonitorList'}" class="sidebar-brand d-flex align-items-center justify-content-center" v-if="isLoggedIn">
            <div class="sidebar-brand-icon rotate-n-10">
                <i class="fas fa-fw fa-desktop"></i>
            </div>
            <div class="sidebar-brand-text mx-3">
                PERSONAL ACCOUNT
            </div>
        </router-link>
        <hr class="sidebar-divider my-0">
        <hr class="sidebar-divider">      
        <div class="sidebar-heading">
            Menu
        </div>
        <li class="nav-item active">
            <router-link :to="{ name: 'MainIndex'}" class="nav-link collapsed" v-if="!isLoggedIn">
                <i class="fas fa-fw fa-home"></i>&nbsp;
                <span>Main</span>
            </router-link>
            <router-link :to="{ name: 'Dashboard'}" class="nav-link collapsed" v-if="isLoggedIn">
                <i class="fas fa-fw fa-home"></i>&nbsp;
                <span>Dashboard</span>
            </router-link>     
        </li>         
        <li class="nav-item active" v-if="isLoggedIn"> 
            <a class="nav-link collapsed" href="#" data-toggle="collapse" data-target="#collapseMonitors" aria-expanded="true" aria-controls="collapseMonitors">
                <i class="far fa-hdd"></i>&nbsp;
                <span>Monitoring</span>
            </a>
            <div id="collapseMonitors" class="collapse" aria-labelledby="headingUtilities" data-parent="#accordionSidebar">
                <div class="bg-white py-2 collapse-inner rounded">
                    <h6 class="collapse-header">Options:</h6>
                    <router-link :to="{ name: 'MonitorList'}" class="collapse-item">Monitor list</router-link>                   
                </div>
            </div>
        </li>
        <li class="nav-item active">
            <a class="nav-link collapsed" href="#" data-toggle="collapse" data-target="#collapseUtilities" aria-expanded="true" aria-controls="collapseUtilities">
                <i class="far fa-fw fa-user"></i>&nbsp;
                <span>User</span>
            </a>
            <div id="collapseUtilities" class="collapse" aria-labelledby="headingUtilities" data-parent="#accordionSidebar">
                <div class="bg-white py-2 collapse-inner rounded">
                    <h6 class="collapse-header">Пункты:</h6>
                    <router-link :to="{ name: 'UserLogin'}" class="collapse-item" v-if="!isLoggedIn">Authorization</router-link>    
                    <router-link :to="{ name: 'UserRegister'}" class="collapse-item" v-if="!isLoggedIn">Registration</router-link>
                    <router-link :to="{ name: 'ResetPassword'}" class="collapse-item" v-if="!isLoggedIn">Reset password</router-link> 
                    <router-link :to="{ name: 'UserProfile'}" class="collapse-item" v-if="isLoggedIn">Profile</router-link>
                    <router-link :to="{ name: 'ChangePassword'}" class="collapse-item" v-if="isLoggedIn">Change password</router-link>
                    <a href="#" @click="logoutUser" class="collapse-item" v-if="isLoggedIn">Exit</a>
                </div>
            </div>
        </li>
        <hr class="sidebar-divider">     
        <li class="nav-item active">
            <a class="nav-link collapsed" href="https://miro.com/app/board/o9J_khEFNr8=/" target="_blank">
                <i class="fas fa-fw fa-table"></i>&nbsp;
                <span>Project scheme</span>
            </a>
        </li>
        <li class="nav-item active">
            <router-link :to="{ name: 'Developer'}" class="nav-link collapsed">
                <i class="fas fa-fw fa-wrench"></i>&nbsp;
                <span>Developer</span>            
            </router-link> 
        </li>    
        <hr class="sidebar-divider d-none d-md-block">     
        <div class="text-center d-none d-md-inline">
            <button class="rounded-circle border-0" id="sidebarToggle"></button>
        </div>        
    </ul>
</template>    

<script>
export default {
	name: 'Sidebar',
	data() {
		return {
		}
	},
	methods: {
        logoutUser: function() {
            this.$store.dispatch('logoutUser')
            .then(() => this.$router.push('/'))
            .catch(err => console.log(err))
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