<template>

    <div class="footer">
        <p><img src="../assets/logo/OutingSG_black.png" style="width: 150px;"></p>
        <p>
            <router-link to="/about">About Us </router-link>
            |
            <router-link to="/tnc"> Terms and Conditions</router-link>
        </p>
        <h6>© 2024 OutingSG. All rights reserved.</h6>
    </div>

</template>

<script>
    import '../assets/main.css';
    import '../assets/bootstrap.css';
    import '../router/bootstrap.js';

    export default {
        name: 'OutingSGFooter'
    }
</script>

<style scoped>
    .footer {
        clear: both;
        position: relative;
        height: auto;
        background-color: var(--primary);
        /*position: fixed;  if its long scroll then comment out, if not, uncomment*/
        bottom: 0;
        padding: 20px;
        width: 100%;
        text-align: center;
    }

    a {
        color:black;
    }
</style>