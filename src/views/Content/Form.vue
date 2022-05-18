<template>
  <div class="form">
    <div class="form__title">Створення силабусу</div>

    <div class="form__content">
      <div class="form__wrapper">
        <div class="form__row">
          <div class="form__col">
            <Select
              v-model:value="field_first"
              :options="firstList"
              placeholder="Спеціальність"
              :reduce-label="(v) => v.label"
              :reduce-value="(v) => v.value"
            />
          </div>
          <div class="form__col">
            <Select
              v-model:value="field_second"
              :options="firstList"
              placeholder="Рівень освіти"
              :reduce-label="(v) => v.label"
              :reduce-value="(v) => v.value"
            />
          </div>
        </div>

        <div class="form__row">
          <div class="form__col">
            <Select
              v-model:value="field_third"
              :options="firstList"
              placeholder="Освітня програма"
              :reduce-label="(v) => v.label"
              :reduce-value="(v) => v.value"
            />
          </div>
          <div class="form__col">
            <Select
              v-model:value="field_fourth"
              :options="firstList"
              placeholder="Назва дисципліни"
              :reduce-label="(v) => v.label"
              :reduce-value="(v) => v.value"
            />
          </div>
        </div>

        <div class="form__row">
          <div class="form__col">Кількість годин лекційних занять:</div>
          <div class="form__col">
            <input
              v-model="lecture"
              v-maska="'#*'"
              type="text"
              class="input --white"
            />
          </div>
        </div>

        <div class="form__row">
          <div class="form__col">Кількість годин практичних занять:</div>
          <div class="form__col">
            <input
              v-model="practice"
              v-maska="'#*'"
              type="text"
              class="input --white"
            />
          </div>
        </div>

        <div class="form__row">
          <div class="form__col">Кількість годин лабораторних занять:</div>
          <div class="form__col">
            <input
              v-model="lessons"
              v-maska="'#*'"
              type="text"
              class="input --white"
            />
          </div>
        </div>
      </div>
    </div>

    <div class="form__footer">
      <button class="button" type="button">Сгенерувати силабус</button>
      <button
        class="button --margin-left --danger"
        type="button"
        @click="clearFields"
        v-if="
          lecture ||
          practice ||
          lessons ||
          field_first ||
          field_second ||
          field_third ||
          field_fourth
        "
      >
        Відміна
      </button>
    </div>
  </div>
</template>

<script>
import Select from '@/components/Select.vue';
import { ref } from '@vue/reactivity';

export default {
  components: {
    Select,
  },

  setup() {
    const lecture = ref('');
    const practice = ref('');
    const lessons = ref('');
    const field_first = ref('');
    const field_second = ref('');
    const field_third = ref('');
    const field_fourth = ref('');
    const firstList = ref([
      {
        label: 'first',
        value: '1',
      },

      {
        label: 'second',
        value: '2',
      },

      {
        label: 'third',
        value: '3',
      },
    ]);

    const clearFields = () => {
      lecture.value = '';
      practice.value = '';
      lessons.value = '';
      field_first.value = '';
      field_second.value = '';
      field_third.value = '';
      field_fourth.value = '';
    };

    return {
      lecture,
      practice,
      lessons,
      field_first,
      field_second,
      field_third,
      field_fourth,
      firstList,
      clearFields,
    };
  },
};
</script>

<style lang="scss"></style>
