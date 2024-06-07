<template>
<body>
    <nav class="navbar">
        <div class="container-fluid">
            <div class="navbar-header">
                <!-- hamburger menu that appears when collapse -->
                <button type="button" class="navbar-toggle" data-toggle="collapse" data-target="#myNavbar"> 
                    <img src="../images/icons/menu.png" style="width:35px; margin:-10px;">                       
                </button>

                <!-- OutingSG logo -->
                <a class="navbar-brand" href="/OutingSG/index.html">
                    <p style="margin: -10px;">
                        <img src="../images/logo1.png" class="nav-logo">
                        <img src="../images/OutingSG_black.png" style='width: 150px; padding-left: 10px;'>
                    </p>
                </a>

                <!-- Search bar -->
                <form class="navbar-form navbar-left navbar-search" action="/OutingSG/pages/explore.html">
                    <div class="input-group">
                    <input type="text" class="form-control" placeholder="Search" name="search">
                    <div class="input-group-btn">
                        <button class="btn btn-default" type="submit">
                            <img src='../images/icons/search.png' class='nav-icon' style="width: 19px;">
                        </button>
                    </div>
                    </div>
                </form>
            </div>
            <!-- Right side of the nav bar -->
            <div class="collapse navbar-collapse" id="myNavbar">
                <ul class="nav navbar-right navbar-nav">
                    <li><a href="/OutingSG/pages/explore.html"><img src='../images/icons/explore.png' class='nav-icon'> Explore outings</a></li>
                    <li><a href="/OutingSG/pages/create.html"><img src='../images/icons/create.png' class='nav-icon'> Create outings</a></li>
                    <li><a href="/OutingSG/pages/saved.html"><img src='../images/icons/bookmark.png' class='nav-icon'> Saved outings</a></li>
                    <li id="loginStatus">
                        <a href="/OutingSG/pages/profile.html" v-if="userIsLoggedIn"><img src='../images/icons/profile.png' class='nav-icon'> Profile</a>
                        <a href="/OutingSG/pages/login.html" v-else><img src='../images/icons/login.png' class='nav-icon'> Login</a>
                    </li>
                </ul>
            </div>
        </div>
    </nav>


</body>
</template>

<script>
export default {
        name: 'NavBar'
}
</script>

<style scoped>
        .navbar {
            background-color: var(--primary);
            /* background-color: #EAA843; */
            border: 0;
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