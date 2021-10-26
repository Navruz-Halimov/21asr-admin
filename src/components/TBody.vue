<template>
    <tbody v-if="$store.state.currentItemUrl == 'users'">
        <tr v-for="(tbody,index) of temp" :key="index">
            <td v-for="(obj,i) of objs" :key="i">
                <span v-if="obj == 'jobtype'" v-html="tbody.jobtype['name']"></span>
                <span v-else-if="obj != 'image' && obj != 'profile_picture' && obj != 'thumbnail'" v-html="tbody[obj]"></span>
                <a v-else :href="$store.state.baseURL+tbody[obj]"  target="_blank">
                    <img :src="$store.state.baseURL+tbody[obj]" width="100px">
                </a>
            </td>
            <td class="text-centers">
                <TButton :id="tbody.id" :show="button" @editModalParent="getEditItem" />
                <DModal :id="tbody.id" />
            </td>
        </tr>
    </tbody>
    <tbody v-else-if="$store.state.currentItemUrl != 'recposts' && $store.state.currentItemUrl != 'sliders'">
        <tr v-for="(tbody,index) of tbodies" :key="index">
            <td v-for="(obj,i) of objs" :key="i">
                <span v-if="obj == 'jobtype'" v-html="tbody.jobtype['name']"></span>
                <span v-else-if="obj != 'image' && obj != 'profile_picture' && obj != 'thumbnail'" v-html="tbody[obj]"></span>
                <a v-else :href="$store.state.baseURL+tbody[obj]"  target="_blank">
                    <img :src="$store.state.baseURL+tbody[obj]" width="100px">
                </a>
            </td>
            <td class="text-centers">
                <TButton :id="tbody.id" :show="button" @editModalParent="getEditItem" />
                <DModal :id="tbody.id" />
            </td>
        </tr>
    </tbody>
    <tbody v-else>
        <tr v-for="(tbody,index) of tbodies" :key="index">
            <td v-for="(obj,i) of objs" :key="i">
                <span v-if="obj == 'jobtype'" v-html="tbody.jobtype['name']"></span>
                <span v-else-if="obj != 'image' && obj != 'profile_picture' && obj != 'thumbnail'" v-html="tbody.post[obj]"></span>
                <a v-else :href="$store.state.baseURL+tbody.post[obj]"  target="_blank">
                    <img :src="$store.state.baseURL+tbody.post[obj]" width="100px">
                </a>
            </td>
            <td class="text-centers">
                <TButton :id="tbody.id" :show="button" @editModalParent="getEditItem" />
                <DModal :id="tbody.id" />
            </td>
        </tr>
    </tbody>
</template>
<script>
import TButton from './TButton';
import DModal from './DModal';
import Loader from './Loader';

export default {
    props: ['tbodies','button','objs'],
    components: {
        TButton,
        DModal,
        Loader,
    },
    data() {
        return {
            temp: []
        }
    },
    methods: {
        getEditItem(val) {
            this.$emit('getEditItemParent',val);
        }
    },
    mounted() {
        if(this.$store.state.currentItemUrl == 'users'){
            this.tbodies.forEach(item => {
                if(item.paid_till != null) {
                    this.temp.push({
                        id: item.id,
                        firstname: item.firstname,
                        lastname: item.lastname, 
                        paid_till: item.paid_till.slice(0,10),
                        created_at: item.created_at,
                        profile_photo: item.profile_photo,
                        updated_at: item.updated_at,
                        phone_number: item.phone_number          
                    })
                }else{
                    this.temp.push({
                        id: item.id,
                        firstname: item.firstname,
                        lastname: item.lastname, 
                        paid_till: item.paid_till,
                        created_at: item.created_at,
                        profile_photo: item.profile_photo,
                        updated_at: item.updated_at,
                        phone_number: item.phone_number          
                    })
                }
            })
        }
    }
}
</script>