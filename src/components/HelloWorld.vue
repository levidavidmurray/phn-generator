<template>
    <v-container>
        <v-col cols="12">
            <v-row justify="center">
                <v-card :width="cardSize.width" :min-height="cardSize.height" :max-width="cardSize.maxWidth">
                    <v-system-bar></v-system-bar>
                    <v-toolbar flat>
                        <v-toolbar-title>Personal Health Number Generator</v-toolbar-title>

                        <v-spacer></v-spacer>

                        <v-btn color="pink" class="white--text" @click="generate">Generate</v-btn>
                    </v-toolbar>

                    <v-row dense class="pa-4" justify="space-around">
                        <v-col v-for="(province) in hinProvinces" :key="province[0]" :cols="provinceCols">
                            <h3 class="pink--text text-uppercase ml-4" v-text="province[1]"></h3>

                            <v-divider></v-divider>

                            <v-list-item-group color="pink" class="text-center" multiple v-model="selected[province[0]]">
                                <v-list-item
                                        @click="handleClick(hin)"
                                        v-for="(hin) in hins[province[0]]"
                                        active-class="active-hin"
                                        :key="hin"
                                >
                                    <input type="hidden" :value="hin" :id="`hin-${hin}`">
                                    <v-list-item-icon>
                                        <v-icon dense>mdi-content-copy</v-icon>
                                    </v-list-item-icon>
                                    <v-list-item-content>
                                        <v-list-item-title v-text="hin"></v-list-item-title>
                                    </v-list-item-content>
                                </v-list-item>
                            </v-list-item-group>
                        </v-col>
                    </v-row>
                </v-card>
            </v-row>
        </v-col>

        <v-snackbar v-model="snackbar.active" :timeout="snackbar.timeout">
            Copied to clipboard
            <v-btn color="pink" text @click="snackbar.active = false">Close</v-btn>
        </v-snackbar>
    </v-container>
</template>

<script lang="ts">
    import Vue from 'vue'
    import copy from 'copy-to-clipboard';
    import {generateHin, Province} from "@/lib/Validator";

    export default Vue.extend({
        name: 'HelloWorld',

        data: () => ({
            snackbar: {
                active: false,
                timeout: 2000,
            },

            selected: {
                bc: [],
                on: [],
            },

            hins: {
                bc: [],
                on: [],
            },
            provinces: {
                bc: 'British Columbia',
                on: 'Ontario',
            }
        }),

        created() {
            this.generate();
        },

        methods: {
            handleClick(hin: string) {
                copy(hin);
                this.snackbar.active = true;
            },

            generate() {
                this.selected.bc = [];
                this.selected.on = [];

                const bcHins = this.getBC();
                const onHins = this.getON();

                this.hins.bc = bcHins;
                this.hins.on = onHins;
            },

            getBC() {
                const hins = [];

                for (let i = 0; i < this.count; i++) {
                    hins.push(generateHin());
                }

                return hins;
            },

            getON() {
                const hins = [];

                for (let i = 0; i < this.count; i++) {
                    hins.push(generateHin(Province.ON));
                }

                return hins;
            }
        },

        computed: {

            count() {
                return this.$vuetify.breakpoint.mdAndUp ? 10 : 3;
            },

            hinProvinces() {
                return Object.entries(this.provinces);
            },

            cardSize() {
                const {name} = this.$vuetify.breakpoint;

                if (name === 'sm' || name === 'xs') {
                    return {
                        width: '100vw',
                        maxWidth: '100vw',
                        height: '100vh',
                    }
                } else {
                    return {
                        width: '75vw',
                        maxWidth: '1100px'
                    }
                }
            },

            provinceCols() {
                return this.$vuetify.breakpoint.mdAndUp ? 5 : 12;
            }
        }
    })
</script>

<style scoped lang="scss">
    ::v-deep .active-hin {

        &::before {
            background-color: unset;
        }

        .v-list-item__title {
            text-decoration-line: line-through;
        }
    }
</style>
