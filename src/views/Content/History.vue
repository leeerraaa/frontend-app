<template>
  <div class="history">
    <div class="history__title">Доступні силабуси</div>

    <div class="history__content" v-if="isReady">
      <div class="history__content-title" v-if="!documentList.length">
        Немає записів
      </div>

      <div v-else>
        <div class="history__card" v-for="card in documentList" :key="card.id">
          <div class="history__card-row">
            <div class="history__card-desc">
              {{ dateTime(card.date_of_creation) }}
            </div>
            <div class="history__card-desc">{{ card.specialty }}</div>
            <div class="history__card-desc">{{ card.educational_level }}</div>
          </div>
          <div class="history__card-row">
            <button
              class="button --danger"
              type="button"
              @click="deleteDocument(card.id)"
            >
              Видалити
            </button>
            <button
              class="button --margin-left"
              type="button"
              @click="documentDownload(card.id)"
            >
              Завантажити
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref } from '@vue/reactivity';
import { useStore } from 'vuex';
import { onMounted } from '@vue/runtime-core';
import moment from 'moment';

export default {
  setup() {
    const store = useStore();
    const documentList = ref([]);
    const isReady = ref(false);

    onMounted(() => {
      getDocumentList();
      isReady.value = true;
    });

    const dateTime = (value) => {
      return moment(value).format('DD-MM-YYYY');
    };

    const getDocumentList = async () => {
      documentList.value = await store.dispatch('document/documentList');
    };

    const deleteDocument = async (document_id) => {
      await store.dispatch('document/documentDelete', document_id);
      await getDocumentList();
    };

    const documentDownload = async (document_id) => {
      await store.dispatch('document/documentDownload', document_id);
    };

    return {
      documentList,
      isReady,
      deleteDocument,
      documentDownload,
      dateTime,
    };
  },
};
</script>

<style lang="scss"></style>
