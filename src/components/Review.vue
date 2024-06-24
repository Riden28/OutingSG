<template>
    <div class="reviews">
        <!-- this is for name & rating, but will change from hard code to link to database in later stages -->
        <div class="v-row labels">
            <div class="v-col-2">
                <h4>JOHN POPPERS</h4>
                <div class="stars">
                    <span class="fa fa-star checked"></span>
                    <span class="fa fa-star checked"></span>
                    <span class="fa fa-star checked"></span>
                    <span class="fa fa-star"></span>
                    <span class="fa fa-star"></span>
                </div>
            </div>

            <!-- date at end of page -->
            <div class="v-col-10">
                <div class="date">
                    <p>21 May 2024</p>
                </div>
            </div>
        </div>
        

        <!-- content of review, will link to database -->
        <div class="description">
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse ante augue, maximus non efficitur quis, mattis auctor massa. Nulla quis est scelerisque, luctus turpis eget, posuere felis. Nunc porttitor leo sit amet mattis dapibus. Mauris sit amet tellus congue, vehicula eros sed, rhoncus libero. Mauris vehicula nec lectus non mollis. Proin et nibh pellentesque, porttitor orci nec, suscipit lectus. Curabitur mauris tellus, dapibus ac dictum lacinia, congue efficitur arcu. Etiam faucibus quam eros, eget condimentum orci elementum non. Mauris ipsum elit, fermentum ac ipsum sed, feugiat pulvinar diam. Praesent sit amet ex luctus, cursus urna ac, mollis orci. Vivamus suscipit leo orci, eget bibendum ligula ultrices id.

Cras consequat sapien nec mi laoreet tristique. Aliquam ornare purus in dolor placerat, eu tincidunt dui vehicula. Vestibulum sapien dui, feugiat vitae ullamcorper in, semper non enim. Donec vitae molestie velit. Morbi velit justo, venenatis sit amet consectetur sed, pulvinar vel neque. Etiam commodo erat sodales euismod accumsan. Donec arcu elit, congue ut aliquet eu, vehicula ac velit. Nullam rhoncus porttitor sapien sit amet scelerisque. Sed in placerat mi. Praesent in ornare augue. Suspendisse tincidunt maximus dignissim. Proin et elit nec arcu iaculis lacinia sed nec ante. Duis malesuada neque in erat elementum.
</p>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'Review'
    }
</script>

<style scoped>
    .reviews {
        background-color: grey;
        margin-bottom: 20px;
    }
    .checked {
        color: orange;
    }

    .labels {
        display: flex;
        justify-content: space-around;
    }

    .v-col-10 {
        display: flex;
        justify-content: end;
    }

    .v-col-2 {
        display: flex;
        justify-content: space-around;
    }

    .stars {
        margin-right: 50px;
        padding-top: 7px;
    }

    .description {
        padding: 30px;
    }
</style>