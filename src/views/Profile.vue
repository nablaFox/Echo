<script setup lang="ts">
import { ref } from 'vue'
import { useUser } from '@/stores/user'
import { useRouter } from 'vue-router'
import { useFormat } from '@/composables/format'
import { useAuth } from '@/composables/auth'

import StackLayout from '@/layouts/StackLayout.vue'
import Editor from '@/components/actions/Editor.vue'
import TextField from '@/components/actions/TextField.vue'
import Dialog from '@/components/containment/Dialog.vue'

const userStore = useUser()
const router = useRouter()
const format = useFormat()
const { signOut } = useAuth()

const { user } = userStore
const dialog = ref<InstanceType<typeof Dialog> | null>(null)

async function onLogout() {
    await signOut()
    await router.push('/signup')
    window.location.reload()
}

async function onDelete() {
    try {
        await userStore.remove()
        onLogout()
    } catch {
        alert('Uuups, something went wrong!')
    }
}
</script>


<template>

    <StackLayout 
        header-padding="15px 0"
        footer-height="70px"
    >
        <template #header>
            <button 
                class="material-icons" 
                @click="router.go(-1)"
            >
                arrow_back
            </button>
        </template>

        <Dialog 
            ref="dialog"
            :actions="['Nah', 'Ok']"
            headline="Delete account"
            @confirm="onDelete"
        >
            Are you sure you want to delete your account?
        </Dialog>

        <main class="main">
            <h2 class="title"> Profile </h2>

            <div class="wrapper">
                <TextField placeholder="Username">
                    <Editor 
                        fallback="Anonymous"
                        range-visible
                        :initial-value="user?.username" 
                        :max-input="15"
                        @edit="edit => userStore.update({ username: edit })"
                    />
                </TextField>
                
                <TextField placeholder="Bio">
                    <Editor 
                        fallback="Silence is a true friend who never betrays" 
                        range-visible
                        auto-grow
                        :initial-value="user?.bio"
                        :max-input="90"
                        @edit="edit => userStore.update({ bio: edit })"
                    />
                </TextField>
            </div>
            
            <div class="container"> 
                Member since {{ format.registration(user?.addedAt.toDate()) }} 
            </div>
        </main>

        <template #footer> 
            <div 
                class="material-icons-outlined delete"
                @click="dialog?.open"
            > 
                delete 
            </div>
            <div 
                class="logout"
                @click="onLogout"
            >
                Logout 
            </div>
        </template>
    </StackLayout>

</template>


<style lang="scss" scoped>
.main { 
    flex: 1;
    @include flex($direction: column);
    gap: 7%;
}

.title {
    color: var(--md-sys-color-primary);
    align-self: flex-start;
}

.wrapper {
    @include flex($direction: column, $align: start);
    width: 100%;
    gap: 20px;
}

.info {
    @include flex();
    gap: 10px;
}

.container {
    @include flex();
    border: 1px solid var(--md-sys-color-primary);
    border-radius: $small-rounded;
    padding: 10px 0;
    width: 80%;
    @extend %title-medium;
    font-size: 15px;
}

:deep(.footer) {
    border-top: 1px solid var(--md-sys-color-primary);
    @include flex();
    @extend %title-medium;
    gap: 10px;
    position: relative;
}

:deep(.content) { padding-bottom: 12px!important }

.delete {
    width: 30px;
    height: 30px;
    border: 1px solid var(--md-sys-color-secondary-container);
    @include flex();
    border-radius: $full-rounded;
    font-size: 20px;
    position: absolute;
    left: 5px;
}
</style>