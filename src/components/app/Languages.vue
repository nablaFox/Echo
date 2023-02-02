<script setup lang="ts">
import Dialog from '../containment/Dialog.vue'
import ListItem from '../containment/ListItem.vue'
import { useUser } from '@/stores/user'
import { storeToRefs } from 'pinia'
import { ref } from 'vue'

const userStore = useUser()
const { user } = storeToRefs(userStore)
const dialog = <InstanceType<typeof Dialog> | null>(null)

const languages = {
    English: 'EN',
    Français: 'FR',
    Español: 'ESP',
    Deutsch: 'DE',
    Italiano: 'IT',
    Русский: 'RUS'
}

const selected = ref<Array<string>>(user?.value?.languages)

const updateLang = () => userStore.update({ languages: selected.value })

function changeLang(event: any, iso: string) {
    if (
        selected.value.length == 1
        && !event.target.checked
    ) { 
        event.target.checked = true
        return
    }
    
    selected.value.includes(iso) ?
    selected.value.splice(selected.value.indexOf(iso), 1) :
    selected.value.push(iso)
}
</script>


<template>

    <Dialog
        :actions="['Cancel', 'Ok']"
        headline="Selezione lingua"
        @confirm="updateLang"
        divider
        ref="dialog"
    > 
        <template #supporting> La diversità è bella! </template>
        <template #body>
            <ListItem
                v-for="iso, language in languages"
                :headline="language"
            >
                <template #trailing>
                    <input 
                        type="checkbox" 
                        :checked="user?.languages.includes(iso)"
                        @change.prevent="e => changeLang(e, iso)"
                        
                    >
                </template>
            </ListItem>
        </template>
    </Dialog>

    <span 
        class="material-icons"
        @click="dialog?.open()"
    > 
        language
    </span>

</template>


<style scoped>
:deep(.body) {
    max-height: 210px;
    overflow: scroll;
    scrollbar-width: none;
}
</style>