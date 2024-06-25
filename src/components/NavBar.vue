<template>


<nav class="navbar">
    <div class="container-fluid">
        <div class="navbar-header">
            
            <!-- hamburger menu that appears when collapse -->
            <button type="button" class="navbar-toggle" data-toggle="collapse" data-target="#myNavbar"> 
                <img src="../assets/icons/menu.png" style="width:35px; margin:-10px;">                       
            </button>

            <!-- OutingSG logo -->
             <router-link to="/" class="navbar-brand">
                <p style="margin: -10px;">
                    <img src="../assets/logo/logo1.png" class="nav-logo">
                    <img src="../assets/logo/OutingSG_black.png" style='width: 150px; padding-left: 10px;'>
                </p>
            </router-link>

            <!-- Search bar -->
            <form class="navbar-form navbar-left navbar-search" action="/explore">
                <div class="input-group">
                    <input type="text" class="form-control" placeholder="Search" name="search">
                    <div class="input-group-btn">
                        <button class="btn btn-default" type="submit">
                            <img src='../assets/icons/search.png' class='nav-icon' style="width: 19px;">
                        </button>
                    </div>
                </div>
            </form>
        </div>

        <!-- Right side of the nav bar -->
        <div class="collapse navbar-collapse" id="myNavbar">
            <ul class="nav navbar-right navbar-nav">
                <li><router-link to="/explore"><img src='../assets/icons/explore.png' class='nav-icon'> Explore outings</router-link></li>
                <li><router-link to="/create"><img src='../assets/icons/create.png' class='nav-icon'> Create outings</router-link></li>
                <li><router-link to="/saved"><img src='../assets/icons/bookmark.png' class='nav-icon'> Saved outings</router-link></li>
                <li id="loginStatus">
                    <router-link to="/profile" v-if="userIsLoggedIn"><img src='../assets/icons/profile.png' class='nav-icon'> Profile</router-link>
                    <router-link to="/login" v-else><img src='../assets/icons/login.png' class='nav-icon'> Login</router-link>
                </li>
            </ul>
        </div>
    </div>
</nav>
</template>


<script>

import '../assets/main.css';
import '../assets/bootstrap.css';
import '../router/bootstrap.js';

export default {
    name: 'NavBar',
    data() {
        return {
            userIsLoggedIn: true,
        };
    }
};

</script>


<style scoped>
    .navbar {
        background-color: var(--primary);
        /* background-color: #EAA843; */
        border: 0;
        border-radius: 0px;
        margin: 0px;
        position: fixed;
        top: 0;
        width: 100%;
        z-index: 99;
    }

    .navbar-search {
        margin: 10px;
        border: 0px;
        width: 350px;
        padding: 0px;
    }

    .navbar-toggle {
        border: 0px;
    }

    .nav-icon {
        width: 25px;
    }

    .nav-logo {
        width: 45px; 
        margin: -10px -10px -10px 5px; 
        padding: 5px;
    }
    
    button:hover {
        background-color: white !important;
    }

    button:focus {
        background-color: white !important;
    }

    a:link {
        color: black !important;
        background-color: transparent;
        text-decoration: none;
    }

    a:visited {
        color: black !important;
        background-color: transparent;
        text-decoration: none;
    }

    a:hover {
        color: black !important;
        background-color: transparent;
        text-decoration: none;
    }

    a:active {
        color: black !important;
        background-color: transparent;
        text-decoration: none;
    }
    
</style>
