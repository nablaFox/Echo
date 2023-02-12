<script setup lang="ts">
import { ref } from 'vue'
import { storeToRefs } from 'pinia'
import { useUser } from '@/stores/user'

import Dialog from '../containment/Dialog.vue'

const userStore = useUser()
const { user } = storeToRefs(userStore)
const dialog = ref<InstanceType<typeof Dialog> | null>(null)

const changeMod = (mod: number) => userStore.update({ group: mod })

const isPremium = false
const shop = () => { alert('shop') }
</script>


<template>
   
    <Dialog
        headline="Mode Selection"
        ref="dialog"
    >
        <template #body v-if="isPremium">
            <button
                v-for="mod in [2, 4, 6]"
                class="mod"
                :class="[mod === user?.group && 'selected']"
                @click="changeMod(mod); dialog?.close()"
            >
                {{ mod }} Guests
            </button>
        </template>

        <template #body v-else>
            <button
                class="mod selected"
                @click="dialog?.close()"
            >
                2 Guests
            </button>

            <div
                class="premium"
                @click="shop"
            >
                <div class="premium__content"> 
                    <div class="premium__title"> 4/6 Guests </div>
                    <div class="premium__price"> $2,50 </div>
                </div>
                <div class="wave"> 
                    <svg width="96" height="76" viewBox="0 0 96 76" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M97 214L87.8219 208.641C78.7812 203.303 60.2188 192.526 49.3219 181.889C38.2188 171.192 34.7812 160.415 34.6781 149.778C34.7812 139.081 38.2187 128.303 42 117.667C45.7812 106.97 43.7187 96.1924 42 85.5556C40.2812 74.8585 32.7187 64.0813 21.8219 53.4445C10.7187 42.7474 7.84247 33.6368 15.0612 23C22.28 12.303 45.7812 -0.140965 58.5 -10.7778C71.2187 -21.4748 67.7812 -32.2521 58.5 -42.8889C49.2187 -53.5859 34.7812 -64.3632 27.3219 -69.5812L20 -75H-13V-69.6414C-13 -64.303 -13 -53.5257 -13 -42.8889C-13 -32.1919 -13 -21.4146 -13 -10.7778C-13 -0.0807571 -13 10.6965 -13 21.3333C-13 32.0303 -13 42.8077 -13 53.4445C-13 64.1415 -13 74.9188 -13 85.5556C-13 96.2526 -13 107.03 -13 117.667C-13 128.364 -13 139.141 -13 149.778C-13 160.475 -13 171.252 -13 181.889C-13 192.586 -13 203.363 -13 208.581V214L97 214Z" fill="#BFC2FF"/>
                    </svg>
                </div>
            </div>
        </template>
    </Dialog>

    <span 
        class="material-icons"
        @click="dialog?.open()"
    >
        person
    </span>

</template>


<style scoped lang="scss">
.mod {
    width: 75%;
    max-width: 160px;
    border-radius: $medium-rounded;
    border: 1px solid var(--md-sys-color-primary);
    padding: 17px 0;
    @include minHSize(720px) { padding: 19px 0 }

    &.selected { background-color: var(--md-sys-color-on-secondary) }
}

.premium {
    width: 93%;
    height: 76px;
    max-width: 160px;
    border-radius: $medium-rounded;
    background-color: var(--md-sys-color-surface5);
    box-shadow: var(--md-sys-elevation5);
    @include flex($justify: end);
    margin-top: 5px;
    position: relative;
    overflow: hidden;

    &__content {
        @include flex($direction: column, $align: start);
        gap: 5px;
        margin-right: 15px;
    }

    &__title { 
        @extend %title-large;
        font-weight: 500;
    }
    &__price { 
        @extend %label-large;
        font-size: 16px;
        align-self: end;
    }
}

.wave {
    position: absolute;
    height: 100%;
    width: 10%;
    left: 0;
}

:deep(.body) {
    @include flex($direction: column);
    gap: 20px;
    padding: 10px 0;
}

:deep(.dialog) {
    width: 65vw; // temporany
    padding: 7vh 24px;
}

:deep(.content) {
    align-items: center!important;
    padding-bottom: 0;
}

:deep(.headline) {
    font-weight: 500;
    white-space: nowrap;
}
</style>