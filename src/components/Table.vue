<template>
    <div class="table-responsive">
        <table class="table table-bordered table-hover table-striped table-light mb-0">
            <THead :theads="theads" />
            <TBody v-if="tbodies.length != 0"  :tbodies="tbodies" :button="button" :objs="objects" @getEditItemParent="getEditSuperParent" />
             <!-- <tbody v-if="this.tbodies.length != 0">
                <tr v-for="(tbody,index) of tbodies" :key="index">
                    <td v-for="(obj,i) of objects" :key="i">
                        <span v-if="obj != 'image'">{{ tbody[obj] }}</span>
                        <a v-else :href="$store.state.baseURL+tbody[obj]"  target="_blank">
                            <img :src="$store.state.baseURL+tbody[obj]" width="100px">
                        </a>
                    </td>
                    <td class="text-centers">
                        <TButton :id="tbody.id" :show="button" @editModalParent="getEditItem" />
                        <DModal :id="tbody.id" />
                    </td>
                </tr>
            </tbody> -->
            <Empty v-else :colspan="5" />
        </table>
    </div>
</template>
<script>
import THead from './THead';
import TButton from './TButton';
import DModal from './DModal';
import Empty from './Empty';
import TBody from './TBody';
import Loader from './Loader';

export default {
    props: ['theads','tbodies','button','objects'],
    components: {
        THead,
        TButton,
        Empty,
        TBody,
        DModal,
        Loader,
    },
    data() {
        return {
            
        }
    },
    methods: {
        getEditSuperParent(val) {
            this.$emit('getItemEdit',val)
        }
    },
    mounted() {
    }  
}
</script>
