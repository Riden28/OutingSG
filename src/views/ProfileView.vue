<template>
    <NavBar />

    <div class="content">
        <router-link to="/settings"><p><img src="../assets/icons/settings.png" class="settings"></p></router-link>
        <center style="clear:both;">
            <img :src='profilePicture' class="profilePic" width="300px" height="250px">
        </center>
        <h3 class="titles"> {{ username }}</h3>

        <div class="aboutYou">

            <h4>About You</h4>
            <router-link to="/editProfile"><button class="editProfile">Edit Profile</button></router-link>
            <hr style="clear:both;">

            <h5>Bio</h5>
            <p>{{ bio }}</p>
            <br>

            <h5>Category Preferences</h5>
            <p>{{ categoryPreferences }}</p>

            <br>
            <v-row>
                <v-col>
                    <center>
                        <img src="../assets/icons/history.png" class="icons"><br>
                        <router-link to="/myHistory"><button>Outings View History</button></router-link>
                    </center>
                </v-col>
                <v-col>
                    <center>
                        <img src="../assets/icons/created.png" class="icons"><br>
                        <router-link to="/createdOutings"><button>Created Outings</button></router-link>
                    </center>
                </v-col>
                <v-col>
                    <center>
                        <img src="../assets/icons/review.png" class="icons"><br>
                        <router-link to="/myReviews"><button>Your Reviews</button></router-link>
                    </center>
                </v-col>
            </v-row>

        </div>
    </div>

    <Footer />
   
</template>

<script>
    import '../assets/main.css';
    import '../assets/bootstrap.css';
    import '../router/bootstrap.js';

    import NavBar from '@/components/NavBar.vue';
    import Footer from '@/components/Footer.vue';

    export default {
        name: 'profile',
        components: {
            NavBar, Footer
        },
        data() {
            return {
                username: "Username here",
                bio: "yadyaydgwygwkgnlwrkngkaerngjkrejk",
                categoryPreferences: "F&B, Education, Wellness",
                profilePicture: "/src/assets/icons/profile.png",
            };
        }
    };
</script>

<style scoped>
.content {
    margin-top: 60px;
}

.profilePic {
    width: 100%;
    max-width: 250px;
    height: auto;
    margin-top: -50px;
}

.titles{
    font-weight: 800;
    font-size: 30px;
    text-align: center;
}

.aboutYou {
    padding: 30px;
}

.aboutYou h4,h5 {
    font-weight: 800;
}

.icons {
    width: 100px;
}

v-col {
    text-align: center;
}

button {
    padding: 10px 50px 10px 50px;
    background-color: var(--secondary);
    border: solid var(--secondary);
    border-radius: 5px; 
    color: white;
    margin-top: 10px;
}

button:hover {
    background-color: var(--transparent) !important;
    color: black !important;
    border: solid var(--secondary);
}

.editProfile {
    float:right;
    margin-top: -50px;
}

.settings {
    float: right;
    width: 40px;
    margin: 15px 15px 0px 0px;
}


</style>